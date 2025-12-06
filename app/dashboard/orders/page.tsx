"use client";

import { useState } from "react";
import Image from "next/image";
import {
  IconPackage,
  IconClock,
  IconCheck,
  IconX,
  IconTruck,
  IconDownload,
  IconRefresh,
  IconStar,
  IconMapPin,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

interface OrderItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  store: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  canCancel: boolean;
  canReview: boolean;
  canReturn: boolean;
}

const orders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-1234",
    date: "2024-12-05",
    status: "shipped",
    items: [
      {
        id: "1",
        name: 'MacBook Pro 16"',
        image:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop",
        quantity: 1,
        price: 2499,
      },
      {
        id: "2",
        name: "USB-C Hub",
        image:
          "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=100&h=100&fit=crop",
        quantity: 2,
        price: 49,
      },
    ],
    total: 2597,
    store: "TechStore Pro",
    trackingNumber: "TRK123456789",
    estimatedDelivery: "2024-12-08",
    canCancel: false,
    canReview: false,
    canReturn: false,
  },
  {
    id: "2",
    orderNumber: "ORD-2024-1233",
    date: "2024-12-03",
    status: "delivered",
    items: [
      {
        id: "3",
        name: "Sony WH-1000XM5",
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
        quantity: 1,
        price: 349,
      },
    ],
    total: 349,
    store: "Audio Hub",
    trackingNumber: "TRK987654321",
    estimatedDelivery: "2024-12-03",
    canCancel: false,
    canReview: true,
    canReturn: true,
  },
  {
    id: "3",
    orderNumber: "ORD-2024-1232",
    date: "2024-12-01",
    status: "processing",
    items: [
      {
        id: "4",
        name: "Nike Air Jordan 1",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop",
        quantity: 1,
        price: 180,
      },
      {
        id: "5",
        name: "Athletic Socks Pack",
        image:
          "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=100&h=100&fit=crop",
        quantity: 3,
        price: 25,
      },
    ],
    total: 255,
    store: "Sneaker World",
    canCancel: true,
    canReview: false,
    canReturn: false,
  },
  {
    id: "4",
    orderNumber: "ORD-2024-1231",
    date: "2024-11-28",
    status: "confirmed",
    items: [
      {
        id: "6",
        name: "Canon EOS R5",
        image:
          "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100&h=100&fit=crop",
        quantity: 1,
        price: 3899,
      },
    ],
    total: 3899,
    store: "Camera Central",
    canCancel: true,
    canReview: false,
    canReturn: false,
  },
  {
    id: "5",
    orderNumber: "ORD-2024-1230",
    date: "2024-11-25",
    status: "pending",
    items: [
      {
        id: "7",
        name: "Gaming Keyboard",
        image:
          "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=100&h=100&fit=crop",
        quantity: 1,
        price: 149,
      },
    ],
    total: 149,
    store: "GameGear Pro",
    canCancel: true,
    canReview: false,
    canReturn: false,
  },
  {
    id: "6",
    orderNumber: "ORD-2024-1229",
    date: "2024-11-20",
    status: "cancelled",
    items: [
      {
        id: "8",
        name: "Minimalist Watch",
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
        quantity: 1,
        price: 199,
      },
    ],
    total: 199,
    store: "TimeKeeper",
    canCancel: false,
    canReview: false,
    canReturn: false,
  },
];

const statusConfig: Record<
  OrderStatus,
  { label: string; color: string; bg: string; icon: React.ElementType }
> = {
  pending: {
    label: "Pending",
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-200",
    icon: IconClock,
  },
  confirmed: {
    label: "Confirmed",
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-200",
    icon: IconCheck,
  },
  processing: {
    label: "Processing",
    color: "text-purple-600",
    bg: "bg-purple-50 border-purple-200",
    icon: IconPackage,
  },
  shipped: {
    label: "Shipped",
    color: "text-indigo-600",
    bg: "bg-indigo-50 border-indigo-200",
    icon: IconTruck,
  },
  delivered: {
    label: "Delivered",
    color: "text-emerald-600",
    bg: "bg-emerald-50 border-emerald-200",
    icon: IconCheck,
  },
  cancelled: {
    label: "Cancelled",
    color: "text-red-600",
    bg: "bg-red-50 border-red-200",
    icon: IconX,
  },
};

const Page = () => {
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  return (
    <div className="min-h-screen px-6 md:px-20 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-black font-noto tracking-tight">
            My Orders
          </h1>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <IconPackage className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wide">
              {orders.length} Orders
            </span>
          </div>
        </div>
        <p className="text-gray-500 font-mont">
          Track and manage all your orders
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            filterStatus === "all"
              ? "bg-emerald-500 text-white  shadow-emerald-500/30"
              : "bg-white border border-gray-200 text-gray-700 hover:border-emerald-500"
          }`}
        >
          All Orders ({orders.length})
        </button>
        {(Object.keys(statusConfig) as OrderStatus[]).map((status) => {
          const count = orders.filter((o) => o.status === status).length;
          const config = statusConfig[status];
          const isActive = filterStatus === status;
          return (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                isActive
                  ? "bg-emerald-500 text-white shadow-emerald-500/30"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-emerald-500"
              }`}
            >
              {config.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <IconPackage className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-700 mb-2">
            No orders found
          </h3>
          <p className="text-gray-500">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const config = statusConfig[order.status];
            const StatusIcon = config.icon;
            return (
              <div
                key={order.id}
                className="bg-white rounded-md border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
              >
                {/* Order Header */}
                <div className="p-5 border-b border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 font-noto">
                          {order.orderNumber}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Placed on{" "}
                          {new Date(order.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${config.bg} w-fit`}
                      >
                        <StatusIcon className={`w-4 h-4 ${config.color}`} />
                        <span
                          className={`text-sm font-semibold ${config.color}`}
                        >
                          {config.label}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-200"
                      >
                        <IconDownload className="w-4 h-4 mr-2" />
                        Invoice
                      </Button>
                      {order.trackingNumber && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              className="bg-emerald-500 hover:bg-emerald-600"
                            >
                              <IconMapPin className="w-4 h-4 mr-2" />
                              Track Order
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>
                                Track Order {order.orderNumber}
                              </DialogTitle>
                              <DialogDescription>
                                Real-time tracking information
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                              <div className="bg-emerald-50 rounded-md p-4 mb-6">
                                <div className="flex items-center gap-3">
                                  <IconTruck className="w-6 h-6 text-emerald-600" />
                                  <div>
                                    <p className="font-semibold text-gray-900">
                                      Tracking Number
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {order.trackingNumber}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div className="flex gap-4">
                                  <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                                      <IconCheck className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="w-0.5 h-12 bg-emerald-500" />
                                  </div>
                                  <div className="flex-1 pb-6">
                                    <p className="font-semibold text-gray-900">
                                      Order Confirmed
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {new Date(
                                        order.date
                                      ).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex gap-4">
                                  <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                                      <IconCheck className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="w-0.5 h-12 bg-emerald-500" />
                                  </div>
                                  <div className="flex-1 pb-6">
                                    <p className="font-semibold text-gray-900">
                                      Processing
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      Your order is being prepared
                                    </p>
                                  </div>
                                </div>
                                <div className="flex gap-4">
                                  <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                                      <IconTruck className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="w-0.5 h-12 bg-gray-200" />
                                  </div>
                                  <div className="flex-1 pb-6">
                                    <p className="font-semibold text-gray-900">
                                      Shipped
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      In transit to your location
                                    </p>
                                  </div>
                                </div>
                                <div className="flex gap-4">
                                  <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                      <IconCheck className="w-5 h-5 text-gray-400" />
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-semibold text-gray-500">
                                      Delivered
                                    </p>
                                    <p className="text-sm text-gray-400">
                                      Est.{" "}
                                      {order.estimatedDelivery &&
                                        new Date(
                                          order.estimatedDelivery
                                        ).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-5">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-bold text-gray-900">${item.price}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Store</p>
                        <p className="font-semibold text-gray-900">
                          {order.store}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Total Amount</p>
                        <p className="text-2xl font-bold text-gray-900">
                          ${order.total.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {order.canCancel && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <IconX className="w-4 h-4 mr-2" />
                          Cancel Order
                        </Button>
                      )}
                      {order.canReview && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-amber-200 text-amber-600 hover:bg-amber-50"
                            >
                              <IconStar className="w-4 h-4 mr-2" />
                              Write Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Write a Review</DialogTitle>
                              <DialogDescription>
                                Share your experience with this product
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label>Rating</Label>
                                <div className="flex gap-2">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                      key={star}
                                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                      <IconStar className="w-6 h-6 text-amber-400 fill-amber-400" />
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="review">Your Review</Label>
                                <Textarea
                                  id="review"
                                  placeholder="Tell us about your experience..."
                                  rows={4}
                                />
                              </div>
                            </div>
                            <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                              Submit Review
                            </Button>
                          </DialogContent>
                        </Dialog>
                      )}
                      {order.canReturn && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-200 text-blue-600 hover:bg-blue-50"
                        >
                          <IconRefresh className="w-4 h-4 mr-2" />
                          Request Return
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                      >
                        <IconRefresh className="w-4 h-4 mr-2" />
                        Reorder
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Page;
