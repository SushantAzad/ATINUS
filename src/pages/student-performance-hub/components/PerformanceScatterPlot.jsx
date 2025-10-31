import React, { useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const PerformanceScatterPlot = ({ data, onStudentClick }) => {
  const [selectedMetric, setSelectedMetric] = useState("aptitude");
  const [hoveredStudent, setHoveredStudent] = useState(null);

  const metricOptions = [
    { value: "aptitude", label: "Aptitude vs Coding", icon: "Brain" },
    { value: "coding", label: "Coding vs AI Interview", icon: "Code" },
    { value: "overall", label: "Overall Performance", icon: "Target" },
  ];

  const getScatterData = () => {
    return data?.map((student) => {
      let x, y, z;
      switch (selectedMetric) {
        case "aptitude":
          x = student?.aptitudeScore;
          y = student?.codingScore;
          z = student?.aiInterviewScore;
          break;
        case "coding":
          x = student?.codingScore;
          y = student?.aiInterviewScore;
          z = student?.aptitudeScore;
          break;
        default:
          x = student?.overallScore;
          y = student?.placementReadiness;
          z = student?.completionRate;
      }

      return {
        ...student,
        x,
        y,
        z,
        fill:
          student?.riskLevel === "high"
            ? "#DC2626"
            : student?.riskLevel === "medium"
            ? "#D97706"
            : student?.riskLevel === "low"
            ? "#059669"
            : "#2563EB",
      };
    });
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const student = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-4 shadow-elevation-2">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
              <Icon name="User" size={16} className="text-muted-foreground" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">{student?.name}</h4>
              <p className="text-xs text-muted-foreground">
                {student?.batch} • {student?.college}
              </p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Aptitude:</span>
              <span className="font-medium">{student?.aptitudeScore}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Coding:</span>
              <span className="font-medium">{student?.codingScore}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">AI Interview:</span>
              <span className="font-medium">{student?.aiInterviewScore}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Risk Level:</span>
              <span
                className={`font-medium capitalize ${
                  student?.riskLevel === "high"
                    ? "text-error"
                    : student?.riskLevel === "medium"
                    ? "text-warning"
                    : "text-success"
                }`}
              >
                {student?.riskLevel}
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-3"
            onClick={() => onStudentClick(student)}
          >
            View Profile
          </Button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Performance Correlation
          </h3>
          <p className="text-sm text-muted-foreground">
            Multi-dimensional student performance analysis
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {metricOptions?.map((option) => (
            <Button
              key={option?.value}
              variant={selectedMetric === option?.value ? "default" : "outline"}
              size="sm"
              iconName={option?.icon}
              iconPosition="left"
              iconSize={14}
              onClick={() => setSelectedMetric(option?.value)}
            >
              {option?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart data={getScatterData()}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              type="number"
              dataKey="x"
              name={
                selectedMetric === "aptitude"
                  ? "Aptitude Score"
                  : selectedMetric === "coding"
                  ? "Coding Score"
                  : "Overall Score"
              }
              domain={[0, 100]}
              stroke="var(--color-muted-foreground)"
            />
            <YAxis
              type="number"
              dataKey="y"
              name={
                selectedMetric === "aptitude"
                  ? "Coding Score"
                  : selectedMetric === "coding"
                  ? "AI Interview Score"
                  : "Placement Readiness"
              }
              domain={[0, 100]}
              stroke="var(--color-muted-foreground)"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Scatter
              name="Students"
              dataKey="y"
              fill="var(--color-primary)"
              onClick={(data) => onStudentClick(data)}
              style={{ cursor: "pointer" }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full" />
            <span className="text-muted-foreground">Low Risk</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full" />
            <span className="text-muted-foreground">Medium Risk</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full" />
            <span className="text-muted-foreground">High Risk</span>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Click on any point to view student details
        </div>
      </div>
    </div>
  );
};

export default PerformanceScatterPlot;
