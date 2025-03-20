import type React from "react"
import { DashboardSidebar } from "./sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}

