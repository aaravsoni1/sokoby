"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function OrderSuccessPage() {
  const params = useParams()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-sm text-center max-w-md">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your order. We&apos;ll send you an email with your order details and tracking information.
        </p>
        <Link href={`/store/${params?.storeId || ''}`}>
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    </div>
  )
} 