"use client"

import { ArrowRight, Check, ChevronDown, Facebook, HelpCircle, Instagram, Linkedin, Mail, Twitter, X, Youtube } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

import { Header } from "@/components/Header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import React from "react"

// Pricing plans data
const plans = [
  {
    name: "Basic",
    description: "Everything you need to start selling online",
    monthlyPrice: 11,
    yearlyPrice: 9,
    features: [
      "Online store with unlimited products",
      "24/7 support",
      "2 staff accounts",
      "Basic reports",
      "Up to 4 inventory locations",
      "Manual order creation",
      "Discount codes",
      "Free SSL certificate",
      "Abandoned cart recovery",
      "Gift cards",
    ],
    limitations: ["2.0% transaction fee", "No professional reports", "No third-party calculated shipping rates"],
  },
  {
    name: "Standard",
    description: "Level up your growing business",
    monthlyPrice: 25,
    yearlyPrice: 20,
    popular: true,
    features: [
      "Everything in Basic, plus:",
      "Professional reports",
      "5 staff accounts",
      "Up to 5 inventory locations",
      "Standard reports",
      "USPS Priority Mail Cubic pricing",
      "International domains",
      "1% transaction fee",
      "Gift card creation",
      "Professional reports",
    ],
    limitations: ["1.0% transaction fee", "No custom report builder", "No calculated shipping rates"],
  },
  {
    name: "Advanced",
    description: "Advanced features for scaling your business",
    monthlyPrice: 49,
    yearlyPrice: 40,
    features: [
      "Everything in Standard, plus:",
      "15 staff accounts",
      "Up to 8 inventory locations",
      "Advanced report builder",
      "Third-party calculated shipping rates",
      "Custom SSL certificate",
      "International pricing",
      "International domains",
      "Advanced custom pricing",
      "0.5% transaction fee",
    ],
    limitations: ["0.5% transaction fee", "Limited API calls"],
  },
]

// Feature comparison data
interface Feature {
  name: string
  basic: boolean | string
  standard: boolean | string
  advanced: boolean | string
  tooltip?: string
}

interface FeatureCategory {
  name: string
  features: Feature[]
}

const featureCategories: FeatureCategory[] = [
  {
    name: "Online Store",
    features: [
      {
        name: "Online store",
        basic: true,
        standard: true,
        advanced: true,
        tooltip: "A fully customizable website to sell your products",
      },
      {
        name: "Unlimited products",
        basic: true,
        standard: true,
        advanced: true,
        tooltip: "Add as many products as you want to your store",
      },
      {
        name: "Staff accounts",
        basic: "2 accounts",
        standard: "5 accounts",
        advanced: "15 accounts",
        tooltip: "Additional logins for your team members",
      },
      {
        name: "24/7 support",
        basic: true,
        standard: true,
        advanced: true,
        tooltip: "Get help whenever you need it",
      },
    ],
  },
  {
    name: "Sales Channels",
    features: [
      {
        name: "Online store",
        basic: true,
        standard: true,
        advanced: true,
      },
      {
        name: "Social media integration",
        basic: true,
        standard: true,
        advanced: true,
      },
      {
        name: "Marketplace integration",
        basic: false,
        standard: true,
        advanced: true,
      },
      {
        name: "Buy button",
        basic: true,
        standard: true,
        advanced: true,
      },
    ],
  },
  {
    name: "Marketing & SEO",
    features: [
      {
        name: "Blog",
        basic: true,
        standard: true,
        advanced: true,
      },
      {
        name: "SEO features",
        basic: true,
        standard: true,
        advanced: true,
      },
      {
        name: "Gift cards",
        basic: true,
        standard: true,
        advanced: true,
      },
      {
        name: "Discount codes",
        basic: true,
        standard: true,
        advanced: true,
      },
      {
        name: "Abandoned cart recovery",
        basic: true,
        standard: true,
        advanced: true,
      },
    ],
  },
]

// FAQ data
const faqs = [
  {
    question: "Can I change my plan later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. When you upgrade, you'll be charged the prorated amount for the remainder of your billing cycle. When you downgrade, the new rate will apply when your current billing cycle ends.",
  },
  {
    question: "Is there a setup fee?",
    answer:
      "No, there are no setup fees for any of our plans. You can get started right away with just the monthly subscription cost.",
  },
  {
    question: "Do I need technical knowledge to use Sokoby?",
    answer:
      "No technical knowledge is required. Our platform is designed to be user-friendly and intuitive, with drag-and-drop tools and pre-built templates that make it easy to create and manage your online store.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, including Visa, Mastercard, American Express, and Discover. We also support PayPal for subscription payments.",
  },
  {
    question: "What are transaction fees?",
    answer:
      "Transaction fees are charged as a percentage of each sale you make. These fees are in addition to the credit card processing fees. You can avoid transaction fees by using Sokoby Payments as your payment processor.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes, we offer a 14-day free trial on all plans. No credit card is required to start your trial, and you can upgrade to a paid plan at any time during or after your trial period.",
  },
]

// Define a type for the plan
interface Plan {
  name: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  popular?: boolean
  features: string[]
  limitations?: string[]
}

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState("monthly")
  const [compareFeatures, setCompareFeatures] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSubscription, setHasSubscription] = useState(false)

  // Check if user already has a subscription
  useEffect(() => {
    const subscriptionId = localStorage.getItem("subscriptionId")
    setHasSubscription(!!subscriptionId)
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

      // Determine the amount based on the plan and billing period
      const amount = billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice

      // Call the subscription API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          merchant: merchantId,
          amount: amount.toString(),
          interval: billingPeriod === "monthly" ? "MONTH" : "YEAR",
        }),
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
      setError(
        err instanceof Error ? err.message : "An error occurred while processing your subscription. Please try again.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-red-900 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold text-white sm:text-5xl">Simple, transparent pricing</h1>
              <p className="mt-5 text-xl text-white/80">
                Choose the plan that best fits your needs. All plans include our core features.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-4">
            {error && (
              <div className="mt-8 max-w-md mx-auto bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <X className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {hasSubscription && (
              <div className="mt-8 max-w-md mx-auto bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-green-800">You already have an active subscription.</p>
                    <div className="mt-2">
                      <Link href="/subscriptions">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          View Subscription
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <div className="relative bg-gray-100 rounded-lg p-1 flex self-center">
                <button
                  type="button"
                  className={`${
                    billingPeriod === "monthly" ? "bg-red-800 text-white" : "text-gray-700 hover:text-gray-900"
                  } relative w-32 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto px-4`}
                  onClick={() => setBillingPeriod("monthly")}
                >
                  Monthly billing
                </button>
                <button
                  type="button"
                  className={`${
                    billingPeriod === "yearly" ? "bg-red-800 text-white" : "text-gray-700 hover:text-gray-900"
                  } relative w-32 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto px-4`}
                  onClick={() => setBillingPeriod("yearly")}
                >
                  Yearly billing
                  <span className="absolute -top-2 -right-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    Save 20%
                  </span>
                </button>
              </div>
            </div>

            <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`border rounded-lg shadow-sm divide-y divide-gray-200 bg-white transition-all hover:shadow-md ${
                    plan.popular ? "border-red-800 relative" : "border-gray-200"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-0 right-0 mx-auto w-max rounded-full bg-red-800 px-4 py-1 text-sm font-medium text-white">
                      Most Popular
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-lg leading-6 font-bold text-gray-900">{plan.name}</h2>
                    <p className="mt-4 text-sm text-gray-500">{plan.description}</p>
                    <p className="mt-8">
                      <span className="text-4xl font-extrabold text-gray-900">
                        ${billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                      </span>
                      <span className="text-base font-medium text-gray-500">
                        /{billingPeriod === "monthly" ? "mo" : "yr"}
                      </span>
                    </p>
                    <button
                      onClick={() => handleSubscribe(plan)}
                      disabled={isLoading || hasSubscription}
                      className={`mt-8 block w-full py-2 px-3 border border-transparent rounded-md text-center font-medium ${
                        hasSubscription
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : plan.popular
                            ? "bg-red-800 text-white hover:bg-red-700"
                            : "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300"
                      }`}
                    >
                      {isLoading ? "Processing..." : hasSubscription ? "Already Subscribed" : "Subscribe"}
                    </button>
                  </div>
                  <div className="px-6 py-4">
                    <p className="mb-2 text-sm font-medium text-gray-900">Plan includes:</p>
                    <ul className="space-y-2">
                      {plan.features.slice(0, 5).map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {plan.features.length > 5 && (
                      <button className="mt-2 flex items-center text-sm font-medium text-red-800 hover:text-red-700">
                        <span>See all features</span>
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                    )}
                  </div>
                  {plan.limitations && (
                    <div className="px-6 py-4">
                      <p className="mb-2 text-sm font-medium text-gray-900">Limitations:</p>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-start">
                            <X className="mr-2 h-5 w-5 flex-shrink-0 text-red-500" />
                            <span className="text-sm text-gray-600">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                variant="outline"
                onClick={() => setCompareFeatures(!compareFeatures)}
                className="flex items-center border-red-200 text-red-800 hover:text-red-700 hover:bg-red-50"
              >
                {compareFeatures ? "Hide" : "Compare"} all features
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${compareFeatures ? "rotate-180" : ""}`} />
              </Button>
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        {compareFeatures && (
          <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
              <h2 className="mb-8 text-2xl font-bold text-center text-gray-900">Compare Features</h2>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-4 px-6 text-left font-medium text-gray-500">Features</th>
                      {plans.map((plan) => (
                        <th key={plan.name} className="py-4 px-6 text-center font-medium text-gray-900">
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {featureCategories.map((category) => (
                      <React.Fragment key={category.name}>
                        <tr className="border-b border-gray-200 bg-gray-100">
                          <td colSpan={4} className="py-3 px-6 text-left font-medium text-gray-900">
                            {category.name}
                          </td>
                        </tr>
                        {category.features.map((feature, featureIndex) => (
                          <tr key={featureIndex} className="border-b border-gray-200">
                            <td className="py-4 px-6 text-left text-sm text-gray-900">
                              <div className="flex items-center">
                                {feature.name}
                                {feature.tooltip && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>{feature.tooltip}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-6 text-center text-sm">
                              {typeof feature.basic === "boolean" ? (
                                feature.basic ? (
                                  <Check className="mx-auto h-5 w-5 text-green-500" />
                                ) : (
                                  <X className="mx-auto h-5 w-5 text-gray-300" />
                                )
                              ) : (
                                <span className="text-gray-900">{feature.basic}</span>
                              )}
                            </td>
                            <td className="py-4 px-6 text-center text-sm">
                              {typeof feature.standard === "boolean" ? (
                                feature.standard ? (
                                  <Check className="mx-auto h-5 w-5 text-green-500" />
                                ) : (
                                  <X className="mx-auto h-5 w-5 text-gray-300" />
                                )
                              ) : (
                                <span className="text-gray-900">{feature.standard}</span>
                              )}
                            </td>
                            <td className="py-4 px-6 text-center text-sm">
                              {typeof feature.advanced === "boolean" ? (
                                feature.advanced ? (
                                  <Check className="mx-auto h-5 w-5 text-green-500" />
                                ) : (
                                  <X className="mx-auto h-5 w-5 text-gray-300" />
                                )
                              ) : (
                                <span className="text-gray-900">{feature.advanced}</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Enterprise Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl rounded-xl bg-red-900 p-8 text-white md:p-12">
              <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
                <div>
                  <h2 className="text-2xl font-bold md:text-3xl">Enterprise Solutions</h2>
                  <p className="mt-4 text-white/80">
                    Custom solutions for large businesses with complex requirements. Get personalized support, advanced
                    features, and scalable infrastructure.
                  </p>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-red-300" />
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-red-300" />
                      <span>Custom integrations</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-red-300" />
                      <span>Advanced security features</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-red-300" />
                      <span>Unlimited staff accounts</span>
                    </li>
                  </ul>
                  <Button className="mt-8 bg-white text-red-900 hover:bg-gray-100">Contact Sales</Button>
                </div>
                <div className="relative h-64 md:h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1657727534685-36b09f84e193?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Enterprise Solutions"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-3xl font-bold text-center text-gray-900">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-gray-900">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <div className="mt-8 text-center">
                <p className="mb-4 text-gray-600">Still have questions?</p>
                <Link href="/support">
                <Button variant="outline" className="border-red-200 text-red-800 hover:text-red-700 hover:bg-red-50">
                  Contact Support
                </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="rounded-xl bg-gradient-to-r from-red-800 to-red-900 p-8 md:p-12">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Ready to start selling online?</h2>
                <p className="mb-8 text-white/80">
                  Join thousands of successful businesses on our platform and start growing your online presence today.
                </p>
                <div className="flex flex-col space-y-3 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
                  <Link href="/auth/store-setup">
                    <Button size="lg" className="bg-white text-red-900 hover:bg-gray-100">
                      Start free trial
                      <ArrowRight className="ml-2 h-4 w-4" />
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
      </main>

      {/* Footer */}
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
              <h3 className="mb-4 text-lg font-semibold">Features</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/features/online-store" className="text-gray-400 hover:text-white">
                    Online Store
                  </Link>
                </li>
                <li>
                  <Link href="/features/point-of-sale" className="text-gray-400 hover:text-white">
                    Point of Sale
                  </Link>
                </li>
                <li>
                  <Link href="/features/marketing" className="text-gray-400 hover:text-white">
                    Marketing
                  </Link>
                </li>
                <li>
                  <Link href="/features/international" className="text-gray-400 hover:text-white">
                    International
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="text-gray-400 hover:text-white">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="/help-center" className="text-gray-400 hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/api-docs" className="text-gray-400 hover:text-white">
                    API Documentation
                  </Link>
                </li>
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
                <Link href="/privacy" className="text-sm text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-sm text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-sm text-gray-400 hover:text-white">
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
