"use client";

import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  IconBan,
  IconChecks,
  IconCircleDot,
  IconClock,
  IconCopy,
  IconEye,
  IconFileText,
  IconMessageCircle,
  IconPackage,
  IconRefresh,
  IconTruck,
  IconUxCircle,
} from "@tabler/icons-react";
import { MoreHorizontal, RefreshCw } from "lucide-react";

export interface Order {
  id: string;
  date: string;
  time: string;
  customer: {
    name: string;
    avatar?: string;
  };
  items: {
    count: number;
    names: string[];
    thumbnails?: string[];
  };
  total: number;
  paymentStatus: "paid" | "escrow" | "pending" | "failed" | "refunded";
  orderStatus:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "refund";
}

interface OrdersTableProps {
  orders: Order[];
  onViewDetails: (order: Order) => void;
}

const paymentStatusConfig = {
  paid: {
    label: "Paid",
    bgColor: "bg-green-100",
    textColor: "text-green-700",
    dotColor: "bg-green-500",
  },
  escrow: {
    label: "Escrow",
    bgColor: "bg-amber-100",
    textColor: "text-amber-700",
    dotColor: "bg-amber-500",
  },
  pending: {
    label: "Pending",
    bgColor: "bg-blue-100",
    textColor: "text-blue-700",
    dotColor: "bg-blue-500",
  },
  failed: {
    label: "Failed",
    bgColor: "bg-red-100",
    textColor: "text-red-700",
    dotColor: "bg-red-500",
  },
  refunded: {
    label: "Refunded",
    bgColor: "bg-gray-100",
    textColor: "text-gray-700",
    dotColor: "bg-gray-500",
  },
};

const orderStatusConfig = {
  pending: {
    label: "Pending",
    bgColor: "bg-blue-100",
    textColor: "text-blue-700",
    icon: IconClock,
  },
  processing: {
    label: "Processing",
    bgColor: "bg-amber-100",
    textColor: "text-amber-700",
    icon: IconCircleDot,
  },
  shipped: {
    label: "Shipped",
    bgColor: "bg-purple-100",
    textColor: "text-purple-700",
    icon: IconPackage,
  },
  delivered: {
    label: "Delivered",
    bgColor: "bg-green-100",
    textColor: "text-green-700",
    icon: IconChecks,
  },
  cancelled: {
    label: "Cancelled",
    bgColor: "bg-red-100",
    textColor: "text-red-700",
    icon: IconBan,
  },
  refund: {
    label: "Return/Refund",
    bgColor: "bg-orange-100",
    textColor: "text-orange-700",
    icon: IconRefresh,
  },
};

const OrdersTable = ({ orders, onViewDetails }: OrdersTableProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyOrderId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <TooltipProvider>
      <div className="bg-white border border-emerald-200 rounded-md overflow-hidden ">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-emerald-500/10 border-b border-emerald-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Order ID
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Customer
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Items
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Total
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Payment
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-100">
              {orders.map((order) => {
                const paymentConfig = paymentStatusConfig[order.paymentStatus];
                const statusConfig = orderStatusConfig[order.orderStatus];
                const StatusIcon = statusConfig.icon;

                return (
                  <tr
                    key={order.id}
                    className="hover:bg-emerald-50 transition-colors cursor-pointer"
                    onClick={() => onViewDetails(order)}
                  >
                    {/* Order ID */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-emerald-600">
                          #{order.id}
                        </span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyOrderId(order.id);
                              }}
                              className="p-1 hover:bg-emerald-100 rounded-md transition-colors"
                            >
                              <IconCopy className="w-3.5 h-3.5 text-gray-400" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {copiedId === order.id ? "Copied!" : "Copy ID"}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-emerald-900">
                          {order.date}
                        </p>
                        <p className="text-xs text-emerald-500">{order.time}</p>
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={order.customer.avatar} />
                          <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs font-medium">
                            {order.customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-emerald-900">
                          {order.customer.name}
                        </span>
                      </div>
                    </td>

                    {/* Items */}
                    <td className="px-6 py-4">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-sm text-emerald-600 cursor-help">
                            {order.items.count} item
                            {order.items.count > 1 ? "s" : ""}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <ul className="text-xs space-y-1">
                            {order.items.names.map((name, i) => (
                              <li key={i}>{name}</li>
                            ))}
                          </ul>
                        </TooltipContent>
                      </Tooltip>
                    </td>

                    {/* Total */}
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-emerald-900">
                        ${order.total.toFixed(2)}
                      </span>
                    </td>

                    {/* Payment Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${paymentConfig.bgColor} ${paymentConfig.textColor}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${paymentConfig.dotColor}`}
                        />
                        {paymentConfig.label}
                      </span>
                    </td>

                    {/* Order Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}
                      >
                        <StatusIcon className="w-3.5 h-3.5" />
                        {statusConfig.label}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              onViewDetails(order);
                            }}
                          >
                            <IconEye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <IconTruck className="w-4 h-4 mr-2" />
                            Track Order
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <IconMessageCircle className="w-4 h-4 mr-2" />
                            Contact Customer
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <IconFileText className="w-4 h-4 mr-2" />
                            Print Invoice
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {order.orderStatus === "pending" && (
                            <DropdownMenuItem className="text-red-600">
                              <IconUxCircle className="w-4 h-4 mr-2" />
                              Cancel Order
                            </DropdownMenuItem>
                          )}
                          {order.orderStatus === "delivered" && (
                            <DropdownMenuItem className="text-orange-600">
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Initiate Refund
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-gray-100">
          {orders.map((order) => {
            const paymentConfig = paymentStatusConfig[order.paymentStatus];
            const statusConfig = orderStatusConfig[order.orderStatus];
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={order.id}
                className="p-4 hover:bg-gray-50 transition-colors"
                onClick={() => onViewDetails(order)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-emerald-600">
                      #{order.id}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {statusConfig.label}
                    </span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewDetails(order);
                        }}
                      >
                        <IconEye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <IconTruck className="w-4 h-4 mr-2" />
                        Track Order
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <IconMessageCircle className="w-4 h-4 mr-2" />
                        Contact
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={order.customer.avatar} />
                    <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">
                      {order.customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {order.customer.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {order.items.count} item{order.items.count > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold text-gray-900">
                      ${order.total.toFixed(2)}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${paymentConfig.bgColor} ${paymentConfig.textColor}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${paymentConfig.dotColor}`}
                      />
                      {paymentConfig.label}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {order.date} · {order.time}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default OrdersTable;
