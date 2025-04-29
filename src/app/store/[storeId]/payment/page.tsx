"use client"

import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface OrderDetails {
  orderId: string
  total: number
  customerEmail: string
}

export default function PaymentPage() {
  const params = useParams()
  const router = useRouter()
  const storeId = params?.storeId as string || ''
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    // Get order details from localStorage
    const orderId = localStorage.getItem('currentOrderId')
    const orderTotal = localStorage.getItem('currentOrderTotal')
    const customerEmail = localStorage.getItem('currentCustomerEmail')
    
    if (orderId && orderTotal && customerEmail) {
      setOrderDetails({
        orderId,
        total: parseFloat(orderTotal),
        customerEmail
      })
    } else {
      toast.error("Order information not found")
      router.push(`/store/${storeId}/cart`)
    }
    
    setLoading(false)
  }, [storeId, router])

  const handleStripeCheckout = async () => {
    if (!orderDetails) return
    
    setProcessing(true)
    
    try {
      // Get the auth token from localStorage
      const authToken = localStorage.getItem('auth_token')
      if (!authToken) {
        toast.error("Please login to complete payment")
        setProcessing(false)
        return
      }
      
      console.log("Calling backend API with orderId:", orderDetails.orderId)
      console.log("Using auth token:", authToken.substring(0, 10) + "...")
      
      // Directly call the backend API to get the Stripe checkout URL
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/checkout/${orderDetails.orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      });
      
      console.log("API response status:", response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error("API error response:", errorText)
        throw new Error(`Failed to create checkout session: ${response.status} ${response.statusText}`);
      }
      
      // Get the response as text since it's a URL string
      const checkoutUrl = await response.text();
      console.log("Received checkout URL:", checkoutUrl)
      
      if (!checkoutUrl) {
        throw new Error('No checkout URL returned from the server');
      }
      
      // Redirect to Stripe Checkout
      console.log("Redirecting to:", checkoutUrl)
      window.location.href = checkoutUrl;
      
      // Note: The code below won't execute immediately due to the redirect
      // It's just a fallback in case the redirect doesn't happen
    } catch (error) {
      console.error('Payment error:', error)
      toast.error("Payment failed. Please try again.")
      setProcessing(false)
    }
  }

  if (loading) {
    return <div className="container py-8">Loading payment information...</div>
  }

  if (!orderDetails) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order information not found</h1>
          <Button onClick={() => router.push(`/store/${storeId}/cart`)}>
            Return to Cart
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Payment</h1>
        
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span>Order ID:</span>
              <span className="font-medium">{orderDetails.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Amount:</span>
              <span className="font-bold">${orderDetails.total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="border-t pt-4 mb-6">
            <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
            <p className="text-gray-600 mb-4">
              You will be redirected to Stripe&apos;s secure payment page to complete your purchase.
            </p>
            
            <div className="bg-gray-100 p-4 rounded mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 mr-2">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="font-medium">Stripe Checkout</span>
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full" 
            size="lg" 
            onClick={handleStripeCheckout}
            disabled={processing}
          >
            {processing ? "Processing..." : "Pay with Stripe"}
          </Button>
        </div>
      </div>
    </div>
  )
} 