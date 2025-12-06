"use client";

import { useState } from "react";
import {
  IconTruck,
  IconPackage,
  IconCheck,
  IconClock,
  IconPhone,
  IconMessage,
  IconMapPin,
  IconNavigation,
  IconCamera,
  IconPhoto,
  IconAlertTriangle,
  IconHeadset,
  IconExternalLink,
  IconCalendar,
  IconCalendarEvent,
  IconEdit,
  IconX,
  IconSearch,
  IconFilter,
  IconChevronDown,
  IconStar,
  IconDownload,
  IconCircleCheck,
  IconCircleDot,
  IconShare,
  IconPlayerPlay,
  IconCurrencyNaira,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Types
interface DeliveryLocation {
  name: string;
  address: string;
  landmark?: string;
  phone: string;
}

interface ActiveDelivery {
  id: string;
  orderId: string;
  status: "in_transit" | "nearby" | "pending";
  etaMinutes: number;
  customer: DeliveryLocation;
  packages: string;
  isFragile: boolean;
  paymentType: "paid_online" | "cash_on_delivery";
  pickupTime: string;
  earnings: number;
  distance: string;
  isUrgent?: boolean;
  pickupProofPhoto?: string;
  packagePhoto?: string;
}

interface ScheduledDelivery {
  id: string;
  scheduledDate: string;
  scheduledTime: string;
  reminderTime: string;
  earnings: number;
  pickup: {
    name: string;
    address: string;
  };
  dropoff: {
    name: string;
    address: string;
  };
}

interface CompletedDelivery {
  id: string;
  completedAt: string;
  customer: string;
  from: string;
  to: string;
  earnings: number;
  distance: string;
  duration: string;
  rating: number;
  comment?: string;
}

interface NextDelivery {
  id: string;
  earnings: number;
  distance: string;
  pickup: string;
}

// Demo data
const demoActiveDeliveries: ActiveDelivery[] = [
  {
    id: "DEL-3421",
    orderId: "ORD-8821",
    status: "in_transit",
    etaMinutes: 28,
    customer: {
      name: "Sarah Johnson",
      address: "45 Lekki Phase 1, Lagos",
      landmark: "Opposite Mega Chicken",
      phone: "+234 802 123 4567",
    },
    packages: "2 packages (Electronics - Fragile)",
    isFragile: true,
    paymentType: "paid_online",
    pickupTime: "2:15 PM",
    earnings: 2500,
    distance: "5.2 km",
    isUrgent: true,
  },
  {
    id: "DEL-3425",
    orderId: "ORD-8825",
    status: "pending",
    etaMinutes: 45,
    customer: {
      name: "Mike Adeyemi",
      address: "12 Yaba Tech Road, Lagos",
      phone: "+234 803 456 7890",
    },
    packages: "1 package (Fashion)",
    isFragile: false,
    paymentType: "cash_on_delivery",
    pickupTime: "3:00 PM",
    earnings: 1800,
    distance: "3.8 km",
  },
];

const demoNextDelivery: NextDelivery = {
  id: "DEL-3428",
  earnings: 1800,
  distance: "4.5",
  pickup: "TechWorld Store",
};

const demoScheduledDeliveries: ScheduledDelivery[] = [
  {
    id: "DEL-3459",
    scheduledDate: "Today",
    scheduledTime: "5:00 PM",
    reminderTime: "4:30 PM",
    earnings: 3200,
    pickup: {
      name: "Nike Store",
      address: "Victoria Island",
    },
    dropoff: {
      name: "Customer",
      address: "Ikoyi Towers",
    },
  },
  {
    id: "DEL-3467",
    scheduledDate: "Tomorrow",
    scheduledTime: "10:00 AM",
    reminderTime: "9:30 AM",
    earnings: 4500,
    pickup: {
      name: "Apple Store",
      address: "Lekki Mall",
    },
    dropoff: {
      name: "Customer",
      address: "Ajah Estate",
    },
  },
];

const demoCompletedDeliveries: CompletedDelivery[] = [
  {
    id: "DEL-3410",
    completedAt: "Today, 1:45 PM",
    customer: "John Doe",
    from: "Fashion Hub",
    to: "Lekki Phase 1",
    earnings: 2500,
    distance: "5.2 km",
    duration: "38 mins",
    rating: 5.0,
    comment: "Very professional and fast!",
  },
  {
    id: "DEL-3408",
    completedAt: "Today, 11:30 AM",
    customer: "Ada Okorie",
    from: "TechMart",
    to: "Victoria Island",
    earnings: 3200,
    distance: "7.8 km",
    duration: "45 mins",
    rating: 4.5,
  },
  {
    id: "DEL-3405",
    completedAt: "Yesterday, 4:20 PM",
    customer: "Tunde Bello",
    from: "BookWorld",
    to: "Ikeja GRA",
    earnings: 1800,
    distance: "4.1 km",
    duration: "28 mins",
    rating: 5.0,
    comment: "Package was handled with care",
  },
  {
    id: "DEL-3401",
    completedAt: "Yesterday, 2:15 PM",
    customer: "Grace Eze",
    from: "Fashion Nova",
    to: "Surulere",
    earnings: 2100,
    distance: "6.3 km",
    duration: "42 mins",
    rating: 4.0,
  },
];

// Generate more completed deliveries
for (let i = 0; i < 85; i++) {
  demoCompletedDeliveries.push({
    id: `DEL-${3400 - i}`,
    completedAt: `${Math.floor(i / 10) + 2} days ago`,
    customer: ["James Okon", "Chioma Nweze", "David Ojo", "Amara Kalu"][i % 4],
    from: ["SuperMart", "FashionHouse", "TechZone", "BookCorner"][i % 4],
    to: ["Lekki", "VI", "Ikeja", "Yaba"][i % 4],
    earnings: 1500 + (i % 5) * 300,
    distance: `${3 + (i % 5)}.${i % 10} km`,
    duration: `${25 + (i % 20)} mins`,
    rating: 4 + (i % 2) * 0.5,
  });
}

type TabType = "active" | "scheduled" | "completed" | "all";
type DateFilter = "today" | "yesterday" | "last7days" | "last30days" | "custom";

const formatCurrency = (amount: number) => {
  return `₦${amount.toLocaleString()}`;
};

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <IconStar key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
    );
  }
  if (hasHalf) {
    stars.push(
      <IconStar
        key="half"
        className="w-4 h-4 text-amber-400"
        style={{ clipPath: "inset(0 50% 0 0)" }}
      />
    );
  }
  return stars;
};

export default function MyDeliveriesPage() {
  const [activeTab, setActiveTab] = useState<TabType>("active");
  const [dateFilter, setDateFilter] = useState<DateFilter>("today");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeliveryDialog, setShowDeliveryDialog] = useState(false);
  const [deliveryStep, setDeliveryStep] = useState(1);
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [currentDelivery, setCurrentDelivery] = useState<ActiveDelivery | null>(
    demoActiveDeliveries[0]
  );

  const tabs = [
    { id: "active" as TabType, label: "Active", count: 2 },
    { id: "scheduled" as TabType, label: "Scheduled", count: 1 },
    { id: "completed" as TabType, label: "Completed", count: 89 },
    { id: "all" as TabType, label: "All" },
  ];

  const handleMarkDelivered = () => {
    setShowDeliveryDialog(true);
    setDeliveryStep(1);
  };

  const handleConfirmDelivery = () => {
    if (deliveryStep < 3) {
      setDeliveryStep(deliveryStep + 1);
    } else {
      setShowDeliveryDialog(false);
      setDeliveryStep(1);
    }
  };

  const filteredCompletedDeliveries = demoCompletedDeliveries.filter(
    (delivery) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          delivery.id.toLowerCase().includes(query) ||
          delivery.customer.toLowerCase().includes(query) ||
          delivery.from.toLowerCase().includes(query) ||
          delivery.to.toLowerCase().includes(query)
        );
      }
      return true;
    }
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
          <div>
            <h1 className="text-black text-3xl font-bold mb-2 font-noto">
              My Deliveries
            </h1>
            <p className="text-gray-500">
              Track and manage your delivery assignments.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl border border-gray-200 p-1 inline-flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    activeTab === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Active Tab Content */}
        {activeTab === "active" && (
          <div className="space-y-6">
            {/* Current Delivery - Top Priority */}
            {currentDelivery && (
              <div className="space-y-4">
                {/* Priority Header */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-500 rounded-lg animate-pulse">
                      <IconTruck className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-red-700">
                        🔴 IN TRANSIT - Delivery #{currentDelivery.id}
                      </p>
                      <p className="text-sm text-red-600">
                        Expected delivery in {currentDelivery.etaMinutes}{" "}
                        minutes
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="h-64 bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center relative">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <IconMapPin className="w-8 h-8 text-emerald-600" />
                      </div>
                      <p className="text-gray-600 font-medium">
                        Interactive Map View
                      </p>
                      <p className="text-sm text-gray-500">
                        Live tracking • Route visualization • Traffic updates
                      </p>
                    </div>
                    {/* Map Legend */}
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg p-3 text-xs space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span>Your location</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span>Destination</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                        <span>Suggested route</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Details */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                      Delivery Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                          <IconMapPin className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            Customer: {currentDelivery.customer.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {currentDelivery.customer.address}
                          </p>
                          {currentDelivery.customer.landmark && (
                            <p className="text-sm text-gray-500">
                              Landmark: {currentDelivery.customer.landmark}
                            </p>
                          )}
                          <p className="text-sm text-gray-500">
                            Phone: {currentDelivery.customer.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      <IconPhone className="w-4 h-4" />
                      Call Customer
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 border-purple-200 text-purple-600 hover:bg-purple-50"
                    >
                      <IconMessage className="w-4 h-4" />
                      SMS
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                    >
                      <IconShare className="w-4 h-4" />
                      Share Location
                    </Button>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200"></div>

                  {/* Package Info */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                      Package Info
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <IconPackage className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          Order #{currentDelivery.orderId}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IconTruck className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {currentDelivery.packages}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IconCurrencyNaira className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {currentDelivery.paymentType === "paid_online"
                            ? "Paid online"
                            : "Cash on delivery"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IconClock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          Pickup: {currentDelivery.pickupTime} ✓
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pickup Proof */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                      Pickup Proof
                    </h3>
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-600 transition-colors">
                        <IconCamera className="w-4 h-4" />
                        Package photo
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-600 transition-colors">
                        <IconPhoto className="w-4 h-4" />
                        Proof of pickup
                      </button>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200"></div>

                  {/* Status Update */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                      Status Update
                    </h3>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm text-gray-600">Current:</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center gap-1">
                        <IconTruck className="w-4 h-4" />
                        In Transit
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <IconCircleDot className="w-4 h-4" />
                        Nearby (5 mins away)
                      </Button>
                      <Button
                        onClick={handleMarkDelivered}
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        <IconCheck className="w-4 h-4" />
                        Delivered
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 border-amber-200 text-amber-600 hover:bg-amber-50"
                      >
                        <IconAlertTriangle className="w-4 h-4" />
                        Issue Encountered
                      </Button>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200"></div>

                  {/* Actions */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                      Actions
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <IconExternalLink className="w-4 h-4" />
                        Open in Google Maps
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <IconAlertTriangle className="w-4 h-4" />
                        Report Issue
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <IconHeadset className="w-4 h-4" />
                        Contact Support
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Next Delivery Queue */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <IconClock className="w-4 h-4 text-amber-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      UP NEXT (1 delivery)
                    </h3>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">
                        {demoNextDelivery.id}
                      </span>
                      <span className="text-emerald-600 font-semibold">
                        {formatCurrency(demoNextDelivery.earnings)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {demoNextDelivery.distance} km away
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      Pickup: {demoNextDelivery.pickup}
                    </p>
                    <p className="text-xs text-gray-400 mb-3">
                      Will start automatically after current delivery
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Modify Queue
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Scheduled Tab Content */}
        {activeTab === "scheduled" && (
          <div className="space-y-4">
            {demoScheduledDeliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-emerald-300 transition-all"
              >
                <div className="bg-emerald-50 px-6 py-3 border-b border-emerald-100">
                  <div className="flex items-center gap-2">
                    <IconCalendarEvent className="w-5 h-5 text-emerald-600" />
                    <span className="font-semibold text-emerald-700">
                      Scheduled for {delivery.scheduledDate},{" "}
                      {delivery.scheduledTime}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold text-gray-900">
                      {delivery.id}
                    </span>
                    <span className="text-emerald-600 font-bold text-lg">
                      {formatCurrency(delivery.earnings)}
                    </span>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-blue-100 rounded-md">
                        <IconMapPin className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Pickup: {delivery.pickup.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {delivery.pickup.address}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-emerald-100 rounded-md">
                        <IconMapPin className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Deliver to: {delivery.dropoff.address}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <IconClock className="w-4 h-4" />
                    Reminder set for: {delivery.reminderTime}
                  </div>
                  <div className="flex gap-3">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2">
                      <IconPlayerPlay className="w-4 h-4" />
                      Start Early
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <IconEdit className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <IconX className="w-4 h-4" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Completed Tab Content */}
        {activeTab === "completed" && (
          <div className="space-y-4">
            {/* Filters */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Date Filter */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "today" as DateFilter, label: "Today" },
                    { id: "yesterday" as DateFilter, label: "Yesterday" },
                    { id: "last7days" as DateFilter, label: "Last 7 days" },
                    { id: "last30days" as DateFilter, label: "Last 30 days" },
                    { id: "custom" as DateFilter, label: "Custom" },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setDateFilter(filter.id)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        dateFilter === filter.id
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
                {/* Search */}
                <div className="flex-1 flex gap-2">
                  <div className="relative flex-1">
                    <IconSearch className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search by order ID, customer name, or store..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <IconFilter className="w-4 h-4" />
                    Filter
                    <IconChevronDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Completed Delivery Cards */}
            <div className="space-y-4">
              {filteredCompletedDeliveries.slice(0, 10).map((delivery) => (
                <div
                  key={delivery.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-emerald-300 hover:shadow-md transition-all"
                >
                  <div className="bg-emerald-50 px-6 py-3 border-b border-emerald-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IconCircleCheck className="w-5 h-5 text-emerald-600" />
                      <span className="font-semibold text-emerald-700">
                        Delivered
                      </span>
                      <span className="text-gray-600">· {delivery.id}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {delivery.completedAt}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Customer</p>
                        <p className="font-medium text-gray-900">
                          {delivery.customer}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Route</p>
                        <p className="font-medium text-gray-900">
                          {delivery.from} → {delivery.to}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-6 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Earnings</p>
                        <p className="font-bold text-emerald-600 text-lg">
                          {formatCurrency(delivery.earnings)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Distance</p>
                        <p className="font-medium text-gray-900">
                          {delivery.distance}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="font-medium text-gray-900">
                          {delivery.duration}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Customer Rating
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {renderStars(delivery.rating)}
                          </div>
                          <span className="font-medium text-gray-900">
                            {delivery.rating.toFixed(1)}
                          </span>
                        </div>
                        {delivery.comment && (
                          <p className="text-sm text-gray-600 mt-1 italic">
                            &apos;{delivery.comment}&apos;
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <IconDownload className="w-4 h-4" />
                          Download Proof
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {filteredCompletedDeliveries.length > 10 && (
              <div className="text-center">
                <Button variant="outline">
                  Load More ({filteredCompletedDeliveries.length - 10}{" "}
                  remaining)
                </Button>
              </div>
            )}
          </div>
        )}

        {/* All Tab Content */}
        {activeTab === "all" && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-blue-600 font-space">2</p>
                <p className="text-sm text-gray-500">Active</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-amber-600 font-space">
                  1
                </p>
                <p className="text-sm text-gray-500">Scheduled</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-emerald-600 font-space">
                  89
                </p>
                <p className="text-sm text-gray-500">Completed</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-gray-900 font-space">
                  92
                </p>
                <p className="text-sm text-gray-500">Total</p>
              </div>
            </div>

            {/* All Deliveries List */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">
                    All Deliveries
                  </h3>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {/* Active */}
                {demoActiveDeliveries.map((d) => (
                  <div
                    key={d.id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <IconTruck className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{d.id}</p>
                          <p className="text-sm text-gray-500">
                            {d.customer.name} · {d.distance}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          In Transit
                        </span>
                        <span className="font-semibold text-emerald-600">
                          {formatCurrency(d.earnings)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Scheduled */}
                {demoScheduledDeliveries.map((d) => (
                  <div
                    key={d.id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-amber-100 rounded-lg">
                          <IconCalendar className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{d.id}</p>
                          <p className="text-sm text-gray-500">
                            {d.pickup.name} → {d.dropoff.address}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                          {d.scheduledTime}
                        </span>
                        <span className="font-semibold text-emerald-600">
                          {formatCurrency(d.earnings)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Completed (first 5) */}
                {demoCompletedDeliveries.slice(0, 5).map((d) => (
                  <div
                    key={d.id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                          <IconCircleCheck className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{d.id}</p>
                          <p className="text-sm text-gray-500">
                            {d.customer} · {d.completedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                          Completed
                        </span>
                        <span className="font-semibold text-emerald-600">
                          {formatCurrency(d.earnings)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delivery Confirmation Dialog */}
      <Dialog open={showDeliveryDialog} onOpenChange={setShowDeliveryDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {deliveryStep === 1 && "Confirm Delivery"}
              {deliveryStep === 2 && "Delivery Details"}
              {deliveryStep === 3 && "Delivery Completed!"}
            </DialogTitle>
          </DialogHeader>

          {deliveryStep === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Take delivery proof photo:
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                  <IconCamera className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-600">Take Photo</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                  <IconPhoto className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Choose from gallery
                  </span>
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs font-medium text-gray-700 mb-2">
                  Tips for good proof:
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Show package at delivery location</li>
                  <li>• Include house number if visible</li>
                  <li>• Ensure photo is clear and well-lit</li>
                </ul>
              </div>
              <Button
                onClick={handleConfirmDelivery}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                Continue
              </Button>
            </div>
          )}

          {deliveryStep === 2 && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Package handed to:
                </p>
                <div className="space-y-2">
                  {[
                    { value: "customer", label: "Customer (Sarah Johnson)" },
                    { value: "receptionist", label: "Receptionist/Security" },
                    { value: "family", label: "Family member" },
                    { value: "door", label: "Left at door (with permission)" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedRecipient === option.value
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="recipient"
                        value={option.value}
                        checked={selectedRecipient === option.value}
                        onChange={(e) => setSelectedRecipient(e.target.value)}
                        className="w-4 h-4 text-emerald-600"
                      />
                      <span className="text-sm text-gray-700">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Additional notes: (optional)
                </label>
                <textarea
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg resize-none h-20 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Any additional notes..."
                />
              </div>
              <Button
                onClick={handleConfirmDelivery}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                <IconCheck className="w-4 h-4 mr-2" />
                Confirm Delivery
              </Button>
            </div>
          )}

          {deliveryStep === 3 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <IconCircleCheck className="w-10 h-10 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Delivery Completed!
                </h3>
                <p className="text-emerald-600 font-bold text-2xl mt-2">
                  You earned {formatCurrency(currentDelivery?.earnings || 0)}
                </p>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowDeliveryDialog(false)}
                >
                  Back to Dashboard
                </Button>
                <Button
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => setShowDeliveryDialog(false)}
                >
                  View Next Delivery
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
