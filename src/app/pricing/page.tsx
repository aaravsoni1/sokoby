"use client"

import { ArrowRight, Check, ChevronDown, HelpCircle, X } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react"

// Pricing plans data
const plans = [
  {
    name: "Basic",
    description: "Everything you need to start selling online",
    monthlyPrice: 29,
    yearlyPrice: 24,
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
    limitations: [
      "2.0% transaction fee",
      "No professional reports",
      "No third-party calculated shipping rates",
    ],
  },
  {
    name: "Standard",
    description: "Level up your growing business",
    monthlyPrice: 79,
    yearlyPrice: 69,
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
    limitations: [
      "1.0% transaction fee",
      "No custom report builder",
      "No calculated shipping rates",
    ],
  },
  {
    name: "Advanced",
    description: "Advanced features for scaling your business",
    monthlyPrice: 299,
    yearlyPrice: 269,
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
    limitations: [
      "0.5% transaction fee",
      "Limited API calls",
    ],
  },
];

// Feature comparison data
interface Feature {
  name: string;
  basic: boolean | string;
  standard: boolean | string;
  advanced: boolean | string;
  tooltip?: string;
}

interface FeatureCategory {
  name: string;
  features: Feature[];
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
];

// FAQ data
const faqs = [
  {
    question: "Can I change my plan later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. When you upgrade, you'll be charged the prorated amount for the remainder of your billing cycle. When you downgrade, the new rate will apply when your current billing cycle ends."
  },
  {
    question: "Is there a setup fee?",
    answer: "No, there are no setup fees for any of our plans. You can get started right away with just the monthly subscription cost."
  },
  {
    question: "Do I need technical knowledge to use Sokoby?",
    answer: "No technical knowledge is required. Our platform is designed to be user-friendly and intuitive, with drag-and-drop tools and pre-built templates that make it easy to create and manage your online store."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, including Visa, Mastercard, American Express, and Discover. We also support PayPal for subscription payments."
  },
  {
    question: "What are transaction fees?",
    answer: "Transaction fees are charged as a percentage of each sale you make. These fees are in addition to the credit card processing fees. You can avoid transaction fees by using Sokoby Payments as your payment processor."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, we offer a 14-day free trial on all plans. No credit card is required to start your trial, and you can upgrade to a paid plan at any time during or after your trial period."
  },
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState("monthly")
  const [compareFeatures, setCompareFeatures] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header - Reused from homepage */}
      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sokoby%20mk.png-gToWGGxndAiqQ6pEyC5uaZnjZdJgdq.jpeg"
              alt="Sokoby"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
          <nav className="hidden space-x-6 md:flex">
            <Link href="/products" className="text-sm font-medium text-gray-700 hover:text-red-800">
              Products
            </Link>
            <Link href="/solutions" className="text-sm font-medium text-gray-700 hover:text-red-800">
              Solutions
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-red-800 hover:text-red-700">
              Pricing
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-red-800">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-red-800">
              Contact
            </Link>
          </nav>
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="/auth" className="text-sm font-medium text-gray-700 hover:text-red-800">
              Log in
            </Link>
            <Button className="bg-red-800 hover:bg-red-700">Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">Simple, transparent pricing</h1>
            <p className="mb-8 text-xl text-gray-600">
              Everything you need to create, manage, and grow your online business. Start your 14-day free trial today.
            </p>
            
            <div className="mb-12 flex items-center justify-center">
              <span className={`mr-3 text-sm ${billingPeriod === "monthly" ? "font-medium text-gray-900" : "text-gray-500"}`}>
                Monthly
              </span>
              <Switch
                checked={billingPeriod === "yearly"}
                onCheckedChange={(checked) => setBillingPeriod(checked ? "yearly" : "monthly")}
              />
              <span className={`ml-3 text-sm ${billingPeriod === "yearly" ? "font-medium text-gray-900" : "text-gray-500"}`}>
                Yearly <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">Save 15%</span>
              </span>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              {plans.map((plan) => (
                <div 
                  key={plan.name} 
                  className={`relative rounded-lg border ${plan.popular ? "border-red-800" : "border-gray-200"} bg-white p-6 shadow-sm`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-0 right-0 mx-auto w-max rounded-full bg-red-800 px-4 py-1 text-sm font-medium text-white">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-900">{plan.name}</h2>
                    <p className="mt-1 text-sm text-gray-500">{plan.description}</p>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-gray-900">
                        ${billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                      </span>
                      <span className="ml-1 text-gray-500">/mo</span>
                    </div>
                    {billingPeriod === "yearly" && (
                      <p className="mt-1 text-sm text-green-600">
                        ${(plan.monthlyPrice - plan.yearlyPrice) * 12} saved annually
                      </p>
                    )}
                  </div>
                  <Button 
                    className={`w-full ${plan.popular ? "bg-red-800 hover:bg-red-700" : "bg-gray-900 hover:bg-gray-800"}`}
                  >
                    Start free trial
                  </Button>
                  <div className="mt-6">
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
                    <div className="mt-4">
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
                className="flex items-center"
              >
                {compareFeatures ? "Hide" : "Compare"} all features
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${compareFeatures ? "rotate-180" : ""}`} />
              </Button>
            </div>
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
          <div className="mx-auto max-w-4xl rounded-xl bg-gray-900 p-8 text-white md:p-12">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
              <div>
                <h2 className="text-2xl font-bold md:text-3xl">Enterprise Solutions</h2>
                <p className="mt-4 text-gray-300">
                  Custom solutions for large businesses with complex requirements. Get personalized support, advanced features, and scalable infrastructure.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-green-400" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-green-400" />
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-green-400" />
                    <span>Advanced security features</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-green-400" />
                    <span>Unlimited staff accounts</span>
                  </li>
                </ul>
                <Button className="mt-8 bg-white text-gray-900 hover:bg-gray-100">
                  Contact Sales
                </Button>
              </div>
              <div className="relative h-64 md:h-full">
                <Image
                  src="/placeholder.svg?height=300&width=400"
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
              <Button variant="outline">Contact Support</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Ready to start selling online?</h2>
            <p className="mb-8 text-xl text-gray-600">
              Join thousands of businesses that use Sokoby to sell online. Start your 14-day free trial today.
            </p>
            <Button size="lg" className="bg-red-800 hover:bg-red-700">
              Start your free trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="mt-4 text-sm text-gray-500">No credit card required</p>
          </div>
        </div>
      </section>

      {/* Footer - Reused from homepage */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Link href="/" className="mb-4 inline-block">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sokoby%20mk.png-gToWGGxndAiqQ6pEyC5uaZnjZdJgdq.jpeg"
                  alt="Sokoby"
                  width={150}
                  height={50}
                  className="h-10 w-auto"
                />
              </Link>
              <p className="mb-4 max-w-md text-gray-400">
                The complete e-commerce platform that helps you sell online, on social media, or in person.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-400 hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="text-gray-400 hover:text-white">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Products</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Online Store
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Point of Sale
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Buy Button
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Sokoby. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
