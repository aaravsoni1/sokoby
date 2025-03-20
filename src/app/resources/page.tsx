import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Search, BookOpen, FileText, Video, Users, MessageSquare, ArrowRight, Clock, Calendar } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Sample blog posts
const blogPosts = [
  {
    id: 1,
    title: "10 Ways to Increase Your E-commerce Conversion Rate",
    excerpt: "Learn proven strategies to boost your online store's conversion rate and drive more sales.",
    category: "Marketing",
    date: "May 15, 2023",
    readTime: "8 min read",
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 2,
    title: "Setting Up International Shipping for Your Online Store",
    excerpt: "A comprehensive guide to expanding your business globally with international shipping options.",
    category: "Shipping",
    date: "April 28, 2023",
    readTime: "12 min read",
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 3,
    title: "How to Create Product Descriptions That Sell",
    excerpt: "Craft compelling product descriptions that engage customers and drive conversions.",
    category: "Product Management",
    date: "April 10, 2023",
    readTime: "6 min read",
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
];

// Sample guides
const guides = [
  {
    id: 1,
    title: "Getting Started with Sokoby",
    description: "Learn the basics of setting up your online store with Sokoby.",
    icon: BookOpen,
    category: "Beginner",
  },
  {
    id: 2,
    title: "Product Management Guide",
    description: "Master the art of managing your product catalog effectively.",
    icon: FileText,
    category: "Intermediate",
  },
  {
    id: 3,
    title: "Marketing Your Online Store",
    description: "Discover strategies to promote your products and attract customers.",
    icon: Video,
    category: "Advanced",
  },
  {
    id: 4,
    title: "Understanding Analytics",
    description: "Learn how to interpret your store's data to make informed decisions.",
    icon: Users,
    category: "Intermediate",
  },
];

// Sample upcoming webinars
const upcomingWebinars = [
  {
    id: 1,
    title: "Mastering Social Media Marketing for E-commerce",
    date: "June 15, 2023",
    time: "2:00 PM EST",
    host: "Jessica Williams, Social Media Expert",
    image: "/placeholder.svg?height=120&width=200",
  },
  {
    id: 2,
    title: "Optimizing Your Product Pages for Conversion",
    date: "June 22, 2023",
    time: "1:00 PM EST",
    host: "David Thompson, Conversion Specialist",
    image: "/placeholder.svg?height=120&width=200",
  },
];

export default function ResourcesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header - Reused from other pages */}
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
            <Link href="/features" className="text-sm font-medium text-gray-700 hover:text-red-800">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-gray-700 hover:text-red-800">
              Pricing
            </Link>
            <Link href="/resources" className="text-sm font-medium text-red-800 hover:text-red-700">
              Resources
            </Link>
            <Link href="/support" className="text-sm font-medium text-gray-700 hover:text-red-800">
              Support
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
      <section className="bg-gradient-to-r from-red-900 to-red-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-3xl font-bold text-white md:text-5xl">
              Resources to help you succeed
            </h1>
            <p className="mb-8 text-lg text-white/90">
              Explore our collection of guides, tutorials, and articles to help you build and grow your online business.
            </p>
            <div className="mx-auto max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input 
                  type="search" 
                  placeholder="Search resources..." 
                  className="pl-10 py-6 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white focus:text-gray-900 focus:placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Navigation */}
      <section className="border-b bg-white py-6">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="blog" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
              <TabsTrigger value="blog">Blog</TabsTrigger>
              <TabsTrigger value="guides">Guides</TabsTrigger>
              <TabsTrigger value="webinars">Webinars</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>
            
            {/* Blog Tab */}
            <TabsContent value="blog" className="py-12">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        width={400}
                        height={200}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <Badge className="mb-2">{post.category}</Badge>
                      <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                        <Link href={`/blog/${post.id}`} className="hover:text-red-800">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Image
                            src={post.author.avatar || "/placeholder.svg"}
                            alt={post.author.name}
                            width={32}
                            height={32}
                            className="h-8 w-8 rounded-full mr-2"
                          />
                          <span className="text-sm text-gray-600">{post.author.name}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="mr-1 h-4 w-4" />
                          {post.readTime}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <Link href="/blog">
                  <Button variant="outline" className="mx-auto">
                    View all blog posts
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>
            
            {/* Guides Tab */}
            <TabsContent value="guides" className="py-12">
              <div className="grid gap-8 md:grid-cols-2">
                {guides.map((guide) => (
                  <Card key={guide.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="mr-4 rounded-full bg-red-100 p-3">
                          <guide.icon className="h-6 w-6 text-red-800" />
                        </div>
                        <div>
                          <Badge className="mb-2">{guide.category}</Badge>
                          <h3 className="text-xl font-semibold mb-2">
                            <Link href={`/guides/${guide.id}`} className="hover:text-red-800">
                              {guide.title}
                            </Link>
                          </h3>
                          <p className="text-gray-600 mb-4">{guide.description}</p>
                          <Link href={`/guides/${guide.id}`} className="text-red-800 hover:text-red-700 font-medium flex items-center">
                            Read guide
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <Link href="/guides">
                  <Button variant="outline" className="mx-auto">
                    View all guides
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>
            
            {/* Webinars Tab */}
            <TabsContent value="webinars" className="py-12">
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Upcoming Webinars</h2>
                <div className="grid gap-8 md:grid-cols-2">
                  {upcomingWebinars.map((webinar) => (
                    <Card key={webinar.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex">
                          <div className="mr-4 flex-shrink-0">
                            <Image
                              src={webinar.image || "/placeholder.svg"}
                              alt={webinar.title}
                              width={120}
                              height={80}
                              className="rounded-md"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              <Link href={`/webinars/${webinar.id}`} className="hover:text-red-800">
                                {webinar.title}
                              </Link>
                            </h3>
                            <div className="flex items-center text-sm text-gray-600 mb-1">
                              <Calendar className="mr-1 h-4 w-4" />
                              {webinar.date}
                            </div>
                            <div className="flex items-center text-sm text-gray-600 mb-3">
                              <Clock className="mr-1 h-4 w-4" />
                              {webinar.time}
                            </div>
                            <p className="text-sm text-gray-600">{webinar.host}</p>
                          </div>
                        </div>
                        <div className="mt-4 text-right">
                          <Button className="bg-red-800 hover:bg-red-700">
                            Register Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6">On-Demand Webinars</h2>
                <div className="grid gap-8 md:grid-cols-3">
                  {[1, 2, 3].map((id) => (
                    <Card key={id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                      <div className="aspect-video overflow-hidden relative">
                        <Image
                          src={`/placeholder.svg?height=200&width=400`}
                          alt={`Webinar ${id}`}
                          width={400}
                          height={200}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <div className="rounded-full bg-white/20 p-3">
                            <Video className="h-8 w-8 text-white" />
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-2">
                          <Link href={`/webinars/on-demand/${id}`} className="hover:text-red-800">
                            {id === 1 ? "Building a Successful Online Store" : 
                             id === 2 ? "Advanced SEO Strategies for E-commerce" : 
                             "Mastering Social Media Marketing"}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {id === 1 ? "Learn the essential steps to create a thriving online store from scratch." : 
                           id === 2 ? "Discover advanced techniques to improve your store's search engine rankings." : 
                           "Effective strategies to promote your products on social media platforms."}
                        </p>
                        <Link href={`/webinars/on-demand/${id}`} className="text-red-800 hover:text-red-700 font-medium flex items-center">
                          Watch now
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <Link href="/webinars">
                  <Button variant="outline" className="mx-auto">
                    View all webinars
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>
            
            {/* Community Tab */}
            <TabsContent value="community" className="py-12">
              <div className="grid gap-12 md:grid-cols-2">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Join Our Community</h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Connect with other Sokoby merchants, share experiences, and get advice from experts in our community forums.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="mr-4 rounded-full bg-red-100 p-3">
                        <MessageSquare className="h-6 w-6 text-red-800" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Discussion Forums</h3>
                        <p className="text-gray-600 mb-4">
                          Ask questions, share insights, and connect with other merchants in our active community forums.
                        </p>
                        <Link href="/community/forums" className="text-red-800 hover:text-red-700 font-medium flex items-center">
                          Browse forums
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-4 rounded-full bg-red-100 p-3">
                        <Users className="h-6 w-6 text-red-800" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Merchant Success Stories</h3>
                        <p className="text-gray-600 mb-4">
                          Get inspired by real-world success stories from merchants who have grown their businesses with Sokoby.
                        </p>
                        <Link href="/community/success-stories" className="text-red-800 hover:text-red-700 font-medium flex items-center">
                          Read success stories
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-4 rounded-full bg-red-100 p-3">
                        <Video className="h-6 w-6 text-red-800" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Live Q&A Sessions</h3>
                        <p className="text-gray-600 mb-4">
                          Join our regular live Q&A sessions with Sokoby experts to get answers to your most pressing questions.
                        </p>
                        <Link href="/community/live-qa" className="text-red-800 hover:text-red-700 font-medium flex items-center">
                          View upcoming sessions
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Popular Discussion Topics</h3>
                    <div className="space-y-4">
                      {[
                        { title: "How to optimize product images for faster loading", replies: 24, views: 342 },
                        { title: "Best practices for abandoned cart recovery emails", replies: 18, views: 276 },
                        { title: "Setting up international shipping rates", replies: 32, views: 415 },
                        { title: "Tips for writing effective product descriptions", replies: 27, views: 389 },
                        { title: "Strategies for holiday season promotions", replies: 41, views: 523 },
                      ].map((topic, index) => (
                        <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                          <Link href={`/community/forums/topic-${index + 1}`} className="font-medium hover:text-red-800">
                            {topic.title}
                          </Link>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <span>{topic.replies} replies</span>
                            <span className="mx-2">•</span>
                            <span>{topic.views} views</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Link href="/community/forums">
                        <Button variant="outline" className="w-full">
                          View all topics
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay updated with the latest resources</h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter to receive new articles, guides, and webinar announcements directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2">
              <Input type="email" placeholder="Enter your email" className="sm:w-72" />
              <Button className="bg-red-800 hover:bg-red-700">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="rounded-xl bg-gradient-to-r from-red-800 to-red-900 p-8 md:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Ready to start selling online?</h2>
              <p className="mb-8 text-white/80">
                Join thousands of successful businesses on our platform and start growing your online presence today.
              </p>
              <div className="flex flex-col space-y-3 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
                <Button size="lg" className="bg-white text-red-900 hover:bg-gray-100">
                  Start your 14-day free trial
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-red-800">
                  Contact sales
                </Button>
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
              <div className="flex space-x-4">
                {["twitter", "facebook", "instagram", "linkedin"].map((social) => (
                  <Link key={social} href={`#${social}`} className="text-gray-400 hover:text-white">
                    <span className="sr-only">{social}</span>
                    <div className="h-6 w-6 rounded-full bg-gray-700 flex items-center justify-center">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </Link>
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
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    About
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
