import React from "react";
import Icon from "../../../components/AppIcon";

const PredictionMetricsGrid = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics?.map((metric) => (
        <div
          key={metric?.id}
          className="bg-card border border-border rounded-lg p-6 shadow-elevation-1"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${metric?.iconBg}`}
            >
              <Icon
                name={metric?.icon}
                size={24}
                className={metric?.iconColor}
              />
            </div>
            <div className="flex items-center space-x-1">
              <Icon
                name={
                  metric?.trend === "up"
                    ? "TrendingUp"
                    : metric?.trend === "down"
                    ? "TrendingDown"
                    : "Minus"
                }
                size={16}
                className={
                  metric?.trend === "up"
                    ? "text-success"
                    : metric?.trend === "down"
                    ? "text-error"
                    : "text-muted-foreground"
                }
              />
              <span
                className={`text-sm font-medium ${
                  metric?.trend === "up"
                    ? "text-success"
                    : metric?.trend === "down"
                    ? "text-error"
                    : "text-muted-foreground"
                }`}
              >
                {metric?.change}
              </span>
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

            {metric?.confidence && (
              <div className="flex items-center space-x-2 mt-3">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${metric?.confidenceColor}`}
                    style={{ width: `${metric?.confidence}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {metric?.confidence}% confidence
                </span>
              </div>
            )}

            <p className="text-xs text-muted-foreground mt-2">
              {metric?.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PredictionMetricsGrid;
