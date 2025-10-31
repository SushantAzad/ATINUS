import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const SystemStatusHeader = ({ onRefreshIntervalChange, refreshInterval }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemHealth, setSystemHealth] = useState({
    status: "operational",
    uptime: "99.8%",
    responseTime: "142ms",
    activeUsers: 1247,
    serverLoad: 68,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate real-time updates
      setSystemHealth((prev) => ({
        ...prev,
        activeUsers: prev?.activeUsers + Math.floor(Math.random() * 10) - 5,
        responseTime: `${140 + Math.floor(Math.random() * 20)}ms`,
        serverLoad: Math.max(
          50,
          Math.min(90, prev?.serverLoad + Math.floor(Math.random() * 6) - 3)
        ),
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const refreshIntervals = [
    { value: 5, label: "5s" },
    { value: 15, label: "15s" },
    { value: 30, label: "30s" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "operational":
        return "text-success";
      case "warning":
        return "text-warning";
      case "critical":
        return "text-error";
      default:
        return "text-muted-foreground";
    }
  };

  const getLoadColor = (load) => {
    if (load < 70) return "bg-success";
    if (load < 85) return "bg-warning";
    return "bg-error";
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="px-6 py-4">
        {/* Emergency Alert Banner */}
        <div className="mb-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="text-sm font-medium text-warning">
                System Maintenance Scheduled: Oct 16, 2025 at 2:00 AM UTC
              </span>
            </div>
            <Button variant="ghost" size="sm" iconName="X" iconSize={14}>
              Dismiss
            </Button>
          </div>
        </div>

        {/* System Status Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  systemHealth?.status === "operational"
                    ? "bg-success animate-pulse"
                    : "bg-error"
                }`}
              />
              <span
                className={`text-sm font-medium ${getStatusColor(
                  systemHealth?.status
                )}`}
              >
                System{" "}
                {systemHealth?.status === "operational"
                  ? "Operational"
                  : "Issues Detected"}
              </span>
            </div>

            <div className="text-sm text-muted-foreground">
              Uptime:{" "}
              <span className="font-medium text-foreground">
                {systemHealth?.uptime}
              </span>
            </div>

            <div className="text-sm text-muted-foreground">
              Response:{" "}
              <span className="font-medium text-foreground">
                {systemHealth?.responseTime}
              </span>
            </div>

            <div className="text-sm text-muted-foreground">
              Load:{" "}
              <span className="font-medium text-foreground">
                {systemHealth?.serverLoad}%
              </span>
              <div className="w-16 h-1 bg-muted rounded-full ml-2 inline-block">
                <div
                  className={`h-full rounded-full transition-all ${getLoadColor(
                    systemHealth?.serverLoad
                  )}`}
                  style={{ width: `${systemHealth?.serverLoad}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              Last Updated:{" "}
              <span className="font-medium text-foreground">
                {currentTime?.toLocaleTimeString()}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                Auto-refresh:
              </span>
              <div className="flex bg-muted rounded-lg p-1">
                {refreshIntervals?.map((interval) => (
                  <button
                    key={interval?.value}
                    onClick={() => onRefreshIntervalChange(interval?.value)}
                    className={`px-3 py-1 text-xs rounded transition-all ${
                      refreshInterval === interval?.value
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {interval?.label}
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              iconSize={14}
            >
              Refresh Now
            </Button>
          </div>
        </div>

        {/* Active Metrics Strip */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                Active Users
              </span>
              <Icon name="Users" size={16} className="text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">
              {systemHealth?.activeUsers?.toLocaleString()}
            </div>
            <div className="text-xs text-success">+12% from last hour</div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                Assessments Active
              </span>
              <Icon name="FileText" size={16} className="text-accent" />
            </div>
            <div className="text-2xl font-bold text-foreground">342</div>
            <div className="text-xs text-muted-foreground">
              Across 28 institutions
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                Completion Rate
              </span>
              <Icon name="TrendingUp" size={16} className="text-success" />
            </div>
            <div className="text-2xl font-bold text-foreground">87.3%</div>
            <div className="text-xs text-success">+2.1% improvement</div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                Error Rate
              </span>
              <Icon name="AlertCircle" size={16} className="text-warning" />
            </div>
            <div className="text-2xl font-bold text-foreground">0.12%</div>
            <div className="text-xs text-success">-0.03% from baseline</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatusHeader;
