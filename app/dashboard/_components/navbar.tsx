"use client";

import {
  IconMenu,
  IconSearch,
  IconShoppingBag,
  IconShoppingCart,
  IconX,
} from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";

interface NavbarProps {
  userName?: string;
  userEmail?: string;
}

const Navbar = ({
  userName = "John Doe",
  userEmail = "owner@escro.com",
}: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/dashboard/shop", label: "Shop" },
    { href: "/dashboard/services", label: "Services" },
    { href: "/dashboard/stores", label: "Stores" },
    { href: "/dashboard/orders", label: "My Orders" },
  ];

  return (
    <nav className="bg-emerald-50/20 border-b border-gray-200/30 backdrop-blur-md px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-3">
          <IconShoppingBag className="w-9 h-9 text-emerald-600" />
          <span className="text-2xl font-bold text-emerald-600 ">ESCRO</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center flex-1 justify-center">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-700 hover:text-emerald-600 font-medium text-sm transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Search Bar - Hidden on mobile */}
          <div className="hidden lg:flex items-center">
            <div className="relative">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, stores..."
                className="w-80 bg-white/80 border border-emerald-200 rounded-lg pl-10 pr-4 py-2.5 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          {/* Cart */}
          <button className="relative p-2 bg-emerald-500 rounded-md hover:bg-emerald-700 transition-colors">
            <IconShoppingCart className="w-6 h-6 text-emerald-100" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="focus:outline-none">
                <Avatar className="w-10 h-10 ring-2 ring-transparent hover:ring-emerald-500 transition-all cursor-pointer rounded-md">
                  <AvatarImage
                    src={`https://api.dicebear.com/9.x/glass/svg?seed=${userName}`}
                    alt={userName}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white font-semibold rounded-md">
                    {userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-64 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg"
            >
              <DropdownMenuLabel className="px-4 py-3">
                <div className="space-y-1">
                  <p className="font-semibold text-gray-900">{userName}</p>
                  <p className="text-sm text-gray-500">{userEmail}</p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-gray-200" />

              <DropdownMenuItem asChild>
                <Link href="/mystore/profile" className="cursor-pointer">
                  Profile Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/mystore/settings" className="cursor-pointer">
                  Store Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/billing" className="cursor-pointer">
                  Billing & Plans
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-gray-200" />

              <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-700 font-medium">
                <Link href="/api/auth/signout" className="w-full text-left">
                  Sign Out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 bg-emerald-500 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? (
              <IconX className="w-6 h-6 text-emerald-100" />
            ) : (
              <IconMenu className="w-6 h-6 text-emerald-100" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
          <div className="px-6 py-6 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Mobile Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-gray-700 hover:text-emerald-600 font-medium text-lg border-b border-gray-100 last:border-0"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
