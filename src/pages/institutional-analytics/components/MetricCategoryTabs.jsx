import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const MetricCategoryTabs = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    {
      id: "performance",
      label: "Performance",
      icon: "TrendingUp",
      description: "Academic and assessment performance metrics",
      metrics: [
        "Placement Rate",
        "Average Score",
        "Completion Rate",
        "Success Rate",
      ],
    },
    {
      id: "engagement",
      label: "Engagement",
      icon: "Activity",
      description: "Student participation and activity levels",
      metrics: [
        "Login Frequency",
        "Session Duration",
        "Resource Usage",
        "Interaction Rate",
      ],
    },
    {
      id: "faculty",
      label: "Faculty",
      icon: "Users",
      description: "Faculty effectiveness and activity metrics",
      metrics: [
        "Response Time",
        "Intervention Rate",
        "Student Feedback",
        "Activity Score",
      ],
    },
    {
      id: "outcomes",
      label: "Outcomes",
      icon: "Target",
      description: "Placement and career outcome analytics",
      metrics: [
        "Job Offers",
        "Salary Range",
        "Company Tier",
        "Time to Placement",
      ],
    },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-1">
      <div className="flex space-x-1">
        {categories?.map((category) => (
          <Button
            key={category?.id}
            variant={activeCategory === category?.id ? "default" : "ghost"}
            size="sm"
            onClick={() => onCategoryChange(category?.id)}
            iconName={category?.icon}
            iconPosition="left"
            iconSize={16}
            className={`flex-1 justify-start transition-smooth ${
              activeCategory === category?.id ? "shadow-sm" : "hover:bg-muted"
            }`}
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">{category?.label}</span>
              <span
                className={`text-xs ${
                  activeCategory === category?.id
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground"
                }`}
              >
                {category?.metrics?.length} metrics
              </span>
            </div>
          </Button>
        ))}
      </div>
      {/* Category Description */}
      <div className="mt-3 p-3 bg-muted/50 rounded-md">
        <div className="flex items-start space-x-3">
          <Icon
            name={
              categories?.find((c) => c?.id === activeCategory)?.icon || "Info"
            }
            size={16}
            className="text-primary mt-0.5"
          />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-foreground mb-1">
              {categories?.find((c) => c?.id === activeCategory)?.label}{" "}
              Analytics
            </h4>
            <p className="text-xs text-muted-foreground mb-2">
              {categories?.find((c) => c?.id === activeCategory)?.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {categories
                ?.find((c) => c?.id === activeCategory)
                ?.metrics?.map((metric, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-background text-foreground border border-border"
                  >
                    {metric}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricCategoryTabs;
