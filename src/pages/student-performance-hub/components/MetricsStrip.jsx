import React from "react";
import Icon from "../../../components/AppIcon";

const MetricsStrip = ({ metrics }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "excellent":
        return "text-success bg-success/10 border-success/20";
      case "good":
        return "text-accent bg-accent/10 border-accent/20";
      case "warning":
        return "text-warning bg-warning/10 border-warning/20";
      case "critical":
        return "text-error bg-error/10 border-error/20";
      default:
        return "text-muted-foreground bg-muted border-border";
    }
  };

  const getIconForMetric = (type) => {
    switch (type) {
      case "completion":
        return "CheckCircle";
      case "average":
        return "TrendingUp";
      case "at-risk":
        return "AlertTriangle";
      case "placement":
        return "Target";
      default:
        return "BarChart3";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics?.map((metric) => (
        <div
          key={metric?.id}
          className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-smooth"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg ${getStatusColor(metric?.status)}`}>
              <Icon
                name={getIconForMetric(metric?.type)}
                size={20}
                className="text-current"
              />
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">
                {metric?.period}
              </div>
              <div
                className={`text-xs font-medium ${
                  metric?.trend > 0
                    ? "text-success"
                    : metric?.trend < 0
                    ? "text-error"
                    : "text-muted-foreground"
                }`}
              >
                {metric?.trend > 0 ? "+" : ""}
                {metric?.trend}%
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              {metric?.label}
            </h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-foreground">
                {metric?.value}
              </span>
              <span className="text-sm text-muted-foreground">
                {metric?.unit}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {metric?.description}
            </div>
          </div>

          {metric?.progress && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>{metric?.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    metric?.progress >= 80
                      ? "bg-success"
                      : metric?.progress >= 60
                      ? "bg-accent"
                      : metric?.progress >= 40
                      ? "bg-warning"
                      : "bg-error"
                  }`}
                  style={{ width: `${metric?.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MetricsStrip;
