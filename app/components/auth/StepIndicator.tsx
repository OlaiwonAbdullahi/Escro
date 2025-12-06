import React from "react";
import { Check } from "lucide-react";

interface Step {
  number: number;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <div className="w-full mb-8">
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            const isUpcoming = currentStep < step.number;

            return (
              <React.Fragment key={step.number}>
                {/* Step Item */}
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center 
                      border-2 transition-all duration-300 font-mont font-bold
                      ${
                        isCompleted
                          ? "bg-[#10B981] border-[#10B981] text-white"
                          : isCurrent
                          ? "bg-[#10B981]/20 border-[#10B981] text-[#10B981] scale-110 shadow-lg shadow-emerald-500/50"
                          : "bg-[#1F2937] border-gray-600 text-gray-500"
                      }
                    `}
                  >
                    {isCompleted ? (
                      <Check size={24} />
                    ) : (
                      <span>{step.number}</span>
                    )}
                  </div>

                  <div className="mt-3 text-center">
                    <p
                      className={`
                        text-sm font-semibold font-mont
                        ${
                          isCompleted || isCurrent
                            ? "text-white"
                            : "text-gray-500"
                        }
                      `}
                    >
                      {step.title}
                    </p>
                    <p
                      className={`
                        text-xs mt-1 font-noto
                        ${
                          isCompleted || isCurrent
                            ? "text-gray-400"
                            : "text-gray-600"
                        }
                      `}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-4 mb-8">
                    <div
                      className={`
                        h-full transition-all duration-500
                        ${
                          currentStep > step.number
                            ? "bg-[#10B981]"
                            : "bg-gray-600"
                        }
                      `}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;

            return (
              <React.Fragment key={step.number}>
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center 
                    border-2 transition-all duration-300 font-mont font-bold text-sm
                    ${
                      isCompleted
                        ? "bg-[#10B981] border-[#10B981] text-white"
                        : isCurrent
                        ? "bg-[#10B981]/20 border-[#10B981] text-[#10B981] scale-110"
                        : "bg-[#1F2937] border-gray-600 text-gray-500"
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check size={18} />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-2">
                    <div
                      className={`
                        h-full transition-all duration-500
                        ${
                          currentStep > step.number
                            ? "bg-[#10B981]"
                            : "bg-gray-600"
                        }
                      `}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-base font-semibold text-white font-mont">
            {steps[currentStep - 1]?.title}
          </p>
          <p className="text-sm text-gray-400 mt-1 font-noto">
            {steps[currentStep - 1]?.description}
          </p>
        </div>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-400 font-noto">
            Step {currentStep} of {steps.length}
          </span>
        </div>
      </div>

      <div className="md:hidden mt-4">
        <div className="w-full bg-gray-600 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-[#10B981] to-[#059669] h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
