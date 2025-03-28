"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Book, FileText, MessageSquare, Video, ArrowRight, ChevronRight, Mail, Phone} from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample help categories
const helpCategories = [
  {
    title: "Getting Started",
    icon: Book,
    description: "Learn the basics of setting up your store",
    articles: [
      { title: "Creating your account", link: "/help/creating-account" },
      { title: "Setting up your store", link: "/help/setup-store" },
      { title: "Adding your first product", link: "/help/add-product" },
      { title: "Customizing your theme", link: "/help/customize-theme" },
      { title: "Setting up payment methods", link: "/help/payment-setup" },
    ],
  },
  {
    title: "Products & Inventory",
    icon: FileText,
    description: "Manage your products and inventory",
    articles: [
      { title: "Adding product variants", link: "/help/product-variants" },
      { title: "Managing inventory", link: "/help/inventory-management" },
      { title: "Creating collections", link: "/help/collections" },
      { title: "Product images and media", link: "/help/product-media" },
      { title: "Importing and exporting products", link: "/help/import-export" },
    ],
  },
  {
    title: "Orders & Shipping",
    icon: MessageSquare,
    description: "Process orders and manage shipping",
    articles: [
      { title: "Processing orders", link: "/help/process-orders" },
      { title: "Setting up shipping rates", link: "/help/shipping-rates" },
      { title: "Printing shipping labels", link: "/help/shipping-labels" },
      { title: "Order fulfillment", link: "/help/fulfillment" },
      { title: "Managing returns", link: "/help/returns" },
    ],
  },
  {
    title: "Marketing & SEO",
    icon: Video,
    description: "Promote your store and products",
    articles: [
      { title: "Search engine optimization", link: "/help/seo" },
      { title: "Creating discount codes", link: "/help/discount-codes" },
      { title: "Email marketing campaigns", link: "/help/email-marketing" },
      { title: "Social media integration", link: "/help/social-media" },
      { title: "Abandoned cart recovery", link: "/help/abandoned-cart" },
    ],
  },
];

// Sample popular articles
const popularArticles = [
  { title: "How to set up your online store", link: "/help/setup-store" },
  { title: "Processing your first order", link: "/help/process-orders" },
  { title: "Setting up payment gateways", link: "/help/payment-setup" },
  { title: "Creating product collections", link: "/help/collections" },
  { title: "Customizing your store theme", link: "/help/customize-theme" },
  { title: "Setting up shipping rates", link: "/help/shipping-rates" },
];

// Sample video tutorials
const videoTutorials = [
  {
    title: "Getting Started with Sokoby",
    duration: "10:23",
    thumbnail: "/placeholder.svg?height=180&width=320",
    link: "/help/videos/getting-started",
  },
  {
    title: "Product Management Basics",
    duration: "8:45",
    thumbnail: "/placeholder.svg?height=180&width=320",
    link: "/help/videos/product-management",
  },
  {
    title: "Customizing Your Store Theme",
    duration: "12:18",
    thumbnail: "/placeholder.svg?height=180&width=320",
    link: "/help/videos/theme-customization",
  },
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would handle search here
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header - Reused from homepage */}
      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center">
          <Image
              src="/sokobylogo.png" 
              alt="Sokoby"
              width={150} 
              height={50} 
              className="h-11 w-auto"
            />
          </Link>
          <nav className="hidden space-x-6 md:flex">
            <Link href="/support" className="text-sm font-medium text-gray-700 hover:text-red-800">
              Support
            </Link>
            <Link href="/solutions" className="text-sm font-medium text-gray-700 hover:text-red-800">
              Solutions
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-gray-700 hover:text-red-800">
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

      {/* Hero Section with Search */}
      <section className="bg-red-900 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">How can we help you?</h1>
            <p className="mb-8 text-xl text-white/90">
              Find answers to your questions and learn how to get the most out of Sokoby.
            </p>
            <form onSubmit={handleSearch} className="relative mx-auto max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search for help articles, tutorials, and more..."
                className="h-14 pl-12 pr-4 rounded-lg border-0 text-gray-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-800 hover:bg-red-700"
              >
                Search
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-3xl font-bold text-center text-gray-900">Browse Help Topics</h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {helpCategories.map((category, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4 rounded-full bg-red-100 p-3 w-12 h-12 flex items-center justify-center">
                      <category.icon className="h-6 w-6 text-red-800" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">{category.title}</h3>
                    <p className="mb-4 text-gray-600">{category.description}</p>
                    <ul className="space-y-2 mb-4 flex-1">
                      {category.articles.slice(0, 3).map((article, articleIndex) => (
                        <li key={articleIndex}>
                          <Link href={article.link} className="text-sm text-gray-600 hover:text-red-800 flex items-center">
                            <ChevronRight className="mr-1 h-3 w-3 flex-shrink-0" />
                            <span>{article.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link href={`/help/categories/${category.title.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-medium text-red-800 hover:text-red-700 flex items-center mt-auto">
                      View all articles
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles and Video Tutorials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="articles" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="articles">Popular Articles</TabsTrigger>
                <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="articles">
              <div className="mx-auto max-w-4xl">
                <div className="grid gap-4 md:grid-cols-2">
                  {popularArticles.map((article, index) => (
                    <Link key={index} href={article.link} className="rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start">
                        <FileText className="mr-3 h-5 w-5 text-red-800 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-gray-900">{article.title}</h3>
                          <p className="mt-1 text-sm text-gray-500">Read article</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Button variant="outline" className="border-red-800 text-red-800 hover:bg-red-50">
                    View all articles
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="videos">
              <div className="mx-auto max-w-4xl">
                <div className="grid gap-8 md:grid-cols-3">
                  {videoTutorials.map((video, index) => (
                    <Link key={index} href={video.link} className="group rounded-lg overflow-hidden border border-gray-200 bg-white hover:shadow-md transition-shadow">
                      <div className="relative aspect-video">
                        <Image
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="rounded-full bg-white bg-opacity-80 p-3">
                            <Play className="h-6 w-6 text-red-800" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 rounded bg-black bg-opacity-70 px-2 py-1 text-xs text-white">
                          {video.duration}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900">{video.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">Watch tutorial</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Button variant="outline" className="border-red-800 text-red-800 hover:bg-red-50">
                    View all videos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Can&apos;t find what you&apos;re looking for?</h2>
            <p className="mb-8 text-lg text-gray-600">
              Our support team is here to help. Contact us and we&apos;ll get back to you as soon as possible.
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-red-100 p-3">
                    <Mail className="h-6 w-6 text-red-800" />
                  </div>
                  <h3 className="text-lg font-semibold">Email Support</h3>
                  <p className="mt-2 text-gray-600">Send us an email and we&apos;ll respond within 24 hours.</p>
                  <Button className="mt-4 bg-red-800 hover:bg-red-700">
                    Email Us
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-red-100 p-3">
                    <MessageSquare className="h-6 w-6 text-red-800" />
                  </div>
                  <h3 className="text-lg font-semibold">Live Chat</h3>
                  <p className="mt-2 text-gray-600">Chat with our support team in real-time.</p>
                  <Button className="mt-4 bg-red-800 hover:bg-red-700">
                    Start Chat
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-red-100 p-3">
                    <Phone className="h-6 w-6 text-red-800" />
                  </div>
                  <h3 className="text-lg font-semibold">Phone Support</h3>
                  <p className="mt-2 text-gray-600">Call us directly for immediate assistance.</p>
                  <Button className="mt-4 bg-red-800 hover:bg-red-700">
                    Call Us
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Community Forum */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Join Our Community</h2>
            <p className="mb-8 text-lg text-gray-600">
              Connect with other Sokoby merchants, share tips, and get advice from experienced store owners.
            </p>
            <Button size="lg" className="bg-red-800 hover:bg-red-700">
              Visit Community Forum
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
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
                  <Link href="/help" className="text-gray-400 hover:text-white">
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

// Play icon component
function Play(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}
