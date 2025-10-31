import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";

const TimePeriodControls = ({
  selectedPeriod,
  onPeriodChange,
  customRange,
  onCustomRangeChange,
}) => {
  const [showCustomRange, setShowCustomRange] = useState(false);

  const academicYearPresets = [
    { value: "current", label: "Current Academic Year (2024-25)" },
    { value: "previous", label: "Previous Academic Year (2023-24)" },
    { value: "last_semester", label: "Last Semester (Fall 2024)" },
    { value: "current_semester", label: "Current Semester (Spring 2025)" },
    { value: "last_quarter", label: "Last Quarter (Q4 2024)" },
    { value: "last_month", label: "Last Month" },
    { value: "last_week", label: "Last Week" },
    { value: "custom", label: "Custom Range" },
  ];

  const quickFilters = [
    { id: "ytd", label: "YTD", description: "Year to Date" },
    { id: "qtd", label: "QTD", description: "Quarter to Date" },
    { id: "mtd", label: "MTD", description: "Month to Date" },
    { id: "l30d", label: "30D", description: "Last 30 Days" },
  ];

  const handlePeriodChange = (value) => {
    onPeriodChange(value);
    setShowCustomRange(value === "custom");
  };

  const handleCustomRangeUpdate = (field, value) => {
    onCustomRangeChange({
      ...customRange,
      [field]: value,
    });
  };

  return (
    <div className="space-y-4">
      {/* Main Period Selector */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Select
            label="Time Period"
            options={academicYearPresets}
            value={selectedPeriod}
            onChange={handlePeriodChange}
            className="min-w-64"
          />
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Quick:</span>
          {quickFilters?.map((filter) => (
            <Button
              key={filter?.id}
              variant={selectedPeriod === filter?.id ? "default" : "outline"}
              size="sm"
              onClick={() => handlePeriodChange(filter?.id)}
              className="min-w-12"
              title={filter?.description}
            >
              {filter?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Custom Date Range */}
      {showCustomRange && (
        <div className="p-4 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-foreground mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={customRange?.startDate || ""}
                onChange={(e) =>
                  handleCustomRangeUpdate("startDate", e?.target?.value)
                }
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="flex items-center justify-center pt-6">
              <Icon
                name="ArrowRight"
                size={16}
                className="text-muted-foreground"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-foreground mb-2">
                End Date
              </label>
              <input
                type="date"
                value={customRange?.endDate || ""}
                onChange={(e) =>
                  handleCustomRangeUpdate("endDate", e?.target?.value)
                }
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="pt-6">
              <Button
                variant="outline"
                size="sm"
                iconName="Calendar"
                iconPosition="left"
                iconSize={14}
                onClick={() => {
                  // Apply custom range logic
                  console.log("Applying custom range:", customRange);
                }}
              >
                Apply
              </Button>
            </div>
          </div>

          <div className="mt-3 flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Info" size={12} />
            <span>
              Custom range allows historical data analysis up to 3 years back.
              Data availability may vary by institution.
            </span>
          </div>
        </div>
      )}
      {/* Period Summary */}
      <div className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
        <div className="flex items-center space-x-3">
          <Icon name="Calendar" size={16} className="text-primary" />
          <div>
            <div className="text-sm font-medium text-foreground">
              {academicYearPresets?.find((p) => p?.value === selectedPeriod)
                ?.label || "Custom Period"}
            </div>
            <div className="text-xs text-muted-foreground">
              Data last updated: {new Date()?.toLocaleDateString()} at{" "}
              {new Date()?.toLocaleTimeString()}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="RefreshCw"
            iconSize={14}
            title="Refresh data for selected period"
          >
            <span className="sr-only">Refresh</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            iconName="Download"
            iconSize={14}
            title="Export period data"
          >
            <span className="sr-only">Export</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimePeriodControls;
