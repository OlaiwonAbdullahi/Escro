"use client";

import { useState } from "react";
import {
  IconDeviceLaptop,
  IconShirt,
  IconSofa,
  IconBarbell,
  IconBook,
  IconDeviceGamepad2,
  IconSparkles,
  IconArrowRight,
  IconFlame,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  itemCount: number;
  color: string;
  bg: string;
}

const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    icon: IconDeviceLaptop,
    itemCount: 2453,
    color: "text-blue-600",
    bg: "bg-blue-200",
  },
  {
    id: "fashion",
    name: "Fashion",
    icon: IconShirt,
    itemCount: 5621,
    color: "text-pink-600",
    bg: "bg-pink-200",
  },
  {
    id: "home",
    name: "Home & Living",
    icon: IconSofa,
    itemCount: 1892,
    color: "text-amber-600",
    bg: "bg-amber-200",
  },
  {
    id: "sports",
    name: "Sports",
    icon: IconBarbell,
    itemCount: 923,
    color: "text-emerald-600",
    bg: "bg-emerald-200",
  },
  {
    id: "books",
    name: "Books",
    icon: IconBook,
    itemCount: 3412,
    color: "text-violet-600",
    bg: "bg-violet-200",
  },
  {
    id: "gaming",
    name: "Gaming",
    icon: IconDeviceGamepad2,
    itemCount: 756,
    color: "text-red-600",
    bg: "bg-red-200",
  },
];

const Categories = () => {
  return (
    <section className=" py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold  font-noto tracking-tight text-black">
              Explore Categories
            </h2>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <IconFlame className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">
                Hot
              </span>
            </div>
          </div>
          <p className="text-gray-400 text-sm font-mont">
            Explore our curated collection of product categories
          </p>
        </div>
        <Button className="group flex items-center gap-2 px-5 py-2.5 bg-emerald-500/10 hover:bg-emerald-500 border border-emerald-500/30 hover:border-emerald-500 rounded-md text-emerald-400 hover:text-white text-sm font-semibold transition-all duration-300">
          View All
          <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.id}
              className={`
                group relative overflow-hidden rounded-lg cursor-pointer
                ${category.bg}
                 transition-all duration-500 ease-out
               
              `}
            >
              {/* Background Glow Effect */}
              <div
                className={`
                  absolute inset-0 opacity-0 group-hover:opacity-100
                 ${category.bg}
                  blur-xl transition-opacity duration-500
                `}
              />

              {/* Card Content */}
              <div className="relative z-10 p-5 flex flex-col items-center text-center">
                {/* Icon Container */}
                <div
                  className={`
                    relative 
                  `}
                >
                  <Icon
                    className={`w-10 h-10 ${category.color} transition-all duration-300`}
                    strokeWidth={1}
                  />

                  {/* Pulse Animation on Hover */}
                </div>

                {/* Category Name */}
                <h3 className="text-sm font-semibold text-gray-900 mb-1.5 font-mont group-hover:text-800 transition-colors duration-300">
                  {category.name}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Featured Categories Banner */}
      <div className="mt-8 relative overflow-hidden rounded-lg bg-linear-to-r from-emerald-600/40 via-teal-600/20 to-emerald-600/20 border border-emerald-500/20 p-6">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-md">
              <IconSparkles className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-emerald-800 font-noto">
                Discover New Arrivals
              </h3>
              <p className="text-sm text-gray-600 font-mont">
                Fresh products added daily across all categories
              </p>
            </div>
          </div>
          <Button className="group flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-md text-white text-sm font-semibold transition-all duration-300  hover:shadow-emerald-500/40">
            Explore New Arrivals
            <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
