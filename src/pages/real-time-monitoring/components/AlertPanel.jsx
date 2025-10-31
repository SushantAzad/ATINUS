import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const AlertPanel = () => {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState("all");

  const alertSeverities = [
    { value: "all", label: "All Alerts", count: 0 },
    { value: "critical", label: "Critical", count: 0 },
    { value: "warning", label: "Warning", count: 0 },
    { value: "info", label: "Info", count: 0 },
  ];

  const mockAlerts = [
    {
      id: 1,
      severity: "critical",
      title: "Database Connection Timeout",
      message:
        "Primary database connection experiencing intermittent timeouts affecting 15 active assessments.",
      timestamp: new Date(Date.now() - 300000),
      acknowledged: false,
      source: "Database Monitor",
      affectedUsers: 15,
      actions: ["Restart Connection", "Switch to Backup", "Contact DBA"],
    },
    {
      id: 2,
      severity: "warning",
      title: "High Server Load Detected",
      message:
        "Server CPU usage at 89% for the past 5 minutes. Consider scaling resources.",
      timestamp: new Date(Date.now() - 600000),
      acknowledged: false,
      source: "Performance Monitor",
      affectedUsers: 0,
      actions: ["Scale Resources", "Optimize Queries", "Monitor"],
    },
    {
      id: 3,
      severity: "warning",
      title: "Student Support Request",
      message:
        "Multiple students from MIT College reporting assessment loading issues.",
      timestamp: new Date(Date.now() - 900000),
      acknowledged: true,
      source: "Support System",
      affectedUsers: 8,
      actions: ["Contact Students", "Check Network", "Extend Time"],
    },
    {
      id: 4,
      severity: "info",
      title: "Scheduled Maintenance Reminder",
      message:
        "System maintenance scheduled for tonight at 2:00 AM UTC. Duration: 30 minutes.",
      timestamp: new Date(Date.now() - 1800000),
      acknowledged: false,
      source: "Maintenance Scheduler",
      affectedUsers: 0,
      actions: ["Send Notifications", "Prepare Backup", "Update Status"],
    },
    {
      id: 5,
      severity: "critical",
      title: "Assessment Submission Failure",
      message:
        "Failed to save assessment submissions for 3 students. Data recovery in progress.",
      timestamp: new Date(Date.now() - 2400000),
      acknowledged: false,
      source: "Assessment Engine",
      affectedUsers: 3,
      actions: ["Recover Data", "Contact Students", "Investigate"],
    },
  ];

  useEffect(() => {
    setAlerts(mockAlerts);

    // Simulate new alerts
    const interval = setInterval(() => {
      const severities = ["critical", "warning", "info"];
      const newAlert = {
        id: Date.now(),
        severity: severities?.[Math.floor(Math.random() * severities?.length)],
        title: "New System Alert",
        message: "Automated alert generated for monitoring demonstration.",
        timestamp: new Date(),
        acknowledged: false,
        source: "System Monitor",
        affectedUsers: Math.floor(Math.random() * 20),
        actions: ["Investigate", "Acknowledge", "Escalate"],
      };

      setAlerts((prev) => [newAlert, ...prev?.slice(0, 19)]);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const filteredAlerts = alerts?.filter(
    (alert) => filter === "all" || alert?.severity === filter
  );

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical":
        return "text-error";
      case "warning":
        return "text-warning";
      case "info":
        return "text-primary";
      default:
        return "text-muted-foreground";
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case "critical":
        return "bg-error/10 border-error/20";
      case "warning":
        return "bg-warning/10 border-warning/20";
      case "info":
        return "bg-primary/10 border-primary/20";
      default:
        return "bg-muted/10 border-border";
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "critical":
        return "AlertCircle";
      case "warning":
        return "AlertTriangle";
      case "info":
        return "Info";
      default:
        return "Bell";
    }
  };

  const handleAcknowledge = (alertId) => {
    setAlerts((prev) =>
      prev?.map((alert) =>
        alert?.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  const handleDismiss = (alertId) => {
    setAlerts((prev) => prev?.filter((alert) => alert?.id !== alertId));
  };

  const formatTimeAgo = (timestamp) => {
    const minutes = Math.floor((new Date() - timestamp) / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  // Update counts for filter buttons
  const updatedSeverities = alertSeverities?.map((severity) => ({
    ...severity,
    count:
      severity?.value === "all"
        ? alerts?.length
        : alerts?.filter((alert) => alert?.severity === severity?.value)
            ?.length,
  }));

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Bell" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              System Alerts
            </h3>
            {alerts?.filter((a) => !a?.acknowledged)?.length > 0 && (
              <div className="w-2 h-2 bg-error rounded-full animate-pulse" />
            )}
          </div>

          <Button variant="outline" size="sm" iconName="Settings" iconSize={14}>
            Configure
          </Button>
        </div>

        {/* Alert Severity Filters */}
        <div className="space-y-2">
          {updatedSeverities?.map((severity) => (
            <button
              key={severity?.value}
              onClick={() => setFilter(severity?.value)}
              className={`w-full flex items-center justify-between p-2 rounded-md text-sm transition-all ${
                filter === severity?.value
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <span>{severity?.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  filter === severity?.value
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {severity?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Alerts List */}
      <div
        className="flex-1 overflow-y-auto p-4"
        style={{ maxHeight: "calc(100% - 8rem)" }}
      >
        {filteredAlerts?.length === 0 ? (
          <div className="text-center py-8">
            <Icon
              name="CheckCircle"
              size={48}
              className="text-success mx-auto mb-3"
            />
            <p className="text-muted-foreground">No alerts to display</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAlerts?.map((alert) => (
              <div
                key={alert?.id}
                className={`p-4 rounded-lg border transition-all ${getSeverityBg(
                  alert?.severity
                )} ${alert?.acknowledged ? "opacity-60" : ""}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3 flex-1">
                    <Icon
                      name={getSeverityIcon(alert?.severity)}
                      size={18}
                      className={getSeverityColor(alert?.severity)}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-foreground">
                          {alert?.title}
                        </h4>
                        {alert?.acknowledged && (
                          <Icon
                            name="Check"
                            size={14}
                            className="text-success"
                          />
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground mb-2">
                        {alert?.message}
                      </p>

                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>Source: {alert?.source}</span>
                        <span>•</span>
                        <span>{formatTimeAgo(alert?.timestamp)}</span>
                        {alert?.affectedUsers > 0 && (
                          <>
                            <span>•</span>
                            <span>{alert?.affectedUsers} users affected</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDismiss(alert?.id)}
                    iconName="X"
                    iconSize={14}
                  >
                    <span className="sr-only">Dismiss alert</span>
                  </Button>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {alert?.actions?.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="xs"
                      className="text-xs"
                    >
                      {action}
                    </Button>
                  ))}
                </div>

                {/* Acknowledge Button */}
                {!alert?.acknowledged && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleAcknowledge(alert?.id)}
                    iconName="Check"
                    iconPosition="left"
                    iconSize={14}
                    className="w-full"
                  >
                    Acknowledge Alert
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {alerts?.filter((a) => !a?.acknowledged)?.length} unacknowledged
          </span>
          <Button variant="ghost" size="sm" iconName="Archive" iconSize={14}>
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertPanel;
