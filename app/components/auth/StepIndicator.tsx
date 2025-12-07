import React from "react";
import { Check, Loader2 } from "lucide-react";

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
  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full mb-12 relative z-10">
      <div className="hidden md:block">
        <div className="relative flex items-center justify-between">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full -z-10" />

          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)] rounded-full -z-10 transition-all duration-700 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />

          {steps.map((step) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            const isUpcoming = currentStep < step.number;

            return (
              <div
                key={step.number}
                className={`relative flex items-center transition-all duration-500 ${
                  isCurrent ? "flex-[2]" : "flex-none"
                }`}
              >
                <div
                  className={`
                    relative flex items-center justify-center transition-all duration-500 border
                    ${
                      isCurrent
                        ? "h-10 px-6 rounded-full bg-white border-emerald-500 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]"
                        : "h-8 w-8 rounded-full"
                    }
                    ${
                      isCompleted
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : isCurrent
                        ? "text-emerald-600"
                        : "bg-white border-gray-300 text-gray-400"
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check size={16} strokeWidth={3} />
                  ) : isCurrent ? (
                    <div className="flex items-center gap-3 whitespace-nowrap">
                      <span className="text-xs font-mono font-bold bg-emerald-100 px-2 py-0.5 rounded text-emerald-700">
                        0{step.number}
                      </span>
                      <span className="text-sm font-bold font-mont tracking-wide text-gray-900">
                        {step.title}
                      </span>

                      <span className="relative flex h-2 w-2 ml-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs font-mono font-medium">
                      0{step.number}
                    </span>
                  )}

                  {isUpcoming && (
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-500 whitespace-nowrap font-mont opacity-0 group-hover:opacity-100 transition-opacity">
                      {step.title}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-xs font-mono text-emerald-600 font-bold tracking-wider uppercase mb-1 block">
              Step 0{currentStep}
            </span>
            <h3 className="text-lg font-bold text-gray-900 font-mont leading-none">
              {steps[currentStep - 1]?.title}
            </h3>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500 font-noto">
              {Math.round((currentStep / steps.length) * 100)}% Complete
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 h-1.5 w-full">
          {steps.map((step) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;

            return (
              <div
                key={step.number}
                className={`h-full rounded-full transition-all duration-500 ${
                  isCompleted
                    ? "bg-emerald-500"
                    : isCurrent
                    ? "bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                    : "bg-gray-300"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
