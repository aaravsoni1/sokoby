"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface CartItem {
  cartItemId: string
  id: string
  title: string
  price: number
  image: string
  quantity: number
  variant?: {
    variantId: string
    skuCode: string
    price: number
    stockQuantity: number
  }
}

interface ShippingAddress {
  street: string
  city: string
  postalCode: string
  state: string
  country: string
}

interface OrderFormData {
  customerFirstName: string
  customerLastName: string
  customerPhoneNumber: string
  customerEmail: string
  shippingAddress: ShippingAddress
  discountCode?: string
}

interface OrderData {
  customerFirstName: string
  customerLastName: string
  customerPhoneNumber: string
  customerEmail: string
  shippingAddress: ShippingAddress
  storeId: string
  orderItems: { productId: string; quantity: number }[]
  discountCode?: string
}

export default function CheckoutPage() {
  const params = useParams()
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [formData, setFormData] = useState<OrderFormData>({
    customerFirstName: "",
    customerLastName: "",
    customerPhoneNumber: "",
    customerEmail: "",
    shippingAddress: {
      street: "",
      city: "",
      postalCode: "",
      state: "",
      country: "",
    },
    discountCode: "",
  })

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(items)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name.startsWith('shippingAddress.')) {
      const addressField = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        shippingAddress: {
          ...prev.shippingAddress,
          [addressField]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const authToken = localStorage.getItem('auth_token')
    if (!authToken) {
      toast.error("Please login to place an order")
      return
    }

    // Create order data without discount code
    const orderData: OrderData = {
      customerFirstName: formData.customerFirstName,
      customerLastName: formData.customerLastName,
      customerPhoneNumber: formData.customerPhoneNumber,
      customerEmail: formData.customerEmail,
      shippingAddress: formData.shippingAddress,
      storeId: params?.storeId as string,
      orderItems: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }))
    }

    // Only add discount code if it's provided
    if (formData.discountCode && formData.discountCode.trim() !== '') {
      orderData.discountCode = formData.discountCode.trim()
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/with-customer-details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(orderData)
      })

      if (!response.ok) {
        throw new Error('Failed to place order')
      }

      const orderResponse = await response.json()
      console.log('Order response:', orderResponse)
      
      // Store order details for the payment page
      if (orderResponse.id) {
        localStorage.setItem('currentOrderId', orderResponse.id)
        localStorage.setItem('currentOrderTotal', total.toString())
        localStorage.setItem('currentCustomerEmail', formData.customerEmail)
        
        // Clear cart after successful order
        localStorage.removeItem('cart')
        toast.success("Order created successfully!")
        
        // Redirect to payment page
        router.push(`/store/${params?.storeId || ''}/payment`)
      } else {
        console.error('Order response missing id:', orderResponse)
        toast.error("Order created but missing order ID. Please contact support.")
      }
    } catch (error) {
      console.error('Order placement error:', error)
      toast.error("Failed to place order. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information Form */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Customer Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerFirstName">First Name</Label>
                  <Input
                    id="customerFirstName"
                    name="customerFirstName"
                    value={formData.customerFirstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="customerLastName">Last Name</Label>
                  <Input
                    id="customerLastName"
                    name="customerLastName"
                    value={formData.customerLastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="customerPhoneNumber">Phone Number</Label>
                <Input
                  id="customerPhoneNumber"
                  name="customerPhoneNumber"
                  value={formData.customerPhoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="customerEmail">Email</Label>
                <Input
                  id="customerEmail"
                  name="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-4">Shipping Address</h3>
              
              <div>
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  name="shippingAddress.street"
                  value={formData.shippingAddress.street}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="shippingAddress.city"
                    value={formData.shippingAddress.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    name="shippingAddress.postalCode"
                    value={formData.shippingAddress.postalCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="shippingAddress.state"
                    value={formData.shippingAddress.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="shippingAddress.country"
                    value={formData.shippingAddress.country}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="discountCode">Discount Code (Optional)</Label>
                <Input
                  id="discountCode"
                  name="discountCode"
                  value={formData.discountCode}
                  onChange={handleInputChange}
                />
              </div>

              <Button type="submit" className="w-full mt-6" size="lg">
                Place Order
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="flex justify-between">
                  <span>{item.title} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold mt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 