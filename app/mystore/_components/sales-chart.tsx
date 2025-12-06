"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartData = [
  { day: "Mon", sales: 4200, orders: 52 },
  { day: "Tue", sales: 5800, orders: 68 },
  { day: "Wed", sales: 4600, orders: 58 },
  { day: "Thu", sales: 7200, orders: 84 },
  { day: "Fri", sales: 6800, orders: 76 },
  { day: "Sat", sales: 8400, orders: 95 },
  { day: "Sun", sales: 5900, orders: 64 },
];

const chartConfig = {
  sales: {
    label: "Sales ($)",
    color: "#10B981", // emerald-500
  },
  orders: {
    label: "Orders",
    color: "#F59E0B", // amber-500
  },
} satisfies ChartConfig;

export default function SalesChart() {
  const totalSales = chartData.reduce((acc, d) => acc + d.sales, 0);
  const totalOrders = chartData.reduce((acc, d) => acc + d.orders, 0);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-gray-900 text-xl font-bold mb-1">Sales Overview</h3>
        <p className="text-gray-500 text-sm">Last 7 days performance</p>
      </div>

      {/* Chart */}
      <ChartContainer config={chartConfig} className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              cursor={{ fill: "rgba(16, 185, 129, 0.1)" }}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                padding: "8px 12px",
              }}
              labelStyle={{ color: "#111827", fontWeight: 600 }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" />
            <Bar
              dataKey="sales"
              fill="var(--color-sales)"
              radius={[8, 8, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey="orders"
              fill="var(--color-orders)"
              radius={[8, 8, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">
            Total Sales
          </p>
          <p className="text-gray-900 text-2xl font-bold">
            ${totalSales.toLocaleString()}
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">
            Total Orders
          </p>
          <p className="text-gray-900 text-2xl font-bold">{totalOrders}</p>
        </div>
      </div>
    </div>
  );
}
