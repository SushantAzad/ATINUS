import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import AnalyticalSidebar from "../../components/ui/AnalyticalSidebar";
import AnalyticalBreadcrumb from "../../components/ui/AnalyticalBreadcrumb";
import PredictionMetricsGrid from "./components/PredictionMetricsGrid";
import ModelControlPanel from "./components/ModelControlPanel";
import PredictiveScatterPlot from "./components/PredictiveScatterPlot";
import RiskFactorsPanel from "./components/RiskFactorsPanel";
import PredictiveTimeline from "./components/PredictiveTimeline";

const PredictiveInsights = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("ensemble");
  const [modelParameters, setModelParameters] = useState({
    confidence: 75,
    horizon: "6months",
  });

  // Mock data for prediction metrics
  const predictionMetrics = [
    {
      id: 1,
      label: "Placement Probability",
      value: "73.2",
      unit: "%",
      change: "+5.3%",
      trend: "up",
      confidence: 87,
      confidenceColor: "bg-success",
      icon: "Target",
      iconBg: "bg-success/10",
      iconColor: "text-success",
      description:
        "Average predicted placement success rate across all students",
    },
    {
      id: 2,
      label: "At-Risk Students",
      value: "142",
      unit: "students",
      change: "-12",
      trend: "down",
      confidence: 92,
      confidenceColor: "bg-warning",
      icon: "AlertTriangle",
      iconBg: "bg-warning/10",
      iconColor: "text-warning",
      description: "Students with placement probability below 60%",
    },
    {
      id: 3,
      label: "Intervention Success",
      value: "68.4",
      unit: "%",
      change: "+8.7%",
      trend: "up",
      confidence: 79,
      confidenceColor: "bg-primary",
      icon: "TrendingUp",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      description: "Success rate of recommended interventions",
    },
    {
      id: 4,
      label: "Model Accuracy",
      value: "87.3",
      unit: "%",
      change: "+2.1%",
      trend: "up",
      confidence: 95,
      confidenceColor: "bg-accent",
      icon: "Zap",
      iconBg: "bg-accent/10",
      iconColor: "text-accent",
      description: "Current prediction model accuracy on validation set",
    },
  ];

  // Mock data for scatter plot
  const scatterPlotData = [
    {
      studentName: "Alice Johnson",
      currentScore: 85,
      placementProbability: 92,
      riskLevel: "Low",
      confidence: 89,
      college: "Tech University",
    },
    {
      studentName: "Bob Smith",
      currentScore: 72,
      placementProbability: 78,
      riskLevel: "Medium",
      confidence: 82,
      college: "Engineering College",
    },
    {
      studentName: "Carol Davis",
      currentScore: 58,
      placementProbability: 45,
      riskLevel: "High",
      confidence: 76,
      college: "State University",
    },
    {
      studentName: "David Wilson",
      currentScore: 91,
      placementProbability: 95,
      riskLevel: "Low",
      confidence: 93,
      college: "Tech University",
    },
    {
      studentName: "Eva Brown",
      currentScore: 67,
      placementProbability: 62,
      riskLevel: "Medium",
      confidence: 78,
      college: "Community College",
    },
    {
      studentName: "Frank Miller",
      currentScore: 43,
      placementProbability: 28,
      riskLevel: "High",
      confidence: 71,
      college: "State University",
    },
    {
      studentName: "Grace Lee",
      currentScore: 88,
      placementProbability: 89,
      riskLevel: "Low",
      confidence: 87,
      college: "Engineering College",
    },
    {
      studentName: "Henry Taylor",
      currentScore: 75,
      placementProbability: 73,
      riskLevel: "Medium",
      confidence: 80,
      college: "Tech University",
    },
  ];

  // Mock data for risk factors
  const riskFactors = [
    {
      id: 1,
      name: "Low Coding Assessment Scores",
      impact: 78,
      description:
        "Students scoring below 60% in coding assessments show 78% higher placement risk",
    },
    {
      id: 2,
      name: "Inconsistent Attendance",
      impact: 65,
      description:
        "Attendance below 80% correlates with reduced placement probability",
    },
    {
      id: 3,
      name: "Limited Interview Practice",
      impact: 52,
      description:
        "Students with fewer than 3 mock interviews show decreased confidence",
    },
    {
      id: 4,
      name: "Weak Communication Skills",
      impact: 47,
      description:
        "Poor performance in AI interview assessments indicates communication gaps",
    },
    {
      id: 5,
      name: "Late Assignment Submissions",
      impact: 34,
      description:
        "Consistent late submissions indicate time management issues",
    },
  ];

  // Mock data for interventions
  const interventions = [
    {
      id: 1,
      title: "Intensive Coding Bootcamp",
      description:
        "2-week focused coding practice with personalized mentoring and daily assessments",
      priority: "high",
      expectedImprovement: 25,
      timeline: "2 weeks",
      icon: "Code",
    },
    {
      id: 2,
      title: "Mock Interview Sessions",
      description:
        "Weekly one-on-one interview practice with industry professionals and feedback",
      priority: "high",
      expectedImprovement: 18,
      timeline: "4 weeks",
      icon: "MessageSquare",
    },
    {
      id: 3,
      title: "Communication Skills Workshop",
      description:
        "Group sessions focusing on presentation skills and technical communication",
      priority: "medium",
      expectedImprovement: 15,
      timeline: "3 weeks",
      icon: "Users",
    },
    {
      id: 4,
      title: "Time Management Training",
      description:
        "Personal productivity coaching and project management techniques",
      priority: "low",
      expectedImprovement: 12,
      timeline: "2 weeks",
      icon: "Clock",
    },
  ];

  // Mock data for success probabilities
  const successProbabilities = [
    {
      id: 1,
      scenario: "Current Trajectory",
      description: "No additional interventions",
      current: 73,
      improved: 73,
      improvement: 0,
      confidence: 87,
    },
    {
      id: 2,
      scenario: "Coding Bootcamp Only",
      description: "Intensive coding training program",
      current: 73,
      improved: 81,
      improvement: 8,
      confidence: 82,
    },
    {
      id: 3,
      scenario: "Full Intervention Package",
      description: "All recommended interventions",
      current: 73,
      improved: 89,
      improvement: 16,
      confidence: 78,
    },
    {
      id: 4,
      scenario: "Optimized Strategy",
      description: "AI-recommended intervention mix",
      current: 73,
      improved: 92,
      improvement: 19,
      confidence: 85,
    },
  ];

  // Mock data for timeline
  const timelineData = [
    {
      period: "Current",
      placement_rate: 73,
      avg_score: 68,
      completion_rate: 85,
      risk_students: 142,
      upperBound: 78,
      lowerBound: 68,
      confidenceRange: 5,
    },
    {
      period: "1 Month",
      placement_rate: 76,
      avg_score: 71,
      completion_rate: 87,
      risk_students: 128,
      upperBound: 82,
      lowerBound: 70,
      confidenceRange: 6,
    },
    {
      period: "3 Months",
      placement_rate: 82,
      avg_score: 75,
      completion_rate: 89,
      risk_students: 98,
      upperBound: 89,
      lowerBound: 75,
      confidenceRange: 7,
    },
    {
      period: "6 Months",
      placement_rate: 87,
      avg_score: 79,
      completion_rate: 92,
      risk_students: 76,
      upperBound: 95,
      lowerBound: 79,
      confidenceRange: 8,
    },
    {
      period: "1 Year",
      placement_rate: 91,
      avg_score: 83,
      completion_rate: 94,
      risk_students: 52,
      upperBound: 101,
      lowerBound: 81,
      confidenceRange: 10,
    },
    {
      period: "2 Years",
      placement_rate: 94,
      avg_score: 86,
      completion_rate: 96,
      risk_students: 34,
      upperBound: 106,
      lowerBound: 82,
      confidenceRange: 12,
    },
  ];

  const handleModelChange = (model) => {
    setSelectedModel(model);
    console.log("Model changed to:", model);
  };

  const handleParameterChange = (parameter, value) => {
    setModelParameters((prev) => ({
      ...prev,
      [parameter]: value,
    }));
    console.log("Parameter changed:", parameter, value);
  };

  const handleScenarioChange = (scenario) => {
    console.log("Scenario changed to:", scenario);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={toggleMobileMenu} isMenuOpen={mobileMenuOpen} />
      <AnalyticalSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
      />

      <main
        className={`transition-all duration-300 ease-out ${
          sidebarCollapsed ? "ml-16" : "ml-80"
        } pt-16`}
      >
        <AnalyticalBreadcrumb />

        <div className="p-6 space-y-8">
          {/* Prediction Metrics */}
          <PredictionMetricsGrid metrics={predictionMetrics} />

          {/* Model Control Panel */}
          <ModelControlPanel
            onModelChange={handleModelChange}
            onParameterChange={handleParameterChange}
          />

          {/* Main Analysis Area */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Predictive Scatter Plot - 3 columns */}
            <div className="xl:col-span-3">
              <PredictiveScatterPlot
                data={scatterPlotData}
                onScenarioChange={handleScenarioChange}
              />
            </div>

            {/* Risk Factors Panel - 1 column */}
            <div className="xl:col-span-1">
              <RiskFactorsPanel
                riskFactors={riskFactors}
                interventions={interventions}
                successProbabilities={successProbabilities}
              />
            </div>
          </div>

          {/* Predictive Timeline */}
          <PredictiveTimeline
            timelineData={timelineData}
            sensitivityData={timelineData}
          />
        </div>
      </main>
    </div>
  );
};

export default PredictiveInsights;
