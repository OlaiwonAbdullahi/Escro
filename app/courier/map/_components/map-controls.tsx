"use client";

import {
  IconCurrentLocation,
  IconFocus2,
  IconRoute,
  IconRouteOff,
  IconLayersSubtract,
  IconRefresh,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MapControlsProps {
  showRoute: boolean;
  onToggleRoute: () => void;
  onFitBounds: () => void;
  onCenterOnCourier: () => void;
  onRefresh: () => void;
  isLoading?: boolean;
}

const MapControls = ({
  showRoute,
  onToggleRoute,
  onFitBounds,
  onCenterOnCourier,
  onRefresh,
  isLoading = false,
}: MapControlsProps) => {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-2">
        {/* Route Toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              onClick={onToggleRoute}
              className={`w-10 h-10 rounded-xl shadow-lg transition-all duration-300 ${
                showRoute
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {showRoute ? (
                <IconRoute className="w-5 h-5" />
              ) : (
                <IconRouteOff className="w-5 h-5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{showRoute ? "Hide Route" : "Show Route"}</p>
          </TooltipContent>
        </Tooltip>

        {/* Fit All Bounds */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              onClick={onFitBounds}
              className="w-10 h-10 rounded-xl bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-lg"
            >
              <IconLayersSubtract className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Fit All Deliveries</p>
          </TooltipContent>
        </Tooltip>

        {/* Center on Courier */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              onClick={onCenterOnCourier}
              className="w-10 h-10 rounded-xl bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-lg"
            >
              <IconCurrentLocation className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Center on My Location</p>
          </TooltipContent>
        </Tooltip>

        {/* Focus Mode */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              onClick={onFitBounds}
              className="w-10 h-10 rounded-xl bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-lg"
            >
              <IconFocus2 className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Focus View</p>
          </TooltipContent>
        </Tooltip>

        {/* Refresh */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              onClick={onRefresh}
              disabled={isLoading}
              className="w-10 h-10 rounded-xl bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-lg disabled:opacity-50"
            >
              <IconRefresh
                className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Refresh Deliveries</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default MapControls;
