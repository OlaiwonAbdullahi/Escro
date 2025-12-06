"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IconSearch,
  IconStar,
  IconShieldCheck,
  IconMapPin,
  IconTruck,
  IconBuildingStore,
  IconSparkles,
  IconHeart,
  IconEye,
  IconDeviceLaptop,
  IconShirt,
  IconSofa,
  IconBarbell,
  IconBook,
  IconDeviceGamepad2,
  IconToolsKitchen2,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface Store {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  description: string;
  rating: number;
  reviews: number;
  category: string;
  location: string;
  isVerified: boolean;
  hasDelivery: boolean;
  productCount: number;
  isFeatured?: boolean;
}

const categories = [
  { id: "all", name: "All Stores", icon: IconBuildingStore, count: 1250 },
  {
    id: "electronics",
    name: "Electronics",
    icon: IconDeviceLaptop,
    count: 342,
  },
  { id: "fashion", name: "Fashion", icon: IconShirt, count: 567 },
  { id: "home", name: "Home & Living", icon: IconSofa, count: 234 },
  { id: "sports", name: "Sports", icon: IconBarbell, count: 189 },
  { id: "books", name: "Books", icon: IconBook, count: 156 },
  { id: "gaming", name: "Gaming", icon: IconDeviceGamepad2, count: 123 },
  { id: "food", name: "Food & Grocery", icon: IconToolsKitchen2, count: 298 },
];

const stores: Store[] = [
  {
    id: "1",
    name: "TechStore Pro",
    logo: "https://api.dicebear.com/9.x/initials/svg?seed=TP&backgroundColor=10b981",
    coverImage:
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&h=400&fit=crop",
    description: "Premium electronics and gadgets from top brands worldwide",
    rating: 4.9,
    reviews: 2341,
    category: "Electronics",
    location: "New York, USA",
    isVerified: true,
    hasDelivery: true,
    productCount: 1245,
    isFeatured: true,
  },
  {
    id: "2",
    name: "Urban Style Co.",
    logo: "https://api.dicebear.com/9.x/initials/svg?seed=US&backgroundColor=ec4899",
    coverImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
    description: "Contemporary fashion for the modern individual",
    rating: 4.8,
    reviews: 1567,
    category: "Fashion",
    location: "Los Angeles, USA",
    isVerified: true,
    hasDelivery: true,
    productCount: 892,
    isFeatured: true,
  },
  {
    id: "3",
    name: "GameZone HQ",
    logo: "https://api.dicebear.com/9.x/initials/svg?seed=GZ&backgroundColor=ef4444",
    coverImage:
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&h=400&fit=crop",
    description: "Your ultimate gaming destination with rare collectibles",
    rating: 4.9,
    reviews: 987,
    category: "Gaming",
    location: "Seattle, USA",
    isVerified: true,
    hasDelivery: true,
    productCount: 567,
    isFeatured: true,
  },
  {
    id: "4",
    name: "Home Elegance",
    logo: "https://api.dicebear.com/9.x/initials/svg?seed=HE&backgroundColor=f59e0b",
    coverImage:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop",
    description: "Transform your living space with exclusive furniture",
    rating: 4.7,
    reviews: 654,
    category: "Home & Living",
    location: "Chicago, USA",
    isVerified: true,
    hasDelivery: true,
    productCount: 423,
  },
  {
    id: "5",
    name: "Athletic Pro",
    logo: "https://api.dicebear.com/9.x/initials/svg?seed=AP&backgroundColor=22c55e",
    coverImage:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop",
    description: "Sports equipment and athletic wear for champions",
    rating: 4.6,
    reviews: 432,
    category: "Sports",
    location: "Miami, USA",
    isVerified: true,
    hasDelivery: true,
    productCount: 321,
  },
  {
    id: "6",
    name: "BookWorm Haven",
    logo: "https://api.dicebear.com/9.x/initials/svg?seed=BH&backgroundColor=8b5cf6",
    coverImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    description: "A paradise for book lovers with rare editions",
    rating: 4.8,
    reviews: 876,
    category: "Books",
    location: "Boston, USA",
    isVerified: true,
    hasDelivery: true,
    productCount: 2345,
  },
];

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedStores, setLikedStores] = useState<string[]>([]);

  const filteredStores = stores.filter((store) => {
    const matchesCategory =
      selectedCategory === "all" ||
      store.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-") ===
        selectedCategory;
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen px-6 md:px-20 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-black font-noto tracking-tight">
            Explore Stores
          </h1>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <IconBuildingStore className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wide">
              {stores.length}+ Stores
            </span>
          </div>
        </div>
        <p className="text-gray-500 font-mont">
          Discover verified sellers with escrow-protected transactions
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search stores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-md pl-12 pr-4 py-3.5 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all "
          />
        </div>
        <div className="flex gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px] bg-white border-gray-200 rounded-md">
              <IconMapPin className="w-4 h-4 text-gray-400 mr-2" />
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="new-york">New York</SelectItem>
              <SelectItem value="los-angeles">Los Angeles</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px] bg-white border-gray-200 rounded-md">
              <IconStar className="w-4 h-4 text-gray-400 mr-2" />
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="4.5">4.5+ Stars</SelectItem>
              <SelectItem value="4.0">4.0+ Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-lg font-bold text-gray-900 font-noto mb-4">
          Browse by Category
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-md whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? "bg-emerald-500 text-white "
                    : "bg-white border border-gray-200 text-gray-700 hover:border-emerald-500"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category.name}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-bold text-gray-900 font-noto">
            Featured Stores
          </h2>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
            <IconSparkles className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-semibold text-amber-500 uppercase tracking-wide">
              Promoted
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores
            .filter((s) => s.isFeatured)
            .map((store) => (
              <Link
                href={`/dashboard/stores/${store.id}`}
                key={store.id}
                className="group relative bg-white rounded-md border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500"
              >
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={store.coverImage}
                    alt={store.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setLikedStores((p) =>
                        p.includes(store.id)
                          ? p.filter((i) => i !== store.id)
                          : [...p, store.id]
                      );
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
                      likedStores.includes(store.id)
                        ? "bg-red-500 text-white"
                        : "bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white"
                    }`}
                  >
                    <IconHeart
                      className="w-4 h-4"
                      fill={
                        likedStores.includes(store.id) ? "currentColor" : "none"
                      }
                    />
                  </button>
                </div>
                <div className="absolute left-4 top-24 z-10">
                  <div className="relative w-16 h-16 rounded-lg border-3 border-white overflow-hidden shadow-lg bg-white">
                    <img
                      src={store.logo}
                      alt={store.name}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="pt-10 p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-gray-900 font-noto group-hover:text-emerald-600 transition-colors">
                          {store.name}
                        </h3>
                        {store.isVerified && (
                          <IconShieldCheck className="w-5 h-5 text-emerald-500" />
                        )}
                      </div>
                      <span className="text-xs font-medium text-emerald-500 uppercase tracking-wider">
                        {store.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 rounded-lg">
                      <IconStar className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-bold text-gray-800">
                        {store.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 font-mont mb-4">
                    {store.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1.5">
                      <IconMapPin className="w-4 h-4" />
                      <span>{store.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-600">
                      <strong className="text-gray-900">
                        {store.productCount}
                      </strong>{" "}
                      products
                    </span>
                    {store.hasDelivery && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-lg">
                        <IconTruck className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-medium text-emerald-700">
                          Delivery
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-bold text-gray-900 font-noto">
            Recently Viewed
          </h2>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <IconEye className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-semibold text-blue-500 uppercase tracking-wide">
              History
            </span>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {stores.slice(3, 6).map((store) => (
            <Link
              href={`/dashboard/stores/${store.id}`}
              key={store.id}
              className="flex-shrink-0 w-72 group bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden  hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
            >
              <div className="flex items-center gap-4 p-4">
                <div className="relative w-14 h-14 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={store.logo}
                    alt={store.name}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-900 truncate group-hover:text-emerald-600 transition-colors">
                      {store.name}
                    </h4>
                    {store.isVerified && (
                      <IconShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {store.category}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <IconStar className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-medium text-gray-700">
                      {store.rating}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 font-noto">
            All Stores
          </h2>
          <p className="text-sm text-gray-500">
            Showing {filteredStores.length} stores
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStores.map((store) => (
            <Link
              href={`/dashboard/stores/${store.id}`}
              key={store.id}
              className="group bg-white rounded-md border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500"
            >
              <div className="relative h-28 overflow-hidden">
                <Image
                  src={store.coverImage}
                  alt={store.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="absolute left-3 mt-[-24px] z-10">
                <div className="relative w-12 h-12 rounded-lg border-3 border-white overflow-hidden shadow-md bg-white">
                  <img
                    src={store.logo}
                    alt={store.name}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="pt-8 p-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors font-mont">
                    {store.name}
                  </h3>
                  {store.isVerified && (
                    <IconShieldCheck className="w-4 h-4 text-emerald-500" />
                  )}
                </div>
                <span className="text-xs text-gray-500">{store.category}</span>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <IconStar className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-semibold text-gray-700">
                      {store.rating}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">
                    {store.productCount} products
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Page;
