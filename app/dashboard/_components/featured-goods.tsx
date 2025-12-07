"use client";

import { useState } from "react";
import Image from "next/image";
import {
  IconShoppingCart,
  IconHeart,
  IconStar,
  IconShieldCheck,
  IconFlame,
  IconArrowRight,
  IconEye,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  isNew?: boolean;
  discount?: number;
  category: string;
}

const featuredProducts: Product[] = [
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
    isNew: true,
    discount: 11,
    category: "Electronics",
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
    discount: 13,
    category: "Electronics",
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
    isNew: true,
    category: "Fashion",
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
    discount: 18,
    category: "Footwear",
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
  },
  {
    id: "6",
    name: "Minimalist Watch Collection",
    price: 199,
    originalPrice: 299,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 423,
    seller: "TimeKeeper",
    isVerified: true,
    discount: 33,
    category: "Accessories",
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
    isNew: true,
    category: "Accessories",
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
    discount: 17,
    category: "Gaming",
  },
];

const FeaturedGoods = () => {
  const [likedProducts, setLikedProducts] = useState<string[]>([]);

  const toggleLike = (productId: string) => {
    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className="py-10">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold font-noto tracking-tight text-black">
              Featured Products
            </h2>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <IconFlame className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">
                Trending
              </span>
            </div>
          </div>
          <p className="text-gray-400 text-sm font-mont">
            Handpicked products with escrow protection
          </p>
        </div>
        <Button className="group md:flex hidden items-center gap-2 px-5 py-2.5 bg-emerald-500/10 hover:bg-emerald-500 border border-emerald-500/30 hover:border-emerald-500 rounded-md text-emerald-400 hover:text-white text-sm font-semibold transition-all duration-300">
          View All Products
          <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </div>

      {/* Products Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {featuredProducts.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4"
            >
              <div className="group relative bg-white rounded-md border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500">
                {/* Product Image Container */}
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Quick Actions */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <button className="p-2.5 bg-white rounded-full shadow-lg hover:bg-emerald-500 hover:text-white transition-all duration-300">
                      <IconEye className="w-4 h-4" />
                    </button>
                    <button className="p-2.5 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300">
                      <IconShoppingCart className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Like Button */}
                  <button
                    onClick={() => toggleLike(product.id)}
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

                  {/* Badges */}
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

                {/* Product Info */}
                <div className="p-4">
                  {/* Category */}
                  <span className="text-xs font-medium text-emerald-500 uppercase tracking-wider">
                    {product.category}
                  </span>

                  {/* Product Name */}
                  <h3 className="mt-1 text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-300 font-mont">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="flex items-center gap-0.5">
                      <IconStar className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-semibold text-gray-700">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      ({product.reviews.toLocaleString()} reviews)
                    </span>
                  </div>

                  {/* Seller */}
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="text-xs text-gray-500 font-mont">
                      by {product.seller}
                    </span>
                    {product.isVerified && (
                      <IconShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Escrow Badge */}
                  <div className="mt-3 flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-50 rounded-lg w-fit">
                    <IconShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-xs font-medium text-emerald-700">
                      Escrow Protected
                    </span>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-4 bg-white border-gray-200 text-gray-700 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300" />
        <CarouselNext className="hidden md:flex -right-4 bg-white border-gray-200 text-gray-700 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300" />
      </Carousel>

      {/* Mobile Scroll Indicator */}
      <div className="flex justify-center gap-1.5 mt-6 md:hidden">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === 0 ? "w-6 bg-emerald-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      <div className="mt-8">
        <Button className="group flex md:hidden w-full items-center gap-2 px-5 py-2.5 bg-emerald-500/10 hover:bg-emerald-500 border border-emerald-500/30 hover:border-emerald-500 rounded-md text-emerald-400 hover:text-white text-sm font-semibold transition-all duration-300">
          View All Products
          <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </div>
    </section>
  );
};

export default FeaturedGoods;
