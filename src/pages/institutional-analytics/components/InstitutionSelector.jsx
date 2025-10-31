import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { Checkbox } from "../../../components/ui/Checkbox";

const InstitutionSelector = ({
  selectedInstitutions,
  onSelectionChange,
  maxSelections = 5,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const institutions = [
    {
      id: "inst_001",
      name: "MIT College of Engineering",
      code: "MIT-COE",
      type: "Engineering",
      location: "Cambridge, MA",
      students: 2847,
      established: 1861,
    },
    {
      id: "inst_002",
      name: "Stanford University",
      code: "STAN-UNIV",
      type: "University",
      location: "Stanford, CA",
      students: 3156,
      established: 1885,
    },
    {
      id: "inst_003",
      name: "Carnegie Mellon University",
      code: "CMU",
      type: "University",
      location: "Pittsburgh, PA",
      students: 2891,
      established: 1900,
    },
    {
      id: "inst_004",
      name: "UC Berkeley",
      code: "UCB",
      type: "University",
      location: "Berkeley, CA",
      students: 4523,
      established: 1868,
    },
    {
      id: "inst_005",
      name: "Georgia Tech",
      code: "GT",
      type: "Institute",
      location: "Atlanta, GA",
      students: 3687,
      established: 1885,
    },
    {
      id: "inst_006",
      name: "Caltech",
      code: "CALTECH",
      type: "Institute",
      location: "Pasadena, CA",
      students: 1234,
      established: 1891,
    },
  ];

  const handleInstitutionToggle = (institutionId) => {
    const isSelected = selectedInstitutions?.includes(institutionId);
    let newSelection;

    if (isSelected) {
      newSelection = selectedInstitutions?.filter((id) => id !== institutionId);
    } else {
      if (selectedInstitutions?.length >= maxSelections) {
        return; // Don't add if max reached
      }
      newSelection = [...selectedInstitutions, institutionId];
    }

    onSelectionChange(newSelection);
  };

  const getSelectedInstitutionNames = () => {
    return institutions
      ?.filter((inst) => selectedInstitutions?.includes(inst?.id))
      ?.map((inst) => inst?.code)
      ?.join(", ");
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        iconName="Building2"
        iconPosition="left"
        iconSize={16}
        className="min-w-64 justify-between"
      >
        <span className="truncate">
          {selectedInstitutions?.length === 0
            ? "Select Institutions"
            : `${
                selectedInstitutions?.length
              } Selected: ${getSelectedInstitutionNames()}`}
        </span>
        <Icon
          name={isOpen ? "ChevronUp" : "ChevronDown"}
          size={16}
          className="ml-2 flex-shrink-0"
        />
      </Button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-150"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-elevation-2 z-200 max-h-96 overflow-y-auto">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-foreground">
                  Select Institutions
                </h3>
                <span className="text-xs text-muted-foreground">
                  {selectedInstitutions?.length}/{maxSelections} selected
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Choose up to {maxSelections} institutions for comparison
                analysis
              </p>
            </div>

            <div className="p-2">
              {institutions?.map((institution) => {
                const isSelected = selectedInstitutions?.includes(
                  institution?.id
                );
                const isDisabled =
                  !isSelected && selectedInstitutions?.length >= maxSelections;

                return (
                  <div
                    key={institution?.id}
                    className={`p-3 rounded-lg transition-smooth ${
                      isSelected
                        ? "bg-primary/10 border border-primary/20"
                        : isDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-muted cursor-pointer"
                    }`}
                    onClick={() =>
                      !isDisabled && handleInstitutionToggle(institution?.id)
                    }
                  >
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        checked={isSelected}
                        onChange={() =>
                          !isDisabled &&
                          handleInstitutionToggle(institution?.id)
                        }
                        disabled={isDisabled}
                        className="mt-1"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-sm font-medium text-foreground truncate">
                              {institution?.name}
                            </h4>
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-muted text-muted-foreground">
                              {institution?.code}
                            </span>
                          </div>
                        </div>

                        <div className="mt-1 flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Icon name="MapPin" size={12} />
                            <span>{institution?.location}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Icon name="Users" size={12} />
                            <span>
                              {institution?.students?.toLocaleString()} students
                            </span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Icon name="Calendar" size={12} />
                            <span>Est. {institution?.established}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t border-border bg-muted/50">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSelectionChange([])}
                  disabled={selectedInstitutions?.length === 0}
                >
                  Clear All
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  Apply Selection
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InstitutionSelector;
