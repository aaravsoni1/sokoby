"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingCart, Package, Users, BarChart3, Settings, Globe, Tag, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar"

export function DashboardSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
    { name: "Products", href: "/dashboard/products", icon: Package },
    { name: "Customers", href: "/dashboard/customers", icon: Users },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Marketing", href: "/dashboard/marketing", icon: Tag },
    { name: "Discounts", href: "/dashboard/discounts", icon: Tag },
    { name: "Apps", href: "/dashboard/apps", icon: Globe },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  return (
    <SidebarProvider>
      {/* Mobile Menu Button */}
      <div className="flex items-center md:hidden p-4 border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
        <div className="ml-3 font-semibold">Shopify</div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-50 bg-white transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div className="font-semibold">Shopify</div>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close Menu">
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="p-4">
          <nav className="space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center p-2 rounded-md ${pathname === item.href ? "bg-gray-100 text-red-800" : "text-gray-700 hover:bg-gray-50"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <Sidebar className="hidden md:flex border-r h-screen">
        <SidebarHeader className="p-4 border-b">
          <Link href="/dashboard" className="flex items-center">
            <ShoppingCart className="h-6 w-6 text-red-800" />
            <span className="ml-2 text-xl font-bold">Shopify</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild isActive={pathname === item.href}>
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4 border-t">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gray-200 mr-2"></div>
            <div>
              <div className="text-sm font-medium">Store Owner</div>
              <div className="text-xs text-gray-500">My Store</div>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}

