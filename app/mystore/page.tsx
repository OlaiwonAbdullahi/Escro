import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react";
import StatCard from "./_components/stat-card";
import SalesChart from "./_components/sales-chart";
import QuickActions from "./_components/quick-actions";

const Page = () => {
  // Sample data - replace with real data from your API
  const stats = [
    {
      title: "Today's Sales",
      value: "$12,426",
      icon: DollarSign,
      change: { value: 12.5, isPositive: true },
    },
    {
      title: "Total Products",
      value: "248",
      icon: Package,
      change: { value: 8.2, isPositive: true },
    },
    {
      title: "Pending Orders",
      value: "36",
      icon: ShoppingCart,
      change: { value: 3.1, isPositive: false },
    },
    {
      title: "Total Revenue",
      value: "$84,290",
      icon: TrendingUp,
      change: { value: 18.7, isPositive: true },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-black text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-500">
            Welcome back! Here&apos;s what&apos;s happening with your store
            today.
          </p>
        </div>

        {/* Analytics Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              change={stat.change}
            />
          ))}
        </div>

        <div className="">
          <SalesChart />
        </div>
        <div className="">
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Page;
