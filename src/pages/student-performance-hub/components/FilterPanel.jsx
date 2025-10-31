import React, { useState } from "react";

import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

const FilterPanel = ({
  onFiltersChange,
  savedViews,
  onSaveView,
  onLoadView,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    assessmentRound: "all",
    performanceThreshold: "all",
    classBatch: "all",
    riskLevel: "all",
    completionStatus: "all",
    college: "all",
  });

  const assessmentRounds = [
    { value: "all", label: "All Rounds" },
    { value: "round1", label: "Round 1 - Aptitude" },
    { value: "round2", label: "Round 2 - Coding" },
    { value: "round3", label: "Round 3 - AI Interview" },
  ];

  const performanceThresholds = [
    { value: "all", label: "All Performance Levels" },
    { value: "excellent", label: "Excellent (90%+)" },
    { value: "good", label: "Good (70-89%)" },
    { value: "average", label: "Average (50-69%)" },
    { value: "below-average", label: "Below Average (<50%)" },
  ];

  const classBatches = [
    { value: "all", label: "All Batches" },
    { value: "batch-2024-a", label: "Batch 2024-A" },
    { value: "batch-2024-b", label: "Batch 2024-B" },
    { value: "batch-2023-c", label: "Batch 2023-C" },
    { value: "batch-2023-d", label: "Batch 2023-D" },
  ];

  const riskLevels = [
    { value: "all", label: "All Risk Levels" },
    { value: "low", label: "Low Risk" },
    { value: "medium", label: "Medium Risk" },
    { value: "high", label: "High Risk" },
  ];

  const completionStatuses = [
    { value: "all", label: "All Statuses" },
    { value: "completed", label: "Completed All" },
    { value: "in-progress", label: "In Progress" },
    { value: "not-started", label: "Not Started" },
    { value: "dropped", label: "Dropped Out" },
  ];

  const colleges = [
    { value: "all", label: "All Colleges" },
    { value: "mit-college", label: "MIT College of Engineering" },
    { value: "stanford-tech", label: "Stanford Technical Institute" },
    { value: "berkeley-cs", label: "Berkeley Computer Science" },
    { value: "carnegie-tech", label: "Carnegie Technical University" },
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      search: "",
      assessmentRound: "all",
      performanceThreshold: "all",
      classBatch: "all",
      riskLevel: "all",
      completionStatus: "all",
      college: "all",
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(filters)?.filter(
      (value) => value !== "all" && value !== ""
    )?.length;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 mb-6">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconPosition="left"
              iconSize={16}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              Filters & Search
            </Button>
            {getActiveFilterCount() > 0 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {getActiveFilterCount()} active
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="RotateCcw"
              iconPosition="left"
              iconSize={14}
              onClick={handleReset}
              disabled={getActiveFilterCount() === 0}
            >
              Reset
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Bookmark"
              iconPosition="left"
              iconSize={14}
              onClick={() => onSaveView(filters)}
            >
              Save View
            </Button>
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Search and Quick Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              label="Search Students"
              type="search"
              placeholder="Search by name, ID, or email..."
              value={filters?.search}
              onChange={(e) => handleFilterChange("search", e?.target?.value)}
              className="col-span-full md:col-span-2"
            />

            <Select
              label="Assessment Round"
              options={assessmentRounds}
              value={filters?.assessmentRound}
              onChange={(value) => handleFilterChange("assessmentRound", value)}
            />

            <Select
              label="Performance Level"
              options={performanceThresholds}
              value={filters?.performanceThreshold}
              onChange={(value) =>
                handleFilterChange("performanceThreshold", value)
              }
            />
          </div>

          {/* Advanced Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Class/Batch"
              options={classBatches}
              value={filters?.classBatch}
              onChange={(value) => handleFilterChange("classBatch", value)}
            />

            <Select
              label="Risk Level"
              options={riskLevels}
              value={filters?.riskLevel}
              onChange={(value) => handleFilterChange("riskLevel", value)}
            />

            <Select
              label="Completion Status"
              options={completionStatuses}
              value={filters?.completionStatus}
              onChange={(value) =>
                handleFilterChange("completionStatus", value)
              }
            />

            <Select
              label="College"
              options={colleges}
              value={filters?.college}
              onChange={(value) => handleFilterChange("college", value)}
            />
          </div>

          {/* Saved Views */}
          {savedViews && savedViews?.length > 0 && (
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Saved Views
              </label>
              <div className="flex flex-wrap gap-2">
                {savedViews?.map((view) => (
                  <Button
                    key={view?.id}
                    variant="outline"
                    size="sm"
                    iconName="Eye"
                    iconPosition="left"
                    iconSize={12}
                    onClick={() => onLoadView(view)}
                  >
                    {view?.name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="pt-4 border-t border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-foreground">1,247</div>
                <div className="text-xs text-muted-foreground">
                  Total Students
                </div>
              </div>
              <div>
                <div className="text-lg font-bold text-success">892</div>
                <div className="text-xs text-muted-foreground">Active</div>
              </div>
              <div>
                <div className="text-lg font-bold text-warning">234</div>
                <div className="text-xs text-muted-foreground">At Risk</div>
              </div>
              <div>
                <div className="text-lg font-bold text-error">121</div>
                <div className="text-xs text-muted-foreground">
                  Need Intervention
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
