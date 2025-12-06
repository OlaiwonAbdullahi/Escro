"use client";

import {
  X,
  Copy,
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  FileText,
  MessageCircle,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { Order } from "./orders-table";

interface OrderDetailsProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
}

// Extended order details for the panel
interface OrderItem {
  id: string;
  name: string;
  sku: string;
  image: string;
  quantity: number;
  price: number;
  variant?: string;
}

interface TimelineEvent {
  status: string;
  date: string;
  time: string;
  description?: string;
  completed: boolean;
}

// Demo data for order details
const demoItems: OrderItem[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    sku: "PRD-001",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
    quantity: 1,
    price: 299.99,
    variant: "Black",
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    sku: "PRD-002",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
    quantity: 2,
    price: 449.99,
    variant: "Silver",
  },
];

const demoTimeline: TimelineEvent[] = [
  {
    status: "Order Placed",
    date: "Dec 5, 2024",
    time: "2:30 PM",
    completed: true,
  },
  {
    status: "Payment Confirmed",
    date: "Dec 5, 2024",
    time: "2:35 PM",
    description: "Payment held in Escrow",
    completed: true,
  },
  {
    status: "Processing Started",
    date: "Dec 5, 2024",
    time: "4:00 PM",
    completed: true,
  },
  {
    status: "Order Shipped",
    date: "Dec 6, 2024",
    time: "10:00 AM",
    description: "Tracking: TRACK123456",
    completed: true,
  },
  {
    status: "Out for Delivery",
    date: "Dec 8, 2024",
    time: "Expected",
    completed: false,
  },
  {
    status: "Delivered",
    date: "Dec 8, 2024",
    time: "Expected",
    completed: false,
  },
];

const statusSteps = [
  { key: "pending", label: "Placed", icon: Clock },
  { key: "processing", label: "Process", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle },
];

const OrderDetails = ({ order, open, onClose }: OrderDetailsProps) => {
  if (!order) return null;

  const getStatusProgress = () => {
    const statusOrder = [
      "pending",
      "processing",
      "shipped",
      "delivered",
    ] as const;
    const currentIndex = statusOrder.indexOf(
      order.orderStatus as (typeof statusOrder)[number]
    );
    return currentIndex >= 0 ? ((currentIndex + 1) / 4) * 100 : 0;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const subtotal = demoItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 15.0;
  const tax = subtotal * 0.1;
  const discount = 20.0;
  const total = subtotal + shipping + tax - discount;

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto scrollbar-hide p-6">
        <SheetHeader className="space-y-1 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold">
              Order #{order.id}
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="space-y-6 pb-6">
          {/* Order Status Progress */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Order Status</h3>
              <span className="text-sm text-emerald-600 font-medium capitalize">
                {order.orderStatus}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="relative mb-6">
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${getStatusProgress()}%` }}
                />
              </div>
            </div>

            {/* Status Steps */}
            <div className="grid grid-cols-4 gap-2">
              {statusSteps.map((step, index) => {
                const statusOrder = [
                  "pending",
                  "processing",
                  "shipped",
                  "delivered",
                ];
                const currentIndex = statusOrder.indexOf(order.orderStatus);
                const isCompleted = index <= currentIndex;
                const Icon = step.icon;

                return (
                  <div key={step.key} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        isCompleted
                          ? "bg-emerald-500 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-xs font-medium text-center ${
                        isCompleted ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-4">
              Customer Details
            </h3>
            <div className="flex items-start gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={order.customer.avatar} />
                <AvatarFallback className="bg-emerald-100 text-emerald-700 font-medium">
                  {order.customer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <p className="font-medium text-gray-900">
                  {order.customer.name}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>customer@example.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  <span>123 Main Street, Apt 4B, New York, NY 10001</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Customer
              </Button>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-4">
              Ordered Items ({demoItems.length})
            </h3>
            <div className="space-y-4">
              {demoItems.map((item, index) => (
                <div key={item.id}>
                  <div className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                      {item.variant && (
                        <p className="text-xs text-gray-500">
                          Variant: {item.variant}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">x{item.quantity}</p>
                    </div>
                  </div>
                  {index < demoItems.length - 1 && (
                    <Separator className="mt-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-4">
              Payment Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (10%)</span>
                <span className="text-gray-900">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold text-base">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method</span>
                <span className="text-gray-900">Credit Card (****1234)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Payment Status</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Escrow
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Transaction ID</span>
                <div className="flex items-center gap-1">
                  <span className="text-gray-900 font-mono text-xs">
                    TXN-ABC123
                  </span>
                  <button
                    onClick={() => copyToClipboard("TXN-ABC123")}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Copy className="w-3 h-3 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-4">
              Shipping Information
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping Method</span>
                <span className="text-gray-900">Standard Delivery</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tracking Number</span>
                <div className="flex items-center gap-1">
                  <span className="text-emerald-600 font-mono">
                    TRACK123456
                  </span>
                  <button
                    onClick={() => copyToClipboard("TRACK123456")}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Copy className="w-3 h-3 text-gray-400" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Delivery</span>
                <span className="text-gray-900">Dec 8-10, 2024</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-4 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
            >
              <Truck className="w-4 h-4 mr-2" />
              Track Package
            </Button>
          </div>

          {/* Order Timeline */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Order Timeline</h3>
            <div className="space-y-4">
              {demoTimeline.map((event, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        event.completed ? "bg-emerald-500" : "bg-gray-300"
                      }`}
                    />
                    {index < demoTimeline.length - 1 && (
                      <div
                        className={`w-0.5 h-full min-h-[40px] ${
                          event.completed ? "bg-emerald-200" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                  <div className="pb-4">
                    <p
                      className={`font-medium text-sm ${
                        event.completed ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {event.status}
                    </p>
                    <p className="text-xs text-gray-500">
                      {event.date} - {event.time}
                    </p>
                    {event.description && (
                      <p className="text-xs text-gray-500 mt-1">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
              <Package className="w-4 h-4 mr-2" />
              Update Order Status
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Print Invoice
              </Button>
              <Button variant="outline" className="w-full">
                <Truck className="w-4 h-4 mr-2" />
                Add Tracking
              </Button>
            </div>
            {order.orderStatus !== "cancelled" &&
              order.orderStatus !== "delivered" && (
                <Button
                  variant="outline"
                  className="w-full text-red-600 border-red-200 hover:bg-red-50"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancel Order
                </Button>
              )}
            {order.orderStatus === "delivered" && (
              <Button
                variant="outline"
                className="w-full text-orange-600 border-orange-200 hover:bg-orange-50"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Process Refund
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default OrderDetails;
