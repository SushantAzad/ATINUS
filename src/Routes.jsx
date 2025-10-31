import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import InstitutionalAnalytics from "./pages/institutional-analytics";
import StudentPerformanceHub from "./pages/student-performance-hub";
import MultiTenantOverview from "./pages/multi-tenant-overview";
import RealTimeMonitoring from "./pages/real-time-monitoring";
import PredictiveInsights from "./pages/predictive-insights";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your route here */}
          <Route path="/" element={<MultiTenantOverview />} />
          <Route
            path="/institutional-analytics"
            element={<InstitutionalAnalytics />}
          />
          <Route
            path="/student-performance-hub"
            element={<StudentPerformanceHub />}
          />
          <Route
            path="/multi-tenant-overview"
            element={<MultiTenantOverview />}
          />
          <Route
            path="/real-time-monitoring"
            element={<RealTimeMonitoring />}
          />
          <Route path="/predictive-insights" element={<PredictiveInsights />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
