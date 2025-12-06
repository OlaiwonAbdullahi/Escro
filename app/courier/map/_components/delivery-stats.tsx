"use client";

import {
  IconPackage,
  IconTruck,
  IconCheck,
  IconCurrencyNaira,
  IconMapPin,
} from "@tabler/icons-react";

interface DeliveryStatsProps {
  totalDeliveries: number;
  activeDeliveries: number;
  completedDeliveries: number;
  totalEarnings: string;
  distanceRemaining?: string;
}

const DeliveryStats = ({
  totalDeliveries,
  activeDeliveries,
  completedDeliveries,
  totalEarnings,
  distanceRemaining,
}: DeliveryStatsProps) => {
  const stats = [
    {
      label: "Total",
      value: totalDeliveries,
      icon: IconPackage,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Active",
      value: activeDeliveries,
      icon: IconTruck,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      label: "Done",
      value: completedDeliveries,
      icon: IconCheck,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      label: "Earnings",
      value: totalEarnings,
      icon: IconCurrencyNaira,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      isEarnings: true,
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">
          Today&apos;s Progress
        </h3>
        {distanceRemaining && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <IconMapPin className="w-3.5 h-3.5" />
            {distanceRemaining} remaining
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div
              className={`w-10 h-10 mx-auto rounded-lg ${stat.bgColor} flex items-center justify-center mb-2`}
            >
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="font-bold text-gray-900 text-lg">
              {stat.isEarnings ? (
                <span className="text-sm">{stat.value}</span>
              ) : (
                stat.value
              )}
            </div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">Completion Progress</span>
          <span className="text-xs font-semibold text-emerald-600">
            {totalDeliveries > 0
              ? Math.round((completedDeliveries / totalDeliveries) * 100)
              : 0}
            %
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
            style={{
              width:
                totalDeliveries > 0
                  ? `${(completedDeliveries / totalDeliveries) * 100}%`
                  : "0%",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DeliveryStats;
