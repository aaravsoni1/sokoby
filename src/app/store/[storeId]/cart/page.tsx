"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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

export default function CartPage() {
  const params = useParams()
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]')
    const validItems = items.filter((item: CartItem) => item.cartItemId)
    setCartItems(validItems)
    setLoading(false)
  }, [])

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    const updatedItems = cartItems.map(item => {
      if (item.cartItemId === cartItemId) {
        return { ...item, quantity: newQuantity }
      }
      return item
    })

    setCartItems(updatedItems)
    localStorage.setItem('cart', JSON.stringify(updatedItems))
  }

  const removeItem = (cartItemId: string) => {
    const updatedItems = cartItems.filter(item => item.cartItemId !== cartItemId)
    setCartItems(updatedItems)
    localStorage.setItem('cart', JSON.stringify(updatedItems))
    toast.success("Item removed from cart")
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  const handleCheckout = () => {
    const storeId = params?.storeId as string
    if (storeId) {
      router.push(`/store/${storeId}/checkout`)
    }
  }

  if (loading) {
    return <div className="container py-8">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href={`/store/${params?.storeId || ''}`} className="text-xl font-bold">
            Store Name
          </Link>
        </div>
      </header>

      {/* Cart Content */}
      <div className="container py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link href={`/store/${params?.storeId || ''}`}>
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.cartItemId}-${item.id}`} className="flex gap-4 bg-white p-4 rounded-lg shadow-sm">
                  <div className="relative w-24 h-24">
                    <Image
                      src={item.image || "/placeholder.png"}
                      alt={item.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    {item.variant && (
                      <p className="text-sm text-gray-500">Variant: {item.variant.skuCode}</p>
                    )}
                    <p className="text-lg font-bold mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.cartItemId, parseInt(e.target.value))}
                        className="w-16 text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      >
                        +
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.cartItemId)}
                        className="ml-auto"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Button 
                className="w-full mt-6" 
                size="lg" 
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 