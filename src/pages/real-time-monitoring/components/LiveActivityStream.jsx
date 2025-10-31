import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const LiveActivityStream = () => {
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const activityTypes = [
    { value: "all", label: "All Activities", icon: "Activity" },
    { value: "login", label: "User Logins", icon: "LogIn" },
    { value: "assessment", label: "Assessments", icon: "FileText" },
    { value: "intervention", label: "Interventions", icon: "UserCheck" },
    { value: "system", label: "System Events", icon: "Settings" },
  ];

  const mockActivities = [
    {
      id: 1,
      type: "login",
      user: "Sarah Chen",
      userRole: "Student",
      institution: "MIT College",
      action: "Logged into assessment portal",
      timestamp: new Date(Date.now() - 30000),
      severity: "info",
      details: "IP: 192.168.1.45, Browser: Chrome 118",
    },
    {
      id: 2,
      type: "assessment",
      user: "Alex Rodriguez",
      userRole: "Student",
      institution: "Stanford University",
      action: "Started Coding Assessment Round 2",
      timestamp: new Date(Date.now() - 45000),
      severity: "info",
      details: "Assessment ID: CA-2024-102, Duration: 90 minutes",
    },
    {
      id: 3,
      type: "intervention",
      user: "Dr. Michael Johnson",
      userRole: "Faculty",
      institution: "Harvard College",
      action: "Provided assistance to struggling student",
      timestamp: new Date(Date.now() - 60000),
      severity: "warning",
      details: "Student: Emma Wilson, Issue: Technical difficulty",
    },
    {
      id: 4,
      type: "system",
      user: "System",
      userRole: "System",
      institution: "Global",
      action: "Database backup completed successfully",
      timestamp: new Date(Date.now() - 120000),
      severity: "success",
      details: "Backup size: 2.4GB, Duration: 45 seconds",
    },
    {
      id: 5,
      type: "assessment",
      user: "Jessica Park",
      userRole: "Student",
      institution: "UC Berkeley",
      action: "Completed AI Interview Assessment",
      timestamp: new Date(Date.now() - 180000),
      severity: "success",
      details: "Score: 85/100, Duration: 25 minutes",
    },
  ];

  useEffect(() => {
    setActivities(mockActivities);

    // Auto-scroll to top when filter changes
    const activityList = document.getElementById("activity-list");
    if (activityList && isAutoScroll) {
      activityList.scrollTop = 0;
    }

    // Simulate real-time activity updates
    const interval = setInterval(() => {
      const newActivity = {
        id: Date.now(),
        type: ["login", "assessment", "intervention", "system"]?.[
          Math.floor(Math.random() * 4)
        ],
        user: ["John Doe", "Jane Smith", "Mike Wilson", "Lisa Brown"]?.[
          Math.floor(Math.random() * 4)
        ],
        userRole: ["Student", "Faculty", "Admin"]?.[
          Math.floor(Math.random() * 3)
        ],
        institution: [
          "MIT College",
          "Stanford University",
          "Harvard College",
        ]?.[Math.floor(Math.random() * 3)],
        action: "New activity detected",
        timestamp: new Date(),
        severity: ["info", "success", "warning"]?.[
          Math.floor(Math.random() * 3)
        ],
        details: "Real-time activity simulation",
      };

      setActivities((prev) => [newActivity, ...prev?.slice(0, 49)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const filteredActivities = activities?.filter(
    (activity) => filter === "all" || activity?.type === filter
  );

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "success":
        return "text-success";
      case "warning":
        return "text-warning";
      case "error":
        return "text-error";
      default:
        return "text-primary";
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case "success":
        return "bg-success/10";
      case "warning":
        return "bg-warning/10";
      case "error":
        return "bg-error/10";
      default:
        return "bg-primary/10";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "login":
        return "LogIn";
      case "assessment":
        return "FileText";
      case "intervention":
        return "UserCheck";
      case "system":
        return "Settings";
      default:
        return "Activity";
    }
  };

  const formatTimeAgo = (timestamp) => {
    const seconds = Math.floor((new Date() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Live Activity Stream
            </h3>
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={isAutoScroll ? "default" : "outline"}
              size="sm"
              onClick={() => setIsAutoScroll(!isAutoScroll)}
              iconName="ArrowDown"
              iconSize={14}
            >
              Auto-scroll
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconSize={14}
            >
              Export
            </Button>
          </div>
        </div>

        {/* Activity Type Filters */}
        <div className="flex flex-wrap gap-2">
          {activityTypes?.map((type) => (
            <button
              key={type?.value}
              onClick={() => setFilter(type?.value)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm transition-all ${
                filter === type?.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
              }`}
            >
              <Icon name={type?.icon} size={14} />
              <span>{type?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Activity List */}
      <div
        id="activity-list"
        className="flex-1 overflow-y-auto p-4"
        style={{ maxHeight: "calc(100% - 8rem)" }}
      >
        <div className="space-y-3">
          {filteredActivities?.map((activity) => (
            <div
              key={activity?.id}
              className={`p-4 rounded-lg border transition-all hover:shadow-sm relative bg-card ${getSeverityBg(
                activity?.severity
              )}`}
            >
              <div className="flex items-start justify-between relative z-20">
                <div className="flex items-start space-x-3 flex-1">
                  <div
                    className={`p-2 rounded-lg relative ${getSeverityBg(
                      activity?.severity
                    )}`}
                  >
                    <Icon
                      name={getTypeIcon(activity?.type)}
                      size={16}
                      className={getSeverityColor(activity?.severity)}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-foreground">
                        {activity?.user}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-muted rounded text-muted-foreground">
                        {activity?.userRole}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {activity?.institution}
                      </span>
                    </div>

                    <p className="text-sm text-foreground mb-2">
                      {activity?.action}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {activity?.details}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatTimeAgo(activity?.timestamp)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MoreHorizontal"
                    iconSize={14}
                  >
                    <span className="sr-only">More options</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer Stats */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Showing {filteredActivities?.length} activities
          </span>
          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground">
              Updates every 8 seconds
            </span>
            <div className="flex items-center space-x-1">
              <div className="w-1 h-1 bg-success rounded-full animate-pulse" />
              <span className="text-xs text-success">Live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveActivityStream;
