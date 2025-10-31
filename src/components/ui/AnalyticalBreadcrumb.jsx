import React from "react";
import { useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const AnalyticalBreadcrumb = ({ customBreadcrumbs = null }) => {
  const location = useLocation();

  const routeMap = {
    "/multi-tenant-overview": {
      label: "Multi-Tenant Overview",
      icon: "Building2",
      category: "Overview",
      description: "Cross-institutional insights and performance metrics",
    },
    "/student-performance-hub": {
      label: "Student Performance Hub",
      icon: "Users",
      category: "Performance Analytics",
      description: "Individual and cohort performance analysis",
    },
    "/institutional-analytics": {
      label: "Institutional Analytics",
      icon: "BarChart3",
      category: "Performance Analytics",
      description: "Comprehensive institutional performance metrics",
    },
    "/real-time-monitoring": {
      label: "Real-Time Monitoring",
      icon: "Monitor",
      category: "Live Operations",
      description: "Active session oversight and immediate response",
    },
    "/predictive-insights": {
      label: "Predictive Insights",
      icon: "Zap",
      category: "Predictive Intelligence",
      description: "ML-powered forecasting and risk identification",
    },
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location?.pathname?.split("/")?.filter(Boolean);
    const breadcrumbs = [
      {
        label: "Analytics Dashboard",
        path: "/",
        icon: "LayoutDashboard",
      },
    ];

    let currentPath = "";
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const routeInfo = routeMap?.[currentPath];

      if (routeInfo) {
        breadcrumbs?.push({
          label: routeInfo?.label,
          path: currentPath,
          icon: routeInfo?.icon,
          category: routeInfo?.category,
          description: routeInfo?.description,
          isLast: index === pathSegments?.length - 1,
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();
  const currentPage = breadcrumbs?.[breadcrumbs?.length - 1];

  const handleNavigation = (path) => {
    if (path !== location?.pathname) {
      window.location.href = path;
    }
  };

  return (
    <div className="bg-background border-b border-border">
      <div className="px-6 py-4">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm mb-3">
          {breadcrumbs?.map((crumb, index) => (
            <div key={crumb?.path} className="flex items-center">
              {index > 0 && (
                <Icon
                  name="ChevronRight"
                  size={14}
                  className="text-muted-foreground mx-2"
                />
              )}

              {crumb?.isLast ? (
                <div className="flex items-center space-x-2">
                  <Icon name={crumb?.icon} size={14} className="text-primary" />
                  <span className="font-medium text-foreground">
                    {crumb?.label}
                  </span>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigation(crumb?.path)}
                  iconName={crumb?.icon}
                  iconPosition="left"
                  iconSize={14}
                  className="h-auto p-1 text-muted-foreground hover:text-foreground transition-smooth"
                >
                  {crumb?.label}
                </Button>
              )}
            </div>
          ))}
        </nav>

        {/* Current Page Header */}
        {currentPage && currentPage?.category && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary">
                    {currentPage?.category}
                  </span>
                  <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                  <span className="text-xs text-muted-foreground">
                    Last updated: {new Date()?.toLocaleTimeString()}
                  </span>
                </div>

                <h1 className="text-2xl font-semibold text-foreground flex items-center space-x-3">
                  <Icon
                    name={currentPage?.icon}
                    size={24}
                    className="text-primary"
                  />
                  <span>{currentPage?.label}</span>
                </h1>

                {currentPage?.description && (
                  <p className="text-sm text-muted-foreground max-w-2xl">
                    {currentPage?.description}
                  </p>
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="RefreshCw"
                  iconPosition="left"
                  iconSize={14}
                >
                  Refresh Data
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
        )}
      </div>
    </div>
  );
};

export default AnalyticalBreadcrumb;
