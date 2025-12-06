import React, { forwardRef } from "react";
import { AlertCircle } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, helperText, icon, required, className = "", ...props },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-gray-300 mb-2 font-mont">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {/* Icon */}
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            className={`
              w-full px-4 py-3 
              ${icon ? "pl-10" : ""}
              bg-[#1F2937] 
              border-2 
              ${error ? "border-red-500" : "border-[#10B981]/20"} 
              rounded-lg 
              text-white 
              placeholder-gray-500 
              focus:outline-none 
              focus:border-[#10B981] 
              transition-colors 
              font-noto
              ${className}
            `}
            {...props}
          />

          {error && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
              <AlertCircle size={20} />
            </div>
          )}
        </div>

        {error && (
          <p className="mt-1 text-sm text-red-500 font-noto flex items-center gap-1">
            {error}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-400 font-noto">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
