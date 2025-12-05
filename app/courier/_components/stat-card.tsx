"use client";

import {
  IconTrendingUp,
  IconTrendingDown,
  IconArrowRight,
} from "@tabler/icons-react";
import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ElementType;
  color: "blue" | "amber" | "emerald" | "purple";
  action?: {
    label: string;
    href: string;
  };
  trend?: {
    value: string;
    isPositive: boolean;
  };
  pulsing?: boolean;
  notificationDot?: boolean;
}

const colorStyles = {
  blue: {
    bg: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    hoverBorder: "hover:border-blue-500",
    gradient: "to-blue-50/30",
    dotColor: "bg-blue-500",
  },
  amber: {
    bg: "bg-amber-50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    hoverBorder: "hover:border-amber-500",
    gradient: "to-amber-50/30",
    dotColor: "bg-amber-500",
  },
  emerald: {
    bg: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    hoverBorder: "hover:border-emerald-500",
    gradient: "to-emerald-50/30",
    dotColor: "bg-emerald-500",
  },
  purple: {
    bg: "bg-purple-50",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    hoverBorder: "hover:border-purple-500",
    gradient: "to-purple-50/30",
    dotColor: "bg-purple-500",
  },
};

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  action,
  trend,
  pulsing = false,
  notificationDot = false,
}: StatCardProps) => {
  const styles = colorStyles[color];

  return (
    <div
      className={`group relative bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg ${styles.hoverBorder} transition-all duration-300 overflow-hidden`}
    >
      <div className="relative">
        {/* Header: Title and Icon */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wide mb-1">
              {title}
            </p>
          </div>
          <div className="relative">
            <div
              className={`${styles.iconColor} ${
                styles.iconBg
              } p-2.5 rounded-lg group-hover:scale-110 transition-transform duration-300 ${
                pulsing ? "animate-pulse" : ""
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            {notificationDot && (
              <span
                className={`absolute -top-1 -right-1 w-3 h-3 ${styles.dotColor} rounded-full border-2 border-white`}
              />
            )}
          </div>
        </div>

        {/* Value */}
        <div className="mb-2">
          <h3 className="text-gray-900 text-3xl font-bold tracking-tight font-space">
            {value}
          </h3>
        </div>

        {/* Subtitle */}
        <p className="text-gray-500 text-sm mb-3">{subtitle}</p>

        {/* Trend Indicator */}
        {trend && (
          <div className="flex items-center gap-2 mb-3">
            <div
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${
                trend.isPositive
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {trend.isPositive ? (
                <IconTrendingUp className="w-3.5 h-3.5" />
              ) : (
                <IconTrendingDown className="w-3.5 h-3.5" />
              )}
              <span className="text-xs font-semibold ">{trend.value}</span>
            </div>
          </div>
        )}

        {/* Action Link */}
        {action && (
          <button
            onClick={() => console.log(`Navigate to: ${action.href}`)}
            className={`inline-flex items-center gap-1.5 text-sm font-medium ${styles.iconColor} hover:underline transition-colors`}
          >
            {action.label}
            <IconArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default StatCard;
