import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import AnalyticalSidebar from "../../components/ui/AnalyticalSidebar";
import AnalyticalBreadcrumb from "../../components/ui/AnalyticalBreadcrumb";
import SystemStatusHeader from "./components/SystemStatusHeader";
import LiveActivityStream from "./components/LiveActivityStream";
import AlertPanel from "./components/AlertPanel";
import AssessmentProgressGrid from "./components/AssessmentProgressGrid";

const RealTimeMonitoring = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(15);

  useEffect(() => {
    // Request notification permission for critical alerts
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    // Simulate WebSocket connection status
    const connectionStatus = document.createElement("div");
    connectionStatus.className = "fixed bottom-4 right-4 z-50";
    connectionStatus.innerHTML = `
      <div class="flex items-center space-x-2 px-3 py-2 bg-success text-success-foreground rounded-lg shadow-lg">
        <div class="w-2 h-2 bg-success-foreground rounded-full animate-pulse"></div>
        <span class="text-sm font-medium">WebSocket Connected</span>
      </div>
    `;
    document.body?.appendChild(connectionStatus);

    return () => {
      if (document.body?.contains(connectionStatus)) {
        document.body?.removeChild(connectionStatus);
      }
    };
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleRefreshIntervalChange = (interval) => {
    setRefreshInterval(interval);
  };

  return (
    <>
      <Helmet>
        <title>Real-Time Monitoring - ATINUS Analytics</title>
        <meta
          name="description"
          content="Live operational oversight for system administrators and faculty, tracking active student sessions, assessment progress, and system performance metrics in real-time."
        />
        <meta
          name="keywords"
          content="real-time monitoring, live tracking, system oversight, assessment monitoring, student sessions, performance metrics"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header onMenuToggle={handleMenuToggle} isMenuOpen={isMenuOpen} />

        {/* Sidebar */}
        <AnalyticalSidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={handleSidebarToggle}
        />

        {/* Main Content */}
        <main
          className={`transition-all duration-300 ease-out ${
            isSidebarCollapsed ? "ml-16" : "ml-80"
          } pt-16`}
        >
          {/* Breadcrumb */}
          <AnalyticalBreadcrumb />

          {/* System Status Header */}
          <SystemStatusHeader
            onRefreshIntervalChange={handleRefreshIntervalChange}
            refreshInterval={refreshInterval}
          />

          {/* Main Monitoring Layout */}
          <div className="p-6 space-y-6">
            {/* Top Monitoring Grid */}
            <div
              className="grid grid-cols-1 xl:grid-cols-4 gap-6"
              style={{ minHeight: "32rem" }}
            >
              {/* Live Activity Stream - 3 columns */}
              <div className="xl:col-span-3 h-full">
                <LiveActivityStream />
              </div>

              {/* Alert Panel - 1 column */}
              <div className="xl:col-span-1 h-full">
                <AlertPanel />
              </div>
            </div>

            {/* Assessment Progress Grid - Full Width */}
            <AssessmentProgressGrid />
          </div>
        </main>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={handleMenuToggle}
          />
        )}
      </div>
    </>
  );
};

export default RealTimeMonitoring;
