"use client";

import { useState } from "react";
import {
  IconPackage,
  IconRoute,
  IconCircleCheck,
  IconCurrencyDollar,
} from "@tabler/icons-react";
import StatCard from "./_components/stat-card";
import ActiveDeliveries, {
  type ActiveDelivery,
} from "./_components/active-deliveries";

// Demo data
const demoActiveDeliveries: ActiveDelivery[] = [
  {
    id: "DEL-3421",
    isUrgent: true,
    etaMinutes: 15,
    pickup: {
      name: "TechMart Store",
      address: "123 Victoria Island, Lagos",
      distance: "2.3km",
      phone: "+234 801 234 5678",
    },
    dropoff: {
      name: "Sarah Johnson",
      address: "45 Lekki Phase 1, Lagos",
      distance: "5.7km",
      phone: "+234 802 345 6789",
    },
    estimatedDelivery: "3:30 PM (in 45 mins)",
    earnings: "₦2,500",
    items: "2 packages (fragile)",
    status: "picked_up",
  },
  {
    id: "DEL-3422",
    isUrgent: false,
    etaMinutes: 60,
    pickup: {
      name: "Fashion Hub",
      address: "78 Ikeja Mall, Lagos",
      distance: "4.1km",
      phone: "+234 803 456 7890",
    },
    dropoff: {
      name: "Mike Adeyemi",
      address: "12 Yaba Tech Road, Lagos",
      distance: "8.2km",
      phone: "+234 804 567 8901",
    },
    estimatedDelivery: "4:15 PM (in 1h 30mins)",
    earnings: "₦1,800",
    items: "1 package",
    status: "pending",
    isNext: true,
  },
];

export default function Page() {
  const [activeDeliveries, setActiveDeliveries] =
    useState(demoActiveDeliveries);

  const stats = [
    {
      title: "Available Deliveries",
      value: "12",
      subtitle: "Near you (within 5km)",
      icon: IconPackage,
      color: "blue" as const,
      notificationDot: true,
      action: {
        label: "View All Available",
        href: "/courier/deliveries",
      },
    },
    {
      title: "In Progress",
      value: "2",
      subtitle: "Active assignments",
      icon: IconRoute,
      color: "amber" as const,
      pulsing: true,
      action: {
        label: "View Active Route",
        href: "/courier/active",
      },
    },
    {
      title: "Completed Today",
      value: "8",
      subtitle: "Great job!",
      icon: IconCircleCheck,
      color: "emerald" as const,
      trend: {
        value: "+2 vs yesterday",
        isPositive: true,
      },
    },
    {
      title: "Today's Earnings",
      value: "₦15,450",
      subtitle: "Pending payout: ₦12,200",
      icon: IconCurrencyDollar,
      color: "purple" as const,
    },
  ];

  const handleStatusChange = (id: string, status: string) => {
    setActiveDeliveries((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: status as ActiveDelivery["status"] } : d
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="mb-2">
          <h1 className="text-black text-3xl font-bold mb-2 font-noto">
            Dashboard
          </h1>
          <p className="text-gray-500">
            Welcome back! Here&apos;s your delivery overview for today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              subtitle={stat.subtitle}
              icon={stat.icon}
              color={stat.color}
              notificationDot={stat.notificationDot}
              pulsing={stat.pulsing}
              action={stat.action}
              trend={stat.trend}
            />
          ))}
        </div>

        {/* Active Deliveries Section */}
        <ActiveDeliveries
          deliveries={activeDeliveries}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
}
