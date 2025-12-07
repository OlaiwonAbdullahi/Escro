"use client";

import { useState } from "react";
import Image from "next/image";
import {
  IconSearch,
  IconStar,
  IconShieldCheck,
  IconClock,
  IconHeart,
  IconCode,
  IconPalette,
  IconTruck,
  IconSpeakerphone,
  IconUsers,
  IconBriefcase,
  IconCamera,
  IconPencil,
  IconSparkles,
  IconMessageCircle,
  IconFilter,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

const categories = [
  { id: "all", name: "All Services", icon: IconBriefcase, color: "emerald" },
  { id: "development", name: "Development", icon: IconCode, color: "blue" },
  { id: "design", name: "Design", icon: IconPalette, color: "pink" },
  {
    id: "marketing",
    name: "Marketing",
    icon: IconSpeakerphone,
    color: "purple",
  },
  { id: "delivery", name: "Delivery", icon: IconTruck, color: "orange" },
  { id: "consulting", name: "Consulting", icon: IconUsers, color: "teal" },
  { id: "photography", name: "Photography", icon: IconCamera, color: "amber" },
  { id: "writing", name: "Writing", icon: IconPencil, color: "violet" },
];

const services: Service[] = [
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
    providerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Alex",
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
    providerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah",
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
    title: "Digital Marketing Campaign",
    description:
      "Comprehensive marketing strategy with SEO, social media, and content marketing",
    price: 2500,
    priceType: "starting",
    image:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=400&h=300&fit=crop",
    providerName: "Mike Johnson",
    providerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Mike",
    rating: 4.8,
    reviews: 167,
    isVerified: true,
    deliveryTime: "2-3 weeks",
    category: "Marketing",
    icon: IconSpeakerphone,
    isFeatured: true,
    completedProjects: 78,
  },
  {
    id: "4",
    title: "Professional Photography",
    description:
      "High-quality product photography for e-commerce and marketing materials",
    price: 500,
    priceType: "fixed",
    image:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=300&fit=crop",
    providerName: "Emma Wilson",
    providerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Emma",
    rating: 4.7,
    reviews: 203,
    isVerified: true,
    deliveryTime: "3-5 days",
    category: "Photography",
    icon: IconCamera,
    completedProjects: 312,
  },
  {
    id: "5",
    title: "Business Consulting",
    description:
      "Strategic business advice to scale your operations and increase profitability",
    price: 200,
    priceType: "hourly",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    providerName: "David Park",
    providerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=David",
    rating: 4.9,
    reviews: 145,
    isVerified: true,
    deliveryTime: "1-2 weeks",
    category: "Consulting",
    icon: IconUsers,
    completedProjects: 89,
  },
  {
    id: "6",
    title: "SEO Content Writing",
    description:
      "Engaging, SEO-optimized blog posts and website content that drives traffic",
    price: 75,
    priceType: "hourly",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop",
    providerName: "Lisa Wang",
    providerAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Lisa",
    rating: 4.8,
    reviews: 267,
    isVerified: true,
    deliveryTime: "2-3 days",
    category: "Writing",
    icon: IconPencil,
    completedProjects: 445,
  },
];

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedServices, setSavedServices] = useState<string[]>([]);

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      selectedCategory === "all" ||
      service.category.toLowerCase() === selectedCategory;
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
    <div className="min-h-screen px-6 md:px-20 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-black font-noto tracking-tight">
            Professional Services
          </h1>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full">
            <IconBriefcase className="w-4 h-4 text-violet-500" />
            <span className="text-xs font-semibold whitespace-nowrap text-violet-500 uppercase tracking-wide">
              {services.length}+ Services
            </span>
          </div>
        </div>
        <p className="text-gray-500 font-mont">
          Hire verified experts with escrow-protected payments
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-md pl-12 pr-4 py-3.5 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all "
          />
        </div>
        <div className="flex gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px] bg-white border-gray-200 rounded-md">
              <IconFilter className="w-4 h-4 text-gray-400 mr-2" />
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="0-500">$0 - $500</SelectItem>
              <SelectItem value="500-2000">$500 - $2,000</SelectItem>
              <SelectItem value="2000+">$2,000+</SelectItem>
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
                    ? "bg-violet-500 text-white "
                    : "bg-white border border-gray-200 text-gray-700 hover:border-violet-500"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-bold text-gray-900 font-noto">
            Featured Services
          </h2>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full">
            <IconSparkles className="w-4 h-4 text-violet-500" />
            <span className="text-xs font-semibold text-violet-500 uppercase tracking-wide">
              Top Rated
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services
            .filter((s) => s.isFeatured)
            .map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="group relative bg-white rounded-md border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-500"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-lg">
                      <Icon className="w-5 h-5 text-violet-600" />
                    </div>
                    <button
                      onClick={() =>
                        setSavedServices((p) =>
                          p.includes(service.id)
                            ? p.filter((i) => i !== service.id)
                            : [...p, service.id]
                        )
                      }
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
                    <div className="absolute bottom-4 right-4 flex items-center gap-2">
                      <img
                        src={service.providerAvatar}
                        alt={service.providerName}
                        width={32}
                        height={32}
                        className="rounded-full border-2 border-white"
                      />
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium text-violet-500 uppercase tracking-wider">
                      {service.category}
                    </span>
                    <h3 className="mt-1 text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-violet-600 transition-colors font-noto">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 line-clamp-2 font-mont">
                      {service.description}
                    </p>
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
                    <div className="flex items-center justify-between mt-5">
                      <span className="text-xl font-bold text-gray-900">
                        {getPriceLabel(service)}
                      </span>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="px-4 py-2 bg-violet-500 cursor-pointer hover:bg-violet-600 text-white text-sm font-semibold rounded-md transition-all duration-300">
                            Request Service
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px] font-mont">
                          <DialogHeader>
                            <DialogTitle>Request Service</DialogTitle>
                            <DialogDescription>
                              Fill out the form to request {service.title}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="name">Your Name</Label>
                              <Input id="name" placeholder="John Doe" />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="message">Project Details</Label>
                              <Textarea
                                id="message"
                                placeholder="Describe your project requirements..."
                                rows={4}
                              />
                            </div>
                          </div>
                          <Button className="w-full bg-violet-500 hover:bg-violet-600">
                            Submit Request
                          </Button>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 px-3 py-2 bg-emerald-50 border border-emerald-100 rounded-lg">
                      <IconShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-medium text-emerald-700">
                        Payment protected with Escrow
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 font-noto">
            All Services
          </h2>
          <p className="text-sm text-gray-500">
            Showing {filteredServices.length} services
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group bg-white rounded-md border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-500"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3 p-2 bg-white/90 rounded-lg">
                    <Icon className="w-4 h-4 text-violet-600" />
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium text-violet-500 uppercase">
                    {service.category}
                  </span>
                  <h3 className="mt-1 font-bold text-gray-900 line-clamp-1 group-hover:text-violet-600 transition-colors">
                    {service.title}
                  </h3>
                  <div className="flex items-center gap-1 mt-2">
                    <IconStar className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-semibold text-gray-700">
                      {service.rating}
                    </span>
                    <span className="text-xs text-gray-400">
                      • {service.providerName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="text-lg font-bold text-gray-900">
                      {getPriceLabel(service)}
                    </span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className="bg-violet-500 hover:bg-violet-600 cursor-pointer text-white"
                        >
                          Request
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px] font-mont">
                        <DialogHeader>
                          <DialogTitle>Request Service</DialogTitle>
                          <DialogDescription>
                            Fill out the form to request {service.title}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="name">Your Name</Label>
                            <Input id="name" placeholder="John Doe" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="john@example.com"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="message">Project Details</Label>
                            <Textarea
                              id="message"
                              placeholder="Describe your project requirements..."
                              rows={4}
                            />
                          </div>
                        </div>
                        <Button className="w-full bg-violet-500 hover:bg-violet-600">
                          Submit Request
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Page;
