import { LucideIcon } from "lucide-react";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard = ({ title, value, icon: Icon, change }: StatCardProps) => {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-emerald-500 transition-all duration-300 overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-emerald-50/0 via-emerald-50/0 to-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative">
        {/* Header: Title and Icon */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wide mb-1">
              {title}
            </p>
          </div>
          <div
            className={`text-emerald-500 bg-emerald-50 p-2.5 rounded-lg group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="w-5 h-5" strokeWidth={2} />
          </div>
        </div>

        {/* Value */}
        <div className="mb-3">
          <h3 className="text-gray-900 text-4xl font-space font-bold tracking-tight">
            {value}
          </h3>
        </div>

        {/* Change Indicator */}
        {change && (
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${
                change.isPositive
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {change.isPositive ? (
                <IconTrendingUp className="w-3.5 h-3.5" />
              ) : (
                <IconTrendingDown className="w-3.5 h-3.5" />
              )}
              <span className="text-xs font-semibold">
                {change.isPositive ? "+" : ""}
                {change.value}%
              </span>
            </div>
            <span className="text-gray-400 text-xs font-medium">
              vs last period
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
