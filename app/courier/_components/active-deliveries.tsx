"use client";

import {
  IconMapPin,
  IconPhone,
  IconNavigation,
  IconPackage,
  IconClock,
  IconCurrencyNaira,
  IconAlertCircle,
  IconCheck,
  IconTruck,
  IconCircleDot,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface ActiveDelivery {
  id: string;
  isUrgent: boolean;
  etaMinutes: number;
  pickup: {
    name: string;
    address: string;
    distance: string;
    phone: string;
  };
  dropoff: {
    name: string;
    address: string;
    distance: string;
    phone: string;
  };
  estimatedDelivery: string;
  earnings: string;
  items: string;
  status: "pending" | "picked_up" | "in_transit" | "nearby" | "delivered";
  isNext?: boolean;
}

interface ActiveDeliveriesProps {
  deliveries: ActiveDelivery[];
  onStatusChange: (id: string, status: string) => void;
}

const statusOptions = [
  { value: "picked_up", label: "Picked Up", icon: IconPackage },
  { value: "in_transit", label: "In Transit", icon: IconTruck },
  { value: "nearby", label: "Nearby (2 mins away)", icon: IconCircleDot },
  { value: "delivered", label: "Delivered", icon: IconCheck },
  { value: "issue", label: "Report Issue", icon: IconAlertCircle },
];

const statusColors = {
  pending: "bg-gray-100 text-gray-700",
  picked_up: "bg-amber-100 text-amber-700",
  in_transit: "bg-blue-100 text-blue-700",
  nearby: "bg-purple-100 text-purple-700",
  delivered: "bg-emerald-100 text-emerald-700",
};

const statusLabels = {
  pending: "Pending Pickup",
  picked_up: "Picked Up",
  in_transit: "In Transit",
  nearby: "Nearby",
  delivered: "Delivered",
};

const ActiveDeliveries = ({
  deliveries,
  onStatusChange,
}: ActiveDeliveriesProps) => {
  if (deliveries.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-amber-100 rounded-lg">
          <IconTruck className="w-5 h-5 text-amber-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">
          Your Active Deliveries ({deliveries.length})
        </h2>
      </div>

      <div className="space-y-4">
        {deliveries.map((delivery, index) => (
          <div
            key={delivery.id}
            className={`bg-white border rounded-xl overflow-hidden transition-all ${
              delivery.isNext
                ? "border-gray-200 opacity-75"
                : delivery.isUrgent
                ? "border-red-300 shadow-md"
                : "border-emerald-200"
            }`}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between px-4 py-3 ${
                delivery.isUrgent ? "bg-red-50" : "bg-emerald-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">
                  Delivery #{delivery.id}
                </span>
                {delivery.isNext && (
                  <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs font-medium rounded-full">
                    Next Delivery
                  </span>
                )}
              </div>
              {delivery.isUrgent && (
                <span className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full animate-pulse">
                  🔴 URGENT - {delivery.etaMinutes} min ETA
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Pickup Location */}
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="p-1.5 bg-blue-100 rounded-md mt-0.5">
                    <IconMapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      Pickup: {delivery.pickup.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {delivery.pickup.address}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <button className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline">
                        <IconPhone className="w-3.5 h-3.5" />
                        Call Store
                      </button>
                      <button className="inline-flex items-center gap-1 text-xs text-emerald-600 hover:underline">
                        <IconNavigation className="w-3.5 h-3.5" />
                        Navigate ({delivery.pickup.distance} away)
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Location */}
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="p-1.5 bg-emerald-100 rounded-md mt-0.5">
                    <IconMapPin className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      Deliver to: {delivery.dropoff.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {delivery.dropoff.address}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <button className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline">
                        <IconPhone className="w-3.5 h-3.5" />
                        Call Customer
                      </button>
                      <button className="inline-flex items-center gap-1 text-xs text-emerald-600 hover:underline">
                        <IconNavigation className="w-3.5 h-3.5" />
                        Navigate ({delivery.dropoff.distance})
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Row */}
              <div className="flex flex-wrap gap-4 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <IconClock className="w-4 h-4 text-gray-400" />
                  Est: {delivery.estimatedDelivery}
                </div>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                  <IconCurrencyNaira className="w-4 h-4" />
                  {delivery.earnings}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <IconPackage className="w-4 h-4 text-gray-400" />
                  {delivery.items}
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Status:</span>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    statusColors[delivery.status]
                  }`}
                >
                  {statusLabels[delivery.status]}
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Select
                  value={delivery.status}
                  onValueChange={(value) => onStatusChange(delivery.id, value)}
                >
                  <SelectTrigger className="w-[180px] h-10 border-gray-200">
                    <div className="flex items-center gap-2">
                      <IconTruck className="w-4 h-4" />
                      <SelectValue placeholder="Update Status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            {option.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>

                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <IconNavigation className="w-4 h-4 mr-2" />
                  Start Navigation
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveDeliveries;
