"use client";

import {
  IconCheck,
  IconChecks,
  IconClock,
  IconPackage,
  IconX,
} from "@tabler/icons-react";

interface OrderStats {
  total: number;
  pending: number;
  completed: number;
  cancelled: number;
}

interface OrderStatsProps {
  stats: OrderStats;
}

const OrderStatsBar = ({ stats }: OrderStatsProps) => {
  const statItems = [
    {
      label: "Total Orders",
      value: stats.total,
      icon: IconPackage,
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: IconClock,
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: IconChecks,
    },
    {
      label: "Cancelled",
      value: stats.cancelled,
      icon: IconX,
    },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {statItems.map((item) => (
        <div
          key={item.label}
          className={`bg-emerald-500/10 border-emerald-500/20 border px-4 py-2.5 rounded-sm flex items-center gap-2.5 transition-all hover:shadow-sm`}
        >
          <item.icon className={`w-5 h-5  text-emerald-500`} />
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium text-emerald-500`}>
              {item.label}:
            </span>
            <span className={`text-lg font-bold text-emerald-500`}>
              {item.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatsBar;
