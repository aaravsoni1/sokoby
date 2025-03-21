"use client"

import type React from "react"

import { ArrowLeft, CheckCircle, CircleDot, Globe, Plus, Store, Upload } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CreateStorePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [storeCreated, setStoreCreated] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    storeName: "",
    storeUrl: "",
    storeType: "",
    businessType: "",
    currentRevenue: "",
    industry: "",
    storeDescription: "",
    storeLogo: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 4) {
      setStep(step + 1)
    } else {
      // In a real app, this would submit the form data to create the store
      console.log("Form submitted:", formData)
      setStoreCreated(true)
    }
  }

  if (storeCreated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="border-b bg-white">
          <div className="container flex h-16 items-center justify-between px-4 md:px-6">
            <Link href="/" className="flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sokoby%20mk.png-gToWGGxndAiqQ6pEyC5uaZnjZdJgdq.jpeg"
                alt="Sokoby"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => router.push("/")}>
                Go to Dashboard
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 container py-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Get ready to sell</h1>
              <p className="text-gray-600">Here&apos;s a guide to get started. As your business grows, you&apos;ll get fresh tips and insights here.</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <CircleDot className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-500">0 of 5 tasks complete</span>
              </div>

              <h2 className="text-lg font-semibold mb-2">Setup guide</h2>
              <p className="text-gray-600 mb-6">Use this personalized guide to get your store up and running.</p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">Add your first product</h3>
                    <p className="text-sm text-gray-600 mb-3">Write a description, add photos, and set pricing for the products you plan to sell.</p>
                    <div className="flex gap-2">
                      <Button className="bg-black text-white hover:bg-gray-800" onClick={() => router.push("/dashboard/products/new")}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add product
                      </Button>
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Import products
                      </Button>
                    </div>
                  </div>
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Image
                      src="/placeholder.svg"
                      alt="Product placeholder"
                      width={64}
                      height={64}
                      className="opacity-50"
                    />
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium mb-1">Design your online store in seconds</h3>
                  <p className="text-sm text-gray-600 mb-3">Customize your store&apos;s look and feel with our easy-to-use theme editor.</p>
                  <Button variant="outline" onClick={() => router.push("/dashboard/theme")}>
                    <Store className="h-4 w-4 mr-2" />
                    Customize theme
                  </Button>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium mb-1">Pick a plan</h3>
                  <p className="text-sm text-gray-600 mb-3">Choose the plan that best fits your business needs.</p>
                  <Button variant="outline" onClick={() => router.push("/pricing")}>
                    <Globe className="h-4 w-4 mr-2" />
                    Compare plans
                  </Button>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium mb-1">Confirm your shipping rates</h3>
                  <p className="text-sm text-gray-600 mb-3">Set up shipping zones and rates for your products.</p>
                  <Button variant="outline" onClick={() => router.push("/dashboard/settings?tab=shipping")}>
                    Set up shipping
                  </Button>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium mb-1">Place a test order</h3>
                  <p className="text-sm text-gray-600 mb-3">Test your store&apos;s checkout process with a test order.</p>
                  <Button variant="outline">
                    Create test order
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="border-t py-6 bg-white">
          <div className="container px-4 md:px-6 text-center">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Sokoby Inc. All rights reserved.</p>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sokoby%20mk.png-gToWGGxndAiqQ6pEyC5uaZnjZdJgdq.jpeg"
              alt="Sokoby"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
            <span className="ml-2 text-xl font-bold">Sokoby</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">Already have an account?</div>
            <Link href="/auth">
              <Button variant="outline">Log in</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container px-4 md:px-6 max-w-md">
          <Card>
            <CardHeader>
              <div className="flex items-center mb-2">
                {step > 1 && (
                  <Button variant="ghost" size="icon" className="mr-2" onClick={() => setStep(step - 1)}>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                )}
                <CardTitle>Start your free trial</CardTitle>
              </div>
              <CardDescription>
                {step === 1 && "Create your account to start your 14-day free trial"}
                {step === 2 && "Tell us about your store"}
                {step === 3 && "Tell us about your business"}
                {step === 4 && "Customize your store"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="John"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Doe"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="storeName">Store name</Label>
                      <Input
                        id="storeName"
                        name="storeName"
                        placeholder="My Awesome Store"
                        required
                        value={formData.storeName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="storeUrl">Store URL</Label>
                      <div className="flex">
                        <Input
                          id="storeUrl"
                          name="storeUrl"
                          placeholder="my-store"
                          required
                          value={formData.storeUrl}
                          onChange={handleChange}
                          className="rounded-r-none"
                        />
                        <div className="flex items-center px-3 bg-gray-100 border border-l-0 rounded-r-md text-gray-500">
                          .sokoby.com
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="storeType">What are you planning to sell?</Label>
                      <Select
                        value={formData.storeType}
                        onValueChange={(value) => handleSelectChange("storeType", value)}
                      >
                        <SelectTrigger id="storeType">
                          <SelectValue placeholder="Select store type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="physical">Physical products</SelectItem>
                          <SelectItem value="digital">Digital products</SelectItem>
                          <SelectItem value="services">Services</SelectItem>
                          <SelectItem value="mixed">Mix of products and services</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessType">Business type</Label>
                      <Select
                        value={formData.businessType}
                        onValueChange={(value) => handleSelectChange("businessType", value)}
                      >
                        <SelectTrigger id="businessType">
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New business</SelectItem>
                          <SelectItem value="existing">Existing business</SelectItem>
                          <SelectItem value="side">Side business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentRevenue">Current business revenue</Label>
                      <Select
                        value={formData.currentRevenue}
                        onValueChange={(value) => handleSelectChange("currentRevenue", value)}
                      >
                        <SelectTrigger id="currentRevenue">
                          <SelectValue placeholder="Select revenue range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not_started">I haven&apos;t started selling yet</SelectItem>
                          <SelectItem value="under_1k">Under $1,000 per month</SelectItem>
                          <SelectItem value="1k_5k">$1,000 - $5,000 per month</SelectItem>
                          <SelectItem value="5k_10k">$5,000 - $10,000 per month</SelectItem>
                          <SelectItem value="over_10k">Over $10,000 per month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select
                        value={formData.industry}
                        onValueChange={(value) => handleSelectChange("industry", value)}
                      >
                        <SelectTrigger id="industry">
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fashion">Fashion & Apparel</SelectItem>
                          <SelectItem value="home">Home & Garden</SelectItem>
                          <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="food">Food & Beverage</SelectItem>
                          <SelectItem value="health">Health & Wellness</SelectItem>
                          <SelectItem value="jewelry">Jewelry & Accessories</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="storeDescription">Store description</Label>
                      <Input
                        id="storeDescription"
                        name="storeDescription"
                        placeholder="Tell us about your store"
                        value={formData.storeDescription}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Store logo</Label>
                      <div className="flex items-center gap-4">
                        <div className="relative h-20 w-20 overflow-hidden rounded-lg border">
                          <Image
                            src={formData.storeLogo || "/placeholder.svg"}
                            alt="Store logo"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <Button variant="outline">Upload logo</Button>
                      </div>
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full mt-6 bg-red-800 hover:bg-red-700">
                  {step < 4 ? "Continue" : "Create your store"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center text-center border-t pt-6">
              <div className="text-sm text-gray-500 mb-4">
                By creating an account, you agree to our{" "}
                <Link href="#" className="text-red-800 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-red-800 hover:underline">
                  Privacy Policy
                </Link>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                No credit card required
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="border-t py-6 bg-white">
        <div className="container px-4 md:px-6 text-center">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Sokoby Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

