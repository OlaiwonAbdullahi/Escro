"use client";

import { useState } from "react";
import Image from "next/image";
import {
  IconSearch,
  IconStar,
  IconShieldCheck,
  IconShoppingCart,
  IconHeart,
  IconEye,
  IconFilter,
  IconAdjustments,
  IconChevronDown,
  IconFlame,
  IconTag,
  IconLayoutGrid,
  IconList,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  seller: string;
  isVerified: boolean;
  category: string;
  brand?: string;
  discount?: number;
  isNew?: boolean;
  isDeal?: boolean;
}

const products: Product[] = [
  {
    id: "1",
    name: 'MacBook Pro 16" M3 Max',
    price: 2499,
    originalPrice: 2799,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 342,
    seller: "TechStore Pro",
    isVerified: true,
    category: "Electronics",
    brand: "Apple",
    discount: 11,
    isNew: true,
    isDeal: true,
  },
  {
    id: "2",
    name: "Sony WH-1000XM5 Headphones",
    price: 349,
    originalPrice: 399,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 1256,
    seller: "Audio Hub",
    isVerified: true,
    category: "Electronics",
    brand: "Sony",
    discount: 13,
    isDeal: true,
  },
  {
    id: "3",
    name: "Premium Leather Jacket",
    price: 289,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 89,
    seller: "Urban Style",
    isVerified: true,
    category: "Fashion",
    brand: "Urban",
    isNew: true,
  },
  {
    id: "4",
    name: "Nike Air Jordan 1 Retro",
    price: 180,
    originalPrice: 220,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 2341,
    seller: "Sneaker World",
    isVerified: true,
    category: "Footwear",
    brand: "Nike",
    discount: 18,
  },
  {
    id: "5",
    name: "Canon EOS R5 Camera",
    price: 3899,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 567,
    seller: "Camera Central",
    isVerified: true,
    category: "Electronics",
    brand: "Canon",
    isNew: true,
  },
  {
    id: "6",
    name: "Minimalist Watch",
    price: 199,
    originalPrice: 299,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 423,
    seller: "TimeKeeper",
    isVerified: true,
    category: "Accessories",
    brand: "Timex",
    discount: 33,
    isDeal: true,
  },
  {
    id: "7",
    name: "Designer Sunglasses",
    price: 159,
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 187,
    seller: "VisionStyle",
    isVerified: false,
    category: "Accessories",
    brand: "Ray-Ban",
    isNew: true,
  },
  {
    id: "8",
    name: "Gaming Mechanical Keyboard",
    price: 149,
    originalPrice: 179,
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 892,
    seller: "GameGear Pro",
    isVerified: true,
    category: "Gaming",
    brand: "Razer",
    discount: 17,
  },
];

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popularity");
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "newest") return a.isNew ? -1 : 1;
    return 0;
  });

  return (
    <div className="min-h-screen px-6 md:px-20 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-black font-noto tracking-tight">
            Shop Products
          </h1>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <IconShoppingCart className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wide">
              {products.length}+ Products
            </span>
          </div>
        </div>
        <p className="text-gray-500 font-mont">
          Discover amazing products with escrow protection
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-md pl-12 pr-4 py-3.5 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all "
          />
        </div>
        <div className="flex gap-3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px] bg-white border-gray-200 rounded-md">
              <span className="text-sm">Sort by</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="border-gray-200 rounded-md px-4 hover:bg-emerald-50 hover:border-emerald-500 hover:text-emerald-600"
              >
                <IconFilter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Products</SheetTitle>
                <SheetDescription>
                  Refine your search with advanced filters
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div>
                  <Label className="text-sm font-semibold mb-3 block">
                    Price Range
                  </Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="price1"
                        className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                      />
                      <label htmlFor="price1" className="text-sm">
                        Under $100
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="price2"
                        className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                      />
                      <label htmlFor="price2" className="text-sm">
                        $100 - $500
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="price3"
                        className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                      />
                      <label htmlFor="price3" className="text-sm">
                        $500 - $1000
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="price4"
                        className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                      />
                      <label htmlFor="price4" className="text-sm">
                        Over $1000
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-semibold mb-3 block">
                    Category
                  </Label>
                  <div className="space-y-2">
                    {[
                      "Electronics",
                      "Fashion",
                      "Footwear",
                      "Accessories",
                      "Gaming",
                    ].map((cat) => (
                      <div key={cat} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={cat}
                          className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                        />
                        <label htmlFor={cat} className="text-sm">
                          {cat}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-semibold mb-3 block">
                    Brand
                  </Label>
                  <div className="space-y-2">
                    {["Apple", "Sony", "Nike", "Canon", "Razer"].map(
                      (brand) => (
                        <div key={brand} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={brand}
                            className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                          />
                          <label htmlFor={brand} className="text-sm">
                            {brand}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              <Button className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600">
                Apply Filters
              </Button>
            </SheetContent>
          </Sheet>
          <div className="flex gap-1 border border-gray-200 rounded-xl p-1 bg-white">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-emerald-500 text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <IconLayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-emerald-500 text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <IconList className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Deals Section */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-bold text-gray-900 font-noto">
            Today&apos;s Deals
          </h2>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full">
            <IconFlame className="w-4 h-4 text-red-500" />
            <span className="text-xs font-semibold text-red-500 uppercase tracking-wide">
              Hot Deals
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products
            .filter((p) => p.isDeal)
            .map((product) => (
              <div
                key={product.id}
                className="group relative bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <button className="p-2.5 bg-white rounded-full shadow-lg hover:bg-emerald-500 hover:text-white transition-all duration-300">
                      <IconEye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCart((p) => [...p, product.id])}
                      className="p-2.5 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300"
                    >
                      <IconShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() =>
                      setLikedProducts((p) =>
                        p.includes(product.id)
                          ? p.filter((i) => i !== product.id)
                          : [...p, product.id]
                      )
                    }
                    className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
                      likedProducts.includes(product.id)
                        ? "bg-red-500 text-white"
                        : "bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white"
                    }`}
                  >
                    <IconHeart
                      className="w-4 h-4"
                      fill={
                        likedProducts.includes(product.id)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>
                  {product.discount && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                      -{product.discount}%
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium text-emerald-500 uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="mt-1 text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-300 font-mont">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="flex items-center gap-0.5">
                      <IconStar className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-semibold text-gray-700">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* All Products */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 font-noto">
            All Products
          </h2>
          <p className="text-sm text-gray-500">
            Showing {sortedProducts.length} products
          </p>
        </div>
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }
        >
          {sortedProducts.map((product) =>
            viewMode === "grid" ? (
              <div
                key={product.id}
                className="group relative bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="p-2.5 bg-white rounded-full shadow-lg hover:bg-emerald-500 hover:text-white transition-all">
                      <IconEye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCart((p) => [...p, product.id])}
                      className="p-2.5 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600 transition-all"
                    >
                      <IconShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() =>
                      setLikedProducts((p) =>
                        p.includes(product.id)
                          ? p.filter((i) => i !== product.id)
                          : [...p, product.id]
                      )
                    }
                    className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
                      likedProducts.includes(product.id)
                        ? "bg-red-500 text-white"
                        : "bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white"
                    }`}
                  >
                    <IconHeart
                      className="w-4 h-4"
                      fill={
                        likedProducts.includes(product.id)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="px-2.5 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                        NEW
                      </span>
                    )}
                    {product.discount && (
                      <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium text-emerald-500 uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="mt-1 text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors font-mont">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-2">
                    <IconStar className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-semibold text-gray-700">
                      {product.rating}
                    </span>
                    <span className="text-xs text-gray-400">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-50 rounded-lg w-fit">
                    <IconShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-xs font-medium text-emerald-700">
                      Escrow Protected
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={product.id}
                className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 flex"
              >
                <div className="relative w-48 h-48 flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <span className="text-xs font-medium text-emerald-500 uppercase">
                        {product.category}
                      </span>
                      <h3 className="mt-1 text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <IconStar className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-semibold text-gray-700">
                          {product.rating}
                        </span>
                        <span className="text-sm text-gray-400">
                          ({product.reviews} reviews)
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-4">
                        <span className="text-2xl font-bold text-gray-900">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-lg text-gray-400 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        onClick={() => setCart((p) => [...p, product.id])}
                        className="bg-emerald-500 hover:bg-emerald-600 gap-2"
                      >
                        <IconShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() =>
                          setLikedProducts((p) =>
                            p.includes(product.id)
                              ? p.filter((i) => i !== product.id)
                              : [...p, product.id]
                          )
                        }
                        className={
                          likedProducts.includes(product.id)
                            ? "bg-red-50 border-red-500 text-red-500"
                            : ""
                        }
                      >
                        <IconHeart
                          className="w-4 h-4"
                          fill={
                            likedProducts.includes(product.id)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default Page;
