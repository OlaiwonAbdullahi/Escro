"use client";

import {
  IconLayoutDashboard,
  IconPackage,
  IconShoppingCart,
  IconChartBar,
  IconSettings,
  IconUser,
  IconShoppingBag,
  IconLogout,
} from "@tabler/icons-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

// Menu items with Tabler icons
const items = [
  {
    title: "Dashboard",
    url: "/mystore",
    icon: IconLayoutDashboard,
  },
  {
    title: "Products",
    url: "/mystore/products",
    icon: IconPackage,
  },
  {
    title: "Orders",
    url: "/mystore/orders",
    icon: IconShoppingCart,
  },
  {
    title: "Analytics",
    url: "/mystore/analytics",
    icon: IconChartBar,
  },
  {
    title: "Settings",
    url: "/mystore/settings",
    icon: IconSettings,
  },
];

const StoreSidebar = () => {
  const pathname = usePathname();

  const isActive = (url: string) => {
    // Exact match for dashboard
    if (url === "/mystore") {
      return pathname === "/mystore";
    }
    // Starts with for other routes
    return pathname.startsWith(url);
  };
  return (
    <Sidebar className="border-r border-gray-500 bg-emerald-900">
      <SidebarContent className="flex flex-col h-full bg-emerald-900">
        <SidebarGroup className="px-0">
          <SidebarHeader className="flex flex-row justify-between items-center py-6 border-b border-gray-500">
            <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-full">
              <IconShoppingBag className="text-emerald-500 w-8 h-8 shrink-0" />
              <span className="text-xl font-bold text-emerald-500 group-data-[collapsible=icon]:hidden">
                ESCRO
              </span>
            </div>
          </SidebarHeader>

          {/* Menu Items */}
          <SidebarGroupContent className=" px-2 py-2">
            <SidebarMenu className="space-y-1">
              {items.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`
                        group/item
                        transition-all
                        duration-200
                        rounded-md
                        px-3
                        py-2.5
                        group-data-[collapsible=icon]:justify-center
                        ${
                          active
                            ? "bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10 hover:text-gray-300"
                            : "text-gray-300 hover:bg-emerald-500/10 hover:text-emerald-500"
                        }
                      `}
                      tooltip={item.title}
                    >
                      <a href={item.url} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 shrink-0" stroke={1.5} />
                        <span className="group-data-[collapsible=icon]:hidden font-medium">
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter className="mt-auto border-t border-gray-500">
          <SidebarMenu className="px-2 py-2">
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className={`
                  group/item
                  transition-all
                  duration-200
                  rounded-lg
                  px-3
                  py-2.5
                  group-data-[collapsible=icon]:justify-center
                  ${
                    pathname.startsWith("/mystore/profile")
                      ? "bg-emerald-500 text-white"
                      : "text-gray-300 hover:bg-emerald-500/10 hover:text-emerald-500"
                  }
                `}
                tooltip="Profile"
              >
                <a href="/mystore/profile" className="flex items-center gap-3">
                  <IconUser className="w-5 h-5 shrink-0" stroke={1.5} />
                  <span className="group-data-[collapsible=icon]:hidden font-medium">
                    Profile
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="group/item hover:bg-emerald-500/10 hover:text-emerald-500 text-gray-300 transition-all duration-200 rounded-lg px-3 py-2.5 data-[active=true]:bg-emerald-500 data-[active=true]:text-white group-data-[collapsible=icon]:justify-center"
                tooltip="Logout"
              >
                <a href="#" className="flex items-center gap-3">
                  <IconLogout className="w-5 h-5 shrink-0" stroke={1.5} />
                  <span className="group-data-[collapsible=icon]:hidden font-medium">
                    Logout
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
};

export default StoreSidebar;
