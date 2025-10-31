import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const PredictiveTimeline = ({ timelineData, sensitivityData }) => {
  const [selectedMetric, setSelectedMetric] = useState("placement_rate");
  const [showSensitivity, setShowSensitivity] = useState(false);
  const [timeHorizon, setTimeHorizon] = useState("6months");

  const metrics = [
    {
      id: "placement_rate",
      label: "Placement Rate",
      color: "#2563EB",
      unit: "%",
    },
    { id: "avg_score", label: "Average Score", color: "#059669", unit: "%" },
    {
      id: "completion_rate",
      label: "Completion Rate",
      color: "#0EA5E9",
      unit: "%",
    },
    {
      id: "risk_students",
      label: "At-Risk Students",
      color: "#DC2626",
      unit: "",
    },
  ];

  const timeHorizons = [
    { id: "3months", label: "3 Months" },
    { id: "6months", label: "6 Months" },
    { id: "1year", label: "1 Year" },
    { id: "2years", label: "2 Years" },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div
              key={index}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry?.color }}
                />
                <span className="text-sm text-muted-foreground">
                  {entry?.name}:
                </span>
              </div>
              <span className="text-sm font-medium text-popover-foreground">
                {entry?.value}
                {metrics?.find((m) => m?.id === selectedMetric)?.unit}
              </span>
            </div>
          ))}
          {showSensitivity && (
            <div className="mt-2 pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Confidence Range: ±{payload?.[0]?.payload?.confidenceRange || 5}
                %
              </p>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const selectedMetricData = metrics?.find((m) => m?.id === selectedMetric);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Predictive Timeline
          </h3>
          <p className="text-sm text-muted-foreground">
            Forecasted outcomes across different time horizons
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant={showSensitivity ? "default" : "outline"}
            size="sm"
            onClick={() => setShowSensitivity(!showSensitivity)}
            iconName="BarChart3"
            iconPosition="left"
            iconSize={14}
          >
            Sensitivity Analysis
          </Button>

          <Button
            variant="outline"
            size="sm"
            iconName="Settings"
            iconPosition="left"
            iconSize={14}
          >
            Model Settings
          </Button>
        </div>
      </div>
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Metric Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-foreground">Metric:</span>
          <div className="flex items-center space-x-1">
            {metrics?.map((metric) => (
              <Button
                key={metric?.id}
                variant={selectedMetric === metric?.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMetric(metric?.id)}
                className="transition-smooth"
              >
                {metric?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Time Horizon Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-foreground">Horizon:</span>
          <div className="flex items-center space-x-1">
            {timeHorizons?.map((horizon) => (
              <Button
                key={horizon?.id}
                variant={timeHorizon === horizon?.id ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeHorizon(horizon?.id)}
                className="transition-smooth"
              >
                {horizon?.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Chart */}
      <div className="h-80 w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          {showSensitivity ? (
            <AreaChart
              data={timelineData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis
                dataKey="period"
                stroke="#64748B"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                stroke="#64748B"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${value}${selectedMetricData?.unit}`}
              />
              <Tooltip content={<CustomTooltip />} />

              {/* Confidence Band */}
              <Area
                type="monotone"
                dataKey="upperBound"
                stackId="1"
                stroke="none"
                fill={selectedMetricData?.color}
                fillOpacity={0.1}
              />
              <Area
                type="monotone"
                dataKey="lowerBound"
                stackId="1"
                stroke="none"
                fill={selectedMetricData?.color}
                fillOpacity={0.1}
              />

              {/* Main Line */}
              <Line
                type="monotone"
                dataKey={selectedMetric}
                stroke={selectedMetricData?.color}
                strokeWidth={3}
                dot={{ fill: selectedMetricData?.color, strokeWidth: 2, r: 4 }}
                activeDot={{
                  r: 6,
                  stroke: selectedMetricData?.color,
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          ) : (
            <LineChart
              data={timelineData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis
                dataKey="period"
                stroke="#64748B"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                stroke="#64748B"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${value}${selectedMetricData?.unit}`}
              />
              <Tooltip content={<CustomTooltip />} />

              <Line
                type="monotone"
                dataKey={selectedMetric}
                stroke={selectedMetricData?.color}
                strokeWidth={3}
                dot={{ fill: selectedMetricData?.color, strokeWidth: 2, r: 4 }}
                activeDot={{
                  r: 6,
                  stroke: selectedMetricData?.color,
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
      {/* Model Assumptions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">
              Model Accuracy
            </span>
          </div>
          <span className="text-lg font-bold text-success">87.3%</span>
          <p className="text-xs text-muted-foreground">Last 30 predictions</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">
              Last Updated
            </span>
          </div>
          <span className="text-lg font-bold text-primary">2 hours ago</span>
          <p className="text-xs text-muted-foreground">Auto-refresh weekly</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="Database" size={16} className="text-accent" />
            <span className="text-sm font-medium text-foreground">
              Data Points
            </span>
          </div>
          <span className="text-lg font-bold text-accent">12,847</span>
          <p className="text-xs text-muted-foreground">Training dataset</p>
        </div>
      </div>
    </div>
  );
};

export default PredictiveTimeline;
