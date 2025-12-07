"use client";

import { useState } from "react";
import Image from "next/image";
import {
  IconCode,
  IconPalette,
  IconCamera,
  IconPencil,
  IconDeviceMobile,
  IconChartBar,
  IconStar,
  IconShieldCheck,
  IconClock,
  IconArrowRight,
  IconSparkles,
  IconHeart,
  IconMessageCircle,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  priceType: "fixed" | "hourly" | "starting";
  image: string;
  providerName: string;
  providerAvatar: string;
  rating: number;
  reviews: number;
  isVerified: boolean;
  deliveryTime: string;
  category: string;
  icon: React.ElementType;
  isFeatured?: boolean;
  completedProjects?: number;
}

const featuredServices: Service[] = [
  {
    id: "1",
    title: "Full-Stack Web Development",
    description:
      "Build modern, scalable web applications with React, Node.js, and cloud deployment",
    price: 150,
    priceType: "hourly",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
    providerName: "Alex Chen",
    providerAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 4.9,
    reviews: 234,
    isVerified: true,
    deliveryTime: "2-4 weeks",
    category: "Development",
    icon: IconCode,
    isFeatured: true,
    completedProjects: 156,
  },
  {
    id: "2",
    title: "Brand Identity Design",
    description:
      "Complete branding package including logo, color palette, and brand guidelines",
    price: 799,
    priceType: "starting",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    providerName: "Sarah Miller",
    providerAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5.0,
    reviews: 89,
    isVerified: true,
    deliveryTime: "5-7 days",
    category: "Design",
    icon: IconPalette,
    isFeatured: true,
    completedProjects: 98,
  },
  {
    id: "3",
    title: "Professional Photography",
    description:
      "High-quality product photography for e-commerce and marketing materials",
    price: 500,
    priceType: "fixed",
    image:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=300&fit=crop",
    providerName: "Mike Johnson",
    providerAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    rating: 4.8,
    reviews: 156,
    isVerified: true,
    deliveryTime: "3-5 days",
    category: "Photography",
    icon: IconCamera,
    completedProjects: 312,
  },
  {
    id: "4",
    title: "SEO Content Writing",
    description:
      "Engaging, SEO-optimized blog posts and website content that drives traffic",
    price: 75,
    priceType: "hourly",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop",
    providerName: "Emma Wilson",
    providerAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 4.7,
    reviews: 203,
    isVerified: true,
    deliveryTime: "2-3 days",
    category: "Writing",
    icon: IconPencil,
    completedProjects: 445,
  },
  {
    id: "5",
    title: "Mobile App Development",
    description:
      "Native iOS and Android apps with modern UI/UX and backend integration",
    price: 5000,
    priceType: "starting",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
    providerName: "David Park",
    providerAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 4.9,
    reviews: 67,
    isVerified: true,
    deliveryTime: "6-8 weeks",
    category: "Development",
    icon: IconDeviceMobile,
    isFeatured: true,
    completedProjects: 48,
  },
  {
    id: "6",
    title: "Data Analytics & Reporting",
    description:
      "Transform raw data into actionable insights with custom dashboards and reports",
    price: 120,
    priceType: "hourly",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    providerName: "Lisa Wang",
    providerAvatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
    rating: 4.8,
    reviews: 112,
    isVerified: true,
    deliveryTime: "1-2 weeks",
    category: "Analytics",
    icon: IconChartBar,
    completedProjects: 89,
  },
];

const FeaturedServices = () => {
  const [savedServices, setSavedServices] = useState<string[]>([]);

  const toggleSave = (serviceId: string) => {
    setSavedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const getPriceLabel = (service: Service) => {
    switch (service.priceType) {
      case "hourly":
        return `$${service.price}/hr`;
      case "starting":
        return `From $${service.price.toLocaleString()}`;
      default:
        return `$${service.price.toLocaleString()}`;
    }
  };

  return (
    <section className="py-10">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold font-noto tracking-tight text-black">
              Featured Services
            </h2>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full">
              <IconSparkles className="w-4 h-4 text-violet-500" />
              <span className="text-xs font-semibold whitespace-nowrap text-violet-500 uppercase tracking-wide">
                Top Rated
              </span>
            </div>
          </div>
          <p className="text-gray-400 text-sm font-mont">
            Professional services from verified experts
          </p>
        </div>
        <Button className="group md:flex hidden items-center gap-2 px-5 py-2.5 bg-violet-500/10 hover:bg-violet-500 border border-violet-500/30 hover:border-violet-500 rounded-md text-violet-500 hover:text-white text-sm font-semibold transition-all duration-300">
          Browse All Services
          <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </div>

      {/* Services Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {featuredServices.map((service) => {
            const Icon = service.icon;
            return (
              <CarouselItem
                key={service.id}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <div className="group relative bg-white rounded-md border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-500 h-full">
                  {/* Service Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Category Icon */}
                    <div className="absolute top-4 left-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-lg">
                      <Icon className="w-5 h-5 text-violet-600" />
                    </div>

                    {/* Save Button */}
                    <button
                      onClick={() => toggleSave(service.id)}
                      className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
                        savedServices.includes(service.id)
                          ? "bg-violet-500 text-white"
                          : "bg-white/90 text-gray-600 hover:bg-violet-500 hover:text-white"
                      }`}
                    >
                      <IconHeart
                        className="w-4 h-4"
                        fill={
                          savedServices.includes(service.id)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>

                    {/* Featured Badge */}
                    {service.isFeatured && (
                      <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full">
                        <IconSparkles className="w-3.5 h-3.5 text-white" />
                        <span className="text-xs font-bold text-white">
                          Featured
                        </span>
                      </div>
                    )}

                    {/* Provider Info on Image */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-2">
                      <Image
                        src={service.providerAvatar}
                        alt={service.providerName}
                        width={32}
                        height={32}
                        className="rounded-full border-2 border-white object-cover"
                      />
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="p-5">
                    {/* Category */}
                    <span className="text-xs font-medium text-violet-500 uppercase tracking-wider">
                      {service.category}
                    </span>

                    {/* Title */}
                    <h3 className="mt-1 text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-violet-600 transition-colors duration-300 font-noto">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-sm text-gray-500 line-clamp-2 font-mont">
                      {service.description}
                    </p>

                    {/* Provider & Rating */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700 font-mont">
                          {service.providerName}
                        </span>
                        {service.isVerified && (
                          <IconShieldCheck className="w-4 h-4 text-emerald-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <IconStar className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-semibold text-gray-700">
                          {service.rating}
                        </span>
                        <span className="text-xs text-gray-400">
                          ({service.reviews})
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <IconClock className="w-4 h-4" />
                        <span className="text-xs font-medium">
                          {service.deliveryTime}
                        </span>
                      </div>
                      {service.completedProjects && (
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <IconMessageCircle className="w-4 h-4" />
                          <span className="text-xs font-medium">
                            {service.completedProjects} projects
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between mt-5">
                      <div>
                        <span className="text-xl font-bold text-gray-900">
                          {getPriceLabel(service)}
                        </span>
                      </div>
                      <Button className="px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold rounded-lg transition-all duration-300">
                        View Details
                      </Button>
                    </div>

                    {/* Escrow Badge */}
                    <div className="mt-4 flex items-center gap-1.5 px-3 py-2 bg-emerald-50 border border-emerald-100 rounded-lg">
                      <IconShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-medium text-emerald-700">
                        Payment protected with Escrow
                      </span>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-4 bg-white border-gray-200 text-gray-700 hover:bg-violet-500 hover:text-white hover:border-violet-500 transition-all duration-300" />
        <CarouselNext className="hidden md:flex -right-4 bg-white border-gray-200 text-gray-700 hover:bg-violet-500 hover:text-white hover:border-violet-500 transition-all duration-300" />
      </Carousel>

      {/* Mobile Scroll Indicator */}
      <div className="flex justify-center gap-1.5 mt-6 md:hidden">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === 0 ? "w-6 bg-violet-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
      <div className="mt-8">
        <Button className="group flex md:hidden w-full items-center gap-2 px-5 py-2.5 bg-violet-500/10 hover:bg-violet-500 border border-violet-500/30 hover:border-violet-500 rounded-md text-violet-500 hover:text-white text-sm font-semibold transition-all duration-300">
          Browse All Services
          <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </div>

      {/* Promo Banner */}
      <div className="mt-10 relative overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-6">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 border border-white/20 rounded-xl backdrop-blur-sm">
              <IconShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-noto">
                Hire with Confidence
              </h3>
              <p className="text-sm text-white/80 font-mont mt-1">
                All service payments are protected by our secure escrow system
              </p>
            </div>
          </div>
          <Button className="group flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 rounded-lg text-violet-600 text-sm font-semibold transition-all duration-300 shadow-lg shadow-black/20">
            Learn How It Works
            <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
