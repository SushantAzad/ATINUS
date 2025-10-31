import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ComparisonTrendChart = ({
  selectedInstitutions,
  activeCategory,
  timePeriod,
}) => {
  const [selectedMetrics, setSelectedMetrics] = useState([
    "placement_rate",
    "avg_score",
  ]);
  const [showBenchmark, setShowBenchmark] = useState(true);

  const institutionColors = {
    inst_001: "#2563EB", // MIT - Blue
    inst_002: "#DC2626", // Stanford - Red
    inst_003: "#059669", // CMU - Green
    inst_004: "#D97706", // UC Berkeley - Orange
    inst_005: "#7C3AED", // Georgia Tech - Purple
    inst_006: "#DB2777", // Caltech - Pink
  };

  const institutionNames = {
    inst_001: "MIT",
    inst_002: "Stanford",
    inst_003: "CMU",
    inst_004: "UC Berkeley",
    inst_005: "Georgia Tech",
    inst_006: "Caltech",
  };

  const availableMetrics = {
    performance: [
      { id: "placement_rate", label: "Placement Rate (%)", unit: "%" },
      { id: "avg_score", label: "Average Score", unit: "pts" },
      { id: "completion_rate", label: "Completion Rate (%)", unit: "%" },
      { id: "success_rate", label: "Success Rate (%)", unit: "%" },
    ],
    engagement: [
      { id: "active_users", label: "Active Users", unit: "users" },
      { id: "session_duration", label: "Session Duration", unit: "min" },
      { id: "login_frequency", label: "Login Frequency", unit: "logins/week" },
      { id: "resource_usage", label: "Resource Usage", unit: "hours" },
    ],
    faculty: [
      { id: "response_time", label: "Response Time", unit: "hours" },
      { id: "intervention_rate", label: "Intervention Rate (%)", unit: "%" },
      { id: "faculty_rating", label: "Faculty Rating", unit: "/5" },
      { id: "activity_score", label: "Activity Score", unit: "pts" },
    ],
    outcomes: [
      { id: "job_offers", label: "Job Offers", unit: "offers" },
      { id: "salary_range", label: "Salary Range", unit: "K USD" },
      { id: "company_tier", label: "Company Tier Score", unit: "pts" },
      { id: "time_to_placement", label: "Time to Placement", unit: "days" },
    ],
  };

  // Generate mock trend data
  const generateTrendData = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return months?.map((month, index) => {
      const dataPoint = { month };

      selectedInstitutions?.forEach((instId) => {
        selectedMetrics?.forEach((metricId) => {
          const baseValue =
            {
              placement_rate: 85,
              avg_score: 78,
              completion_rate: 82,
              success_rate: 88,
              active_users: 2500,
              session_duration: 45,
              login_frequency: 12,
              resource_usage: 120,
              response_time: 3.2,
              intervention_rate: 91,
              faculty_rating: 4.3,
              activity_score: 87,
              job_offers: 145,
              salary_range: 75,
              company_tier: 8.2,
              time_to_placement: 52,
            }?.[metricId] || 80;

          const institutionMultiplier =
            {
              inst_001: 1.1,
              inst_002: 1.15,
              inst_003: 1.05,
              inst_004: 0.95,
              inst_005: 1.0,
              inst_006: 1.08,
            }?.[instId] || 1.0;

          const seasonalVariation = Math.sin((index / 12) * 2 * Math.PI) * 5;
          const randomVariation = (Math.random() - 0.5) * 10;

          dataPoint[`${instId}_${metricId}`] =
            Math.round(
              (baseValue * institutionMultiplier +
                seasonalVariation +
                randomVariation) *
                100
            ) / 100;
        });
      });

      // Add benchmark line
      if (showBenchmark) {
        selectedMetrics?.forEach((metricId) => {
          const benchmarkValue =
            {
              placement_rate: 82,
              avg_score: 75,
              completion_rate: 78,
              success_rate: 85,
              active_users: 2200,
              session_duration: 40,
              login_frequency: 10,
              resource_usage: 100,
              response_time: 4.0,
              intervention_rate: 85,
              faculty_rating: 4.0,
              activity_score: 80,
              job_offers: 120,
              salary_range: 65,
              company_tier: 7.5,
              time_to_placement: 60,
            }?.[metricId] || 75;

          dataPoint[`benchmark_${metricId}`] = benchmarkValue;
        });
      }

      return dataPoint;
    });
  };

  const chartData = generateTrendData();
  const currentMetrics =
    availableMetrics?.[activeCategory] || availableMetrics?.performance;

  const handleMetricToggle = (metricId) => {
    setSelectedMetrics((prev) => {
      if (prev?.includes(metricId)) {
        return prev?.filter((id) => id !== metricId);
      } else {
        return [...prev, metricId];
      }
    });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg shadow-elevation-2 p-3">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => {
            const [instId, metricId] = entry?.dataKey?.split("_");
            const isbenchmark = instId === "benchmark";
            const institutionName = isbenchmark
              ? "Industry Benchmark"
              : institutionNames?.[instId];
            const metric = currentMetrics?.find((m) => m?.id === metricId);

            return (
              <div
                key={index}
                className="flex items-center justify-between space-x-3 text-sm"
              >
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry?.color }}
                  />
                  <span className="text-foreground">
                    {institutionName} - {metric?.label}
                  </span>
                </div>
                <span className="font-medium text-foreground">
                  {entry?.value}
                  {metric?.unit}
                </span>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Comparative Trend Analysis
          </h3>
          <p className="text-sm text-muted-foreground">
            Multi-institutional performance comparison over time
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant={showBenchmark ? "default" : "outline"}
            size="sm"
            onClick={() => setShowBenchmark(!showBenchmark)}
            iconName="Target"
            iconPosition="left"
            iconSize={14}
          >
            Benchmark
          </Button>

          <Button
            variant="outline"
            size="sm"
            iconName="ZoomIn"
            iconSize={14}
            title="Zoom and pan chart"
          >
            <span className="sr-only">Zoom</span>
          </Button>
        </div>
      </div>
      {/* Metric Selection */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="BarChart3" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">
            Select Metrics:
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {currentMetrics?.map((metric) => (
            <Button
              key={metric?.id}
              variant={
                selectedMetrics?.includes(metric?.id) ? "default" : "outline"
              }
              size="sm"
              onClick={() => handleMetricToggle(metric?.id)}
              className="text-xs"
            >
              {metric?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Chart */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="month"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />

            {/* Institution Lines */}
            {selectedInstitutions?.map((instId) =>
              selectedMetrics?.map((metricId) => (
                <Line
                  key={`${instId}_${metricId}`}
                  type="monotone"
                  dataKey={`${instId}_${metricId}`}
                  stroke={institutionColors?.[instId]}
                  strokeWidth={2}
                  dot={{
                    fill: institutionColors?.[instId],
                    strokeWidth: 2,
                    r: 4,
                  }}
                  activeDot={{
                    r: 6,
                    stroke: institutionColors?.[instId],
                    strokeWidth: 2,
                  }}
                  name={`${institutionNames?.[instId]} - ${
                    currentMetrics?.find((m) => m?.id === metricId)?.label
                  }`}
                />
              ))
            )}

            {/* Benchmark Lines */}
            {showBenchmark &&
              selectedMetrics?.map((metricId) => (
                <Line
                  key={`benchmark_${metricId}`}
                  type="monotone"
                  dataKey={`benchmark_${metricId}`}
                  stroke="#64748B"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name={`Benchmark - ${
                    currentMetrics?.find((m) => m?.id === metricId)?.label
                  }`}
                />
              ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Chart Legend */}
      <div className="mt-4 p-4 bg-muted/50 rounded-lg">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedInstitutions?.map((instId) => (
            <div key={instId} className="flex items-center space-x-2">
              <div
                className="w-4 h-0.5 rounded"
                style={{ backgroundColor: institutionColors?.[instId] }}
              />
              <span className="text-sm text-foreground">
                {institutionNames?.[instId]}
              </span>
            </div>
          ))}
          {showBenchmark && (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-0.5 bg-muted-foreground rounded border-dashed border border-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Industry Benchmark
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComparisonTrendChart;
