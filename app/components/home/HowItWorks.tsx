"use client";

import React from "react";
import {
  Search,
  ShoppingCart,
  Package,
  Store,
  Upload,
  TrendingUp,
  ArrowRight,
  Users,
  Shield,
  Zap,
} from "lucide-react";

const HowItWorks = () => {
  // Consolidated data-driven configuration
  const workflows = [
    {
      id: "customers",
      title: "For Customers",
      subtitle: "Shop with confidence in three simple steps",
      accent: "emerald",
      gradient: "from-emerald-500 via-emerald-400 to-emerald-600",
      glow: "group-hover:shadow-emerald-500/20",
      border: "group-hover:border-emerald-500/50",
      bgGradient: "group-hover:bg-emerald-500/5",
      steps: [
        {
          number: "01",
          icon: <Search className="w-7 h-7" />,
          title: "Browse & Select",
          description:
            "Explore thousands of products from verified sellers. Find exactly what you need with our advanced search and filters.",
          highlight:
            "Advanced filters and verified seller badges ensure quality.",
        },
        {
          number: "02",
          icon: <ShoppingCart className="w-7 h-7" />,
          title: "Secure Checkout",
          description:
            "Your payment is held safely in escrow. Funds are only released when you confirm delivery and satisfaction.",
          highlight: "100% escrow protection with real-time tracking.",
        },
        {
          number: "03",
          icon: <Package className="w-7 h-7" />,
          title: "Receive & Confirm",
          description:
            "Get your items delivered to your doorstep. Confirm receipt and release payment with complete peace of mind.",
          highlight: "Instant payment release upon confirmation.",
        },
      ],
    },
    {
      id: "vendors",
      title: "For Vendors",
      subtitle: "Start selling in three simple steps",
      accent: "amber",
      gradient: "from-amber-500 via-amber-400 to-amber-600",
      glow: "group-hover:shadow-amber-500/20",
      border: "group-hover:border-amber-500/50",
      bgGradient: "group-hover:bg-amber-500/5",
      steps: [
        {
          number: "01",
          icon: <Store className="w-7 h-7" />,
          title: "Create Your Store",
          description:
            "Set up your seller account in minutes. Customize your storefront and start building your brand online.",
          highlight: "No-code store builder with customizable themes.",
        },
        {
          number: "02",
          icon: <Upload className="w-7 h-7" />,
          title: "List Your Products",
          description:
            "Upload products with photos and descriptions. Set your prices and manage inventory from one dashboard.",
          highlight: "Batch upload and AI-powered descriptions.",
        },
        {
          number: "03",
          icon: <TrendingUp className="w-7 h-7" />,
          title: "Sell & Grow",
          description:
            "Receive orders and fulfill them securely. Get paid instantly when customers confirm delivery via escrow.",
          highlight: "Automated payouts and growth analytics.",
        },
      ],
    },
  ];

  // Stats configuration
  const stats = [
    { icon: Users, value: "10K+", label: "Active Users", color: "emerald" },
    { icon: Shield, value: "100%", label: "Escrow Protected", color: "blue" },
    { icon: Zap, value: "< 2min", label: "Avg. Setup Time", color: "amber" },
  ];

  return (
    <section className="relative bg-zinc-950 pt-24 overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/50 to-zinc-950">
        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        </div>

        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)] pointer-events-none" />

        {/* Ambient Glows */}
        <div className="absolute top-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-amber-500/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header with Stats Integration */}
        <div className="mb-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white font-mont tracking-tight">
            How It{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500">
              Works
            </span>
          </h2>
        </div>

        {/* Workflow Sections */}
        <div className="space-y-24">
          {workflows.map((workflow) => (
            <div key={workflow.id} className="relative">
              {/* Section Header */}
              <div className="mb-16 text-center">
                <h3 className="text-4xl font-bold text-white mb-3 font-mont">
                  {workflow.title}
                </h3>
                <p className="text-lg text-zinc-400 font-noto max-w-xl mx-auto">
                  {workflow.subtitle}
                </p>
              </div>

              {/* Steps Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                {/* Connecting Line - Desktop Only */}
                <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-zinc-800 to-transparent -translate-y-1/2" />
                <div
                  className={`hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r ${workflow.gradient} opacity-20 -translate-y-1/2`}
                />

                {workflow.steps.map((step, index) => (
                  <div key={step.number} className="relative">
                    {/* Step Card */}
                    <div
                      className={`group relative flex flex-col h-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 transition-all duration-500 hover:-translate-y-2 ${workflow.border} ${workflow.glow} backdrop-blur-sm`}
                    >
                      {/* Hover Gradient Overlay */}
                      <div
                        className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${workflow.bgGradient} group-hover:opacity-100`}
                      />

                      {/* Number Badge with Glow */}
                      <div className="absolute -top-4 -left-4">
                        <div className="relative">
                          <div
                            className={`absolute -inset-1 rounded-full bg-gradient-to-br ${workflow.gradient} opacity-50 blur`}
                          />
                          <div
                            className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${workflow.gradient} flex items-center justify-center text-white font-bold text-xl font-mont shadow-2xl`}
                          >
                            {step.number}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Icon Container */}
                        <div
                          className={`mb-6 p-4 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-800 w-16 h-16 flex items-center justify-center ${
                            workflow.accent === "emerald"
                              ? "text-emerald-400"
                              : "text-amber-400"
                          }`}
                        >
                          {step.icon}
                        </div>

                        {/* Title */}
                        <h4 className="text-2xl font-bold text-white mb-4 font-mont">
                          {step.title}
                        </h4>

                        {/* Description */}
                        <p className="text-zinc-400 font-noto leading-relaxed mb-6">
                          {step.description}
                        </p>

                        {/* Highlight */}
                        <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900/50">
                          <div className="flex items-start gap-3">
                            <div
                              className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                                workflow.accent === "emerald"
                                  ? "bg-emerald-500"
                                  : "bg-amber-500"
                              }`}
                            />
                            <span className="text-sm text-zinc-300">
                              {step.highlight}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Arrow Connector - Mobile */}
                      {index < workflow.steps.length - 1 && (
                        <div className="lg:hidden flex justify-center mt-8 pt-8 border-t border-zinc-800">
                          <ArrowRight
                            className={`${
                              workflow.accent === "emerald"
                                ? "text-emerald-500"
                                : "text-amber-500"
                            }`}
                            size={24}
                          />
                        </div>
                      )}
                    </div>

                    {/* Arrow Connector - Desktop */}
                    {index < workflow.steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                        <div className="relative">
                          <div
                            className={`absolute inset-0 rounded-full ${
                              workflow.accent === "emerald"
                                ? "bg-emerald-500/20"
                                : "bg-amber-500/20"
                            } blur-sm`}
                          />
                          <ArrowRight
                            className={`relative ${
                              workflow.accent === "emerald"
                                ? "text-emerald-400"
                                : "text-amber-400"
                            }`}
                            size={32}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="text-center mt-12">
                <button
                  className={`group inline-flex items-center gap-3 rounded-xl ${
                    workflow.accent === "emerald"
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-amber-600 hover:bg-amber-700"
                  } px-8 py-4 text-lg font-semibold text-white transition-all hover:shadow-2xl ${
                    workflow.glow
                  } active:scale-95`}
                >
                  {workflow.id === "customers"
                    ? "Start Shopping"
                    : "Start Selling"}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Unified CTA */}
        <div className="mt-24 pt-12 border-t border-zinc-800 text-center"></div>
      </div>
    </section>
  );
};

export default HowItWorks;
