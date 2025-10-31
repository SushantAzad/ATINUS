import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const TopPerformingInstitutions = ({ institutions, onViewDetails }) => {
  const [sortBy, setSortBy] = useState("placement_readiness");
  const [sortOrder, setSortOrder] = useState("desc");

  const sortOptions = [
    { key: "placement_readiness", label: "Placement Readiness" },
    { key: "completion_rate", label: "Completion Rate" },
    { key: "avg_score", label: "Average Score" },
    { key: "total_students", label: "Student Count" },
    { key: "growth_rate", label: "Growth Rate" },
  ];

  const sortedInstitutions = [...institutions]?.sort((a, b) => {
    const aVal = a?.[sortBy];
    const bVal = b?.[sortBy];
    return sortOrder === "desc" ? bVal - aVal : aVal - bVal;
  });

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortBy(key);
      setSortOrder("desc");
    }
  };

  const getRankBadge = (index) => {
    const badges = {
      0: { icon: "Trophy", color: "text-yellow-600 bg-yellow-50" },
      1: { icon: "Medal", color: "text-gray-600 bg-gray-50" },
      2: { icon: "Award", color: "text-orange-600 bg-orange-50" },
    };

    return (
      badges?.[index] || {
        icon: "Hash",
        color: "text-muted-foreground bg-muted",
      }
    );
  };

  const getPerformanceIndicator = (value, type) => {
    let threshold;
    switch (type) {
      case "placement_readiness":
      case "completion_rate":
        threshold = { excellent: 85, good: 70, average: 50 };
        break;
      case "avg_score":
        threshold = { excellent: 80, good: 65, average: 50 };
        break;
      default:
        return "bg-muted";
    }

    if (value >= threshold?.excellent) return "bg-success";
    if (value >= threshold?.good) return "bg-warning";
    if (value >= threshold?.average) return "bg-accent";
    return "bg-error";
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Top Performing Institutions
          </h3>
          <p className="text-sm text-muted-foreground">
            Ranked by key performance metrics and growth indicators
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={sortBy}
            onChange={(e) => handleSort(e?.target?.value)}
            className="px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {sortOptions?.map((option) => (
              <option key={option?.key} value={option?.key}>
                Sort by {option?.label}
              </option>
            ))}
          </select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
            iconName={sortOrder === "desc" ? "ArrowDown" : "ArrowUp"}
            iconSize={14}
          >
            {sortOrder === "desc" ? "Desc" : "Asc"}
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                Rank
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                Institution
              </th>
              <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">
                Students
              </th>
              <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">
                Placement Ready
              </th>
              <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">
                Completion
              </th>
              <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">
                Avg Score
              </th>
              <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">
                Growth
              </th>
              <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedInstitutions?.slice(0, 10)?.map((institution, index) => {
              const rankBadge = getRankBadge(index);

              return (
                <tr
                  key={institution?.id}
                  className="border-b border-border hover:bg-muted/50 transition-smooth"
                >
                  <td className="py-4 px-2">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${rankBadge?.color}`}
                      >
                        <Icon name={rankBadge?.icon} size={16} />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        #{index + 1}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {institution?.name?.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {institution?.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {institution?.location}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <div className="space-y-1">
                      <span className="text-sm font-medium text-foreground">
                        {institution?.total_students?.toLocaleString()}
                      </span>
                      <div className="flex items-center justify-center space-x-1">
                        <div className="w-2 h-2 bg-success rounded-full" />
                        <span className="text-xs text-muted-foreground">
                          {institution?.active_students?.toLocaleString()}{" "}
                          active
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-foreground">
                        {Math.round(institution?.placement_readiness)}%
                      </span>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getPerformanceIndicator(
                            institution?.placement_readiness,
                            "placement_readiness"
                          )}`}
                          style={{
                            width: `${Math.min(
                              institution?.placement_readiness,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-foreground">
                        {Math.round(institution?.completion_rate)}%
                      </span>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getPerformanceIndicator(
                            institution?.completion_rate,
                            "completion_rate"
                          )}`}
                          style={{
                            width: `${Math.min(
                              institution?.completion_rate,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <div className="space-y-1">
                      <span className="text-sm font-medium text-foreground">
                        {Math.round(institution?.avg_score)}/100
                      </span>
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                          institution?.avg_score >= 80
                            ? "bg-success/10 text-success"
                            : institution?.avg_score >= 65
                            ? "bg-warning/10 text-warning"
                            : "bg-error/10 text-error"
                        }`}
                      >
                        {institution?.avg_score >= 80
                          ? "Excellent"
                          : institution?.avg_score >= 65
                          ? "Good"
                          : "Needs Improvement"}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Icon
                        name={
                          institution?.growth_rate >= 0
                            ? "TrendingUp"
                            : "TrendingDown"
                        }
                        size={14}
                        className={
                          institution?.growth_rate >= 0
                            ? "text-success"
                            : "text-error"
                        }
                      />
                      <span
                        className={`text-sm font-medium ${
                          institution?.growth_rate >= 0
                            ? "text-success"
                            : "text-error"
                        }`}
                      >
                        {institution?.growth_rate >= 0 ? "+" : ""}
                        {institution?.growth_rate}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetails(institution)}
                      iconName="ExternalLink"
                      iconPosition="right"
                      iconSize={14}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing top 10 of {institutions?.length} institutions
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={14}
          >
            View All Institutions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopPerformingInstitutions;
