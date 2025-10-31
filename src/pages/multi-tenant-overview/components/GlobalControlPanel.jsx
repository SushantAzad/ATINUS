import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const GlobalControlPanel = ({
  selectedInstitutions,
  onInstitutionChange,
  selectedRound,
  onRoundChange,
  dateRange,
  onDateRangeChange,
  onRefresh,
  isRefreshing,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const institutions = [
    { id: "all", name: "All Institutions", count: 24 },
    { id: "mit-chennai", name: "MIT Chennai", count: 1250 },
    { id: "vit-vellore", name: "VIT Vellore", count: 2100 },
    { id: "srm-university", name: "SRM University", count: 1800 },
    { id: "anna-university", name: "Anna University", count: 3200 },
    { id: "psg-coimbatore", name: "PSG Coimbatore", count: 950 },
  ];

  const assessmentRounds = [
    { id: "all", name: "All Rounds" },
    { id: "round1", name: "Round 1: Aptitude" },
    { id: "round2", name: "Round 2: Coding" },
    { id: "round3", name: "Round 3: AI Interview" },
  ];

  const datePresets = [
    { id: "today", name: "Today", days: 0 },
    { id: "week", name: "Last 7 days", days: 7 },
    { id: "month", name: "Last 30 days", days: 30 },
    { id: "quarter", name: "Last 90 days", days: 90 },
    { id: "semester", name: "Current Semester", days: 120 },
    { id: "year", name: "Academic Year", days: 365 },
  ];

  const handleInstitutionToggle = (institutionId) => {
    if (institutionId === "all") {
      onInstitutionChange(["all"]);
    } else {
      const newSelection = selectedInstitutions?.includes("all")
        ? [institutionId]
        : selectedInstitutions?.includes(institutionId)
        ? selectedInstitutions?.filter((id) => id !== institutionId)
        : [
            ...selectedInstitutions?.filter((id) => id !== "all"),
            institutionId,
          ];

      onInstitutionChange(newSelection?.length === 0 ? ["all"] : newSelection);
    }
  };

  const getSelectedCount = () => {
    if (selectedInstitutions?.includes("all")) return "All";
    return selectedInstitutions?.length;
  };

  return (
    <div className="bg-background border-b border-border">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-foreground">
              Multi-Tenant Overview
            </h2>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={14} />
              <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
              <div
                className={`w-2 h-2 rounded-full ${
                  isRefreshing ? "bg-warning animate-pulse" : "bg-success"
                }`}
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              iconName="Filter"
              iconPosition="left"
              iconSize={14}
            >
              Filters
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              loading={isRefreshing}
              iconName="RefreshCw"
              iconPosition="left"
              iconSize={14}
            >
              Refresh
            </Button>

            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              iconSize={14}
            >
              Export
            </Button>
          </div>
        </div>

        <div
          className={`transition-all duration-300 overflow-hidden ${
            showFilters ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 bg-muted/30 rounded-lg">
            {/* Institution Filter */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Institutions ({getSelectedCount()} selected)
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {institutions?.map((institution) => (
                  <label
                    key={institution?.id}
                    className="flex items-center space-x-3 p-2 rounded-md hover:bg-background cursor-pointer transition-smooth"
                  >
                    <input
                      type="checkbox"
                      checked={selectedInstitutions?.includes(institution?.id)}
                      onChange={() => handleInstitutionToggle(institution?.id)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-sm text-foreground">
                        {institution?.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {institution?.count?.toLocaleString()}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Assessment Round Filter */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Assessment Round
              </label>
              <div className="space-y-2">
                {assessmentRounds?.map((round) => (
                  <label
                    key={round?.id}
                    className="flex items-center space-x-3 p-2 rounded-md hover:bg-background cursor-pointer transition-smooth"
                  >
                    <input
                      type="radio"
                      name="assessmentRound"
                      value={round?.id}
                      checked={selectedRound === round?.id}
                      onChange={(e) => onRoundChange(e?.target?.value)}
                      className="w-4 h-4 text-primary border-border focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">
                      {round?.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date Range Filter */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Time Period
              </label>
              <div className="grid grid-cols-2 gap-2">
                {datePresets?.map((preset) => (
                  <button
                    key={preset?.id}
                    onClick={() => onDateRangeChange(preset?.id)}
                    className={`p-2 text-xs font-medium rounded-md transition-smooth text-left ${
                      dateRange === preset?.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-foreground hover:bg-muted"
                    }`}
                  >
                    {preset?.name}
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-border">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    className="px-3 py-2 text-xs bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Start date"
                  />
                  <input
                    type="date"
                    className="px-3 py-2 text-xs bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="End date"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="flex items-center justify-between mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Building2" size={14} className="text-primary" />
              <span className="text-muted-foreground">
                Active Institutions:
              </span>
              <span className="font-medium text-foreground">
                {selectedInstitutions?.includes("all")
                  ? "24"
                  : selectedInstitutions?.length}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={14} className="text-accent" />
              <span className="text-muted-foreground">Total Students:</span>
              <span className="font-medium text-foreground">12,847</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Activity" size={14} className="text-success" />
              <span className="text-muted-foreground">Active Sessions:</span>
              <span className="font-medium text-foreground">1,234</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Zap" size={12} />
            <span>Real-time data</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalControlPanel;
