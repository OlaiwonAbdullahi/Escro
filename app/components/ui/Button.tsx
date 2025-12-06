import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  children,
  icon,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-mont disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-gradient-to-r from-[#10B981] to-[#059669] text-white hover:shadow-lg hover:shadow-emerald-500/50 hover:scale-105",
    secondary:
      "bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white hover:shadow-lg hover:shadow-amber-500/50 hover:scale-105",
    outline:
      "bg-transparent border-2 border-[#10B981] text-[#10B981] hover:bg-[#10B981] hover:text-white",
    ghost: "bg-transparent text-[#10B981] hover:bg-[#10B981]/10",
    danger:
      "bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white hover:shadow-lg hover:shadow-red-500/50 hover:scale-105",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 size={20} className="animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
