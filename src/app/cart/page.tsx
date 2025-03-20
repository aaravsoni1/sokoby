"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  CreditCard,
  Heart,
  RefreshCw,
  ChevronRight,
  Info,
  Gift,
  Truck,
  Shield,
  Percent,
  CheckCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Sample cart items
const cartItems = [
  {
    id: 1,
    name: "Premium Leather Backpack",
    price: 129.99,
    quantity: 1,
    image: "/placeholder.svg?height=120&width=120",
    color: "Brown",
    size: "Medium",
    inStock: true,
    sku: "BKP-LTR-001",
    estimatedDelivery: "3-5 business days",
  },
  {
    id: 2,
    name: "Wireless Noise-Cancelling Headphones",
    price: 199.99,
    quantity: 1,
    image: "/placeholder.svg?height=120&width=120",
    color: "Black",
    size: null,
    inStock: true,
    sku: "HDPH-WL-002",
    estimatedDelivery: "2-4 business days",
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    price: 34.99,
    quantity: 2,
    image: "/placeholder.svg?height=120&width=120",
    color: "White",
    size: "Large",
    inStock: true,
    sku: "TSH-OCT-003",
    estimatedDelivery: "3-5 business days",
  },
]

// Sample recommended products
const recommendedProducts = [
  {
    id: 4,
    name: "Canvas Tote Bag",
    price: 49.99,
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.5,
    reviewCount: 28,
  },
  {
    id: 5,
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.8,
    reviewCount: 42,
  },
  {
    id: 6,
    name: "Wireless Earbuds",
    price: 89.99,
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.6,
    reviewCount: 35,
  },
  {
    id: 7,
    name: "Leather Wallet",
    price: 59.99,
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.7,
    reviewCount: 31,
  },
]

// Sample shipping options
const shippingOptions = [
  {
    id: "standard",
    name: "Standard Shipping",
    price: 5.99,
    description: "3-5 business days",
  },
  {
    id: "express",
    name: "Express Shipping",
    price: 12.99,
    description: "1-2 business days",
  },
  {
    id: "free",
    name: "Free Shipping",
    price: 0,
    description: "Orders over $100",
    minimumOrder: 100,
  },
]

export default function CartPage() {
  const [items, setItems] = useState(cartItems)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [selectedShipping, setSelectedShipping] = useState("standard")
  const [giftWrap, setGiftWrap] = useState(false)
  const [giftMessage, setGiftMessage] = useState("")

  // Calculate cart totals
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = promoApplied ? subtotal * 0.1 : 0
  const giftWrapFee = giftWrap ? 5.99 : 0

  // Determine shipping cost
  let shipping = 0
  if (subtotal >= 100) {
    shipping = 0 // Free shipping for orders over $100
  } else {
    const selectedOption = shippingOptions.find((option) => option.id === selectedShipping)
    shipping = selectedOption ? selectedOption.price : 0
  }

  const tax = (subtotal - discount + giftWrapFee + shipping) * 0.08
  const total = subtotal - discount + giftWrapFee + shipping + tax

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setItems(items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "discount10") {
      setPromoApplied(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sokoby%20mk.png-gToWGGxndAiqQ6pEyC5uaZnjZdJgdq.jpeg"
                alt="Sokoby"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <Link href="/store" className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
              Continue shopping
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </header>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
          <Badge variant="outline" className="text-sm font-medium">
            {items.length} {items.length === 1 ? "item" : "items"}
          </Badge>
        </div>

        {items.length > 0 ? (
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200 hidden sm:flex">
                  <div className="w-1/2 font-medium text-gray-700">Product</div>
                  <div className="w-1/6 text-center font-medium text-gray-700">Price</div>
                  <div className="w-1/6 text-center font-medium text-gray-700">Quantity</div>
                  <div className="w-1/6 text-right font-medium text-gray-700">Total</div>
                </div>
                <ul className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={item.id} className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center">
                        <div className="flex items-center w-full sm:w-1/2 mb-4 sm:mb-0">
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={120}
                              height={120}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
                              <div className="mt-1 flex text-sm text-gray-500">
                                {item.color && <p>{item.color}</p>}
                                {item.color && item.size && <span className="mx-1">|</span>}
                                {item.size && <p>{item.size}</p>}
                              </div>
                              <p className="mt-1 text-xs text-gray-500">SKU: {item.sku}</p>
                            </div>
                            <div className="mt-2 flex items-center sm:hidden">
                              <p className="text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>

                        <div className="hidden sm:block w-1/6 text-center">
                          <span className="text-sm font-medium text-gray-900">${item.price.toFixed(2)}</span>
                        </div>

                        <div className="flex items-center justify-between sm:justify-center w-full sm:w-1/6">
                          <div className="flex items-center border rounded-md">
                            <button
                              className="p-1.5 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-3 py-1.5 text-center text-sm w-10">{item.quantity}</span>
                            <button
                              className="p-1.5 text-gray-600 hover:text-gray-900"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="sm:hidden">
                            <p className="text-sm font-medium text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <div className="hidden sm:block w-1/6 text-right">
                          <span className="text-sm font-medium text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-end space-x-4">
                        <button
                          className="flex items-center text-sm font-medium text-gray-500 hover:text-red-600"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="mr-1.5 h-4 w-4" />
                          Remove
                        </button>
                        <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900">
                          <Heart className="mr-1.5 h-4 w-4" />
                          Save for later
                        </button>
                      </div>

                      <div className="mt-3 text-xs text-gray-500 flex items-center">
                        <Truck className="mr-1.5 h-3.5 w-3.5" />
                        Estimated delivery: {item.estimatedDelivery}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gift Options */}
              <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-base font-medium text-gray-900 flex items-center">
                  <Gift className="mr-2 h-5 w-5 text-gray-500" />
                  Gift Options
                </h2>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="gift-wrap"
                      checked={giftWrap}
                      onCheckedChange={(checked) => setGiftWrap(checked as boolean)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="gift-wrap" className="text-sm font-medium">
                        Add gift wrapping (+$5.99)
                      </Label>
                      <p className="text-xs text-gray-500">
                        Items will be wrapped in premium paper with a personalized note
                      </p>
                    </div>
                  </div>

                  {giftWrap && (
                    <div className="pl-6">
                      <Label htmlFor="gift-message" className="text-sm font-medium">
                        Gift message (optional)
                      </Label>
                      <Input
                        id="gift-message"
                        placeholder="Enter your message here"
                        className="mt-1.5"
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                      />
                      <p className="mt-1 text-xs text-gray-500">Maximum 200 characters</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Promo Code */}
              <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-base font-medium text-gray-900 flex items-center">
                  <Percent className="mr-2 h-5 w-5 text-gray-500" />
                  Apply Promo Code
                </h2>
                <div className="mt-4 flex space-x-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="max-w-xs"
                  />
                  <Button variant="outline" onClick={applyPromoCode} disabled={!promoCode}>
                    Apply
                  </Button>
                </div>
                {promoApplied && (
                  <p className="mt-2 text-sm text-green-600 flex items-center">
                    <CheckCircle className="mr-1.5 h-4 w-4" />
                    Promo code applied successfully!
                  </p>
                )}
                <p className="mt-2 text-xs text-gray-500">Try &quot;DISCOUNT10&quot; for 10% off your order</p>
              </div>

              {/* Recommended Products */}
              <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900">You might also like</h2>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {recommendedProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="aspect-square overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={100}
                          height={100}
                          className="h-full w-full object-cover object-center transition-transform hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{product.name}</h3>
                        <div className="mt-1 flex items-center">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-1 text-xs text-gray-500">({product.reviewCount})</span>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
                        <Button className="mt-2 w-full bg-gray-100 text-gray-900 hover:bg-gray-200" size="sm">
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Add to cart
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-8 lg:col-span-4 lg:mt-0">
              <div className="sticky top-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <p className="text-gray-600">
                        Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)
                      </p>
                      <p className="font-medium">${subtotal.toFixed(2)}</p>
                    </div>

                    {promoApplied && (
                      <div className="flex justify-between text-sm">
                        <p className="text-green-600">Discount (10%)</p>
                        <p className="text-green-600 font-medium">-${discount.toFixed(2)}</p>
                      </div>
                    )}

                    {giftWrap && (
                      <div className="flex justify-between text-sm">
                        <p className="text-gray-600">Gift wrapping</p>
                        <p className="font-medium">${giftWrapFee.toFixed(2)}</p>
                      </div>
                    )}

                    <div className="flex justify-between text-sm">
                      <div className="flex items-center">
                        <p className="text-gray-600">Shipping</p>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="ml-1 h-3.5 w-3.5 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Free shipping on orders over $100</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      {shipping === 0 ? (
                        <p className="text-green-600 font-medium">Free</p>
                      ) : (
                        <p className="font-medium">${shipping.toFixed(2)}</p>
                      )}
                    </div>

                    <div className="flex justify-between text-sm">
                      <p className="text-gray-600">Tax (8%)</p>
                      <p className="font-medium">${tax.toFixed(2)}</p>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-base">
                      <p className="font-medium">Total</p>
                      <p className="font-bold">${total.toFixed(2)}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Options */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Shipping Method</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {shippingOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`flex items-center justify-between rounded-lg border p-4 ${
                          selectedShipping === option.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
                        } ${option.id === "free" && subtotal < 100 ? "opacity-50" : ""}`}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            id={`shipping-${option.id}`}
                            name="shipping"
                            value={option.id}
                            checked={selectedShipping === option.id}
                            onChange={() => setSelectedShipping(option.id)}
                            disabled={option.id === "free" && subtotal < 100}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          />
                          <div>
                            <Label htmlFor={`shipping-${option.id}`} className="font-medium">
                              {option.name}
                            </Label>
                            <p className="text-xs text-gray-500">{option.description}</p>
                          </div>
                        </div>
                        <span className="font-medium">
                          {option.price === 0 ? "Free" : `$${option.price.toFixed(2)}`}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <Link href="/checkout">
                    <Button className="w-full bg-red-800 hover:bg-red-700 h-12 text-base">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>

                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <CreditCard className="h-4 w-4" />
                      <span>Secure checkout</span>
                    </div>

                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <RefreshCw className="h-4 w-4" />
                      <span>Free returns within 30 days</span>
                    </div>

                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <Shield className="h-4 w-4" />
                      <span>Secure payments</span>
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <img src="/placeholder.svg?height=24&width=38" alt="Visa" className="h-6" />
                    <img src="/placeholder.svg?height=24&width=38" alt="Mastercard" className="h-6" />
                    <img src="/placeholder.svg?height=24&width=38" alt="American Express" className="h-6" />
                    <img src="/placeholder.svg?height=24&width=38" alt="PayPal" className="h-6" />
                  </div>
                </div>

                {shipping === 0 && (
                  <Alert className="bg-green-50 text-green-800 border-green-200">
                    <AlertDescription className="text-xs flex items-center">
                      <Info className="mr-2 h-4 w-4" />
                      Your order qualifies for free shipping!
                    </AlertDescription>
                  </Alert>
                )}

                {shipping > 0 && (
                  <Alert className="bg-blue-50 text-blue-800 border-blue-200">
                    <AlertDescription className="text-xs flex items-center">
                      <Info className="mr-2 h-4 w-4" />
                      Add ${(100 - subtotal).toFixed(2)} more to qualify for free shipping
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="mt-6 text-xl font-medium text-gray-900">Your cart is empty</h2>
            <p className="mt-2 text-gray-500">Looks like you haven&apos;t added any items to your cart yet.</p>
            <div className="mt-6">
              <Link href="/store">
                <Button className="bg-red-800 hover:bg-red-700">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

