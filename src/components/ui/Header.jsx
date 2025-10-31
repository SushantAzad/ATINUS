import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const Header = ({ onMenuToggle, isMenuOpen = false }) => {
  const location = useLocation();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const primaryNavItems = [
    { path: "/multi-tenant-overview", label: "Overview", icon: "BarChart3" },
    { path: "/student-performance-hub", label: "Performance", icon: "Users" },
    {
      path: "/institutional-analytics",
      label: "Analytics",
      icon: "TrendingUp",
    },
    { path: "/real-time-monitoring", label: "Live Monitor", icon: "Activity" },
  ];

  const secondaryNavItems = [
    {
      path: "/predictive-insights",
      label: "Predictive Insights",
      icon: "Brain",
    },
    { path: "/settings", label: "Settings", icon: "Settings" },
    { path: "/help", label: "Help & Support", icon: "HelpCircle" },
    { path: "/admin", label: "Admin Panel", icon: "Shield" },
  ];

  const isActiveRoute = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-card border-b border-border shadow-elevation-1">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden"
            iconName="Menu"
            iconSize={20}
          >
            <span className="sr-only">Toggle menu</span>
          </Button>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary-foreground"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">ATINUS</h1>
              <p className="text-xs text-muted-foreground -mt-1">Analytics</p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {primaryNavItems?.map((item) => (
            <Button
              key={item?.path}
              variant={isActiveRoute(item?.path) ? "default" : "ghost"}
              size="sm"
              onClick={() => handleNavigation(item?.path)}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={16}
              className="transition-smooth"
            >
              {item?.label}
            </Button>
          ))}

          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              iconName="MoreHorizontal"
              iconSize={16}
              className="transition-smooth"
            >
              More
            </Button>

            {isMoreMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-150"
                  onClick={() => setIsMoreMenuOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-elevation-2 z-200 animate-fade-in">
                  <div className="py-2">
                    {secondaryNavItems?.map((item) => (
                      <button
                        key={item?.path}
                        onClick={() => {
                          handleNavigation(item?.path);
                          setIsMoreMenuOpen(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-smooth hover:bg-muted ${
                          isActiveRoute(item?.path)
                            ? "bg-muted text-primary font-medium"
                            : "text-popover-foreground"
                        }`}
                      >
                        <Icon name={item?.icon} size={16} />
                        <span>{item?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            iconName="Bell"
            iconSize={18}
            className="relative"
          >
            <span className="sr-only">Notifications</span>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full animate-pulse-ring" />
          </Button>

          <Button variant="ghost" size="icon" iconName="Search" iconSize={18}>
            <span className="sr-only">Search</span>
          </Button>

          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <Icon name="User" size={16} className="text-muted-foreground" />
          </div>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card">
          <nav className="px-4 py-4 space-y-2">
            {[...primaryNavItems, ...secondaryNavItems]?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-smooth ${
                  isActiveRoute(item?.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
