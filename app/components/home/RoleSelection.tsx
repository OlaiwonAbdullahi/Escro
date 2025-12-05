"use client";

import React from "react";
import {
  ShoppingBag,
  Store,
  Truck,
  Building2,
  ArrowRight,
  Shield,
  TrendingUp,
  Users,
  Zap,
  CheckCircle2,
} from "lucide-react";

const RoleSelection = () => {
  // Consolidated data-driven configuration with enhanced properties
  const roles = [
    {
      id: "customer",
      icon: ShoppingBag,
      title: "Customer",
      subtitle: "Shop with complete protection",
      description:
        "Shop from thousands of verified sellers with complete purchase protection. Your payments are secured in escrow until delivery.",
      stats: "95% satisfaction rate",
      features: [
        "Secure escrow payments",
        "Verified sellers only",
        "Easy returns & refunds",
        "Real-time order tracking",
        "Price match guarantee",
        "24/7 customer support",
      ],
      accent: "emerald",
      gradient: "from-emerald-500 via-emerald-400 to-emerald-600",
      hoverGlow: "group-hover:shadow-emerald-500/25",
      hoverBorder: "group-hover:border-emerald-500/60",
      bgGradient:
        "group-hover:bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent",
      badge: {
        text: "Most Popular",
        color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      },
      statsIcon: Shield,
      cta: "Start Shopping",
    },
    {
      id: "store-owner",
      icon: Store,
      title: "Store Owner",
      subtitle: "Launch & grow your business",
      description:
        "Launch your online store and reach thousands of customers. Get paid securely through our escrow system with zero setup fees.",
      stats: "40% faster growth",
      features: [
        "No-code store builder",
        "Secure escrow payments",
        "Advanced analytics dashboard",
        "AI-powered marketing tools",
        "Inventory management",
        "Bulk order processing",
      ],
      accent: "amber",
      gradient: "from-amber-500 via-amber-400 to-amber-600",
      hoverGlow: "group-hover:shadow-amber-500/25",
      hoverBorder: "group-hover:border-amber-500/60",
      bgGradient:
        "group-hover:bg-gradient-to-br from-amber-500/5 via-transparent to-transparent",
      badge: {
        text: "Zero Fees",
        color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      },
      statsIcon: TrendingUp,
      cta: "Start Selling",
    },
    {
      id: "courier",
      icon: Truck,
      title: "Courier",
      subtitle: "Earn on your schedule",
      description:
        "Earn money delivering packages on your own schedule. Choose your delivery areas and working hours with flexible payouts.",
      stats: "$25+/hour average",
      features: [
        "Flexible schedule",
        "Instant weekly payouts",
        "AI route optimization",
        "Earn per delivery + tips",
        "Insurance coverage",
        "Performance bonuses",
      ],
      accent: "blue",
      gradient: "from-blue-500 via-blue-400 to-blue-600",
      hoverGlow: "group-hover:shadow-blue-500/25",
      hoverBorder: "group-hover:border-blue-500/60",
      bgGradient:
        "group-hover:bg-gradient-to-br from-blue-500/5 via-transparent to-transparent",
      badge: {
        text: "Flexible",
        color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      },
      statsIcon: Zap,
      cta: "Start Delivering",
    },
    {
      id: "agency",
      icon: Building2,
      title: "Agency",
      subtitle: "Scale your operations",
      description:
        "Scale your logistics business by partnering with our platform. Handle bulk orders with API integration and dedicated support.",
      stats: "Enterprise API",
      features: [
        "Bulk order handling",
        "Full API integration",
        "Dedicated account manager",
        "Custom pricing tiers",
        "White-label solutions",
        "Advanced reporting",
      ],
      accent: "violet",
      gradient: "from-violet-500 via-violet-400 to-violet-600",
      hoverGlow: "group-hover:shadow-violet-500/25",
      hoverBorder: "group-hover:border-violet-500/60",
      bgGradient:
        "group-hover:bg-gradient-to-br from-violet-500/5 via-transparent to-transparent",
      badge: {
        text: "Enterprise",
        color: "bg-violet-500/10 text-violet-400 border-violet-500/20",
      },
      statsIcon: Users,
      cta: "Partner Now",
    },
  ];

  // Platform stats

  return (
    <section className="relative pt-20 bg-zinc-950 overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0">
        {/* Animated Gradient Mesh */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)] pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 font-mont tracking-tight">
            Find Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500">
              Perfect Fit
            </span>
          </h2>
          <p className="text-xl text-zinc-400 font-noto leading-relaxed mb-12">
            Join thousands of users already thriving on our platform. Select the
            role that fits you best and get started today.
          </p>
        </div>

        {/* Role Cards Grid - Bento Style */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {roles.map((role, index) => (
            <div key={role.id} className="group relative">
              {/* Card Container */}
              <div
                className={`relative h-full overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900/60 to-zinc-950/60 p-8 transition-all duration-500 hover:-translate-y-2 ${role.hoverBorder} ${role.hoverGlow} backdrop-blur-sm`}
              >
                {/* Hover Gradient Overlay */}
                <div
                  className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${role.bgGradient} group-hover:opacity-100`}
                />

                {/* Badge */}
                <div className="absolute top-6 right-6 z-20">
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm ${role.badge.color}`}
                  >
                    {role.badge.text}
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-4 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-800 ${
                          role.accent === "emerald"
                            ? "text-emerald-400"
                            : role.accent === "amber"
                            ? "text-amber-400"
                            : role.accent === "blue"
                            ? "text-blue-400"
                            : "text-violet-400"
                        }`}
                      >
                        <role.icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white font-mont">
                          {role.title}
                        </h3>
                        <p
                          className={`text-sm font-medium ${
                            role.accent === "emerald"
                              ? "text-emerald-400/80"
                              : role.accent === "amber"
                              ? "text-amber-400/80"
                              : role.accent === "blue"
                              ? "text-blue-400/80"
                              : "text-violet-400/80"
                          }`}
                        >
                          {role.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-zinc-400 font-noto leading-relaxed mb-8 flex-grow">
                    {role.description}
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {role.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 p-3 rounded-lg border border-zinc-800 bg-zinc-900/50"
                      >
                        <CheckCircle2
                          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                            role.accent === "emerald"
                              ? "text-emerald-500"
                              : role.accent === "amber"
                              ? "text-amber-500"
                              : role.accent === "blue"
                              ? "text-blue-500"
                              : "text-violet-500"
                          }`}
                        />
                        <span className="text-sm text-zinc-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-auto pt-8 border-t border-zinc-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            role.accent === "emerald"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : role.accent === "amber"
                              ? "bg-amber-500/10 text-amber-400"
                              : role.accent === "blue"
                              ? "bg-blue-500/10 text-blue-400"
                              : "bg-violet-500/10 text-violet-400"
                          }`}
                        >
                          <role.statsIcon className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-zinc-400">
                          {role.stats}
                        </span>
                      </div>

                      <button
                        className={`group/btn relative overflow-hidden rounded-xl px-6 py-3.5 font-semibold text-white transition-all ${
                          role.accent === "emerald"
                            ? "bg-emerald-600 hover:bg-emerald-700"
                            : role.accent === "amber"
                            ? "bg-amber-600 hover:bg-amber-700"
                            : role.accent === "blue"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-violet-600 hover:bg-violet-700"
                        } hover:shadow-xl active:scale-95`}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {role.cta}
                          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </span>
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${role.gradient} opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Element */}
              <div
                className={`absolute -top-2 -right-2 w-20 h-20 rounded-full ${
                  role.accent === "emerald"
                    ? "bg-emerald-500/5"
                    : role.accent === "amber"
                    ? "bg-amber-500/5"
                    : role.accent === "blue"
                    ? "bg-blue-500/5"
                    : "bg-violet-500/5"
                } blur-xl pointer-events-none`}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 pt-12">
          <div className="max-w-2xl mx-auto text-center"></div>
        </div>
      </div>
    </section>
  );
};

export default RoleSelection;
