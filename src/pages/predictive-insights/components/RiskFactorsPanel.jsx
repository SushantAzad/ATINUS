import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const RiskFactorsPanel = ({
  riskFactors,
  interventions,
  successProbabilities,
}) => {
  return (
    <div className="space-y-6">
      {/* Risk Factors Ranking */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Top Risk Factors
          </h3>
          <Icon name="AlertTriangle" size={20} className="text-warning" />
        </div>

        <div className="space-y-4">
          {riskFactors?.map((factor, index) => (
            <div key={factor?.id} className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index === 0
                    ? "bg-error text-error-foreground"
                    : index === 1
                    ? "bg-warning text-warning-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {index + 1}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">
                    {factor?.name}
                  </span>
                  <span className="text-sm font-medium text-error">
                    {factor?.impact}%
                  </span>
                </div>

                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      factor?.impact > 70
                        ? "bg-error"
                        : factor?.impact > 40
                        ? "bg-warning"
                        : "bg-muted-foreground"
                    }`}
                    style={{ width: `${factor?.impact}%` }}
                  />
                </div>

                <p className="text-xs text-muted-foreground mt-1">
                  {factor?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recommended Interventions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Recommended Interventions
          </h3>
          <Icon name="Target" size={20} className="text-success" />
        </div>

        <div className="space-y-4">
          {interventions?.map((intervention) => (
            <div
              key={intervention?.id}
              className="border border-border rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon
                    name={intervention?.icon}
                    size={16}
                    className="text-primary"
                  />
                  <span className="text-sm font-medium text-foreground">
                    {intervention?.title}
                  </span>
                </div>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                    intervention?.priority === "high"
                      ? "bg-error/10 text-error"
                      : intervention?.priority === "medium"
                      ? "bg-warning/10 text-warning"
                      : "bg-success/10 text-success"
                  }`}
                >
                  {intervention?.priority} priority
                </span>
              </div>

              <p className="text-xs text-muted-foreground mb-3">
                {intervention?.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-xs">
                    <span className="text-muted-foreground">Impact: </span>
                    <span className="font-medium text-success">
                      +{intervention?.expectedImprovement}%
                    </span>
                  </div>
                  <div className="text-xs">
                    <span className="text-muted-foreground">Timeline: </span>
                    <span className="font-medium text-foreground">
                      {intervention?.timeline}
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  iconName="ArrowRight"
                  iconPosition="right"
                  iconSize={12}
                >
                  Apply
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Success Probability Improvements */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Probability Improvements
          </h3>
          <Icon name="TrendingUp" size={20} className="text-success" />
        </div>

        <div className="space-y-4">
          {successProbabilities?.map((prob) => (
            <div
              key={prob?.id}
              className="flex items-center justify-between p-3 bg-muted rounded-lg"
            >
              <div>
                <span className="text-sm font-medium text-foreground">
                  {prob?.scenario}
                </span>
                <p className="text-xs text-muted-foreground">
                  {prob?.description}
                </p>
              </div>

              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {prob?.current}%
                  </span>
                  <Icon
                    name="ArrowRight"
                    size={12}
                    className="text-muted-foreground"
                  />
                  <span className="text-sm font-medium text-success">
                    {prob?.improved}%
                  </span>
                </div>
                <div className="flex items-center space-x-1 mt-1">
                  <Icon name="TrendingUp" size={12} className="text-success" />
                  <span className="text-xs text-success">
                    +{prob?.improvement}%
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({prob?.confidence}% confidence)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskFactorsPanel;
