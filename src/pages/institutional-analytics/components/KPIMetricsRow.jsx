import React from "react";
import Icon from "../../../components/AppIcon";

const KPIMetricsRow = ({ selectedInstitutions, activeCategory }) => {
  const getKPIData = () => {
    const baseData = {
      performance: [
        {
          id: "ranking",
          label: "Institutional Ranking",
          value: "#12",
          change: "+3",
          changeType: "positive",
          icon: "Trophy",
          description: "Among 150+ institutions",
          benchmark: "#8 (Industry Avg)",
        },
        {
          id: "percentile",
          label: "Performance Percentile",
          value: "87th",
          change: "+5%",
          changeType: "positive",
          icon: "TrendingUp",
          description: "Overall performance score",
          benchmark: "75th (Target)",
        },
        {
          id: "growth",
          label: "YoY Growth",
          value: "+23.4%",
          change: "+2.1%",
          changeType: "positive",
          icon: "ArrowUp",
          description: "Compared to last year",
          benchmark: "+18% (Peer Avg)",
        },
        {
          id: "roi",
          label: "Training ROI",
          value: "340%",
          change: "+45%",
          changeType: "positive",
          icon: "DollarSign",
          description: "Return on investment",
          benchmark: "280% (Industry)",
        },
      ],
      engagement: [
        {
          id: "active_users",
          label: "Active Users",
          value: "2,847",
          change: "+156",
          changeType: "positive",
          icon: "Users",
          description: "Monthly active students",
          benchmark: "2,200 (Target)",
        },
        {
          id: "session_time",
          label: "Avg Session Time",
          value: "47m",
          change: "+8m",
          changeType: "positive",
          icon: "Clock",
          description: "Per student session",
          benchmark: "35m (Benchmark)",
        },
        {
          id: "completion_rate",
          label: "Completion Rate",
          value: "89.2%",
          change: "+4.3%",
          changeType: "positive",
          icon: "CheckCircle",
          description: "Module completion",
          benchmark: "82% (Industry)",
        },
        {
          id: "engagement_score",
          label: "Engagement Score",
          value: "8.7/10",
          change: "+0.4",
          changeType: "positive",
          icon: "Heart",
          description: "Student satisfaction",
          benchmark: "7.8 (Peer Avg)",
        },
      ],
      faculty: [
        {
          id: "response_time",
          label: "Avg Response Time",
          value: "2.3h",
          change: "-0.7h",
          changeType: "positive",
          icon: "MessageCircle",
          description: "Faculty response to queries",
          benchmark: "4h (Target)",
        },
        {
          id: "intervention_rate",
          label: "Intervention Rate",
          value: "94.5%",
          change: "+2.1%",
          changeType: "positive",
          icon: "AlertTriangle",
          description: "Proactive student support",
          benchmark: "88% (Industry)",
        },
        {
          id: "faculty_rating",
          label: "Faculty Rating",
          value: "4.6/5",
          change: "+0.2",
          changeType: "positive",
          icon: "Star",
          description: "Student feedback score",
          benchmark: "4.2 (Benchmark)",
        },
        {
          id: "activity_score",
          label: "Activity Score",
          value: "92%",
          change: "+5%",
          changeType: "positive",
          icon: "Activity",
          description: "Faculty engagement level",
          benchmark: "85% (Target)",
        },
      ],
      outcomes: [
        {
          id: "placement_rate",
          label: "Placement Rate",
          value: "94.7%",
          change: "+6.2%",
          changeType: "positive",
          icon: "Briefcase",
          description: "Students placed successfully",
          benchmark: "87% (Industry)",
        },
        {
          id: "avg_salary",
          label: "Avg Salary Package",
          value: "$78K",
          change: "+$12K",
          changeType: "positive",
          icon: "DollarSign",
          description: "Annual starting salary",
          benchmark: "$65K (Market)",
        },
        {
          id: "top_tier",
          label: "Top Tier Companies",
          value: "67%",
          change: "+9%",
          changeType: "positive",
          icon: "Building",
          description: "Fortune 500 placements",
          benchmark: "45% (Peer Avg)",
        },
        {
          id: "time_to_placement",
          label: "Time to Placement",
          value: "45 days",
          change: "-12 days",
          changeType: "positive",
          icon: "Timer",
          description: "Average placement time",
          benchmark: "60 days (Industry)",
        },
      ],
    };

    return baseData?.[activeCategory] || baseData?.performance;
  };

  const kpiData = getKPIData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData?.map((kpi) => (
        <div
          key={kpi?.id}
          className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-smooth"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                kpi?.changeType === "positive"
                  ? "bg-success/10"
                  : "bg-warning/10"
              }`}
            >
              <Icon
                name={kpi?.icon}
                size={20}
                className={
                  kpi?.changeType === "positive"
                    ? "text-success"
                    : "text-warning"
                }
              />
            </div>
            <div
              className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                kpi?.changeType === "positive"
                  ? "bg-success/10 text-success"
                  : "bg-warning/10 text-warning"
              }`}
            >
              <Icon
                name={
                  kpi?.changeType === "positive" ? "TrendingUp" : "TrendingDown"
                }
                size={12}
              />
              <span>{kpi?.change}</span>
            </div>
          </div>

          {/* Value */}
          <div className="mb-3">
            <div className="text-2xl font-bold text-foreground mb-1">
              {kpi?.value}
            </div>
            <div className="text-sm font-medium text-foreground">
              {kpi?.label}
            </div>
            <div className="text-xs text-muted-foreground">
              {kpi?.description}
            </div>
          </div>

          {/* Benchmark Comparison */}
          <div className="pt-3 border-t border-border">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Benchmark:</span>
              <span className="font-medium text-foreground">
                {kpi?.benchmark}
              </span>
            </div>

            {/* Performance Indicator */}
            <div className="mt-2 flex items-center space-x-2">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    kpi?.changeType === "positive" ? "bg-success" : "bg-warning"
                  }`}
                  style={{
                    width: kpi?.changeType === "positive" ? "75%" : "45%",
                  }}
                />
              </div>
              <span
                className={`text-xs font-medium ${
                  kpi?.changeType === "positive"
                    ? "text-success"
                    : "text-warning"
                }`}
              >
                {kpi?.changeType === "positive" ? "Above" : "Below"} Target
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPIMetricsRow;
