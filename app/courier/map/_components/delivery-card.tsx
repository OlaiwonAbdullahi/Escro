"use client";

import {
  IconMapPin,
  IconPhone,
  IconNavigation,
  IconPackage,
  IconClock,
  IconCurrencyNaira,
  IconChevronRight,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { DeliveryPoint } from "./delivery-map";

interface DeliveryCardProps {
  delivery: DeliveryPoint;
  isSelected: boolean;
  onSelect: () => void;
  onNavigate: () => void;
  onCall?: () => void;
  onComplete?: () => void;
  onCancel?: () => void;
  showActions?: boolean;
}

const DeliveryCard = ({
  delivery,
  isSelected,
  onSelect,
  onNavigate,
  onCall,
  onComplete,
  onCancel,
  showActions = true,
}: DeliveryCardProps) => {
  const isPickup = delivery.type === "pickup";
  const isCompleted = delivery.status === "completed";
  const isUrgent = delivery.isUrgent;

  return (
    <div
      onClick={onSelect}
      className={`
        relative p-4 rounded-xl cursor-pointer transition-all duration-300 group
        ${
          isSelected
            ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30 scale-[1.02]"
            : "bg-white hover:bg-gray-50 border border-gray-200 hover:border-emerald-200 hover:shadow-md"
        }
        ${isCompleted ? "opacity-60" : ""}
      `}
    >
      {/* Urgent Badge */}
      {isUrgent && !isCompleted && (
        <div className="absolute -top-2 -right-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse shadow-lg">
          URGENT
        </div>
      )}

      {/* Completed Badge */}
      {isCompleted && (
        <div className="absolute -top-2 -right-2 px-2 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
          <IconCheck className="w-3 h-3" />
          Done
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`p-2 rounded-lg ${
              isSelected
                ? "bg-white/20"
                : isPickup
                ? "bg-blue-100"
                : "bg-emerald-100"
            }`}
          >
            {isPickup ? (
              <IconPackage
                className={`w-5 h-5 ${
                  isSelected ? "text-white" : "text-blue-600"
                }`}
              />
            ) : (
              <IconMapPin
                className={`w-5 h-5 ${
                  isSelected ? "text-white" : "text-emerald-600"
                }`}
              />
            )}
          </div>
          <div>
            <span
              className={`text-xs font-semibold uppercase tracking-wide ${
                isSelected ? "text-emerald-100" : "text-gray-500"
              }`}
            >
              {isPickup ? "Pickup" : "Dropoff"}
            </span>
            <h3
              className={`font-bold ${
                isSelected ? "text-white" : "text-gray-900"
              }`}
            >
              {delivery.name}
            </h3>
          </div>
        </div>
        <IconChevronRight
          className={`w-5 h-5 transition-transform ${
            isSelected
              ? "text-white rotate-90"
              : "text-gray-400 group-hover:translate-x-1"
          }`}
        />
      </div>

      {/* Address */}
      <p
        className={`text-sm mb-3 ${
          isSelected ? "text-emerald-100" : "text-gray-600"
        }`}
      >
        {delivery.address}
      </p>

      {/* Info Row */}
      <div className="flex flex-wrap items-center gap-3 mb-3">
        {delivery.estimatedTime && (
          <div
            className={`flex items-center gap-1 text-xs font-medium ${
              isSelected ? "text-white" : "text-gray-600"
            }`}
          >
            <IconClock className="w-3.5 h-3.5" />
            {delivery.estimatedTime}
          </div>
        )}
        {delivery.earnings && (
          <div
            className={`flex items-center gap-1 text-xs font-bold ${
              isSelected ? "text-white" : "text-emerald-600"
            }`}
          >
            <IconCurrencyNaira className="w-3.5 h-3.5" />
            {delivery.earnings}
          </div>
        )}
      </div>

      {/* Actions */}
      {showActions && !isCompleted && (
        <div
          className={`flex gap-2 mt-3 pt-3 border-t ${
            isSelected ? "border-white/20" : "border-gray-100"
          }`}
        >
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate();
            }}
            className={`flex-1 ${
              isSelected
                ? "bg-white text-emerald-600 hover:bg-emerald-50"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            <IconNavigation className="w-4 h-4 mr-1" />
            Navigate
          </Button>

          {delivery.phone && onCall && (
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onCall();
              }}
              className={`${
                isSelected
                  ? "border-white/40 text-white hover:bg-white/10"
                  : "border-gray-200"
              }`}
            >
              <IconPhone className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}

      {/* Completion Actions */}
      {showActions && isSelected && !isCompleted && (
        <div className="flex gap-2 mt-3">
          {onComplete && (
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onComplete();
              }}
              className="flex-1 bg-white text-emerald-600 hover:bg-emerald-50"
            >
              <IconCheck className="w-4 h-4 mr-1" />
              Mark Complete
            </Button>
          )}
          {onCancel && (
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onCancel();
              }}
              className="text-white/80 hover:bg-white/10 hover:text-white"
            >
              <IconX className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default DeliveryCard;
