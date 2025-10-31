import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const AnalyticalSidebar = ({ isCollapsed = false, onToggle }) => {
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState({
    overview: true,
    performance: true,
    predictive: true,
    operations: true,
  });

  const navigationGroups = [
    {
      id: "overview",
      label: "Overview",
      icon: "LayoutDashboard",
      items: [
        {
          path: "/multi-tenant-overview",
          label: "Multi-Tenant Overview",
          icon: "Building2",
          description: "Cross-institutional insights and performance metrics",
        },
      ],
    },
    {
      id: "performance",
      label: "Performance Analytics",
      icon: "TrendingUp",
      items: [
        {
          path: "/student-performance-hub",
          label: "Student Performance Hub",
          icon: "Users",
          description: "Individual and cohort performance analysis",
        },
        {
          path: "/institutional-analytics",
          label: "Institutional Analytics",
          icon: "BarChart3",
          description: "Comprehensive institutional performance metrics",
        },
      ],
    },
    {
      id: "predictive",
      label: "Predictive Intelligence",
      icon: "Brain",
      items: [
        {
          path: "/predictive-insights",
          label: "Predictive Insights",
          icon: "Zap",
          description: "ML-powered forecasting and risk identification",
        },
      ],
    },
    {
      id: "operations",
      label: "Live Operations",
      icon: "Activity",
      items: [
        {
          path: "/real-time-monitoring",
          label: "Real-Time Monitoring",
          icon: "Monitor",
          description: "Active session oversight and immediate response",
        },
      ],
    },
  ];

  const isActiveRoute = (path) => location?.pathname === path;

  const toggleGroup = (groupId) => {
    if (!isCollapsed) {
      setExpandedGroups((prev) => ({
        ...prev,
        [groupId]: !prev?.[groupId],
      }));
    }
  };

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  // Auto-expand groups when sidebar expands
  useEffect(() => {
    if (!isCollapsed) {
      setExpandedGroups({
        overview: true,
        performance: true,
        predictive: true,
        operations: true,
      });
    }
  }, [isCollapsed]);

  return (
    <aside
      className={`fixed left-0 top-16 bottom-0 z-100 bg-card border-r border-border transition-all duration-300 ease-out ${
        isCollapsed ? "w-16" : "w-80"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Analytics Navigation
              </h2>
              <p className="text-xs text-muted-foreground">
                Analytical domains and workflows
              </p>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
            iconSize={16}
            className="transition-smooth"
          >
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>

        {/* Navigation Groups */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {navigationGroups?.map((group) => (
            <div key={group?.id} className="space-y-2">
              {/* Group Header */}
              <button
                onClick={() => toggleGroup(group?.id)}
                className={`w-full flex items-center justify-between p-2 rounded-lg transition-smooth hover:bg-muted ${
                  isCollapsed ? "justify-center" : ""
                }`}
                title={isCollapsed ? group?.label : ""}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    name={group?.icon}
                    size={16}
                    className="text-muted-foreground"
                  />
                  {!isCollapsed && (
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {group?.label}
                    </span>
                  )}
                </div>
                {!isCollapsed && (
                  <Icon
                    name="ChevronDown"
                    size={14}
                    className={`text-muted-foreground transition-transform ${
                      expandedGroups?.[group?.id] ? "rotate-0" : "-rotate-90"
                    }`}
                  />
                )}
              </button>

              {/* Group Items */}
              {(expandedGroups?.[group?.id] || isCollapsed) && (
                <div className={`space-y-1 ${isCollapsed ? "" : "ml-2"}`}>
                  {group?.items?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-smooth group ${
                        isActiveRoute(item?.path)
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "hover:bg-muted text-foreground"
                      } ${isCollapsed ? "justify-center" : ""}`}
                      title={
                        isCollapsed
                          ? `${item?.label}: ${item?.description}`
                          : ""
                      }
                    >
                      <Icon
                        name={item?.icon}
                        size={18}
                        className={`flex-shrink-0 ${
                          isActiveRoute(item?.path)
                            ? "text-primary-foreground"
                            : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      />
                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <div
                            className={`text-sm font-medium ${
                              isActiveRoute(item?.path)
                                ? "text-primary-foreground"
                                : "text-foreground"
                            }`}
                          >
                            {item?.label}
                          </div>
                          <div
                            className={`text-xs mt-1 ${
                              isActiveRoute(item?.path)
                                ? "text-primary-foreground/80"
                                : "text-muted-foreground"
                            }`}
                          >
                            {item?.description}
                          </div>
                        </div>
                      )}
                      {!isCollapsed && isActiveRoute(item?.path) && (
                        <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border">
          {!isCollapsed ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-2 bg-muted rounded-lg">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                  <Icon
                    name="CheckCircle"
                    size={16}
                    className="text-success-foreground"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">
                    System Status
                  </div>
                  <div className="text-xs text-success">
                    All systems operational
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                iconName="HelpCircle"
                iconPosition="left"
                iconSize={14}
                className="w-full justify-start"
              >
                Help & Support
              </Button>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <Button
                variant="ghost"
                size="icon"
                iconName="CheckCircle"
                iconSize={16}
                className="text-success"
                title="System Status: All operational"
              >
                <span className="sr-only">System status</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                iconName="HelpCircle"
                iconSize={16}
                title="Help & Support"
              >
                <span className="sr-only">Help</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AnalyticalSidebar;
