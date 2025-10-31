import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

const ModelControlPanel = ({ onModelChange, onParameterChange }) => {
  const [selectedModel, setSelectedModel] = useState("ensemble");
  const [confidenceThreshold, setConfidenceThreshold] = useState(75);
  const [forecastHorizon, setForecastHorizon] = useState("6months");
  const [scenarioMode, setScenarioMode] = useState(false);

  const modelOptions = [
    {
      value: "ensemble",
      label: "Ensemble Model",
      description: "Combined ML algorithms for highest accuracy",
    },
    {
      value: "neural_network",
      label: "Neural Network",
      description: "Deep learning for complex patterns",
    },
    {
      value: "random_forest",
      label: "Random Forest",
      description: "Tree-based model for interpretability",
    },
    {
      value: "gradient_boost",
      label: "Gradient Boosting",
      description: "Optimized for prediction accuracy",
    },
  ];

  const horizonOptions = [
    { value: "1month", label: "1 Month" },
    { value: "3months", label: "3 Months" },
    { value: "6months", label: "6 Months" },
    { value: "1year", label: "1 Year" },
    { value: "2years", label: "2 Years" },
  ];

  const handleModelChange = (value) => {
    setSelectedModel(value);
    onModelChange(value);
  };

  const handleConfidenceChange = (e) => {
    const value = parseInt(e?.target?.value);
    setConfidenceThreshold(value);
    onParameterChange("confidence", value);
  };

  const handleHorizonChange = (value) => {
    setForecastHorizon(value);
    onParameterChange("horizon", value);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Model Configuration
          </h3>
          <p className="text-sm text-muted-foreground">
            Adjust prediction parameters and model settings
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${
              selectedModel ? "bg-success animate-pulse" : "bg-muted"
            }`}
          />
          <span className="text-sm text-muted-foreground">
            {selectedModel ? "Model Active" : "Model Inactive"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Model Selection */}
        <div className="space-y-2">
          <Select
            label="Prediction Model"
            description="Choose the ML algorithm for predictions"
            options={modelOptions}
            value={selectedModel}
            onChange={handleModelChange}
          />

          <div className="mt-3 p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Zap" size={14} className="text-primary" />
              <span className="text-xs font-medium text-foreground">
                Model Performance
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Accuracy:</span>
                <span className="font-medium text-success">
                  {selectedModel === "ensemble"
                    ? "87.3%"
                    : selectedModel === "neural_network"
                    ? "85.1%"
                    : selectedModel === "random_forest"
                    ? "82.7%"
                    : "84.9%"}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Precision:</span>
                <span className="font-medium text-foreground">
                  {selectedModel === "ensemble"
                    ? "89.2%"
                    : selectedModel === "neural_network"
                    ? "86.8%"
                    : selectedModel === "random_forest"
                    ? "84.3%"
                    : "87.1%"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Confidence Threshold */}
        <div className="space-y-2">
          <Input
            type="range"
            label="Confidence Threshold"
            description={`Minimum confidence level: ${confidenceThreshold}%`}
            value={confidenceThreshold}
            onChange={handleConfidenceChange}
            min="50"
            max="95"
            step="5"
          />

          <div className="mt-3 p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Target" size={14} className="text-accent" />
              <span className="text-xs font-medium text-foreground">
                Threshold Impact
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Predictions:</span>
                <span className="font-medium text-foreground">
                  {confidenceThreshold >= 90
                    ? "~200"
                    : confidenceThreshold >= 80
                    ? "~450"
                    : confidenceThreshold >= 70
                    ? "~680"
                    : "~850"}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Reliability:</span>
                <span
                  className={`font-medium ${
                    confidenceThreshold >= 85
                      ? "text-success"
                      : confidenceThreshold >= 70
                      ? "text-warning"
                      : "text-error"
                  }`}
                >
                  {confidenceThreshold >= 85
                    ? "High"
                    : confidenceThreshold >= 70
                    ? "Medium"
                    : "Low"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Forecast Horizon */}
        <div className="space-y-2">
          <Select
            label="Forecast Horizon"
            description="Prediction time range"
            options={horizonOptions}
            value={forecastHorizon}
            onChange={handleHorizonChange}
          />

          <div className="mt-3 p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={14} className="text-warning" />
              <span className="text-xs font-medium text-foreground">
                Horizon Details
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Accuracy:</span>
                <span className="font-medium text-foreground">
                  {forecastHorizon === "1month"
                    ? "92%"
                    : forecastHorizon === "3months"
                    ? "87%"
                    : forecastHorizon === "6months"
                    ? "82%"
                    : forecastHorizon === "1year"
                    ? "75%"
                    : "68%"}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Uncertainty:</span>
                <span className="font-medium text-muted-foreground">
                  ±
                  {forecastHorizon === "1month"
                    ? "3%"
                    : forecastHorizon === "3months"
                    ? "5%"
                    : forecastHorizon === "6months"
                    ? "8%"
                    : forecastHorizon === "1year"
                    ? "12%"
                    : "18%"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scenario Analysis */}
        <div className="space-y-2">
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              Scenario Analysis
            </label>
            <p className="text-xs text-muted-foreground">
              Enable what-if scenario modeling
            </p>

            <Button
              variant={scenarioMode ? "default" : "outline"}
              size="sm"
              onClick={() => setScenarioMode(!scenarioMode)}
              iconName={scenarioMode ? "ToggleRight" : "ToggleLeft"}
              iconPosition="left"
              iconSize={16}
              className="w-full justify-start"
            >
              {scenarioMode ? "Scenario Mode On" : "Scenario Mode Off"}
            </Button>
          </div>

          {scenarioMode && (
            <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Lightbulb" size={14} className="text-primary" />
                <span className="text-xs font-medium text-primary">
                  Active Scenarios
                </span>
              </div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-xs"
                >
                  + Add Intervention Scenario
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-xs"
                >
                  + Compare Cohorts
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
        <div className="flex items-center space-x-4">
          <Button
            variant="default"
            size="sm"
            iconName="Play"
            iconPosition="left"
            iconSize={14}
          >
            Run Prediction
          </Button>

          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={14}
          >
            Reset to Defaults
          </Button>
        </div>

        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Info" size={12} />
          <span>Model last trained: Oct 10, 2025</span>
        </div>
      </div>
    </div>
  );
};

export default ModelControlPanel;
