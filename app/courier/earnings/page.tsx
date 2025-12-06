"use client";

import { useState } from "react";
import {
  IconCurrencyDollar,
  IconWallet,
  IconTrendingUp,
  IconCalendarWeek,
  IconCalendarMonth,
  IconBuildingBank,
  IconArrowRight,
  IconClock,
  IconCheck,
  IconX,
  IconChartBar,
  IconDownload,
} from "@tabler/icons-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Demo earnings data
const earningsChartData = [
  { day: "Mon", earnings: 8500 },
  { day: "Tue", earnings: 12300 },
  { day: "Wed", earnings: 9800 },
  { day: "Thu", earnings: 15400 },
  { day: "Fri", earnings: 18200 },
  { day: "Sat", earnings: 22100 },
  { day: "Sun", earnings: 14800 },
];

interface Transaction {
  id: string;
  type: "delivery" | "bonus" | "payout" | "tip";
  description: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
  time: string;
}

const recentTransactions: Transaction[] = [
  {
    id: "TXN-001",
    type: "delivery",
    description: "Delivery to Lekki Phase 1",
    amount: 2500,
    status: "completed",
    date: "Today",
    time: "3:30 PM",
  },
  {
    id: "TXN-002",
    type: "tip",
    description: "Customer tip - Sarah Johnson",
    amount: 500,
    status: "completed",
    date: "Today",
    time: "2:45 PM",
  },
  {
    id: "TXN-003",
    type: "delivery",
    description: "Delivery to Victoria Island",
    amount: 1800,
    status: "completed",
    date: "Today",
    time: "1:20 PM",
  },
  {
    id: "TXN-004",
    type: "payout",
    description: "Weekly payout to GTBank",
    amount: -45000,
    status: "completed",
    date: "Yesterday",
    time: "6:00 PM",
  },
  {
    id: "TXN-005",
    type: "bonus",
    description: "Weekend delivery bonus",
    amount: 3000,
    status: "pending",
    date: "Yesterday",
    time: "11:59 PM",
  },
  {
    id: "TXN-006",
    type: "delivery",
    description: "Express delivery to Ikoyi",
    amount: 3200,
    status: "completed",
    date: "Yesterday",
    time: "4:15 PM",
  },
];

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
  color: "emerald" | "blue" | "purple" | "amber";
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

const colorStyles = {
  emerald: {
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    trendBg: "bg-emerald-50",
    trendText: "text-emerald-700",
  },
  blue: {
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    trendBg: "bg-blue-50",
    trendText: "text-blue-700",
  },
  purple: {
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    trendBg: "bg-purple-50",
    trendText: "text-purple-700",
  },
  amber: {
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    trendBg: "bg-amber-50",
    trendText: "text-amber-700",
  },
};

const EarningsStatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  trend,
}: StatCardProps) => {
  const styles = colorStyles[color];

  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-emerald-500 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide mb-1">
            {title}
          </p>
        </div>
        <div
          className={`${styles.iconColor} ${styles.iconBg} p-2.5 rounded-lg group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="mb-2">
        <h3 className="text-gray-900 text-3xl font-bold tracking-tight font-space">
          {value}
        </h3>
      </div>
      <p className="text-gray-500 text-sm mb-3">{subtitle}</p>
      {trend && (
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${
              trend.isPositive
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            <IconTrendingUp
              className={`w-3.5 h-3.5 ${!trend.isPositive ? "rotate-180" : ""}`}
            />
            <span className="text-xs font-semibold">{trend.value}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const getTypeIcon = (type: Transaction["type"]) => {
  switch (type) {
    case "delivery":
      return IconCurrencyDollar;
    case "tip":
      return IconTrendingUp;
    case "bonus":
      return IconChartBar;
    case "payout":
      return IconBuildingBank;
  }
};

const getTypeColor = (type: Transaction["type"]) => {
  switch (type) {
    case "delivery":
      return "bg-emerald-100 text-emerald-600";
    case "tip":
      return "bg-purple-100 text-purple-600";
    case "bonus":
      return "bg-amber-100 text-amber-600";
    case "payout":
      return "bg-blue-100 text-blue-600";
  }
};

const getStatusBadge = (status: Transaction["status"]) => {
  switch (status) {
    case "completed":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
          <IconCheck className="w-3 h-3" />
          Completed
        </span>
      );
    case "pending":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
          <IconClock className="w-3 h-3" />
          Pending
        </span>
      );
    case "failed":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-medium">
          <IconX className="w-3 h-3" />
          Failed
        </span>
      );
  }
};

const formatAmount = (amount: number) => {
  const isNegative = amount < 0;
  const formatted = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  })
    .format(Math.abs(amount))
    .replace("NGN", "₦");

  return isNegative ? `-${formatted}` : `+${formatted}`;
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-emerald-400 font-bold">
          ₦{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function EarningsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<
    "week" | "month" | "year"
  >("week");

  const stats: StatCardProps[] = [
    {
      title: "Today's Earnings",
      value: "₦15,450",
      subtitle: "8 deliveries completed",
      icon: IconCurrencyDollar,
      color: "emerald",
      trend: { value: "+18% vs yesterday", isPositive: true },
    },
    {
      title: "This Week",
      value: "₦101,100",
      subtitle: "42 deliveries completed",
      icon: IconCalendarWeek,
      color: "blue",
      trend: { value: "+12% vs last week", isPositive: true },
    },
    {
      title: "This Month",
      value: "₦387,500",
      subtitle: "156 deliveries completed",
      icon: IconCalendarMonth,
      color: "purple",
      trend: { value: "+8% vs last month", isPositive: true },
    },
    {
      title: "Pending Payout",
      value: "₦52,300",
      subtitle: "Next payout: Friday",
      icon: IconWallet,
      color: "amber",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
          <div>
            <h1 className="text-black text-3xl font-bold mb-2 font-noto">
              Earnings
            </h1>
            <p className="text-gray-500">
              Track your earnings, view transactions, and manage payouts.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors">
            <IconDownload className="w-4 h-4" />
            Export Statement
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <EarningsStatCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Earnings Chart */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Earnings Overview
                </h2>
                <p className="text-sm text-gray-500">
                  Your earnings trend this week
                </p>
              </div>
              <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
                {(["week", "month", "year"] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                      selectedPeriod === period
                        ? "bg-white text-emerald-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={earningsChartData}>
                  <defs>
                    <linearGradient
                      id="earningsGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop
                        offset="95%"
                        stopColor="#10b981"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e5e7eb"
                  />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    tickFormatter={(value) => `₦${value / 1000}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="earnings"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fill="url(#earningsGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Payout Card */}
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/20 rounded-lg">
                <IconBuildingBank className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Withdraw Earnings</h2>
                <p className="text-emerald-100 text-sm">
                  Request instant payout
                </p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-emerald-100 text-sm mb-1">Available Balance</p>
              <p className="text-4xl font-bold font-space">₦52,300</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-100">Bank Account</span>
                <span className="font-medium">GTBank •••• 4521</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-100">Processing Time</span>
                <span className="font-medium">Instant</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-100">Withdrawal Fee</span>
                <span className="font-medium">₦50</span>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 transition-colors">
              Withdraw Now
              <IconArrowRight className="w-4 h-4" />
            </button>

            <p className="text-emerald-200 text-xs text-center mt-4">
              Minimum withdrawal: ₦1,000
            </p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Recent Transactions
              </h2>
              <p className="text-sm text-gray-500">
                Your latest earnings and payouts
              </p>
            </div>
            <button className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
              View All
              <IconArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {recentTransactions.map((transaction) => {
              const TypeIcon = getTypeIcon(transaction.type);
              const typeColor = getTypeColor(transaction.type);

              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-lg ${typeColor}`}>
                      <TypeIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.date} at {transaction.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {getStatusBadge(transaction.status)}
                    <p
                      className={`font-semibold font-space ${
                        transaction.amount < 0
                          ? "text-gray-900"
                          : "text-emerald-600"
                      }`}
                    >
                      {formatAmount(transaction.amount)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-gray-900 font-space">156</p>
            <p className="text-sm text-gray-500">Total Deliveries</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-emerald-600 font-space">
              4.9
            </p>
            <p className="text-sm text-gray-500">Avg. Rating</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-gray-900 font-space">
              ₦2,485
            </p>
            <p className="text-sm text-gray-500">Avg. per Delivery</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-purple-600 font-space">
              ₦12,500
            </p>
            <p className="text-sm text-gray-500">Tips Earned</p>
          </div>
        </div>
      </div>
    </div>
  );
}
