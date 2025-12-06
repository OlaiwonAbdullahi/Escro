"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  IconMap,
  IconList,
  IconFilter,
  IconSortDescending,
  IconClock,
  IconAlertTriangle,
  IconPackage,
  IconCheck,
  IconX,
  IconChevronUp,
  IconChevronDown,
  IconNavigation,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import DeliveryCard from "./_components/delivery-card";
import MapControls from "./_components/map-controls";
import DeliveryStats from "./_components/delivery-stats";
import type { DeliveryPoint } from "./_components/delivery-map";

// Dynamic import for map to avoid SSR issues
const DeliveryMap = dynamic(() => import("./_components/delivery-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-xl bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-gray-500 font-medium">Loading map...</span>
      </div>
    </div>
  ),
});

// Demo data for Lagos, Nigeria
const demoDeliveries: DeliveryPoint[] = [
  {
    id: "del-1",
    type: "pickup",
    name: "TechMart Store",
    address: "123 Victoria Island, Lagos",
    coordinates: [3.423, 6.4327],
    status: "active",
    isUrgent: true,
    estimatedTime: "15 mins",
    earnings: "₦2,500",
    phone: "+234 801 234 5678",
  },
  {
    id: "del-2",
    type: "dropoff",
    name: "Sarah Johnson",
    address: "45 Lekki Phase 1, Lagos",
    coordinates: [3.4721, 6.441],
    status: "pending",
    isUrgent: true,
    estimatedTime: "30 mins",
    earnings: "₦2,500",
    phone: "+234 802 345 6789",
  },
  {
    id: "del-3",
    type: "pickup",
    name: "Fashion Hub",
    address: "78 Ikeja Mall, Lagos",
    coordinates: [3.347, 6.6194],
    status: "pending",
    estimatedTime: "45 mins",
    earnings: "₦1,800",
    phone: "+234 803 456 7890",
  },
  {
    id: "del-4",
    type: "dropoff",
    name: "Mike Adeyemi",
    address: "12 Yaba Tech Road, Lagos",
    coordinates: [3.3792, 6.5244],
    status: "pending",
    estimatedTime: "1h 10mins",
    earnings: "₦1,800",
    phone: "+234 804 567 8901",
  },
  {
    id: "del-5",
    type: "pickup",
    name: "Electronics Plus",
    address: "90 Marina Street, Lagos",
    coordinates: [3.3903, 6.4535],
    status: "completed",
    estimatedTime: "Completed",
    earnings: "₦3,200",
    phone: "+234 805 678 9012",
  },
  {
    id: "del-6",
    type: "dropoff",
    name: "Chioma Nwosu",
    address: "35 Ikoyi Crescent, Lagos",
    coordinates: [3.4356, 6.4558],
    status: "completed",
    estimatedTime: "Completed",
    earnings: "₦3,200",
    phone: "+234 806 789 0123",
  },
];

// Courier's current location (simulated)
const courierLocation: [number, number] = [3.3985, 6.4698];

type ViewMode = "map" | "list" | "split";
type SortOption = "time" | "distance" | "earnings" | "urgent";
type FilterOption =
  | "all"
  | "pickup"
  | "dropoff"
  | "pending"
  | "completed"
  | "urgent";

const MapPage = () => {
  const [deliveries, setDeliveries] = useState<DeliveryPoint[]>(demoDeliveries);
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string | null>(
    null
  );
  const [showRoute, setShowRoute] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [sortBy, setSortBy] = useState<SortOption>("time");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

  // Filter deliveries
  const filteredDeliveries = deliveries.filter((d) => {
    if (filterBy === "all") return true;
    if (filterBy === "pickup") return d.type === "pickup";
    if (filterBy === "dropoff") return d.type === "dropoff";
    if (filterBy === "pending")
      return d.status === "pending" || d.status === "active";
    if (filterBy === "completed") return d.status === "completed";
    if (filterBy === "urgent") return d.isUrgent;
    return true;
  });

  // Sort deliveries
  const sortedDeliveries = [...filteredDeliveries].sort((a, b) => {
    if (sortBy === "urgent") {
      if (a.isUrgent && !b.isUrgent) return -1;
      if (!a.isUrgent && b.isUrgent) return 1;
      return 0;
    }
    if (sortBy === "earnings") {
      const aEarnings = parseInt(a.earnings?.replace(/[^\d]/g, "") || "0");
      const bEarnings = parseInt(b.earnings?.replace(/[^\d]/g, "") || "0");
      return bEarnings - aEarnings;
    }
    // Default: time-based (by status: active first, then pending, then completed)
    const statusOrder = { active: 0, pending: 1, completed: 2 };
    return (
      (statusOrder[a.status || "pending"] || 1) -
      (statusOrder[b.status || "pending"] || 1)
    );
  });

  // Calculate stats
  const stats = {
    total: deliveries.length,
    active: deliveries.filter((d) => d.status === "active").length,
    pending: deliveries.filter((d) => d.status === "pending").length,
    completed: deliveries.filter((d) => d.status === "completed").length,
    earnings: deliveries
      .filter((d) => d.status === "completed")
      .reduce((sum, d) => {
        const amount = parseInt(d.earnings?.replace(/[^\d]/g, "") || "0");
        return sum + amount;
      }, 0),
  };

  // Handle marker click
  const handleMarkerClick = useCallback((delivery: DeliveryPoint) => {
    setSelectedDeliveryId(delivery.id);
  }, []);

  // Handle navigate
  const handleNavigate = useCallback((delivery: DeliveryPoint) => {
    // Open in external maps app
    const url = `https://www.google.com/maps/dir/?api=1&destination=${delivery.coordinates[1]},${delivery.coordinates[0]}`;
    window.open(url, "_blank");
  }, []);

  // Handle call
  const handleCall = useCallback((phone: string) => {
    window.open(`tel:${phone}`, "_self");
  }, []);

  // Handle complete delivery
  const handleComplete = useCallback((id: string) => {
    setDeliveries((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: "completed" as const, estimatedTime: "Completed" }
          : d
      )
    );
  }, []);

  // Handle refresh
  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  // Fit bounds
  const handleFitBounds = useCallback(() => {
    window.dispatchEvent(new CustomEvent("fitMapBounds"));
  }, []);

  // Center on courier
  const handleCenterOnCourier = useCallback(() => {
    // This would need to be implemented in the map component
    handleFitBounds();
  }, [handleFitBounds]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedDeliveryId(null);
      }
      if (e.key === "r" && e.ctrlKey) {
        e.preventDefault();
        setShowRoute((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const selectedDelivery = selectedDeliveryId
    ? deliveries.find((d) => d.id === selectedDeliveryId)
    : null;

  return (
    <div className="h-[calc(100vh-64px)] bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-noto flex items-center gap-2">
              Delivery Map
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Track and navigate your active deliveries
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              {[
                { mode: "map" as ViewMode, icon: IconMap, label: "Map" },
                {
                  mode: "split" as ViewMode,
                  icon: IconNavigation,
                  label: "Split",
                },
                { mode: "list" as ViewMode, icon: IconList, label: "List" },
              ].map(({ mode, icon: Icon, label }) => (
                <Button
                  key={mode}
                  size="sm"
                  variant={viewMode === mode ? "default" : "ghost"}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 ${
                    viewMode === mode
                      ? "bg-emerald-600 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-1" />
                  {label}
                </Button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-gray-200">
                  <IconSortDescending className="w-4 h-4 mr-2" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSortBy("time")}>
                  <IconClock className="w-4 h-4 mr-2" />
                  Time / Status
                  {sortBy === "time" && (
                    <IconCheck className="w-4 h-4 ml-auto text-emerald-600" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("urgent")}>
                  <IconAlertTriangle className="w-4 h-4 mr-2" />
                  Urgency
                  {sortBy === "urgent" && (
                    <IconCheck className="w-4 h-4 ml-auto text-emerald-600" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("earnings")}>
                  <IconPackage className="w-4 h-4 mr-2" />
                  Earnings
                  {sortBy === "earnings" && (
                    <IconCheck className="w-4 h-4 ml-auto text-emerald-600" />
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-gray-200">
                  <IconFilter className="w-4 h-4 mr-2" />
                  Filter
                  {filterBy !== "all" && (
                    <span className="ml-2 w-2 h-2 bg-emerald-500 rounded-full" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {[
                  { value: "all" as FilterOption, label: "All Deliveries" },
                  { value: "urgent" as FilterOption, label: "Urgent Only" },
                  { value: "pickup" as FilterOption, label: "Pickups Only" },
                  { value: "dropoff" as FilterOption, label: "Dropoffs Only" },
                  { value: "pending" as FilterOption, label: "Pending" },
                  { value: "completed" as FilterOption, label: "Completed" },
                ].map(({ value, label }) => (
                  <DropdownMenuItem
                    key={value}
                    onClick={() => setFilterBy(value)}
                  >
                    {label}
                    {filterBy === value && (
                      <IconCheck className="w-4 h-4 ml-auto text-emerald-600" />
                    )}
                  </DropdownMenuItem>
                ))}
                {filterBy !== "all" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setFilterBy("all")}>
                      <IconX className="w-4 h-4 mr-2" />
                      Clear Filter
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden p-4 gap-4">
        {/* Map Section */}
        {(viewMode === "map" || viewMode === "split") && (
          <div
            className={`relative rounded-xl overflow-hidden shadow-lg ${
              viewMode === "split" ? "flex-1" : "w-full"
            }`}
          >
            <DeliveryMap
              deliveries={sortedDeliveries}
              courierLocation={courierLocation}
              selectedDeliveryId={selectedDeliveryId}
              onMarkerClick={handleMarkerClick}
              showRoute={showRoute}
            />

            {/* Map Controls */}
            <MapControls
              showRoute={showRoute}
              onToggleRoute={() => setShowRoute((prev) => !prev)}
              onFitBounds={handleFitBounds}
              onCenterOnCourier={handleCenterOnCourier}
              onRefresh={handleRefresh}
              isLoading={isLoading}
            />

            {/* Selected Delivery Quick Info */}
            {selectedDelivery && viewMode === "map" && (
              <div className="absolute bottom-4 right-4 left-20 z-10">
                <div className="bg-white rounded-xl shadow-xl p-4 border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <span
                        className={`text-xs font-semibold uppercase tracking-wide ${
                          selectedDelivery.type === "pickup"
                            ? "text-blue-600"
                            : "text-emerald-600"
                        }`}
                      >
                        {selectedDelivery.type}
                      </span>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {selectedDelivery.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {selectedDelivery.address}
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setSelectedDeliveryId(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <IconX className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => handleNavigate(selectedDelivery)}
                    >
                      <IconNavigation className="w-4 h-4 mr-2" />
                      Navigate
                    </Button>
                    {selectedDelivery.phone && (
                      <Button
                        variant="outline"
                        onClick={() => handleCall(selectedDelivery.phone!)}
                      >
                        Call
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Deliveries Panel */}
        {(viewMode === "list" || viewMode === "split") && (
          <div
            className={`bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden flex flex-col ${
              viewMode === "split" ? "w-96" : "w-full"
            }`}
          >
            {/* Panel Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-gray-900">Deliveries</h2>
                <p className="text-xs text-gray-500">
                  {sortedDeliveries.length}{" "}
                  {sortedDeliveries.length === 1 ? "delivery" : "deliveries"}
                </p>
              </div>
              {viewMode === "split" && (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsPanelCollapsed((prev) => !prev)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {isPanelCollapsed ? (
                    <IconChevronDown className="w-5 h-5" />
                  ) : (
                    <IconChevronUp className="w-5 h-5" />
                  )}
                </Button>
              )}
            </div>

            {!isPanelCollapsed && (
              <>
                {/* Stats */}
                <div className="p-4 border-b border-gray-100">
                  <DeliveryStats
                    totalDeliveries={stats.total}
                    activeDeliveries={stats.active + stats.pending}
                    completedDeliveries={stats.completed}
                    totalEarnings={`₦${stats.earnings.toLocaleString()}`}
                    distanceRemaining="12.5km"
                  />
                </div>

                {/* Delivery Cards */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {sortedDeliveries.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                      <IconPackage className="w-12 h-12 mb-3" />
                      <p className="font-medium">No deliveries found</p>
                      <p className="text-sm">Try adjusting your filters</p>
                    </div>
                  ) : (
                    sortedDeliveries.map((delivery) => (
                      <DeliveryCard
                        key={delivery.id}
                        delivery={delivery}
                        isSelected={selectedDeliveryId === delivery.id}
                        onSelect={() => setSelectedDeliveryId(delivery.id)}
                        onNavigate={() => handleNavigate(delivery)}
                        onCall={
                          delivery.phone
                            ? () => handleCall(delivery.phone!)
                            : undefined
                        }
                        onComplete={() => handleComplete(delivery.id)}
                        onCancel={() => setSelectedDeliveryId(null)}
                      />
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPage;
