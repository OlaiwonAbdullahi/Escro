import React, { forwardRef } from "react";
import { ChevronDown, AlertCircle } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      placeholder,
      required,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label className="block text-sm font-semibold text-gray-300 mb-2 font-mont">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            className={`
              w-full px-4 py-3 pr-10
              bg-[#1F2937] 
              border-2 
              ${error ? "border-red-500" : "border-[#10B981]/20"} 
              rounded-lg 
              text-white 
              focus:outline-none 
              focus:border-[#10B981] 
              transition-colors 
              font-noto
              appearance-none
              cursor-pointer
              ${className}
            `}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-[#1F2937] text-white"
              >
                {option.label}
              </option>
            ))}
          </select>

          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            {error ? (
              <AlertCircle size={20} className="text-red-500" />
            ) : (
              <ChevronDown size={20} className="text-gray-400" />
            )}
          </div>
        </div>

        {error && (
          <p className="mt-1 text-sm text-red-500 font-noto flex items-center gap-1">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-400 font-noto">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
