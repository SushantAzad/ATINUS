import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ComparisonMatrixTable = ({ selectedInstitutions, activeCategory }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [expandedRow, setExpandedRow] = useState(null);

  const institutionNames = {
    inst_001: "MIT College of Engineering",
    inst_002: "Stanford University",
    inst_003: "Carnegie Mellon University",
    inst_004: "UC Berkeley",
    inst_005: "Georgia Tech",
    inst_006: "Caltech",
  };

  const getMetricsForCategory = (category) => {
    const metrics = {
      performance: [
        {
          key: "placement_rate",
          label: "Placement Rate",
          unit: "%",
          format: "percentage",
        },
        { key: "avg_score", label: "Avg Score", unit: "pts", format: "number" },
        {
          key: "completion_rate",
          label: "Completion Rate",
          unit: "%",
          format: "percentage",
        },
        {
          key: "success_rate",
          label: "Success Rate",
          unit: "%",
          format: "percentage",
        },
        {
          key: "improvement",
          label: "YoY Growth",
          unit: "%",
          format: "percentage",
        },
      ],
      engagement: [
        {
          key: "active_users",
          label: "Active Users",
          unit: "",
          format: "number",
        },
        {
          key: "session_duration",
          label: "Session Time",
          unit: "min",
          format: "number",
        },
        {
          key: "login_frequency",
          label: "Login Freq",
          unit: "/week",
          format: "number",
        },
        {
          key: "engagement_score",
          label: "Engagement",
          unit: "/10",
          format: "decimal",
        },
        {
          key: "retention_rate",
          label: "Retention",
          unit: "%",
          format: "percentage",
        },
      ],
      faculty: [
        {
          key: "response_time",
          label: "Response Time",
          unit: "hrs",
          format: "decimal",
        },
        {
          key: "intervention_rate",
          label: "Intervention",
          unit: "%",
          format: "percentage",
        },
        {
          key: "faculty_rating",
          label: "Rating",
          unit: "/5",
          format: "decimal",
        },
        {
          key: "activity_score",
          label: "Activity",
          unit: "pts",
          format: "number",
        },
        {
          key: "effectiveness",
          label: "Effectiveness",
          unit: "%",
          format: "percentage",
        },
      ],
      outcomes: [
        { key: "job_offers", label: "Job Offers", unit: "", format: "number" },
        {
          key: "avg_salary",
          label: "Avg Salary",
          unit: "K",
          format: "currency",
        },
        {
          key: "top_tier_rate",
          label: "Top Tier %",
          unit: "%",
          format: "percentage",
        },
        {
          key: "time_to_placement",
          label: "Time to Place",
          unit: "days",
          format: "number",
        },
        { key: "roi", label: "ROI", unit: "%", format: "percentage" },
      ],
    };
    return metrics?.[category] || metrics?.performance;
  };

  const generateInstitutionData = () => {
    const baseData = {
      inst_001: {
        placement_rate: 94.7,
        avg_score: 87.3,
        completion_rate: 92.1,
        success_rate: 89.4,
        improvement: 12.3,
        active_users: 2847,
        session_duration: 47,
        login_frequency: 14,
        engagement_score: 8.7,
        retention_rate: 91.2,
        response_time: 2.3,
        intervention_rate: 94.5,
        faculty_rating: 4.6,
        activity_score: 92,
        effectiveness: 88.7,
        job_offers: 187,
        avg_salary: 78,
        top_tier_rate: 67,
        time_to_placement: 45,
        roi: 340,
      },
      inst_002: {
        placement_rate: 96.2,
        avg_score: 89.1,
        completion_rate: 94.3,
        success_rate: 91.8,
        improvement: 15.7,
        active_users: 3156,
        session_duration: 52,
        login_frequency: 16,
        engagement_score: 9.1,
        retention_rate: 93.8,
        response_time: 1.8,
        intervention_rate: 96.2,
        faculty_rating: 4.8,
        activity_score: 95,
        effectiveness: 92.3,
        job_offers: 203,
        avg_salary: 85,
        top_tier_rate: 74,
        time_to_placement: 38,
        roi: 385,
      },
      inst_003: {
        placement_rate: 91.3,
        avg_score: 84.7,
        completion_rate: 89.6,
        success_rate: 86.2,
        improvement: 8.9,
        active_users: 2891,
        session_duration: 44,
        login_frequency: 13,
        engagement_score: 8.3,
        retention_rate: 88.7,
        response_time: 2.7,
        intervention_rate: 91.8,
        faculty_rating: 4.4,
        activity_score: 89,
        effectiveness: 85.4,
        job_offers: 165,
        avg_salary: 72,
        top_tier_rate: 58,
        time_to_placement: 52,
        roi: 295,
      },
      inst_004: {
        placement_rate: 87.9,
        avg_score: 79.2,
        completion_rate: 84.1,
        success_rate: 81.6,
        improvement: 5.2,
        active_users: 4523,
        session_duration: 39,
        login_frequency: 11,
        engagement_score: 7.6,
        retention_rate: 82.3,
        response_time: 3.4,
        intervention_rate: 87.3,
        faculty_rating: 4.1,
        activity_score: 82,
        effectiveness: 79.8,
        job_offers: 198,
        avg_salary: 68,
        top_tier_rate: 45,
        time_to_placement: 67,
        roi: 245,
      },
      inst_005: {
        placement_rate: 89.8,
        avg_score: 82.1,
        completion_rate: 87.3,
        success_rate: 84.7,
        improvement: 9.8,
        active_users: 3687,
        session_duration: 42,
        login_frequency: 12,
        engagement_score: 8.0,
        retention_rate: 85.9,
        response_time: 2.9,
        intervention_rate: 89.7,
        faculty_rating: 4.3,
        activity_score: 86,
        effectiveness: 83.2,
        job_offers: 176,
        avg_salary: 71,
        top_tier_rate: 52,
        time_to_placement: 58,
        roi: 275,
      },
      inst_006: {
        placement_rate: 93.1,
        avg_score: 86.4,
        completion_rate: 90.8,
        success_rate: 88.2,
        improvement: 11.4,
        active_users: 1234,
        session_duration: 49,
        login_frequency: 15,
        engagement_score: 8.5,
        retention_rate: 90.1,
        response_time: 2.1,
        intervention_rate: 93.4,
        faculty_rating: 4.5,
        activity_score: 90,
        effectiveness: 87.1,
        job_offers: 89,
        avg_salary: 76,
        top_tier_rate: 63,
        time_to_placement: 47,
        roi: 325,
      },
    };

    return selectedInstitutions?.map((instId) => ({
      id: instId,
      name: institutionNames?.[instId],
      ...baseData?.[instId],
    }));
  };

  const formatValue = (value, format) => {
    switch (format) {
      case "percentage":
        return `${value}%`;
      case "decimal":
        return value?.toFixed(1);
      case "currency":
        return `$${value}K`;
      case "number":
        return value?.toLocaleString();
      default:
        return value;
    }
  };

  const getPerformanceTier = (value, metric) => {
    const thresholds = {
      placement_rate: { excellent: 90, good: 80, average: 70 },
      avg_score: { excellent: 85, good: 75, average: 65 },
      completion_rate: { excellent: 90, good: 80, average: 70 },
      success_rate: { excellent: 85, good: 75, average: 65 },
      improvement: { excellent: 10, good: 5, average: 0 },
      active_users: { excellent: 3000, good: 2000, average: 1000 },
      session_duration: { excellent: 45, good: 35, average: 25 },
      login_frequency: { excellent: 12, good: 8, average: 5 },
      engagement_score: { excellent: 8, good: 6, average: 4 },
      retention_rate: { excellent: 90, good: 80, average: 70 },
      response_time: { excellent: 2, good: 4, average: 6 }, // Lower is better
      intervention_rate: { excellent: 90, good: 80, average: 70 },
      faculty_rating: { excellent: 4.5, good: 4.0, average: 3.5 },
      activity_score: { excellent: 90, good: 80, average: 70 },
      effectiveness: { excellent: 85, good: 75, average: 65 },
      job_offers: { excellent: 150, good: 100, average: 50 },
      avg_salary: { excellent: 75, good: 65, average: 55 },
      top_tier_rate: { excellent: 60, good: 40, average: 20 },
      time_to_placement: { excellent: 45, good: 60, average: 90 }, // Lower is better
      roi: { excellent: 300, good: 200, average: 100 },
    };

    const threshold = thresholds?.[metric?.key];
    if (!threshold) return "average";

    const isLowerBetter = ["response_time", "time_to_placement"]?.includes(
      metric?.key
    );

    if (isLowerBetter) {
      if (value <= threshold?.excellent) return "excellent";
      if (value <= threshold?.good) return "good";
      if (value <= threshold?.average) return "average";
      return "below";
    } else {
      if (value >= threshold?.excellent) return "excellent";
      if (value >= threshold?.good) return "good";
      if (value >= threshold?.average) return "average";
      return "below";
    }
  };

  const getTierColor = (tier) => {
    const colors = {
      excellent: "text-success bg-success/10",
      good: "text-primary bg-primary/10",
      average: "text-warning bg-warning/10",
      below: "text-error bg-error/10",
    };
    return colors?.[tier] || colors?.average;
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig?.key === key && sortConfig?.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const institutionData = generateInstitutionData();
  const metrics = getMetricsForCategory(activeCategory);

  const sortedData = [...institutionData]?.sort((a, b) => {
    if (!sortConfig?.key) return 0;

    const aValue = a?.[sortConfig?.key];
    const bValue = b?.[sortConfig?.key];

    if (sortConfig?.direction === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Comprehensive Comparison Matrix
            </h3>
            <p className="text-sm text-muted-foreground">
              Detailed institutional performance metrics with tier
              classification
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              iconSize={14}
            >
              Export CSV
            </Button>

            <Button
              variant="outline"
              size="sm"
              iconName="Filter"
              iconPosition="left"
              iconSize={14}
            >
              Filters
            </Button>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="sticky left-0 bg-muted/50 px-6 py-4 text-left">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort("name")}
                  iconName={
                    sortConfig?.key === "name"
                      ? sortConfig?.direction === "asc"
                        ? "ChevronUp"
                        : "ChevronDown"
                      : "ChevronsUpDown"
                  }
                  iconPosition="right"
                  iconSize={14}
                  className="font-medium text-foreground"
                >
                  Institution
                </Button>
              </th>

              {metrics?.map((metric) => (
                <th
                  key={metric?.key}
                  className="px-4 py-4 text-center min-w-32"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort(metric?.key)}
                    iconName={
                      sortConfig?.key === metric?.key
                        ? sortConfig?.direction === "asc"
                          ? "ChevronUp"
                          : "ChevronDown"
                        : "ChevronsUpDown"
                    }
                    iconPosition="right"
                    iconSize={14}
                    className="font-medium text-foreground text-xs"
                  >
                    <div className="text-center">
                      <div>{metric?.label}</div>
                      <div className="text-xs text-muted-foreground font-normal">
                        {metric?.unit}
                      </div>
                    </div>
                  </Button>
                </th>
              ))}

              <th className="px-4 py-4 text-center">
                <span className="text-sm font-medium text-foreground">
                  Actions
                </span>
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedData?.map((institution, index) => (
              <React.Fragment key={institution?.id}>
                <tr
                  className={`border-b border-border hover:bg-muted/30 transition-smooth ${
                    index % 2 === 0 ? "bg-background" : "bg-muted/20"
                  }`}
                >
                  <td className="sticky left-0 bg-inherit px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon
                          name="Building2"
                          size={16}
                          className="text-primary"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">
                          {institution?.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Rank #{index + 1}
                        </div>
                      </div>
                    </div>
                  </td>

                  {metrics?.map((metric) => {
                    const value = institution?.[metric?.key];
                    const tier = getPerformanceTier(value, metric);

                    return (
                      <td key={metric?.key} className="px-4 py-4 text-center">
                        <div className="space-y-1">
                          <div className="font-medium text-foreground">
                            {formatValue(value, metric?.format)}
                          </div>
                          <div
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTierColor(
                              tier
                            )}`}
                          >
                            {tier?.charAt(0)?.toUpperCase() + tier?.slice(1)}
                          </div>
                        </div>
                      </td>
                    );
                  })}

                  <td className="px-4 py-4 text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setExpandedRow(
                          expandedRow === institution?.id
                            ? null
                            : institution?.id
                        )
                      }
                      iconName={
                        expandedRow === institution?.id
                          ? "ChevronUp"
                          : "ChevronDown"
                      }
                      iconSize={14}
                      title="View detailed profile"
                    >
                      <span className="sr-only">Expand details</span>
                    </Button>
                  </td>
                </tr>

                {/* Expanded Row Details */}
                {expandedRow === institution?.id && (
                  <tr className="bg-muted/50">
                    <td colSpan={metrics?.length + 2} className="px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-foreground flex items-center space-x-2">
                            <Icon
                              name="TrendingUp"
                              size={16}
                              className="text-primary"
                            />
                            <span>Performance Trends</span>
                          </h4>
                          <div className="text-sm text-muted-foreground">
                            • 6-month growth: +
                            {(Math.random() * 10 + 5)?.toFixed(1)}%\n • Best
                            performing metric: Placement Rate\n • Improvement
                            area: Response Time
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-foreground flex items-center space-x-2">
                            <Icon
                              name="Users"
                              size={16}
                              className="text-primary"
                            />
                            <span>Student Demographics</span>
                          </h4>
                          <div className="text-sm text-muted-foreground">
                            • Total students:{" "}
                            {institution?.active_users?.toLocaleString()}\n •
                            Active learners:{" "}
                            {Math.round(
                              institution?.active_users * 0.85
                            )?.toLocaleString()}
                            \n • Completion rate: {institution?.completion_rate}
                            %
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-foreground flex items-center space-x-2">
                            <Icon
                              name="Target"
                              size={16}
                              className="text-primary"
                            />
                            <span>Key Achievements</span>
                          </h4>
                          <div className="text-sm text-muted-foreground">
                            • Industry partnerships:{" "}
                            {Math.floor(Math.random() * 50 + 20)}\n •
                            Certification programs:{" "}
                            {Math.floor(Math.random() * 15 + 5)}\n • Success
                            stories: {Math.floor(Math.random() * 100 + 50)}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {/* Table Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground">
              Showing {sortedData?.length} of {sortedData?.length} institutions
            </span>

            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground">Performance Tiers:</span>
              {["excellent", "good", "average", "below"]?.map((tier) => (
                <div key={tier} className="flex items-center space-x-1">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      getTierColor(tier)?.split(" ")?.[1]
                    }`}
                  />
                  <span className="text-xs text-muted-foreground capitalize">
                    {tier}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-muted-foreground">
            Last updated: {new Date()?.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonMatrixTable;
