import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const InstitutionalHeatMap = ({ data, onInstitutionClick }) => {
  const [selectedMetric, setSelectedMetric] = useState("placement_readiness");
  const [hoveredCell, setHoveredCell] = useState(null);

  const metrics = [
    { key: "placement_readiness", label: "Placement Readiness", unit: "%" },
    { key: "completion_rate", label: "Completion Rate", unit: "%" },
    { key: "avg_score", label: "Average Score", unit: "/100" },
    { key: "engagement", label: "Engagement", unit: "%" },
  ];

  const getHeatMapColor = (value, metric) => {
    const normalizedValue = Math.min(Math.max(value, 0), 100);

    if (normalizedValue >= 80) return "bg-success/80 text-success-foreground";
    if (normalizedValue >= 60) return "bg-warning/60 text-warning-foreground";
    if (normalizedValue >= 40) return "bg-accent/40 text-accent-foreground";
    return "bg-error/30 text-error-foreground";
  };

  const formatValue = (value, metric) => {
    const metricInfo = metrics?.find((m) => m?.key === metric);
    if (metricInfo?.unit === "%") return `${Math.round(value)}%`;
    if (metricInfo?.unit === "/100") return `${Math.round(value)}/100`;
    return Math.round(value);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Institutional Performance Matrix
          </h3>
          <p className="text-sm text-muted-foreground">
            Cross-institutional analytics with placement correlation
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e?.target?.value)}
            className="px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {metrics?.map((metric) => (
              <option key={metric?.key} value={metric?.key}>
                {metric?.label}
              </option>
            ))}
          </select>
          <button className="p-2 hover:bg-muted rounded-md transition-smooth">
            <Icon name="Download" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {data?.map((institution, index) => (
          <div
            key={institution?.id}
            className="grid grid-cols-12 gap-3 items-center p-3 rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer"
            onClick={() => onInstitutionClick(institution)}
          >
            <div className="col-span-3 flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {institution?.name?.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">
                  {institution?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {institution?.location}
                </p>
              </div>
            </div>

            <div className="col-span-2 text-center">
              <span className="text-sm font-medium text-foreground">
                {institution?.total_students?.toLocaleString()}
              </span>
              <p className="text-xs text-muted-foreground">Students</p>
            </div>

            <div className="col-span-5">
              <div className="grid grid-cols-4 gap-2">
                {metrics?.map((metric) => (
                  <div
                    key={metric?.key}
                    className={`relative p-2 rounded text-center text-xs font-medium transition-smooth ${getHeatMapColor(
                      institution?.[metric?.key],
                      metric?.key
                    )} ${
                      selectedMetric === metric?.key
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                    onMouseEnter={() =>
                      setHoveredCell(`${institution?.id}-${metric?.key}`)
                    }
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    {formatValue(institution?.[metric?.key], metric?.key)}

                    {hoveredCell === `${institution?.id}-${metric?.key}` && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-popover border border-border rounded shadow-elevation-2 text-xs whitespace-nowrap z-10">
                        {metric?.label}:{" "}
                        {formatValue(institution?.[metric?.key], metric?.key)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-2 flex items-center justify-end space-x-2">
              <div className="flex items-center space-x-1">
                <Icon
                  name={
                    institution?.trend === "up" ? "TrendingUp" : "TrendingDown"
                  }
                  size={14}
                  className={
                    institution?.trend === "up" ? "text-success" : "text-error"
                  }
                />
                <span
                  className={`text-xs font-medium ${
                    institution?.trend === "up" ? "text-success" : "text-error"
                  }`}
                >
                  {institution?.trend_value}%
                </span>
              </div>
              <Icon
                name="ChevronRight"
                size={16}
                className="text-muted-foreground"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success/80 rounded"></div>
              <span>Excellent (80-100%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning/60 rounded"></div>
              <span>Good (60-79%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent/40 rounded"></div>
              <span>Average (40-59%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error/30 rounded"></div>
              <span>Needs Improvement (&lt;40%)</span>
            </div>
          </div>
          <span>Click any institution for detailed analytics</span>
        </div>
      </div>
    </div>
  );
};

export default InstitutionalHeatMap;
