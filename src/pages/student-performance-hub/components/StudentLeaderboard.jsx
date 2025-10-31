import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const StudentLeaderboard = ({ students, onStudentSelect }) => {
  const [sortBy, setSortBy] = useState("overall");
  const [filterRisk, setFilterRisk] = useState("all");

  const sortOptions = [
    { value: "overall", label: "Overall Score", icon: "Target" },
    { value: "aptitude", label: "Aptitude", icon: "Brain" },
    { value: "coding", label: "Coding", icon: "Code" },
    { value: "interview", label: "AI Interview", icon: "MessageSquare" },
  ];

  const riskFilters = [
    { value: "all", label: "All Students", count: students?.length },
    {
      value: "low",
      label: "Low Risk",
      count: students?.filter((s) => s?.riskLevel === "low")?.length,
    },
    {
      value: "medium",
      label: "Medium Risk",
      count: students?.filter((s) => s?.riskLevel === "medium")?.length,
    },
    {
      value: "high",
      label: "High Risk",
      count: students?.filter((s) => s?.riskLevel === "high")?.length,
    },
  ];

  const getSortedStudents = () => {
    let filtered =
      filterRisk === "all"
        ? students
        : students?.filter((s) => s?.riskLevel === filterRisk);

    return filtered?.sort((a, b) => {
      switch (sortBy) {
        case "aptitude":
          return b?.aptitudeScore - a?.aptitudeScore;
        case "coding":
          return b?.codingScore - a?.codingScore;
        case "interview":
          return b?.aiInterviewScore - a?.aiInterviewScore;
        default:
          return b?.overallScore - a?.overallScore;
      }
    });
  };

  const getRankIcon = (index) => {
    if (index === 0) return { icon: "Crown", color: "text-warning" };
    if (index === 1) return { icon: "Medal", color: "text-muted-foreground" };
    if (index === 2) return { icon: "Award", color: "text-accent" };
    return { icon: "User", color: "text-muted-foreground" };
  };

  const getRiskBadgeColor = (risk) => {
    switch (risk) {
      case "low":
        return "bg-success/10 text-success border-success/20";
      case "medium":
        return "bg-warning/10 text-warning border-warning/20";
      case "high":
        return "bg-error/10 text-error border-error/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getProgressColor = (score) => {
    if (score >= 80) return "bg-success";
    if (score >= 60) return "bg-accent";
    if (score >= 40) return "bg-warning";
    return "bg-error";
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Student Leaderboard
            </h3>
            <p className="text-sm text-muted-foreground">
              Ranked performance with intervention flags
            </p>
          </div>
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

        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">
              Sort By
            </label>
            <div className="flex flex-wrap gap-2">
              {sortOptions?.map((option) => (
                <Button
                  key={option?.value}
                  variant={sortBy === option?.value ? "default" : "outline"}
                  size="sm"
                  iconName={option?.icon}
                  iconPosition="left"
                  iconSize={12}
                  onClick={() => setSortBy(option?.value)}
                >
                  {option?.label}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">
              Filter by Risk
            </label>
            <div className="flex flex-wrap gap-2">
              {riskFilters?.map((filter) => (
                <Button
                  key={filter?.value}
                  variant={filterRisk === filter?.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterRisk(filter?.value)}
                >
                  {filter?.label} ({filter?.count})
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {getSortedStudents()?.map((student, index) => {
          const rankIcon = getRankIcon(index);
          const currentScore =
            sortBy === "aptitude"
              ? student?.aptitudeScore
              : sortBy === "coding"
              ? student?.codingScore
              : sortBy === "interview"
              ? student?.aiInterviewScore
              : student?.overallScore;

          return (
            <div
              key={student?.id}
              className="p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-smooth cursor-pointer"
              onClick={() => onStudentSelect(student)}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index < 3 ? "bg-primary/10" : "bg-muted"
                    }`}
                  >
                    <Icon
                      name={rankIcon?.icon}
                      size={14}
                      className={rankIcon?.color}
                    />
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">
                    #{index + 1}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-foreground truncate">
                        {student?.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {student?.batch} • {student?.college}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-foreground">
                        {currentScore}%
                      </div>
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRiskBadgeColor(
                          student?.riskLevel
                        )}`}
                      >
                        {student?.riskLevel} risk
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-muted-foreground">
                        {student?.completionRate}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(
                          student?.completionRate
                        )}`}
                        style={{ width: `${student?.completionRate}%` }}
                      />
                    </div>
                  </div>

                  {student?.needsIntervention && (
                    <div className="flex items-center space-x-2 mt-2 p-2 bg-warning/10 rounded-md">
                      <Icon
                        name="AlertTriangle"
                        size={12}
                        className="text-warning"
                      />
                      <span className="text-xs text-warning font-medium">
                        Intervention Required
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    iconName="MessageSquare"
                    iconSize={14}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <span className="sr-only">Message student</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    iconName="ChevronRight"
                    iconSize={14}
                    className="text-muted-foreground"
                  >
                    <span className="sr-only">View details</span>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentLeaderboard;
