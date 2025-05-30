"use client"

import { BarChart3, ChevronRight, CreditCard, Facebook, Headphones, Instagram, Linkedin, Mail, Shield, ShoppingBag, Truck, Twitter, Youtube } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

import { Header } from "@/components/Header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

// Define a type for the plan
interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSubscription, setHasSubscription] = useState(false)

  const checkAuthentication = () => {
    const token = localStorage.getItem("auth_token")
    setIsAuthenticated(!!token)
  }

  useEffect(() => {
    // Check initial authentication
    checkAuthentication()

    // Add event listener for storage changes (for cross-tab logout)
    window.addEventListener('storage', checkAuthentication)

    // Check if user already has a subscription
    const subscriptionId = localStorage.getItem("subscriptionId")
    setHasSubscription(!!subscriptionId)

    // Cleanup listener
    return () => {
      window.removeEventListener('storage', checkAuthentication)
    }
  }, [])

  // Function to handle subscription API call
  const handleSubscribe = async (plan: Plan) => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Check if user already has a subscription
      const existingSubscriptionId = localStorage.getItem("subscriptionId")
      if (existingSubscriptionId) {
        setError("You already have an active subscription")
        return
      }
      
      // Get merchantId and auth_token from localStorage
      const merchantId = localStorage.getItem("merchantId")
      const authToken = localStorage.getItem("auth_token")
      
      if (!merchantId || !authToken) {
        setError("Please log in to subscribe to a plan")
        return
      }
      
      // Determine the amount based on the plan
      const amount = plan.price.replace("$", "")
      
      // Call the subscription API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify({
          merchant: merchantId,
          amount: amount,
          interval: "MONTH"
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to create subscription")
      }
      
      const data = await response.json()
      
      // Store the subscription ID in localStorage
      if (data.id) {
        localStorage.setItem("subscriptionId", data.id)
        setHasSubscription(true)
      }
      
      // Redirect to the payment gateway URL
      if (data.session_url) {
        window.location.href = data.session_url
      } else {
        setError("No payment URL received from the server")
      }
    } catch (err) {
      console.error("Subscription error:", err)
      setError(err instanceof Error ? err.message : "An error occurred while processing your subscription. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="bg-red-900 py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="text-center md:text-left">
              <h1 className="mb-4 text-2xl md:text-3xl lg:text-5xl font-bold text-white">Build your e-commerce empire</h1>
              <p className="mb-6 text-base md:text-lg text-white/90">
                The complete platform to launch and develop your online store. Start selling today with our powerful
                tools and reach customers worldwide.
              </p>
              <ul className="mb-8 space-y-2 text-left text-white/80">
                <li className="flex items-center">
                  <ChevronRight className="mr-2 h-4 w-4 text-red-300" />
                  No technical skills required
                </li>
                <li className="flex items-center">
                  <ChevronRight className="mr-2 h-4 w-4 text-red-300" />
                  Mobile-optimized shopping experience
                </li>
                <li className="flex items-center">
                  <ChevronRight className="mr-2 h-4 w-4 text-red-300" />
                  Secure payment processing
                </li>
              </ul>
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                {!isAuthenticated && (
                  <>
                    <Link href="/auth">
                      <Button size="lg" className="bg-white text-red-900 hover:bg-gray-100">
                        Start free trial
                      </Button>
                    </Link>
                    {/* <Button size="lg" variant="outline" className="border-white text-black hover:bg-gray-100">
                      Watch demo
                    </Button> */}
                  </>
                )}
                {isAuthenticated && !localStorage.getItem("currentStoreId") && (
                  <>
                    <Link href="/auth/store-setup">
                      <Button size="lg" className="bg-white text-red-900 hover:bg-gray-100">
                        Setup your store
                      </Button>
                    </Link>
                    {/* <Button size="lg" variant="outline" className="border-white text-black hover:bg-gray-100">
                      Watch demo
                    </Button> */}
                  </>
                )}
                {isAuthenticated && localStorage.getItem("currentStoreId") && (
                  <Link href="/stores">
                    <Button size="lg" variant="outline" className="border-white text-black hover:bg-gray-100">
                      View My Stores
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            <div className="hidden md:block">
              <Image
                src="https://images.unsplash.com/photo-1674027392851-7b34f21b07ee?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="E-commerce platform dashboard"
                width={500}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 md:gap-8 md:grid-cols-4">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-red-800">10k+</p>
              <p className="text-xs md:text-sm text-gray-600">Active Stores</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-red-800">$100M+</p>
              <p className="text-xs md:text-sm text-gray-600">Processed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-red-800">150+</p>
              <p className="text-xs md:text-sm text-gray-600">Countries</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-red-800">24/7</p>
              <p className="text-xs md:text-sm text-gray-600">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="mb-2 text-2xl md:text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mx-auto max-w-2xl text-sm md:text-base text-gray-600">
              Get your online store up and running in just a few simple steps
            </p>
          </div>
          <div className="grid gap-6 md:gap-8 md:grid-cols-3">
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-red-100 text-red-800">
                <span className="text-xl md:text-2xl font-bold">1</span>
              </div>
              <h3 className="mb-2 text-lg md:text-xl font-semibold">Create Your Account</h3>
              <p className="text-sm md:text-base text-gray-600">
                Sign up for free and set up your store profile with your brand information
              </p>
            </div>
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-red-100 text-red-800">
                <span className="text-xl md:text-2xl font-bold">2</span>
              </div>
              <h3 className="mb-2 text-lg md:text-xl font-semibold">Add Your Products</h3>
              <p className="text-sm md:text-base text-gray-600">Upload your products with descriptions, images, and pricing options</p>
            </div>
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-red-100 text-red-800">
                <span className="text-xl md:text-2xl font-bold">3</span>
              </div>
              <h3 className="mb-2 text-lg md:text-xl font-semibold">Start Selling</h3>
              <p className="text-sm md:text-base text-gray-600">Launch your store, promote your products, and start accepting orders</p>
            </div>
          </div>
          <div className="mt-8 md:mt-12 text-center">
            <Link href="/auth/store-setup">
              <Button className="bg-red-800 hover:bg-red-700">Create Your Store Now</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="mb-2 text-2xl md:text-3xl font-bold text-gray-900">Shopping Inspirations</h2>
            <p className="mx-auto max-w-2xl text-sm md:text-base text-gray-600">
              Discover different ways to grow your business and reach more customers
            </p>
          </div>
          <div className="grid gap-6 md:gap-8 md:grid-cols-3">
            <div className="group overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
              <div className="aspect-video overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1723905103559-f2af9240200a?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Sale promotion"
                  width={400}
                  height={200}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="mb-2 text-lg md:text-xl font-semibold">Family Shopping</h3>
                <p className="mb-4 text-sm md:text-base text-gray-600">
                  Create special offers and collections that appeal to families and increase average order value.
                </p>
                <Link href="#" className="inline-flex items-center text-xs md:text-sm font-medium text-red-800 hover:text-red-700">
                  Learn more <ChevronRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
                </Link>
              </div>
            </div>
            <div className="group overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
              <div className="aspect-video overflow-hidden">
                <Image
                  src="https://plus.unsplash.com/premium_photo-1683288295814-84a199da83d9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Create your store"
                  width={400}
                  height={200}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="mb-2 text-lg md:text-xl font-semibold">Create Your Store</h3>
                <p className="mb-4 text-sm md:text-base text-gray-600">
                  Design a beautiful online store that reflects your brand identity and attracts customers.
                </p>
                <Link href="#" className="inline-flex items-center text-xs md:text-sm font-medium text-red-800 hover:text-red-700">
                  Learn more <ChevronRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
                </Link>
              </div>
            </div>
            <div className="group overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
              <div className="aspect-video overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1619498560614-9bbfab571365?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Success stories"
                  width={400}
                  height={200}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="mb-2 text-lg md:text-xl font-semibold">Success Stories</h3>
                <p className="mb-4 text-sm md:text-base text-gray-600">
                  Get inspired by merchants who have built thriving businesses using our platform.
                </p>
                <Link href="#" className="inline-flex items-center text-xs md:text-sm font-medium text-red-800 hover:text-red-700">
                  Learn more <ChevronRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="mb-2 text-2xl md:text-3xl font-bold text-gray-900">Popular Categories</h2>
            <p className="mx-auto max-w-2xl text-sm md:text-base text-gray-600">
              Explore our most popular product categories to start selling
            </p>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[
              { name: "Fashion", icon: "👕" },
              { name: "Electronics", icon: "📱" },
              { name: "Home & Garden", icon: "🏡" },
              { name: "Beauty", icon: "💄" },
              { name: "Sports", icon: "🏀" },
              { name: "Toys", icon: "🧸" },
              { name: "Jewelry", icon: "💍" },
              { name: "Food", icon: "🍕" },
            ].map((category, index) => (
              <Link
                key={index}
                href="#"
                className="flex items-center rounded-lg border bg-white p-3 md:p-4 shadow-sm transition-all hover:shadow-md hover:border-red-200"
              >
                <span className="mr-2 md:mr-3 text-xl md:text-2xl">{category.icon}</span>
                <span className="text-sm md:text-base font-medium">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="mb-2 text-2xl md:text-3xl font-bold text-gray-900">Our Features</h2>
            <p className="mx-auto max-w-2xl text-sm md:text-base text-gray-600">Everything you need to run a successful online business</p>
          </div>
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 md:p-6">
                <div className="mb-4 rounded-full bg-red-100 p-2 md:p-3 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5 md:h-6 md:w-6 text-red-800" />
                </div>
                <h3 className="mb-2 text-lg md:text-xl font-semibold">Product Management</h3>
                <p className="text-sm md:text-base text-gray-600">
                  Easily manage your product catalog with bulk editing, inventory tracking, and variant options.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 md:p-6">
                <div className="mb-4 rounded-full bg-red-100 p-2 md:p-3 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                  <Shield className="h-5 w-5 md:h-6 md:w-6 text-red-800" />
                </div>
                <h3 className="mb-2 text-lg md:text-xl font-semibold">Secure Payments</h3>
                <p className="text-sm md:text-base text-gray-600">
                  Accept payments securely online with multiple payment gateways and fraud protection.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 md:p-6">
                <div className="mb-4 rounded-full bg-red-100 p-2 md:p-3 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 md:h-6 md:w-6 text-red-800" />
                </div>
                <h3 className="mb-2 text-lg md:text-xl font-semibold">Analytics</h3>
                <p className="text-sm md:text-base text-gray-600">
                  Track your store&apos;s performance with detailed reports on sales, customers, and inventory.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 md:p-6">
                <div className="mb-4 rounded-full bg-red-100 p-2 md:p-3 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                  <Truck className="h-5 w-5 md:h-6 md:w-6 text-red-800" />
                </div>
                <h3 className="mb-2 text-lg md:text-xl font-semibold">Shipping Solutions</h3>
                <p className="text-sm md:text-base text-gray-600">
                  Offer multiple shipping options with real-time rates and tracking information for customers.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 md:p-6">
                <div className="mb-4 rounded-full bg-red-100 p-2 md:p-3 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 md:h-6 md:w-6 text-red-800" />
                </div>
                <h3 className="mb-2 text-lg md:text-xl font-semibold">Discount Codes</h3>
                <p className="text-sm md:text-base text-gray-600">
                  Create and manage promotional codes, discounts, and special offers to boost sales.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 md:p-6">
                <div className="mb-4 rounded-full bg-red-100 p-2 md:p-3 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                  <Headphones className="h-5 w-5 md:h-6 md:w-6 text-red-800" />
                </div>
                <h3 className="mb-2 text-lg md:text-xl font-semibold">24/7 Support</h3>
                <p className="text-sm md:text-base text-gray-600">
                  Get help whenever you need it with our dedicated support team and knowledge base.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="mb-2 text-2xl md:text-3xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
            <p className="mx-auto max-w-2xl text-sm md:text-base text-gray-600">Choose the plan that&apos;s right for your business</p>
          </div>
          
          {error && (
            <div className="mb-6 md:mb-8 max-w-md mx-auto bg-red-50 border border-red-200 rounded-md p-3 md:p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-4 w-4 md:h-5 md:w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-xs md:text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid gap-6 md:gap-8 md:grid-cols-3">
            {[
              {
                name: "Basic",
                price: "$11",
                description: "Perfect for new businesses",
                features: ["Up to 100 products", "2% transaction fee", "Basic analytics", "24/7 support"],
              },
              {
                name: "Professional",
                price: "$25",
                description: "For growing businesses",
                features: [
                  "Up to 1,000 products",
                  "1% transaction fee",
                  "Advanced analytics",
                  "Priority support",
                  "Multiple staff accounts",
                ],
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "$49",
                description: "For large businesses",
                features: [
                  "Unlimited products",
                  "0.5% transaction fee",
                  "Advanced analytics & reporting",
                  "Dedicated account manager",
                  "Custom development",
                ],
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`border-0 ${plan.highlighted ? "relative shadow-lg border-2 border-red-800" : "shadow-sm"}`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 md:-top-4 left-0 right-0 mx-auto w-max rounded-full bg-red-800 px-3 py-0.5 md:px-4 md:py-1 text-xs md:text-sm font-medium text-white">
                    Most Popular
                  </div>
                )}
                <CardContent className="p-4 md:p-6">
                  <h3 className="mb-2 text-lg md:text-xl font-semibold">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-2xl md:text-3xl font-bold">{plan.price}</span>
                    <span className="text-sm md:text-base text-gray-600">/month</span>
                  </div>
                  <p className="mb-4 md:mb-6 text-sm md:text-base text-gray-600">{plan.description}</p>
                  <ul className="mb-4 md:mb-6 space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <ChevronRight className="mr-2 h-3 w-3 md:h-4 md:w-4 text-red-800" />
                        <span className="text-sm md:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.highlighted ? "bg-red-800 hover:bg-red-700" : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                    onClick={() => handleSubscribe(plan)}
                    disabled={isLoading || hasSubscription}
                  >
                    {isLoading ? "Processing..." : hasSubscription ? "Already Subscribed" : "Choose Plan"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="mb-2 text-2xl md:text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-sm md:text-base text-gray-600">Find answers to common questions about our platform</p>
          </div>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: "How do I get started with Sokoby?",
                  answer:
                    "Getting started is easy! Simply sign up for a free account, choose a plan that fits your needs, and follow our step-by-step guide to set up your online store. No technical skills required.",
                },
                {
                  question: "What payment methods do you support?",
                  answer:
                    "We support all major payment methods including credit cards, PayPal, Apple Pay, Google Pay, and more. We also support local payment methods in various countries.",
                },
                {
                  question: "Can I migrate my existing store to Sokoby?",
                  answer:
                    "Yes, we offer a seamless migration process for stores coming from other platforms. Our team will help you transfer your products, customers, and order history.",
                },
                {
                  question: "Do you offer discounts for annual billing?",
                  answer:
                    "Yes, we offer a 20% discount when you choose annual billing instead of monthly. This can result in significant savings for your business over the course of a year.",
                },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-sm md:text-base font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm md:text-base text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-red-900 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl md:text-3xl font-bold text-white">Stay Updated</h2>
            <p className="mb-6 md:mb-8 text-sm md:text-base text-white/80">
              Subscribe to our newsletter for the latest e-commerce tips, trends, and exclusive offers
            </p>
            <form className="flex flex-col gap-3 md:gap-4 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 border-white/20 bg-white/10 text-white placeholder:text-white/60 text-sm md:text-base"
              />
              <Button className="bg-white text-red-900 hover:bg-gray-100">Subscribe</Button>
            </form>
            <p className="mt-3 md:mt-4 text-xs md:text-sm text-white/60">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-xl bg-gradient-to-r from-red-800 to-red-900 p-6 md:p-8 lg:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-2xl md:text-3xl lg:text-4xl font-bold text-white">Ready to start selling online?</h2>
              <p className="mb-6 md:mb-8 text-sm md:text-base text-white/80">
                Join thousands of successful businesses on our platform and start growing your online presence today.
              </p>
              <div className="flex flex-col space-y-3 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
                <Link href={isAuthenticated ? "/auth/store-setup" : "/auth"}>
                  <Button size="lg" className="bg-white text-red-900 hover:bg-gray-100">
                    Start free trial
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="bg-white text-red-900 hover:bg-gray-100">
                    Contact sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Link href="/" className="mb-4 inline-block">
              <Image
              src="/sokobylogo.png" 
              alt="Sokoby"
              width={150} 
              height={50} 
              className="h-11 w-auto"
            />
              </Link>
              <p className="mb-4 max-w-md text-gray-400">
                The complete e-commerce platform that helps you sell online, on social media, or in person.
              </p>
              <div className="flex space-x-4">
                {[
                  { name: 'facebook', icon: Facebook, url: 'https://www.facebook.com/sokobyonline/' },
                  { name: 'linkedin', icon: Linkedin, url: 'https://www.linkedin.com/company/sokoby/' },
                  { name: 'instagram', icon: Instagram, url: 'https://www.instagram.com/sokobyonline/' },
                  { name: 'tiktok', icon: Mail, url: 'https://www.tiktok.com/@sokobyonline/' },
                  { name: 'twitter', icon: Twitter, url: 'https://x.com/sokobyonline/' },
                  { name: 'pinterest', icon: Mail, url: 'https://ca.pinterest.com/sokobyonline/' },
                  { name: 'youtube', icon: Youtube, url: 'https://www.youtube.com/@Sokoby/' }
                ].map((social) => (
                  <a 
                    key={social.name} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-white"
                  >
                    <span className="sr-only">{social.name}</span>
                    <div className="h-6 w-6 rounded-full bg-gray-700 flex items-center justify-center">
                      <social.icon className="h-4 w-4" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Products</h3>
              <ul className="space-y-2">
                {["Online Store", "Point of Sale", "Buy Button", "Checkout"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Resources</h3>
              <ul className="space-y-2">
                {["Blog", "Guides", "Help Center", "API Documentation"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Company</h3>
              <ul className="space-y-2">
                {[
                  { name: "About", href: "/about" },
                  { name: "Careers", href: "#" },
                  { name: "Press", href: "#" },
                  { name: "Contact", href: "/contact" }
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-gray-400 hover:text-white">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-sm text-gray-400">© {new Date().getFullYear()} Sokoby. All rights reserved.</p>
              <div className="flex space-x-6">
                <Link href="#" className="text-sm text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-sm text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
                <Link href="#" className="text-sm text-gray-400 hover:text-white">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

