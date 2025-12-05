"use client";

import {
  IconMapPin,
  IconClock,
  IconPackage,
  IconBolt,
  IconFilter,
  IconArrowRight,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface AvailableDelivery {
  id: string;
  distance: string;
  estimatedTime: string;
  earnings: string;
  pickup: {
    name: string;
    area: string;
  };
  dropoff: {
    area: string;
  };
  packages: number;
  isExpress: boolean;
}

interface AvailableDeliveriesProps {
  deliveries: AvailableDelivery[];
  totalCount: number;
  onAccept: (id: string) => void;
  onViewDetails: (id: string) => void;
}

const AvailableDeliveries = ({
  deliveries,
  totalCount,
  onAccept,
  onViewDetails,
}: AvailableDeliveriesProps) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <IconPackage className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            {totalCount} Deliveries Available Near You
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-gray-200">
            <IconFilter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Select defaultValue="distance">
            <SelectTrigger className="w-[160px] h-9 border-gray-200">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="distance">Sort by Distance</SelectItem>
              <SelectItem value="earnings">Sort by Earnings</SelectItem>
              <SelectItem value="time">Sort by Time</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            size="sm"
            className="text-emerald-600 hover:text-emerald-700"
          >
            View All
            <IconArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Delivery Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {deliveries.map((delivery) => (
          <div
            key={delivery.id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-emerald-300 transition-all"
          >
            {/* Map Thumbnail Placeholder */}
            <div className="h-24 bg-gradient-to-br from-emerald-100 to-blue-100 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <IconMapPin className="w-8 h-8 text-emerald-500 opacity-50" />
              </div>
              <div className="absolute top-2 right-2 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                <span className="text-lg font-bold text-emerald-600">
                  {delivery.earnings}
                </span>
              </div>
              {delivery.isExpress && (
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-amber-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                  <IconBolt className="w-3 h-3" />
                  Express
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {/* Distance & Time */}
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <IconMapPin className="w-4 h-4 text-gray-400" />
                  {delivery.distance}
                </span>
                <span className="text-gray-300">•</span>
                <span className="flex items-center gap-1">
                  <IconClock className="w-4 h-4 text-gray-400" />
                  {delivery.estimatedTime} delivery
                </span>
              </div>

              {/* Route */}
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="text-gray-500">From:</span>{" "}
                  <span className="font-medium text-gray-900">
                    {delivery.pickup.name}, {delivery.pickup.area}
                  </span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">To:</span>{" "}
                  <span className="font-medium text-gray-900">
                    {delivery.dropoff.area}
                  </span>
                </p>
              </div>

              {/* Package Info */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <IconPackage className="w-4 h-4 text-gray-400" />
                {delivery.packages} package{delivery.packages > 1 ? "s" : ""}
                {delivery.isExpress && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className="flex items-center gap-1 text-amber-600 font-medium">
                      <IconBolt className="w-3.5 h-3.5" />
                      Express delivery
                    </span>
                  </>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => onAccept(delivery.id)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Accept Delivery
                </Button>
                <Button
                  onClick={() => onViewDetails(delivery.id)}
                  variant="outline"
                  className="border-gray-200"
                >
                  Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableDeliveries;
