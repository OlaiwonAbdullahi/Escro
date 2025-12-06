import React, { forwardRef } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, helperText, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="flex items-center space-x-3 cursor-pointer group">
          <input
            ref={ref}
            type="checkbox"
            className={`
              w-5 h-5 
              text-[#10B981] 
              bg-gray-700 
              border-2
              ${error ? "border-red-500" : "border-gray-600"}
              rounded 
              focus:ring-2
              focus:ring-[#10B981] 
              focus:ring-offset-0
              transition-all
              cursor-pointer
              ${className}
            `}
            {...props}
          />
          {label && (
            <span className="text-sm text-gray-300 font-noto group-hover:text-white transition-colors select-none">
              {label}
            </span>
          )}
        </label>

        {/* Error Message */}
        {error && (
          <p className="mt-1 text-sm text-red-500 font-noto ml-8">{error}</p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-400 font-noto ml-8">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
