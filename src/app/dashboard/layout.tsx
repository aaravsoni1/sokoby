"use client"

import { Home, Menu, Package, Store } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SidebarProvider } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Products", href: "/dashboard/products", icon: Package },
  { name: "Theme", href: "/dashboard/theme", icon: Store },
  
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <div className="flex h-full w-full">
        {/* Sidebar for desktop */}
        <div className="hidden md:flex h-full w-64 flex-col fixed inset-y-0 z-50 bg-white border-r">
          <div className="flex h-16 items-center px-4 border-b">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">Sokoby</span>
            </Link>
          </div>
          <nav className="flex-1 overflow-y-auto p-4">
            {navigation.map((item) => {
              const isActive = pathname?.startsWith(item.href) ?? false
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-2 mb-1",
                      isActive && "bg-gray-100"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden fixed top-0 left-0 z-50 w-full bg-white border-b">
          <div className="flex items-center justify-between h-16 px-4">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">Sokoby</span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[220px]">
                <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
                <nav className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href} className={pathname?.startsWith(item.href) ? "text-red-800 font-semibold" : "text-gray-700 font-medium"}>
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </div>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 md:pl-64 pt-16 md:pt-0">
          <main className="h-screen overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

