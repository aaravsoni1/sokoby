"use client"

import { ArrowRight, BarChart3, Check, ChevronRight, CreditCard, Globe, Mail, Search, Shield, ShoppingBag, Smartphone, Tag, Truck, Zap } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-red-900 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Everything You Need to Sell Online</h1>
            <p className="mb-8 text-xl text-white/90">
              Powerful features to help you start, run, and grow your business. From customizable storefronts to advanced analytics, we&apos;ve got you covered.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-red-900 hover:bg-gray-100">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-red-800">
                Explore Features
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-3xl font-bold text-center text-gray-900">Explore Our Features</h2>
          
          <Tabs defaultValue="store" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="store">Online Store</TabsTrigger>
              <TabsTrigger value="sales">Sales Channels</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
              <TabsTrigger value="management">Management</TabsTrigger>
            </TabsList>
            
            <TabsContent value="store" className="mt-6">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Build Your Online Store</h3>
                  <p className="text-gray-600 mb-6">
                    Create a beautiful, fully customizable online store that reflects your brand. No design or coding skills required.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="mr-3 h-5 w-5 text-green-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">Customizable Themes</h4>
                        <p className="text-gray-600">Choose from dozens of professional themes and customize them to match your brand.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-3 h-5 w-5 text-green-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">Mobile Responsive</h4>
                        <p className="text-gray-600">Your store looks great on any device, from desktops to smartphones.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-3 h-5 w-5 text-green-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">Drag-and-Drop Editor</h4>
                        <p className="text-gray-600">Easily customize your store&apos;s layout with our intuitive editor.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-3 h-5 w-5 text-green-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">Blog Integration</h4>
                        <p className="text-gray-600">Share content with your customers and improve your SEO.</p>
                      </div>
                    </li>
                  </ul>
                  <Button className="mt-6 bg-red-800 hover:bg-red-700">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1727976822548-d097770638f3?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Online Store Builder"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="sales" className="mt-6">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div className="order-2 md:order-1 relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1514471157964-06459a4b9241?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Multi-channel Selling"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Sell Everywhere</h3>
                  <p className="text-gray-600 mb-6">
                    Reach customers wherever they shop. Sell on multiple channels while managing everything from one dashboard.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="mr-3 h-5 w-5 text-green-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">Social Media Integration</h4>
                        <p className="text-gray-600">Sell directly on Facebook, Instagram, and other social platforms.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-3 h-5 w-5 text-green-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">Marketplace Connections</h4>
                        <p className="text-gray-600">List your products on Amazon, eBay, and other marketplaces.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-3 h-5 w-5 text-green-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">Point of Sale</h4>
                        <p className="text-gray-600">Sell in person with our POS system that syncs with your online inventory.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-3 h-5 w-5 text-green-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">Buy Button</h4>
                        <p className="text-gray-600">Add e-commerce to any website with our embeddable buy buttons.</p>
                      </div>
                    </li>
                  </ul>
                  <Button className="mt-6 bg-red-800 hover:bg-red-700">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="marketing" className="mt-6">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Market Your Business</h3>
                  <p className="text-gray-600 mb-6">
                    Attract customers and boost sales with our powerful marketing tools. Create campaigns, offer discounts, and recover abandoned carts.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="mr-3 h-5 w-5 text-green-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">Email Marketing</h4>
                        <p className="text-gray-600">Create and send professional email campaigns to your customers.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-3 h-5 w-5 text-green-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">Discount Codes</h4>
                        <p className="text-gray-600">Create percentage, fixed amount, or free shipping discounts.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-3 h-5 w-5 text-green-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">Abandoned Cart Recovery</h4>
                        <p className="text-gray-600">Automatically remind customers about items left in their carts.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-3 h-5 w-5 text-green-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">SEO Tools</h4>
                        <p className="text-gray-600">Optimize your store for search engines to drive organic traffic.</p>
                      </div>
                    </li>
                  </ul>
                  <Button className="mt-6 bg-red-800 hover:bg-red-700">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Marketing Tools"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="management" className="mt-6">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div className="order-2 md:order-1 relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1542626991-cbc4e32524cc?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Store Management"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Manage Your Business</h3>
                  <p className="text-gray-600 mb-6">
                    Powerful tools to help you manage products, orders, customers, and inventory. Get insights with detailed analytics.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="mr-3 h-5 w-5 text-green-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">Order Management</h4>
                        <p className="text-gray-600">Process orders, print shipping labels, and track fulfillment status.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-3 h-5 w-5 text-green-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">Inventory Tracking</h4>
                        <p className="text-gray-600">Monitor stock levels and get low inventory alerts.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-3 h-5 w-5 text-green-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">Customer Management</h4>
                        <p className="text-gray-600">View customer profiles, purchase history, and contact information.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-3 h-5 w-5 text-green-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">Analytics & Reports</h4>
                        <p className="text-gray-600">Get insights into sales, traffic, and customer behavior.</p>
                      </div>
                    </li>
                  </ul>
                  <Button className="mt-6 bg-red-800 hover:bg-red-700">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* All Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-3xl font-bold text-center text-gray-900">All Features</h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: ShoppingBag,
                title: "Online Store",
                description: "Create a beautiful, fully customizable online store with our drag-and-drop builder.",
                link: "/features/online-store",
              },
              {
                icon: Globe,
                title: "Multi-channel Selling",
                description: "Sell on social media, marketplaces, and in person while managing everything from one dashboard.",
                link: "/features/multi-channel",
              },
              {
                icon: CreditCard,
                title: "Payment Processing",
                description: "Accept credit cards, mobile payments, and other payment methods with secure checkout.",
                link: "/features/payments",
              },
              {
                icon: BarChart3,
                title: "Analytics & Reporting",
                description: "Get detailed insights into your sales, traffic, and customer behavior.",
                link: "/features/analytics",
              },
              {
                icon: Smartphone,
                title: "Mobile App",
                description: "Manage your store on the go with our mobile app for iOS and Android.",
                link: "/features/mobile-app",
              },
              {
                icon: Truck,
                title: "Shipping & Fulfillment",
                description: "Print shipping labels, track packages, and offer multiple shipping options.",
                link: "/features/shipping",
              },
              {
                icon: Shield,
                title: "Security & Compliance",
                description: "Keep your store and customer data secure with SSL encryption and PCI compliance.",
                link: "/features/security",
              },
              {
                icon: Zap,
                title: "Performance Optimization",
                description: "Fast loading times and optimized checkout for better conversion rates.",
                link: "/features/performance",
              },
              {
                icon: Search,
                title: "SEO Tools",
                description: "Optimize your store for search engines to drive organic traffic.",
                link: "/features/seo",
              },
              {
                icon: Tag,
                title: "Discounts & Promotions",
                description: "Create discount codes, run sales, and offer special promotions.",
                link: "/features/discounts",
              },
              {
                icon: Mail,
                title: "Email Marketing",
                description: "Create and send professional email campaigns to your customers.",
                link: "/features/email-marketing",
              },
              {
                icon: Globe,
                title: "International Selling",
                description: "Sell globally with multi-currency support and international shipping options.",
                link: "/features/international",
              },
            ].map((feature, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 rounded-full bg-red-100 p-3">
                      <feature.icon className="h-6 w-6 text-red-800" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">{feature.title}</h3>
                    <p className="mb-4 text-gray-600">{feature.description}</p>
                    <Link href={feature.link} className="flex items-center text-sm font-medium text-red-800 hover:text-red-700">
                      Learn more
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-3xl font-bold text-center text-gray-900">What Our Customers Say</h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                quote: "Sokoby has transformed our business. The platform is incredibly easy to use, and the features are exactly what we needed to grow our online presence.",
                author: "Sarah Johnson",
                company: "Boutique Clothing Store",
                image: "/placeholder.svg?height=80&width=80",
              },
              {
                quote: "The multi-channel selling feature has been a game-changer for us. We can manage our online store, social media sales, and marketplace listings all from one dashboard.",
                author: "Michael Chen",
                company: "Electronics Retailer",
                image: "/placeholder.svg?height=80&width=80",
              },
              {
                quote: "The analytics tools have given us insights we never had before. We can now make data-driven decisions that have significantly improved our conversion rates.",
                author: "Emily Rodriguez",
                company: "Home Decor Brand",
                image: "/placeholder.svg?height=80&width=80",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4 text-4xl text-red-800">&quot;</div>
                    <p className="flex-1 italic text-gray-600 mb-6">{testimonial.quote}</p>
                    <div className="flex items-center">
                      <div className="mr-4 h-12 w-12 overflow-hidden rounded-full">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.author}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{testimonial.author}</p>
                        <p className="text-sm text-gray-500">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-900 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">Ready to start selling online?</h2>
            <p className="mb-8 text-xl text-white/90">
              Join thousands of businesses that use Sokoby to power their online stores. Start your 14-day free trial today.
            </p>
            <Button size="lg" className="bg-white text-red-900 hover:bg-gray-100">
              Start your free trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="mt-4 text-sm text-white/80">No credit card required</p>
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
