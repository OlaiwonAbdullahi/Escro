"use client";

import {
  IconMapPin,
  IconMap,
  IconCash,
  IconChartBar,
  IconPower,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

interface QuickActionsProps {
  isOnline: boolean;
  onToggleOnline: () => void;
}

const QuickActions = ({ isOnline, onToggleOnline }: QuickActionsProps) => {
  const actions = [
    {
      label: isOnline ? "Go Offline" : "Go Online",
      icon: IconPower,
      onClick: onToggleOnline,
      primary: true,
      isOnlineToggle: true,
    },
    {
      label: "View Map",
      icon: IconMap,
      onClick: () => console.log("View Map"),
    },
    {
      label: "Cash Out",
      icon: IconCash,
      onClick: () => console.log("Cash Out"),
    },
    {
      label: "View Stats",
      icon: IconChartBar,
      onClick: () => console.log("View Stats"),
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex flex-wrap gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.label}
              onClick={action.onClick}
              variant={action.primary ? "default" : "outline"}
              className={`flex items-center gap-2 ${
                action.isOnlineToggle
                  ? isOnline
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {action.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
