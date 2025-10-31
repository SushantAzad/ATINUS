import React, { useState } from "react";
import Header from "../../components/ui/Header";
import AnalyticalSidebar from "../../components/ui/AnalyticalSidebar";
import AnalyticalBreadcrumb from "../../components/ui/AnalyticalBreadcrumb";
import InstitutionSelector from "./components/InstitutionSelector";
import MetricCategoryTabs from "./components/MetricCategoryTabs";
import TimePeriodControls from "./components/TimePeriodControls";
import KPIMetricsRow from "./components/KPIMetricsRow";
import ComparisonTrendChart from "./components/ComparisonTrendChart";
import PerformanceDistributionPanel from "./components/PerformanceDistributionPanel";
import ComparisonMatrixTable from "./components/ComparisonMatrixTable";

const InstitutionalAnalytics = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedInstitutions, setSelectedInstitutions] = useState([
    "inst_001",
    "inst_002",
    "inst_003",
  ]);
  const [activeCategory, setActiveCategory] = useState("performance");
  const [selectedPeriod, setSelectedPeriod] = useState("current");
  const [customRange, setCustomRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [benchmarkEnabled, setBenchmarkEnabled] = useState(true);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleInstitutionSelectionChange = (newSelection) => {
    setSelectedInstitutions(newSelection);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  const handleCustomRangeChange = (range) => {
    setCustomRange(range);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        onMenuToggle={handleMobileMenuToggle}
        isMenuOpen={mobileMenuOpen}
      />
      {/* Sidebar */}
      <AnalyticalSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={handleSidebarToggle}
      />
      {/* Main Content */}
      <main
        className={`transition-all duration-300 ease-out ${
          sidebarCollapsed ? "ml-16" : "ml-80"
        } pt-16`}
      >
        {/* Breadcrumb */}
        <AnalyticalBreadcrumb />

        {/* Page Content */}
        <div className="p-6 space-y-6">
          {/* Control Panel */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="grid grid-cols-1 lg:grid-cols-16 gap-6">
              {/* Institution Selector - 4 cols */}
              <div className="lg:col-span-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Select Institutions
                  </label>
                  <InstitutionSelector
                    selectedInstitutions={selectedInstitutions}
                    onSelectionChange={handleInstitutionSelectionChange}
                    maxSelections={5}
                  />
                </div>
              </div>

              {/* Metric Category Tabs - 8 cols */}
              <div className="lg:col-span-8">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Metric Categories
                  </label>
                  <MetricCategoryTabs
                    activeCategory={activeCategory}
                    onCategoryChange={handleCategoryChange}
                  />
                </div>
              </div>

              {/* Time Period Controls - 4 cols */}
              <div className="lg:col-span-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Time Period & Benchmark
                  </label>
                  <div className="space-y-3">
                    <TimePeriodControls
                      selectedPeriod={selectedPeriod}
                      onPeriodChange={handlePeriodChange}
                      customRange={customRange}
                      onCustomRangeChange={handleCustomRangeChange}
                    />

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="benchmark-toggle"
                        checked={benchmarkEnabled}
                        onChange={(e) =>
                          setBenchmarkEnabled(e?.target?.checked)
                        }
                        className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                      />
                      <label
                        htmlFor="benchmark-toggle"
                        className="text-sm text-foreground"
                      >
                        Show industry benchmarks
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KPI Metrics Row */}
          <KPIMetricsRow
            selectedInstitutions={selectedInstitutions}
            activeCategory={activeCategory}
          />

          {/* Main Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-16 gap-6">
            {/* Central Visualization Area - 12 cols */}
            <div className="lg:col-span-12">
              <ComparisonTrendChart
                selectedInstitutions={selectedInstitutions}
                activeCategory={activeCategory}
                timePeriod={selectedPeriod}
              />
            </div>

            {/* Side Panel - 4 cols */}
            <div className="lg:col-span-4">
              <PerformanceDistributionPanel
                selectedInstitutions={selectedInstitutions}
                activeCategory={activeCategory}
              />
            </div>
          </div>

          {/* Comprehensive Comparison Matrix */}
          <ComparisonMatrixTable
            selectedInstitutions={selectedInstitutions}
            activeCategory={activeCategory}
          />

          {/* Advanced Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Correlation Analysis */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    Correlation Analysis
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Faculty activity vs student outcomes relationship
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-success mb-1">
                      0.87
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Faculty Response vs Placement
                    </div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-1">
                      0.92
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Engagement vs Success Rate
                    </div>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  Strong positive correlation indicates that institutions with
                  higher faculty responsiveness and student engagement achieve
                  better placement outcomes.
                </div>
              </div>
            </div>

            {/* Predictive Modeling */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    Predictive Insights
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    ML-powered placement success forecasting
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">
                      Predicted Q1 Placement Rate
                    </span>
                    <span className="font-medium text-success">94.2%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-success h-2 rounded-full"
                      style={{ width: "94.2%" }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">Confidence Interval</span>
                    <span className="font-medium text-primary">±2.3%</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Model accuracy: 89.7% based on historical data and current
                    trends
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Capacity Utilization & Optimization */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Capacity Utilization & Optimization
                </h3>
                <p className="text-sm text-muted-foreground">
                  Resource allocation and efficiency metrics across institutions
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedInstitutions?.slice(0, 3)?.map((instId, index) => {
                const utilizationData = {
                  inst_001: {
                    utilization: 87,
                    capacity: 3200,
                    enrolled: 2784,
                    efficiency: 92,
                  },
                  inst_002: {
                    utilization: 91,
                    capacity: 3500,
                    enrolled: 3185,
                    efficiency: 95,
                  },
                  inst_003: {
                    utilization: 83,
                    capacity: 3100,
                    enrolled: 2573,
                    efficiency: 88,
                  },
                  inst_004: {
                    utilization: 95,
                    capacity: 4800,
                    enrolled: 4560,
                    efficiency: 78,
                  },
                  inst_005: {
                    utilization: 89,
                    capacity: 4000,
                    enrolled: 3560,
                    efficiency: 85,
                  },
                  inst_006: {
                    utilization: 76,
                    capacity: 1500,
                    enrolled: 1140,
                    efficiency: 94,
                  },
                }?.[instId];

                const institutionName = {
                  inst_001: "MIT",
                  inst_002: "Stanford",
                  inst_003: "CMU",
                  inst_004: "UC Berkeley",
                  inst_005: "Georgia Tech",
                  inst_006: "Caltech",
                }?.[instId];

                return (
                  <div key={instId} className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium text-foreground mb-3">
                      {institutionName}
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">
                            Utilization
                          </span>
                          <span className="font-medium text-foreground">
                            {utilizationData?.utilization}%
                          </span>
                        </div>
                        <div className="w-full bg-background rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{
                              width: `${utilizationData?.utilization}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <div className="text-muted-foreground">Capacity</div>
                          <div className="font-medium text-foreground">
                            {utilizationData?.capacity?.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Enrolled</div>
                          <div className="font-medium text-foreground">
                            {utilizationData?.enrolled?.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-border">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">
                            Efficiency Score
                          </span>
                          <span
                            className={`font-medium ${
                              utilizationData?.efficiency >= 90
                                ? "text-success"
                                : utilizationData?.efficiency >= 80
                                ? "text-primary"
                                : "text-warning"
                            }`}
                          >
                            {utilizationData?.efficiency}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InstitutionalAnalytics;
