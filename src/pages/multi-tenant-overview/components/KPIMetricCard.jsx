import React from "react";
import Icon from "../../../components/AppIcon";

const KPIMetricCard = ({
  title,
  value,
  unit = "",
  trend,
  trendValue,
  icon,
  sparklineData = [],
  color = "primary",
  onClick,
}) => {
  const colorClasses = {
    primary: "bg-primary text-primary-foreground",
    success: "bg-success text-success-foreground",
    warning: "bg-warning text-warning-foreground",
    accent: "bg-accent text-accent-foreground",
  };

  const trendColors = {
    up: "text-success",
    down: "text-error",
    neutral: "text-muted-foreground",
  };

  const formatValue = (val) => {
    if (typeof val === "number") {
      if (val >= 1000000) return `${(val / 1000000)?.toFixed(1)}M`;
      if (val >= 1000) return `${(val / 1000)?.toFixed(1)}K`;
      return val?.toLocaleString();
    }
    return val;
  };

  return (
    <div
      className={`bg-card border border-border rounded-lg p-6 transition-smooth hover:shadow-elevation-2 ${
        onClick ? "cursor-pointer hover:border-primary/50" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </p>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-foreground">
              {formatValue(value)}
            </span>
            {unit && (
              <span className="text-sm text-muted-foreground">{unit}</span>
            )}
          </div>
        </div>
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses?.[color]}`}
        >
          <Icon name={icon} size={20} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        {trend && (
          <div className="flex items-center space-x-1">
            <Icon
              name={
                trend === "up"
                  ? "TrendingUp"
                  : trend === "down"
                  ? "TrendingDown"
                  : "Minus"
              }
              size={14}
              className={trendColors?.[trend]}
            />
            <span className={`text-sm font-medium ${trendColors?.[trend]}`}>
              {trendValue}%
            </span>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        )}

        {sparklineData?.length > 0 && (
          <div className="flex items-end space-x-1 h-6">
            {sparklineData?.slice(-8)?.map((point, index) => (
              <div
                key={index}
                className="w-1 bg-primary/30 rounded-full"
                style={{
                  height: `${(point / Math.max(...sparklineData)) * 24}px`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KPIMetricCard;
