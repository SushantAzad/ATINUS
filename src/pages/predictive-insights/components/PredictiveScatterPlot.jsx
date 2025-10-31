import React, { useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

import Button from "../../../components/ui/Button";

const PredictiveScatterPlot = ({ data, onScenarioChange }) => {
  const [selectedScenario, setSelectedScenario] = useState("current");
  const [showConfidenceBands, setShowConfidenceBands] = useState(true);

  const scenarios = [
    { id: "current", label: "Current Performance", color: "#2563EB" },
    { id: "improved", label: "With Interventions", color: "#059669" },
    { id: "optimistic", label: "Best Case", color: "#0EA5E9" },
    { id: "pessimistic", label: "Risk Scenario", color: "#DC2626" },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="font-medium text-popover-foreground">
            {data?.studentName}
          </p>
          <p className="text-sm text-muted-foreground">
            Current Score: {data?.currentScore}%
          </p>
          <p className="text-sm text-muted-foreground">
            Placement Probability: {data?.placementProbability}%
          </p>
          <p className="text-sm text-muted-foreground">
            Risk Level: {data?.riskLevel}
          </p>
          {data?.confidence && (
            <p className="text-sm text-muted-foreground">
              Confidence: {data?.confidence}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const handleScenarioChange = (scenarioId) => {
    setSelectedScenario(scenarioId);
    onScenarioChange(scenarioId);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Predictive Performance Analysis
          </h3>
          <p className="text-sm text-muted-foreground">
            Current performance vs. predicted placement probability
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant={showConfidenceBands ? "default" : "outline"}
            size="sm"
            onClick={() => setShowConfidenceBands(!showConfidenceBands)}
            iconName="Target"
            iconPosition="left"
            iconSize={14}
          >
            Confidence Bands
          </Button>

          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            iconSize={14}
          >
            Export
          </Button>
        </div>
      </div>
      {/* Scenario Selector */}
      <div className="flex items-center space-x-2 mb-6">
        <span className="text-sm font-medium text-foreground">Scenario:</span>
        {scenarios?.map((scenario) => (
          <Button
            key={scenario?.id}
            variant={selectedScenario === scenario?.id ? "default" : "outline"}
            size="sm"
            onClick={() => handleScenarioChange(scenario?.id)}
            className="transition-smooth"
          >
            {scenario?.label}
          </Button>
        ))}
      </div>
      {/* Chart */}
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              type="number"
              dataKey="currentScore"
              name="Current Score"
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              stroke="#64748B"
            />
            <YAxis
              type="number"
              dataKey="placementProbability"
              name="Placement Probability"
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              stroke="#64748B"
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Reference Lines */}
            <ReferenceLine x={70} stroke="#059669" strokeDasharray="5 5" />
            <ReferenceLine y={70} stroke="#059669" strokeDasharray="5 5" />

            <Scatter
              name="Students"
              data={data}
              fill={
                scenarios?.find((s) => s?.id === selectedScenario)?.color ||
                "#2563EB"
              }
              fillOpacity={0.7}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded-full" />
          <span className="text-sm text-muted-foreground">
            Target Zone (70%+ both metrics)
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-warning rounded-full" />
          <span className="text-sm text-muted-foreground">At Risk</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-error rounded-full" />
          <span className="text-sm text-muted-foreground">High Risk</span>
        </div>
      </div>
    </div>
  );
};

export default PredictiveScatterPlot;
