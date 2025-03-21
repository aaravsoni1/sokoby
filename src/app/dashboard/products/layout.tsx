"use client"


export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        {children}
      </div>
    </div>
  )
} 