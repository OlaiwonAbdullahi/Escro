"use client";

import React from "react";
import HeroImage from "@/public/hero.svg";
import { ArrowRight, ShieldCheck, TrendingUp, Users } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-20 min-h-screen w-full overflow-hidden bg-zinc-950 selection:bg-[#10B981] selection:text-white">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.6"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      <div className="absolute top-0 left-1/4 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-[#10B981] opacity-20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[600px] w-[600px] translate-y-1/3 translate-x-1/4 rounded-full bg-emerald-900 opacity-30 blur-[100px]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 pt-32 pb-20 lg:pt-16 lg:pb-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="max-w-2xl">
            <h1 className="font-mont text-5xl font-bold tracking-tighter text-white sm:text-6xl xl:text-7xl mb-6">
              Your One-Stop <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] via-emerald-200 to-white">
                Multi-Vendor
              </span>{" "}
              Marketplace.
            </h1>

            <p className="font-noto text-lg text-zinc-400 md:text-xl leading-relaxed max-w-lg mb-10">
              The modern marketplace where your funds are protected until
              delivery is confirmed. Built for buyers, sellers, and secure
              transactions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-[#10B981] px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-[#059669] hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] active:scale-95">
                Shop Now
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button className="group inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/50 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-zinc-800 hover:border-emerald-500/50 active:scale-95">
                Become a Seller
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-500 font-medium">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 hover:text-[#10B981] transition-colors border-b border-transparent hover:border-[#10B981]"
              >
                Join as Courier
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <span className="text-zinc-700">•</span>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 hover:text-[#10B981] transition-colors border-b border-transparent hover:border-[#10B981]"
              >
                Agency Partnerships
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-zinc-800 pt-8">
              {[
                { label: "Active Users", val: "10K+", icon: Users },
                { label: "Escrow Secure", val: "100%", icon: ShieldCheck },
                { label: "Trust Rating", val: "4.9/5", icon: TrendingUp },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <div className="flex items-center gap-2 text-white font-bold text-2xl font-mont">
                    {stat.val}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block perspective-1000">
            <div className="relative z-20 rounded-2xl border border-white/10 bg-zinc-900/40 p-2 backdrop-blur-xl shadow-2xl shadow-black/50">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-[#10B981] to-transparent opacity-20 blur-sm" />

              <div className="relative overflow-hidden rounded-xl bg-zinc-900">
                <img
                  src={HeroImage.src}
                  alt="Marketplace Dashboard"
                  className="w-full h-auto object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
