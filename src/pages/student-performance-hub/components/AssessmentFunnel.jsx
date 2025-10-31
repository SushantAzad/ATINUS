import React, { useState } from "react";
import {
  FunnelChart,
  Funnel,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LabelList,
} from "recharts";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const AssessmentFunnel = ({ funnelData, onStageClick }) => {
  const [selectedStage, setSelectedStage] = useState(null);

  const colors = ["#2563EB", "#0EA5E9", "#059669", "#D97706"];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-4 shadow-elevation-2">
          <h4 className="font-medium text-foreground mb-2">{data?.name}</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Students:</span>
              <span className="font-medium">{data?.value}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Completion Rate:</span>
              <span className="font-medium">{data?.completionRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Drop Rate:</span>
              <span className="font-medium text-error">{data?.dropRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Avg Score:</span>
              <span className="font-medium">{data?.avgScore}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const getStageIcon = (stage) => {
    switch (stage?.toLowerCase()) {
      case "registration":
        return "UserPlus";
      case "aptitude test":
        return "Brain";
      case "coding assessment":
        return "Code";
      case "ai interview":
        return "MessageSquare";
      case "placement ready":
        return "Target";
      default:
        return "CheckCircle";
    }
  };

  const getStageStatus = (dropRate) => {
    if (dropRate > 30)
      return { status: "critical", color: "text-error", bg: "bg-error/10" };
    if (dropRate > 15)
      return { status: "warning", color: "text-warning", bg: "bg-warning/10" };
    return { status: "good", color: "text-success", bg: "bg-success/10" };
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Assessment Journey Funnel
          </h3>
          <p className="text-sm text-muted-foreground">
            Student progression and dropout analysis across assessment rounds
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Filter"
            iconPosition="left"
            iconSize={14}
          >
            Filters
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Funnel Chart */}
        <div className="lg:col-span-2">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip content={<CustomTooltip />} />
                <Funnel
                  dataKey="value"
                  data={funnelData}
                  isAnimationActive
                  onClick={(data) => {
                    setSelectedStage(data);
                    onStageClick(data);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <LabelList position="center" fill="#fff" stroke="none" />
                  {funnelData?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors?.[index % colors?.length]}
                    />
                  ))}
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stage Details */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Stage Breakdown</h4>
          {funnelData?.map((stage, index) => {
            const stageStatus = getStageStatus(stage?.dropRate);
            return (
              <div
                key={stage?.name}
                className={`p-4 rounded-lg border transition-smooth cursor-pointer ${
                  selectedStage?.name === stage?.name
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => {
                  setSelectedStage(stage);
                  onStageClick(stage);
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${stageStatus?.bg}`}>
                      <Icon
                        name={getStageIcon(stage?.name)}
                        size={16}
                        className={stageStatus?.color}
                      />
                    </div>
                    <div>
                      <h5 className="font-medium text-foreground text-sm">
                        {stage?.name}
                      </h5>
                      <p className="text-xs text-muted-foreground">
                        Stage {index + 1}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-foreground">
                      {stage?.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      students
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Completion:</span>
                    <span className="font-medium text-success">
                      {stage?.completionRate}%
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Drop Rate:</span>
                    <span className={`font-medium ${stageStatus?.color}`}>
                      {stage?.dropRate}%
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Avg Score:</span>
                    <span className="font-medium">{stage?.avgScore}%</span>
                  </div>
                </div>
                {stage?.bottlenecks && stage?.bottlenecks?.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon
                        name="AlertCircle"
                        size={12}
                        className="text-warning"
                      />
                      <span className="text-xs font-medium text-warning">
                        Bottlenecks Identified
                      </span>
                    </div>
                    <div className="space-y-1">
                      {stage?.bottlenecks?.map((bottleneck, idx) => (
                        <div
                          key={idx}
                          className="text-xs text-muted-foreground"
                        >
                          • {bottleneck}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {funnelData?.[0]?.value || 0}
            </div>
            <div className="text-sm text-muted-foreground">
              Total Registered
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {funnelData?.[funnelData?.length - 1]?.value || 0}
            </div>
            <div className="text-sm text-muted-foreground">Placement Ready</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {funnelData?.reduce((acc, stage) => acc + stage?.value, 0) /
                funnelData?.length || 0}
            </div>
            <div className="text-sm text-muted-foreground">Avg per Stage</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">
              {Math.round(
                funnelData?.reduce((acc, stage) => acc + stage?.dropRate, 0) /
                  funnelData?.length
              ) || 0}
              %
            </div>
            <div className="text-sm text-muted-foreground">Avg Drop Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentFunnel;
