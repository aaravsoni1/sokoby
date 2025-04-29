"use client"

import { Home, Package, Store } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
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
        {/* Sidebar */}
        <div className="flex h-full w-64 flex-col fixed inset-y-0 z-50 bg-white border-r">
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

        {/* Main content */}
        <div className="flex-1 pl-64">
          <main className="h-screen overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

