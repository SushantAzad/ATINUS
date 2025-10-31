import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";

const LiveActivityFeed = ({ activities }) => {
  const [filter, setFilter] = useState("all");
  const [isLive, setIsLive] = useState(true);

  const activityTypes = {
    completion: {
      icon: "CheckCircle",
      color: "text-success",
      bg: "bg-success/10",
    },
    intervention: {
      icon: "AlertTriangle",
      color: "text-warning",
      bg: "bg-warning/10",
    },
    alert: { icon: "AlertCircle", color: "text-error", bg: "bg-error/10" },
    enrollment: { icon: "UserPlus", color: "text-accent", bg: "bg-accent/10" },
    achievement: { icon: "Award", color: "text-primary", bg: "bg-primary/10" },
  };

  const filters = [
    { key: "all", label: "All Activities", count: activities?.length },
    {
      key: "completion",
      label: "Completions",
      count: activities?.filter((a) => a?.type === "completion")?.length,
    },
    {
      key: "intervention",
      label: "Interventions",
      count: activities?.filter((a) => a?.type === "intervention")?.length,
    },
    {
      key: "alert",
      label: "Alerts",
      count: activities?.filter((a) => a?.type === "alert")?.length,
    },
  ];

  const filteredActivities =
    filter === "all"
      ? activities
      : activities?.filter((activity) => activity?.type === filter);

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return new Date(timestamp)?.toLocaleDateString();
  };

  const getSeverityBadge = (severity) => {
    const severityClasses = {
      high: "bg-error text-error-foreground",
      medium: "bg-warning text-warning-foreground",
      low: "bg-accent text-accent-foreground",
      info: "bg-primary text-primary-foreground",
    };

    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          severityClasses?.[severity] || severityClasses?.info
        }`}
      >
        {severity}
      </span>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-foreground">
            Live Activity Feed
          </h3>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isLive ? "bg-success animate-pulse" : "bg-muted-foreground"
              }`}
            />
            <span className="text-xs text-muted-foreground">
              {isLive ? "Live" : "Paused"}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsLive(!isLive)}
            className={`p-2 rounded-md transition-smooth ${
              isLive
                ? "bg-success/10 text-success"
                : "bg-muted text-muted-foreground"
            }`}
          >
            <Icon name={isLive ? "Pause" : "Play"} size={16} />
          </button>
          <button className="p-2 hover:bg-muted rounded-md transition-smooth">
            <Icon
              name="MoreVertical"
              size={16}
              className="text-muted-foreground"
            />
          </button>
        </div>
      </div>
      <div className="flex space-x-1 mb-4 p-1 bg-muted rounded-lg">
        {filters?.map((filterOption) => (
          <button
            key={filterOption?.key}
            onClick={() => setFilter(filterOption?.key)}
            className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-smooth ${
              filter === filterOption?.key
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {filterOption?.label}
            <span className="ml-1 text-xs opacity-60">
              ({filterOption?.count})
            </span>
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto space-y-3">
        {filteredActivities?.map((activity, index) => {
          const typeConfig =
            activityTypes?.[activity?.type] || activityTypes?.completion;

          return (
            <div
              key={activity?.id}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${typeConfig?.bg}`}
              >
                <Icon
                  name={typeConfig?.icon}
                  size={16}
                  className={typeConfig?.color}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-sm font-medium text-foreground line-clamp-2">
                    {activity?.title}
                  </p>
                  {activity?.severity && getSeverityBadge(activity?.severity)}
                </div>

                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {activity?.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Icon name="Building2" size={12} />
                    <span>{activity?.institution}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {getTimeAgo(activity?.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {filteredActivities?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Icon
              name="Activity"
              size={48}
              className="text-muted-foreground/50 mb-3"
            />
            <p className="text-sm font-medium text-muted-foreground mb-1">
              No activities found
            </p>
            <p className="text-xs text-muted-foreground">
              {filter === "all"
                ? "No recent activities to display"
                : `No ${filter} activities found`}
            </p>
          </div>
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
          <button className="flex items-center space-x-1 hover:text-foreground transition-smooth">
            <Icon name="RefreshCw" size={12} />
            <span>Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveActivityFeed;
