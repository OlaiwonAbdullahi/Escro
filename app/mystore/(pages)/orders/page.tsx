"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OrderStatsBar from "./_components/order-stats";
import OrdersTable, { type Order } from "./_components/orders-table";
import OrderDetails from "./_components/order-details";
import {
  IconAdjustments,
  IconAdjustmentsHorizontal,
  IconCloudDownload,
  IconPackage,
  IconSearch,
  IconShoppingBag,
} from "@tabler/icons-react";

// Demo orders data
const demoOrders: Order[] = [
  {
    id: "ORD-2341",
    date: "Dec 5, 2024",
    time: "2:30 PM",
    customer: {
      name: "John Smith",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    items: {
      count: 3,
      names: ["Premium Wireless Headphones", "Smart Watch Pro", "USB-C Hub"],
      thumbnails: [],
    },
    total: 234.5,
    paymentStatus: "escrow",
    orderStatus: "shipped",
  },
  {
    id: "ORD-2340",
    date: "Dec 5, 2024",
    time: "1:15 PM",
    customer: {
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    items: {
      count: 1,
      names: ["Mechanical Keyboard RGB"],
      thumbnails: [],
    },
    total: 149.99,
    paymentStatus: "paid",
    orderStatus: "delivered",
  },
  {
    id: "ORD-2339",
    date: "Dec 4, 2024",
    time: "4:45 PM",
    customer: {
      name: "Mike Williams",
      avatar: "",
    },
    items: {
      count: 2,
      names: ["Laptop Stand Aluminum", "Wireless Mouse"],
      thumbnails: [],
    },
    total: 139.98,
    paymentStatus: "pending",
    orderStatus: "pending",
  },
  {
    id: "ORD-2338",
    date: "Dec 4, 2024",
    time: "11:20 AM",
    customer: {
      name: "Emily Davis",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    items: {
      count: 4,
      names: [
        "Premium Headphones",
        "Phone Case",
        "Screen Protector",
        "Charging Cable",
      ],
      thumbnails: [],
    },
    total: 89.97,
    paymentStatus: "paid",
    orderStatus: "processing",
  },
  {
    id: "ORD-2337",
    date: "Dec 3, 2024",
    time: "9:00 AM",
    customer: {
      name: "Robert Chen",
      avatar: "",
    },
    items: {
      count: 1,
      names: ["Smart Watch Pro"],
      thumbnails: [],
    },
    total: 449.99,
    paymentStatus: "refunded",
    orderStatus: "cancelled",
  },
  {
    id: "ORD-2336",
    date: "Dec 2, 2024",
    time: "3:30 PM",
    customer: {
      name: "Amanda Lee",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
    items: {
      count: 2,
      names: ["USB-C Hub Adapter", "Laptop Sleeve"],
      thumbnails: [],
    },
    total: 79.98,
    paymentStatus: "paid",
    orderStatus: "delivered",
  },
];

const orderStats = {
  total: demoOrders.length,
  pending: demoOrders.filter(
    (o) => o.orderStatus === "pending" || o.orderStatus === "processing"
  ).length,
  completed: demoOrders.filter((o) => o.orderStatus === "delivered").length,
  cancelled: demoOrders.filter((o) => o.orderStatus === "cancelled").length,
};

const Page = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setTimeout(() => setSelectedOrder(null), 300);
  };

  // Filter orders based on search and filters
  const filteredOrders = demoOrders.filter((order) => {
    // Search filter
    const searchMatch =
      searchQuery === "" ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const statusMatch =
      statusFilter === "all" || order.orderStatus === statusFilter;

    // Date filter (simplified for demo)
    const dateMatch = dateFilter === "all" || true;

    return searchMatch && statusMatch && dateMatch;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-black text-3xl font-bold mb-2">Orders</h1>
            <p className="text-gray-500">Manage and track all your orders</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-sm transition-all duration-200 flex items-center gap-2 hover:shadow-xl w-fit">
            <IconCloudDownload className="w-5 h-5" />
            Export Orders
          </Button>
        </div>

        {/* Quick Stats Bar */}
        <OrderStatsBar stats={orderStats} />

        {/* Search and Filter Bar */}
        <div className="bg-white border border-emerald-500/20 rounded-md p-4 ">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search orders by ID or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 shadow-none border-gray-200 rounded-sm text-gray-900 placeholder-gray-400 pl-11 pr-4 py-2.5 h-9 focus:outline-none"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px] h-9 font-mont bg-gray-50 border-gray-200 rounded-sm">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="refund">Refunded</SelectItem>
                </SelectContent>
              </Select>

              {/* Date Range Filter */}
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[160px] h-9 bg-gray-50 border-gray-200 rounded-sm">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                </SelectContent>
              </Select>

              {/* More Filters Button */}
              <Button
                variant="outline"
                className="h-9 px-4 bg-gray-50 border-gray-200 hover:bg-gray-100 rounded-sm"
              >
                <IconAdjustmentsHorizontal className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        {filteredOrders.length > 0 ? (
          <OrdersTable
            orders={filteredOrders}
            onViewDetails={handleViewDetails}
          />
        ) : (
          /* Empty State */
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {searchQuery || statusFilter !== "all" ? (
                <IconSearch className="w-8 h-8 text-gray-400" />
              ) : (
                <IconPackage className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchQuery || statusFilter !== "all"
                ? "No orders match your filters"
                : "No orders yet"}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "When customers place orders, they'll appear here"}
            </p>
            {searchQuery || statusFilter !== "all" ? (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                  setDateFilter("all");
                }}
                className="border-emerald-200 text-emerald-600 hover:bg-emerald-50"
              >
                Clear Filters
              </Button>
            ) : (
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <IconShoppingBag className="w-4 h-4 mr-2" />
                Browse Products
              </Button>
            )}
          </div>
        )}

        {/* Order Details Side Panel */}
        <OrderDetails
          order={selectedOrder}
          open={detailsOpen}
          onClose={handleCloseDetails}
        />
      </div>
    </div>
  );
};

export default Page;
