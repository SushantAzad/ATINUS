import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import Button from "../../../components/ui/Button";

const PerformanceDistributionPanel = ({
  selectedInstitutions,
  activeCategory,
}) => {
  const [viewType, setViewType] = useState("histogram"); // histogram, quartiles, distribution

  const institutionNames = {
    inst_001: "MIT",
    inst_002: "Stanford",
    inst_003: "CMU",
    inst_004: "UC Berkeley",
    inst_005: "Georgia Tech",
    inst_006: "Caltech",
  };

  // Generate histogram data
  const generateHistogramData = () => {
    const ranges = ["0-20", "21-40", "41-60", "61-80", "81-100"];

    return ranges?.map((range) => {
      const dataPoint = { range };

      selectedInstitutions?.forEach((instId) => {
        // Mock distribution data based on institution performance
        const baseDistribution = {
          inst_001: [2, 8, 15, 35, 40], // MIT - high performance
          inst_002: [1, 5, 12, 32, 50], // Stanford - highest performance
          inst_003: [3, 10, 18, 34, 35], // CMU - good performance
          inst_004: [5, 15, 25, 30, 25], // UC Berkeley - average
          inst_005: [4, 12, 20, 32, 32], // Georgia Tech - good
          inst_006: [2, 7, 14, 37, 40], // Caltech - high performance
        };

        const rangeIndex = ranges?.indexOf(range);
        dataPoint[instId] = baseDistribution?.[instId]?.[rangeIndex] || 0;
      });

      return dataPoint;
    });
  };

  // Generate quartile data
  const generateQuartileData = () => {
    return selectedInstitutions?.map((instId) => {
      const baseStats = {
        inst_001: { q1: 72, q2: 85, q3: 92, mean: 84.5, std: 12.3 },
        inst_002: { q1: 75, q2: 88, q3: 94, mean: 87.2, std: 11.8 },
        inst_003: { q1: 68, q2: 82, q3: 89, mean: 81.7, std: 13.1 },
        inst_004: { q1: 62, q2: 76, q3: 85, mean: 76.8, std: 15.2 },
        inst_005: { q1: 65, q2: 79, q3: 87, mean: 79.3, std: 14.0 },
        inst_006: { q1: 71, q2: 84, q3: 91, mean: 83.8, std: 12.7 },
      };

      return {
        institution: institutionNames?.[instId],
        instId,
        ...baseStats?.[instId],
      };
    });
  };

  // Generate performance tier distribution
  const generateTierDistribution = () => {
    const tiers = ["Excellent", "Good", "Average", "Below Average"];
    const colors = ["#059669", "#2563EB", "#D97706", "#DC2626"];

    return selectedInstitutions?.map((instId) => {
      const distributions = {
        inst_001: [45, 35, 15, 5],
        inst_002: [52, 32, 12, 4],
        inst_003: [38, 38, 18, 6],
        inst_004: [28, 35, 25, 12],
        inst_005: [35, 36, 20, 9],
        inst_006: [42, 36, 16, 6],
      };

      return {
        institution: institutionNames?.[instId],
        instId,
        data: tiers?.map((tier, index) => ({
          name: tier,
          value: distributions?.[instId]?.[index],
          color: colors?.[index],
        })),
      };
    });
  };

  const histogramData = generateHistogramData();
  const quartileData = generateQuartileData();
  const tierDistribution = generateTierDistribution();

  const institutionColors = {
    inst_001: "#2563EB",
    inst_002: "#DC2626",
    inst_003: "#059669",
    inst_004: "#D97706",
    inst_005: "#7C3AED",
    inst_006: "#DB2777",
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg shadow-elevation-2 p-3">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div
              key={index}
              className="flex items-center justify-between space-x-3 text-sm"
            >
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry?.color }}
                />
                <span className="text-foreground">
                  {institutionNames?.[entry?.dataKey]}
                </span>
              </div>
              <span className="font-medium text-foreground">
                {entry?.value}%
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Panel Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Performance Distribution
          </h3>
          <p className="text-sm text-muted-foreground">
            Statistical analysis and quartile positioning
          </p>
        </div>

        {/* View Type Selector */}
        <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
          {[
            { id: "histogram", label: "Histogram", icon: "BarChart3" },
            { id: "quartiles", label: "Quartiles", icon: "TrendingUp" },
            { id: "distribution", label: "Tiers", icon: "PieChart" },
          ]?.map((view) => (
            <Button
              key={view?.id}
              variant={viewType === view?.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewType(view?.id)}
              iconName={view?.icon}
              iconPosition="left"
              iconSize={14}
              className="text-xs"
            >
              {view?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Histogram View */}
      {viewType === "histogram" && (
        <div className="space-y-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={histogramData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                />
                <XAxis
                  dataKey="range"
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  label={{
                    value: "Percentage (%)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip content={<CustomTooltip />} />

                {selectedInstitutions?.map((instId, index) => (
                  <Bar
                    key={instId}
                    dataKey={instId}
                    fill={institutionColors?.[instId]}
                    name={institutionNames?.[instId]}
                    radius={[2, 2, 0, 0]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-xs text-muted-foreground">
            Distribution shows percentage of students in each performance range
            (0-100 scale)
          </div>
        </div>
      )}
      {/* Quartiles View */}
      {viewType === "quartiles" && (
        <div className="space-y-4">
          {quartileData?.map((data) => (
            <div key={data?.instId} className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{
                      backgroundColor: institutionColors?.[data?.instId],
                    }}
                  />
                  <span className="font-medium text-foreground">
                    {data?.institution}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Mean: {data?.mean} | Std Dev: {data?.std}
                </div>
              </div>

              {/* Box Plot Visualization */}
              <div className="relative h-8 bg-background rounded border border-border">
                <div className="absolute inset-y-0 flex items-center w-full px-2">
                  {/* Quartile boxes */}
                  <div
                    className="h-4 bg-primary/20 border-l-2 border-r-2 border-primary"
                    style={{
                      left: `${data?.q1}%`,
                      width: `${data?.q3 - data?.q1}%`,
                    }}
                  />
                  {/* Median line */}
                  <div
                    className="absolute w-0.5 h-6 bg-primary"
                    style={{ left: `${data?.q2}%` }}
                  />
                  {/* Mean marker */}
                  <div
                    className="absolute w-2 h-2 bg-warning rounded-full border border-background"
                    style={{
                      left: `${data?.mean}%`,
                      transform: "translateX(-50%)",
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Q1: {data?.q1}</span>
                <span>Q2: {data?.q2}</span>
                <span>Q3: {data?.q3}</span>
              </div>
            </div>
          ))}

          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-primary/20 border border-primary rounded" />
              <span>Interquartile Range</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-0.5 h-3 bg-primary" />
              <span>Median</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-warning rounded-full" />
              <span>Mean</span>
            </div>
          </div>
        </div>
      )}
      {/* Performance Tiers View */}
      {viewType === "distribution" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {tierDistribution?.map((instData) => (
              <div key={instData?.instId} className="space-y-3">
                <h4 className="font-medium text-foreground flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded"
                    style={{
                      backgroundColor: institutionColors?.[instData?.instId],
                    }}
                  />
                  <span>{instData?.institution}</span>
                </h4>

                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={instData?.data}
                        cx="50%"
                        cy="50%"
                        innerRadius={20}
                        outerRadius={50}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {instData?.data?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry?.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Students"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-1">
                  {instData?.data?.map((tier, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: tier?.color }}
                        />
                        <span className="text-foreground">{tier?.name}</span>
                      </div>
                      <span className="font-medium text-foreground">
                        {tier?.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Statistical Summary */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-lg font-semibold text-foreground">
              {selectedInstitutions?.length}
            </div>
            <div className="text-xs text-muted-foreground">Institutions</div>
          </div>
          <div className="space-y-1">
            <div className="text-lg font-semibold text-success">87.3%</div>
            <div className="text-xs text-muted-foreground">Avg Performance</div>
          </div>
          <div className="space-y-1">
            <div className="text-lg font-semibold text-primary">±12.8</div>
            <div className="text-xs text-muted-foreground">Std Deviation</div>
          </div>
          <div className="space-y-1">
            <div className="text-lg font-semibold text-warning">0.92</div>
            <div className="text-xs text-muted-foreground">Correlation</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDistributionPanel;
