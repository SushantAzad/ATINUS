import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import AnalyticalSidebar from "../../components/ui/AnalyticalSidebar";
import AnalyticalBreadcrumb from "../../components/ui/AnalyticalBreadcrumb";
import MetricsStrip from "./components/MetricsStrip";
import PerformanceScatterPlot from "./components/PerformanceScatterPlot";
import StudentLeaderboard from "./components/StudentLeaderboard";
import AssessmentFunnel from "./components/AssessmentFunnel";
import FilterPanel from "./components/FilterPanel";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

const StudentPerformanceHub = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filters, setFilters] = useState({});
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data for metrics
  const metricsData = [
    {
      id: "completion",
      type: "completion",
      label: "Completion Rate",
      value: "78.5",
      unit: "%",
      description: "Students who completed all assessments",
      status: "good",
      trend: 5.2,
      period: "vs last month",
      progress: 78.5,
    },
    {
      id: "average",
      type: "average",
      label: "Average Score",
      value: "72.3",
      unit: "%",
      description: "Overall performance across all assessments",
      status: "good",
      trend: 2.1,
      period: "vs last month",
      progress: 72.3,
    },
    {
      id: "at-risk",
      type: "at-risk",
      label: "At-Risk Students",
      value: "234",
      unit: "students",
      description: "Students requiring immediate intervention",
      status: "warning",
      trend: -8.3,
      period: "vs last month",
      progress: 18.8,
    },
    {
      id: "placement",
      type: "placement",
      label: "Placement Ready",
      value: "456",
      unit: "students",
      description: "Students meeting placement criteria",
      status: "excellent",
      trend: 12.7,
      period: "vs last month",
      progress: 89.2,
    },
  ];

  // Mock data for students
  const studentsData = [
    {
      id: "STU001",
      name: "Sarah Johnson",
      batch: "Batch 2024-A",
      college: "MIT College of Engineering",
      aptitudeScore: 92,
      codingScore: 88,
      aiInterviewScore: 85,
      overallScore: 88.3,
      placementReadiness: 92,
      completionRate: 100,
      riskLevel: "low",
      needsIntervention: false,
      avatar: "https://images.unsplash.com/photo-1728694439890-d8ec102e3703",
      avatarAlt:
        "Professional headshot of young woman with brown hair in business attire",
    },
    {
      id: "STU002",
      name: "Michael Chen",
      batch: "Batch 2024-A",
      college: "Stanford Technical Institute",
      aptitudeScore: 78,
      codingScore: 92,
      aiInterviewScore: 76,
      overallScore: 82.0,
      placementReadiness: 85,
      completionRate: 95,
      riskLevel: "low",
      needsIntervention: false,
      avatar: "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
      avatarAlt: "Professional headshot of Asian man with glasses in navy suit",
    },
    {
      id: "STU003",
      name: "Emily Rodriguez",
      batch: "Batch 2024-B",
      college: "Berkeley Computer Science",
      aptitudeScore: 65,
      codingScore: 58,
      aiInterviewScore: 62,
      overallScore: 61.7,
      placementReadiness: 45,
      completionRate: 67,
      riskLevel: "high",
      needsIntervention: true,
      avatar: "https://images.unsplash.com/photo-1719515862094-c6e9354ee7f8",
      avatarAlt:
        "Professional headshot of Hispanic woman with long dark hair in white blouse",
    },
    {
      id: "STU004",
      name: "David Kim",
      batch: "Batch 2024-B",
      college: "Carnegie Technical University",
      aptitudeScore: 85,
      codingScore: 79,
      aiInterviewScore: 88,
      overallScore: 84.0,
      placementReadiness: 88,
      completionRate: 90,
      riskLevel: "low",
      needsIntervention: false,
      avatar: "https://images.unsplash.com/photo-1678099774661-f09115de1517",
      avatarAlt:
        "Professional headshot of Korean man with short black hair in dark suit",
    },
    {
      id: "STU005",
      name: "Jessica Thompson",
      batch: "Batch 2023-C",
      college: "MIT College of Engineering",
      aptitudeScore: 72,
      codingScore: 68,
      aiInterviewScore: 71,
      overallScore: 70.3,
      placementReadiness: 65,
      completionRate: 78,
      riskLevel: "medium",
      needsIntervention: true,
      avatar: "https://images.unsplash.com/photo-1684262855344-b9da453a7934",
      avatarAlt:
        "Professional headshot of blonde woman with blue eyes in gray blazer",
    },
  ];

  // Mock data for assessment funnel
  const funnelData = [
    {
      name: "Registration",
      value: 1247,
      completionRate: 100,
      dropRate: 0,
      avgScore: 0,
      bottlenecks: [],
    },
    {
      name: "Aptitude Test",
      value: 1089,
      completionRate: 87.3,
      dropRate: 12.7,
      avgScore: 74.2,
      bottlenecks: ["Time management issues", "Mathematical reasoning gaps"],
    },
    {
      name: "Coding Assessment",
      value: 892,
      completionRate: 71.5,
      dropRate: 18.1,
      avgScore: 68.5,
      bottlenecks: [
        "Algorithm complexity",
        "Debugging skills",
        "Code optimization",
      ],
    },
    {
      name: "AI Interview",
      value: 734,
      completionRate: 58.9,
      dropRate: 17.7,
      avgScore: 72.8,
      bottlenecks: ["Communication clarity", "Technical explanation skills"],
    },
    {
      name: "Placement Ready",
      value: 456,
      completionRate: 36.6,
      dropRate: 37.9,
      avgScore: 81.2,
      bottlenecks: [],
    },
  ];

  // Mock saved views
  const savedViews = [
    { id: "view1", name: "High Risk Students", filters: { riskLevel: "high" } },
    {
      id: "view2",
      name: "Batch 2024-A Performance",
      filters: { classBatch: "batch-2024-a" },
    },
    {
      id: "view3",
      name: "Coding Assessment Focus",
      filters: { assessmentRound: "round2" },
    },
  ];

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    console.log("Selected student:", student);
  };

  const handleStageClick = (stage) => {
    console.log("Selected funnel stage:", stage);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    console.log("Filters updated:", newFilters);
  };

  const handleSaveView = (filters) => {
    console.log("Saving view with filters:", filters);
  };

  const handleLoadView = (view) => {
    setFilters(view?.filters);
    console.log("Loading saved view:", view);
  };

  const handleRefreshData = () => {
    setLastUpdated(new Date());
    console.log("Refreshing data...");
  };

  // Auto-refresh data every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
      />

      <AnalyticalSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <main
        className={`transition-all duration-300 ease-out ${
          isSidebarCollapsed ? "ml-16" : "ml-80"
        } pt-16`}
      >
        <AnalyticalBreadcrumb />

        <div className="p-6 space-y-6">
          {/* Data Refresh Status */}
          <div className="flex items-center justify-between bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">
                Last updated: {lastUpdated?.toLocaleTimeString()}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              iconPosition="left"
              iconSize={14}
              onClick={handleRefreshData}
            >
              Refresh Now
            </Button>
          </div>

          {/* Filter Panel */}
          <FilterPanel
            onFiltersChange={handleFiltersChange}
            savedViews={savedViews}
            onSaveView={handleSaveView}
            onLoadView={handleLoadView}
          />

          {/* Metrics Strip */}
          <MetricsStrip metrics={metricsData} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Performance Scatter Plot */}
            <div className="xl:col-span-8">
              <PerformanceScatterPlot
                data={studentsData}
                onStudentClick={handleStudentClick}
              />
            </div>

            {/* Student Leaderboard */}
            <div className="xl:col-span-4">
              <StudentLeaderboard
                students={studentsData}
                onStudentSelect={handleStudentClick}
              />
            </div>
          </div>

          {/* Assessment Funnel */}
          <AssessmentFunnel
            funnelData={funnelData}
            onStageClick={handleStageClick}
          />

          {/* Export and Actions */}
          <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <Icon
                name="Download"
                size={16}
                className="text-muted-foreground"
              />
              <span className="text-sm text-muted-foreground">
                Export student reports and intervention recommendations
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="FileText"
                iconPosition="left"
                iconSize={14}
              >
                Student Reports
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="AlertTriangle"
                iconPosition="left"
                iconSize={14}
              >
                Intervention List
              </Button>
              <Button
                variant="default"
                size="sm"
                iconName="Download"
                iconPosition="left"
                iconSize={14}
              >
                Export All
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentPerformanceHub;
