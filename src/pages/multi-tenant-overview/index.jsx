import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import AnalyticalSidebar from "../../components/ui/AnalyticalSidebar";
import AnalyticalBreadcrumb from "../../components/ui/AnalyticalBreadcrumb";
import KPIMetricCard from "./components/KPIMetricCard";
import InstitutionalHeatMap from "./components/InstitutionalHeatMap";
import LiveActivityFeed from "./components/LiveActivityFeed";
import GlobalControlPanel from "./components/GlobalControlPanel";
import TopPerformingInstitutions from "./components/TopPerformingInstitutions";

const MultiTenantOverview = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedInstitutions, setSelectedInstitutions] = useState(["all"]);
  const [selectedRound, setSelectedRound] = useState("all");
  const [dateRange, setDateRange] = useState("month");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock KPI data
  const kpiData = [
    {
      title: "Total Active Students",
      value: 12847,
      unit: "",
      trend: "up",
      trendValue: 8.2,
      icon: "Users",
      color: "primary",
      sparklineData: [1200, 1350, 1180, 1420, 1380, 1450, 1284],
    },
    {
      title: "Placement Readiness Score",
      value: 78.5,
      unit: "%",
      trend: "up",
      trendValue: 5.3,
      icon: "Target",
      color: "success",
      sparklineData: [72, 74, 76, 75, 77, 78, 78.5],
    },
    {
      title: "System-wide Completion Rate",
      value: 84.2,
      unit: "%",
      trend: "up",
      trendValue: 2.1,
      icon: "CheckCircle",
      color: "accent",
      sparklineData: [80, 81, 83, 82, 84, 83, 84.2],
    },
    {
      title: "Revenue This Month",
      value: 2.4,
      unit: "M USD",
      trend: "up",
      trendValue: 12.8,
      icon: "DollarSign",
      color: "warning",
      sparklineData: [2.1, 2.2, 2.0, 2.3, 2.2, 2.3, 2.4],
    },
  ];

  // Mock institutional data
  const institutionalData = [
    {
      id: "mit-chennai",
      name: "MIT Chennai",
      location: "Chennai, Tamil Nadu",
      total_students: 1250,
      active_students: 1180,
      placement_readiness: 85.2,
      completion_rate: 89.5,
      avg_score: 82.3,
      engagement: 91.2,
      trend: "up",
      trend_value: 5.2,
      growth_rate: 8.5,
    },
    {
      id: "vit-vellore",
      name: "VIT Vellore",
      location: "Vellore, Tamil Nadu",
      total_students: 2100,
      active_students: 1950,
      placement_readiness: 82.8,
      completion_rate: 87.3,
      avg_score: 79.6,
      engagement: 88.7,
      trend: "up",
      trend_value: 3.8,
      growth_rate: 6.2,
    },
    {
      id: "srm-university",
      name: "SRM University",
      location: "Kattankulathur, Tamil Nadu",
      total_students: 1800,
      active_students: 1650,
      placement_readiness: 79.4,
      completion_rate: 85.1,
      avg_score: 76.8,
      engagement: 86.3,
      trend: "up",
      trend_value: 2.1,
      growth_rate: 4.7,
    },
    {
      id: "anna-university",
      name: "Anna University",
      location: "Chennai, Tamil Nadu",
      total_students: 3200,
      active_students: 2890,
      placement_readiness: 77.2,
      completion_rate: 83.6,
      avg_score: 74.5,
      engagement: 84.1,
      trend: "up",
      trend_value: 1.8,
      growth_rate: 3.2,
    },
    {
      id: "psg-coimbatore",
      name: "PSG Coimbatore",
      location: "Coimbatore, Tamil Nadu",
      total_students: 950,
      active_students: 820,
      placement_readiness: 88.7,
      completion_rate: 92.1,
      avg_score: 85.9,
      engagement: 93.4,
      trend: "up",
      trend_value: 7.3,
      growth_rate: 12.1,
    },
    {
      id: "nit-trichy",
      name: "NIT Trichy",
      location: "Tiruchirappalli, Tamil Nadu",
      total_students: 1400,
      active_students: 1280,
      placement_readiness: 86.3,
      completion_rate: 90.2,
      avg_score: 83.7,
      engagement: 89.8,
      trend: "up",
      trend_value: 4.6,
      growth_rate: 7.8,
    },
  ];

  // Mock activity feed data
  const activityFeedData = [
    {
      id: 1,
      type: "completion",
      title: "Student completed Round 3 Assessment",
      description:
        "Rajesh Kumar from MIT Chennai successfully completed AI Interview round with 87% score",
      institution: "MIT Chennai",
      timestamp: new Date(Date.now() - 300000),
      severity: "info",
    },
    {
      id: 2,
      type: "alert",
      title: "Low completion rate detected",
      description:
        "VIT Vellore showing 15% drop in completion rates for Round 2 assessments",
      institution: "VIT Vellore",
      timestamp: new Date(Date.now() - 600000),
      severity: "high",
    },
    {
      id: 3,
      type: "intervention",
      title: "Faculty intervention required",
      description:
        "Dr. Priya Sharma flagged 12 students needing additional coding support",
      institution: "SRM University",
      timestamp: new Date(Date.now() - 900000),
      severity: "medium",
    },
    {
      id: 4,
      type: "achievement",
      title: "New placement record achieved",
      description: "PSG Coimbatore reaches 95% placement readiness milestone",
      institution: "PSG Coimbatore",
      timestamp: new Date(Date.now() - 1200000),
      severity: "info",
    },
    {
      id: 5,
      type: "enrollment",
      title: "Bulk student enrollment",
      description: "Anna University added 150 new students to the platform",
      institution: "Anna University",
      timestamp: new Date(Date.now() - 1800000),
      severity: "low",
    },
    {
      id: 6,
      type: "completion",
      title: "Assessment batch completed",
      description:
        "Batch CS-2024-A from NIT Trichy completed Round 1 with 92% average score",
      institution: "NIT Trichy",
      timestamp: new Date(Date.now() - 2400000),
      severity: "info",
    },
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const handleInstitutionClick = (institution) => {
    console.log("Navigate to institution details:", institution);
    // Navigate to institutional analytics page
  };

  const handleKPIClick = (kpi) => {
    console.log("Navigate to detailed KPI view:", kpi);
    // Navigate to specific analytics view
  };

  const handleViewInstitutionDetails = (institution) => {
    console.log("View institution details:", institution);
    // Navigate to institution-specific dashboard
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        isMenuOpen={mobileMenuOpen}
      />
      <AnalyticalSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "ml-16" : "ml-80"
        } mt-16`}
      >
        <AnalyticalBreadcrumb />

        <GlobalControlPanel
          selectedInstitutions={selectedInstitutions}
          onInstitutionChange={setSelectedInstitutions}
          selectedRound={selectedRound}
          onRoundChange={setSelectedRound}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />

        <div className="p-6 space-y-6">
          {/* KPI Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {kpiData?.map((kpi, index) => (
              <KPIMetricCard
                key={index}
                title={kpi?.title}
                value={kpi?.value}
                unit={kpi?.unit}
                trend={kpi?.trend}
                trendValue={kpi?.trendValue}
                icon={kpi?.icon}
                color={kpi?.color}
                sparklineData={kpi?.sparklineData}
                onClick={() => handleKPIClick(kpi)}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Heat Map - Takes 2 columns on xl screens */}
            <div className="xl:col-span-2">
              <InstitutionalHeatMap
                data={institutionalData}
                onInstitutionClick={handleInstitutionClick}
              />
            </div>

            {/* Live Activity Feed - Takes 1 column on xl screens */}
            <div className="xl:col-span-1">
              <LiveActivityFeed activities={activityFeedData} />
            </div>
          </div>

          {/* Top Performing Institutions Table */}
          <TopPerformingInstitutions
            institutions={institutionalData}
            onViewDetails={handleViewInstitutionDetails}
          />
        </div>
      </main>
    </div>
  );
};

export default MultiTenantOverview;
