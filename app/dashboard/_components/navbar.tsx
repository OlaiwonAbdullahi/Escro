"use client";

import {
  IconSearch,
  IconPower,
  IconShoppingBag,
  IconShoppingCart,
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

interface NavbarProps {
  userName?: string;
}

const Navbar = ({ userName = "John" }: NavbarProps) => {
  return (
    <nav className="bg-emerald-50/20 border-b border-gray-200/20 px-6 py-5 sticky top-0 z-10">
      <div className="flex items-center justify-between gap-6">
        {/* Search Bar */}
        <div className="">
          <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-full">
            <IconShoppingBag className="text-emerald-500 w-8 h-8 shrink-0" />
            <span className="text-xl font-bold text-emerald-500 group-data-[collapsible=icon]:hidden">
              ESCRO
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent border border-emerald-300/30 text-gray-300 placeholder-gray-300 rounded-md pl-11 pr-4 py-2.5 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
            </div>
          </div>
          <div className=" bg-emerald-500 rounded-md p-2">
            <IconShoppingCart className="w-6 h-6 text-emerald-100 " />
          </div>

          {/* User Section */}
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none focus:ring-2 focus:ring-emerald-500/20 rounded-md">
                <Avatar className="w-10 h-10 cursor-pointer ring-2 ring-transparent hover:ring-emerald-500/50 transition-all rounded-md">
                  <AvatarImage
                    src={`https://api.dicebear.com/9.x/glass/svg?seed=${userName}`}
                  />
                  <AvatarFallback className="bg-linear-to-br from-emerald-500 to-emerald-600 text-white font-semibold rounded-md">
                    {userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-56 bg-emerald-200/20 border-gray-200 text-gray-200 rounded-md"
              >
                <DropdownMenuLabel className="text-gray-400">
                  <div>
                    <p className="font-medium">{userName}</p>
                    <p className="text-gray-400 text-sm font-normal">
                      owner@escro.com
                    </p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-gray-300" />

                <DropdownMenuItem className="text-gray-400 focus:bg-emerald-500/50 focus:text-emerald-600 cursor-pointer">
                  <a href="/mystore/profile" className="w-full">
                    Profile Settings
                  </a>
                </DropdownMenuItem>

                <DropdownMenuItem className="text-gray-400 focus:bg-emerald-500/50 focus:text-emerald-600 cursor-pointer">
                  <a href="/mystore/settings" className="w-full">
                    Store Settings
                  </a>
                </DropdownMenuItem>

                <DropdownMenuItem className="text-gray-400 focus:bg-emerald-500/50 focus:text-emerald-600 cursor-pointer">
                  <a href="#" className="w-full">
                    Billing
                  </a>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-gray-300" />

                <DropdownMenuItem className="text-error-main focus:bg-emerald-500 focus:text-emerald-600 cursor-pointer">
                  <a href="#" className="w-full">
                    Sign Out
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
