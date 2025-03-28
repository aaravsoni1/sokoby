"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Check, Lock, Info, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample cart items
const cartItems = [
  {
    id: 1,
    name: "Premium Leather Backpack",
    price: 129.99,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Wireless Noise-Cancelling Headphones",
    price: 199.99,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
  },
]

// Checkout steps
const steps = [
  { id: "information", name: "Information" },
  { id: "shipping", name: "Shipping" },
  { id: "payment", name: "Payment" },
]

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState("information")
  const [paymentMethod, setPaymentMethod] = useState("credit-card")

  // Calculate order summary
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 12.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleContinue = () => {
    if (currentStep === "information") {
      setCurrentStep("shipping")
    } else if (currentStep === "shipping") {
      setCurrentStep("payment")
    }
  }

  const handleBack = () => {
    if (currentStep === "shipping") {
      setCurrentStep("information")
    } else if (currentStep === "payment") {
      setCurrentStep("shipping")
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
              src="/sokobylogo.png" 
              alt="Sokoby"
              width={150} 
              height={50} 
              className="h-11 w-auto"
            />
            </Link>
            <Link href="/cart" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Return to cart
            </Link>
          </div>
        </header>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* Main Content */}
          <div className="lg:col-span-7">
            {/* Checkout Steps */}
            <nav aria-label="Progress" className="mb-8">
              <ol className="flex items-center">
                {steps.map((step, stepIdx) => (
                  <li key={step.id} className={`relative ${stepIdx === steps.length - 1 ? "flex-1" : ""}`}>
                    {currentStep === step.id ? (
                      <div className="flex items-center" aria-current="step">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-red-800 bg-white">
                          <span className="text-sm font-medium text-red-800">{stepIdx + 1}</span>
                        </span>
                        <span className="ml-2 text-sm font-medium text-red-800">{step.name}</span>
                      </div>
                    ) : step.id === "information" ||
                      (step.id === "shipping" && currentStep === "payment") ||
                      steps.findIndex((s) => s.id === currentStep) > steps.findIndex((s) => s.id === step.id) ? (
                      <div className="flex items-center">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-800">
                          <Check className="h-5 w-5 text-white" aria-hidden="true" />
                        </span>
                        <span className="ml-2 text-sm font-medium text-gray-900">{step.name}</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                          <span className="text-sm font-medium text-gray-500">{stepIdx + 1}</span>
                        </span>
                        <span className="ml-2 text-sm font-medium text-gray-500">{step.name}</span>
                      </div>
                    )}

                    {stepIdx !== steps.length - 1 && (
                      <div
                        className={`absolute left-0 top-4 -ml-px mt-0.5 h-0.5 w-full ${
                          steps.findIndex((s) => s.id === currentStep) > stepIdx ? "bg-red-800" : "bg-gray-300"
                        }`}
                      />
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            {/* Information Step */}
            {currentStep === "information" && (
              <div className="space-y-8">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-medium text-gray-900">Contact information</h2>
                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input id="email" type="email" placeholder="your@email.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone number</Label>
                        <Input id="phone" type="tel" placeholder="(123) 456-7890" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="marketing" />
                      <Label htmlFor="marketing" className="text-sm text-gray-600">
                        Keep me updated with offers and news
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-medium text-gray-900">Shipping address</h2>
                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="Street address" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apartment" className="sr-only">
                        Apartment, suite, etc.
                      </Label>
                      <Input id="apartment" placeholder="Apartment, suite, etc. (optional)" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State / Province</Label>
                        <Select defaultValue="AL">
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AL">Alabama</SelectItem>
                            <SelectItem value="AK">Alaska</SelectItem>
                            <SelectItem value="AZ">Arizona</SelectItem>
                            {/* Add more states */}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postal-code">Postal code</Label>
                        <Input id="postal-code" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select defaultValue="US">
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="US">United States</SelectItem>
                          <SelectItem value="CA">Canada</SelectItem>
                          <SelectItem value="MX">Mexico</SelectItem>
                          {/* Add more countries */}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="save-address" />
                      <Label htmlFor="save-address" className="text-sm text-gray-600">
                        Save this address for future orders
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleContinue} className="bg-red-800 hover:bg-red-700">
                    Continue to shipping
                  </Button>
                </div>
              </div>
            )}

            {/* Shipping Step */}
            {currentStep === "shipping" && (
              <div className="space-y-8">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-medium text-gray-900">Shipping method</h2>
                  <div className="mt-4 space-y-4">
                    <RadioGroup defaultValue="standard">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="standard" id="standard" />
                            <Label htmlFor="standard" className="font-medium">
                              Standard Shipping
                            </Label>
                          </div>
                          <span className="font-medium">$12.99</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="express" id="express" />
                            <Label htmlFor="express" className="font-medium">
                              Express Shipping
                            </Label>
                          </div>
                          <span className="font-medium">$24.99</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="overnight" id="overnight" />
                            <Label htmlFor="overnight" className="font-medium">
                              Overnight Shipping
                            </Label>
                          </div>
                          <span className="font-medium">$39.99</span>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to information
                  </Button>
                  <Button onClick={handleContinue} className="bg-red-800 hover:bg-red-700">
                    Continue to payment
                  </Button>
                </div>
              </div>
            )}

            {/* Payment Step */}
            {currentStep === "payment" && (
              <div className="space-y-8">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-medium text-gray-900">Payment method</h2>
                  <div className="mt-4 space-y-4">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="space-y-3">
                        <div className="rounded-lg border border-gray-200 p-4">
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="credit-card" id="credit-card" />
                            <Label htmlFor="credit-card" className="font-medium">
                              Credit Card
                            </Label>
                          </div>
                          {paymentMethod === "credit-card" && (
                            <div className="mt-4 space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="card-number">Card number</Label>
                                <div className="relative">
                                  <Input id="card-number" placeholder="1234 5678 9012 3456" />
                                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex space-x-1">
                                    <div className="h-6 w-10 rounded bg-gray-200"></div>
                                    <div className="h-6 w-10 rounded bg-gray-200"></div>
                                  </div>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="expiration">Expiration date</Label>
                                  <Input id="expiration" placeholder="MM / YY" />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="cvc">CVC</Label>
                                  <div className="relative">
                                    <Input id="cvc" placeholder="123" />
                                    <Info className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="name-on-card">Name on card</Label>
                                <Input id="name-on-card" placeholder="John Doe" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="rounded-lg border border-gray-200 p-4">
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="paypal" id="paypal" />
                            <Label htmlFor="paypal" className="font-medium">
                              PayPal
                            </Label>
                          </div>
                          {paymentMethod === "paypal" && (
                            <div className="mt-4 text-sm text-gray-600">
                              You will be redirected to PayPal to complete your purchase securely.
                            </div>
                          )}
                        </div>
                        <div className="rounded-lg border border-gray-200 p-4">
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="apple-pay" id="apple-pay" />
                            <Label htmlFor="apple-pay" className="font-medium">
                              Apple Pay
                            </Label>
                          </div>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-medium text-gray-900">Billing address</h2>
                  <div className="mt-4 space-y-4">
                    <RadioGroup defaultValue="same">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="same" id="same-address" />
                          <Label htmlFor="same-address">Same as shipping address</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="different" id="different-address" />
                          <Label htmlFor="different-address">Use a different billing address</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to shipping
                  </Button>
                  <Button className="bg-red-800 hover:bg-red-700">Complete order</Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="mt-10 lg:col-span-5 lg:mt-0">
            <div className="sticky top-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

              <div className="mt-6 flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex py-5">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-sm font-medium text-gray-900">
                            <h3>{item.name}</h3>
                            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">Qty {item.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 space-y-4 border-t border-gray-200 pt-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Shipping</p>
                  <p>${shipping.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Tax</p>
                  <p>${tax.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total</p>
                  <p>${total.toFixed(2)}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center">
                <Lock className="h-5 w-5 text-gray-500" />
                <span className="ml-2 text-sm text-gray-500">Secure checkout powered by Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

