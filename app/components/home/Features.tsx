"use client";

import React from "react";
import {
  ShoppingBag,
  Store,
  Truck,
  Building2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "Shop Now",
      userType: "For Customers",
      description:
        "Browse thousands of products verified by escrow protection.",
      benefits: [
        "Something something",
        "Something something",
        "Something something",
      ],
      accent: "text-emerald-400",
      glow: "group-hover:shadow-emerald-500/20",
      border: "group-hover:border-emerald-500/50",
      bgGradient: "group-hover:bg-emerald-500/5",
      buttonColor: "bg-emerald-500 hover:bg-emerald-600",
    },
    {
      icon: <Store className="w-6 h-6" />,
      title: "Become a Seller",
      userType: "For Store Owners",
      description: "Start your online business with our pro seller dashboard.",
      benefits: [
        "Something something",
        "Something something",
        "Something something",
      ],
      accent: "text-amber-400",
      glow: "group-hover:shadow-amber-500/20",
      border: "group-hover:border-amber-500/50",
      bgGradient: "group-hover:bg-amber-500/5",
      buttonColor: "bg-amber-500 hover:bg-amber-600",
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Join as Courier",
      userType: "For Couriers",
      description: "Earn money on your schedule by delivering packages nearby.",
      benefits: [
        "Something something",
        "Something something",
        "Something something",
      ],
      accent: "text-blue-400",
      glow: "group-hover:shadow-blue-500/20",
      border: "group-hover:border-blue-500/50",
      bgGradient: "group-hover:bg-blue-500/5",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Partner with Us",
      userType: "For Agencies",
      description:
        "Scale your logistics business by partnering with our platform.",
      benefits: [
        "Something something",
        "Something something",
        "Something something",
      ],
      accent: "text-violet-400",
      glow: "group-hover:shadow-violet-500/20",
      border: "group-hover:border-violet-500/50",
      bgGradient: "group-hover:bg-violet-500/5",
      buttonColor: "bg-violet-600 hover:bg-violet-700",
    },
  ];

  return (
    <section className="relative py-24 bg-zinc-950 overflow-hidden">
      {/* Background Decor - Subtle Grid to match Hero */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-20 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mont tracking-tight">
            Built for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
              Everyone.
            </span>
          </h2>
          <p className="text-lg text-zinc-400 font-noto leading-relaxed border-l-2 border-emerald-500/30 pl-6">
            Whether you're buying, selling, delivering, or managing logistics,
            Escro has the perfect, secure solution for you.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${feature.border} ${feature.glow}`}
            >
              {/* Hover Gradient Overlay */}
              <div
                className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${feature.bgGradient} group-hover:opacity-100`}
              />

              <div className="relative z-10">
                {/* Header: User Type & Icon */}
                <div className="flex justify-between items-start mb-6">
                  <div
                    className={`p-3 rounded-lg bg-zinc-950 border border-zinc-800 shadow-inner ${feature.accent}`}
                  >
                    {feature.icon}
                  </div>
                  <span
                    className={`text-xs font-bold uppercase tracking-widest ${feature.accent} opacity-80`}
                  >
                    {feature.userType}
                  </span>
                </div>

                {/* Title & Desc */}
                <h3 className="text-2xl font-bold text-white mb-3 font-mont">
                  {feature.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Benefits List - Clean & Modern */}
                <ul className="space-y-3 mb-8">
                  {feature.benefits.map((benefit, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-zinc-300"
                    >
                      <CheckCircle2
                        className={`w-4 h-4 mr-3 ${feature.accent}`}
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Area */}
              <div className="relative z-10 mt-auto pt-6 border-t border-zinc-800/50">
                <button
                  className={`w-full py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold text-white transition-all duration-300 shadow-lg ${feature.buttonColor} active:scale-[0.98]`}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
