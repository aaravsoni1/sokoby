import { ArrowRight, BookOpen, ChevronRight, FileText, HelpCircle, Mail, MessageSquare, Phone, Search, Users, Video } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample FAQ categories
const faqCategories = [
  {
    id: "getting-started",
    name: "Getting Started",
    icon: BookOpen,
    questions: [
      {
        id: "gs-1",
        question: "How do I create a Sokoby account?",
        answer: "To create a Sokoby account, click the 'Get Started' button on our homepage and follow the registration process. You'll need to provide your email address, create a password, and enter some basic information about your business."
      },
      {
        id: "gs-2",
        question: "What do I need to set up my online store?",
        answer: "To set up your online store, you'll need: a Sokoby account, products to sell (with images and descriptions), a payment method to receive funds, and shipping options if you're selling physical products. Our setup wizard will guide you through the entire process."
      },
      {
        id: "gs-3",
        question: "How long does it take to set up a store?",
        answer: "Most merchants can set up a basic store in a few hours. However, the time can vary depending on how many products you have and how much customization you want to do. With our user-friendly interface, you can have a professional-looking store ready to accept orders quickly."
      },
    ]
  },
  {
    id: "payments",
    name: "Payments",
    icon: FileText,
    questions: [
      {
        id: "pay-1",
        question: "What payment methods can I accept?",
        answer: "With Sokoby, you can accept all major credit cards, mobile wallets like Apple Pay and Google Pay, and PayPal. You can also integrate with additional payment gateways depending on your location and business needs."
      },
      {
        id: "pay-2",
        question: "How do I set up Sokoby Payments?",
        answer: "To set up Sokoby Payments, go to your store admin, navigate to Settings > Payments, and click 'Activate Sokoby Payments'. You'll need to provide some business information and banking details to receive your funds."
      },
      {
        id: "pay-3",
        question: "When will I receive my money from sales?",
        answer: "With Sokoby Payments, funds are typically deposited into your bank account within 2-3 business days after a sale. The exact timing can vary depending on your bank and location."
      },
    ]
  },
  {
    id: "shipping",
    name: "Shipping",
    icon: Video,
    questions: [
      {
        id: "ship-1",
        question: "How do I set up shipping rates?",
        answer: "To set up shipping rates, go to your store admin, navigate to Settings > Shipping and Delivery, and click 'Manage Rates'. You can create shipping zones and set rates based on weight, price, or offer flat-rate shipping."
      },
      {
        id: "ship-2",
        question: "Can I print shipping labels directly from Sokoby?",
        answer: "Yes, you can print shipping labels directly from your Sokoby admin. When you're processing an order, click on 'Create Shipping Label' to generate and print labels for major carriers like USPS, FedEx, and UPS."
      },
      {
        id: "ship-3",
        question: "How do I offer free shipping?",
        answer: "To offer free shipping, go to Settings > Shipping and Delivery, select the shipping zone you want to modify, and create a free shipping rate. You can set conditions, such as minimum order amounts, to qualify for free shipping."
      },
    ]
  },
  {
    id: "products",
    name: "Products",
    icon: Users,
    questions: [
      {
        id: "prod-1",
        question: "How do I add products to my store?",
        answer: "To add products, go to your store admin and click on 'Products' > 'Add Product'. Fill in the product details including title, description, images, pricing, and inventory information. You can also organize products into collections for easier navigation."
      },
      {
        id: "prod-2",
        question: "How do I create product variants?",
        answer: "When adding or editing a product, scroll to the 'Variants' section and click 'Add Options' to create variants like size, color, or material. Sokoby will automatically generate all possible combinations, which you can then manage individually."
      },
      {
        id: "prod-3",
        question: "Can I sell digital products?",
        answer: "Yes, Sokoby supports selling digital products like e-books, music, software, or digital art. When adding a product, select 'Digital Product' as the product type and upload the files your customers will receive after purchase."
      },
    ]
  },
];

export default function SupportPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header - Reused from other pages */}
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
            <Link href="/features" className="text-sm font-medium text-gray-700 hover:text-red-800">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-gray-700 hover:text-red-800">
              Pricing
            </Link>
            <Link href="/resources" className="text-sm font-medium text-gray-700 hover:text-red-800">
              Resources
            </Link>
            <Link href="/support" className="text-sm font-medium text-red-800 hover:text-red-700">
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
              How can we help you?
            </h1>
            <p className="mb-8 text-lg text-white/90">
              Find answers to your questions or contact our support team for assistance.
            </p>
            <div className="mx-auto max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input 
                  type="search" 
                  placeholder="Search for help..." 
                  className="pl-10 py-6 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white focus:text-gray-900 focus:placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 rounded-full bg-red-100 p-3 w-12 h-12 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-red-800" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">
                  Chat with our support team for immediate assistance with your questions.
                </p>
                <Button className="w-full bg-red-800 hover:bg-red-700">
                  Start Chat
                </Button>
                <p className="mt-2 text-sm text-gray-500 text-center">
                  Available 24/7
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 rounded-full bg-red-100 p-3 w-12 h-12 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-red-800" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
                <p className="text-gray-600 mb-4">
                  Speak directly with a support representative over the phone.
                </p>
                <Button className="w-full bg-red-800 hover:bg-red-700">
                  Call Us
                </Button>
                <p className="mt-2 text-sm text-gray-500 text-center">
                  Mon-Fri, 9am-5pm EST
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 rounded-full bg-red-100 p-3 w-12 h-12 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-red-800" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Support</h3>
                <p className="text-gray-600 mb-4">
                  Send us an email and we&apos;ll get back to you as soon as possible.
                </p>
                <Button className="w-full bg-red-800 hover:bg-red-700">
                  Email Us
                </Button>
                <p className="mt-2 text-sm text-gray-500 text-center">
                  Response within 24 hours
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Find quick answers to common questions about using Sokoby.
            </p>
          </div>
          
          <Tabs defaultValue="getting-started" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 mb-8">
              {faqCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center">
                  <category.icon className="mr-2 h-4 w-4" />
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {faqCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="mx-auto max-w-3xl">
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent>
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="mt-12 text-center">
            <Link href="/help-center">
              <Button variant="outline" className="mx-auto">
                View all FAQs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Help Center Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Help Center Resources</h2>
            <p className="text-lg text-gray-600">
              Explore our comprehensive guides and tutorials to learn more about using Sokoby.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 rounded-full bg-red-100 p-3 w-12 h-12 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-red-800" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Getting Started Guides</h3>
                <p className="text-gray-600 mb-4">
                  Step-by-step guides to help you set up your store and start selling.
                </p>
                <Link href="/help-center/getting-started" className="text-red-800 hover:text-red-700 font-medium flex items-center">
                  View guides
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 rounded-full bg-red-100 p-3 w-12 h-12 flex items-center justify-center">
                  <Video className="h-6 w-6 text-red-800" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Video Tutorials</h3>
                <p className="text-gray-600 mb-4">
                  Watch video tutorials on how to use various features of Sokoby.
                </p>
                <Link href="/help-center/tutorials" className="text-red-800 hover:text-red-700 font-medium flex items-center">
                  Watch tutorials
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 rounded-full bg-red-100 p-3 w-12 h-12 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-red-800" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Documentation</h3>
                <p className="text-gray-600 mb-4">
                  Detailed documentation on all Sokoby features and functionality.
                </p>
                <Link href="/help-center/documentation" className="text-red-800 hover:text-red-700 font-medium flex items-center">
                  Read documentation
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 rounded-full bg-red-100 p-3 w-12 h-12 flex items-center justify-center">
                  <Users className="h-6 w-6 text-red-800" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Forums</h3>
                <p className="text-gray-600 mb-4">
                  Connect with other Sokoby merchants to share tips and get advice.
                </p>
                <Link href="/community/forums" className="text-red-800 hover:text-red-700 font-medium flex items-center">
                  Join community
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 rounded-full bg-red-100 p-3 w-12 h-12 flex items-center justify-center">
                  <HelpCircle className="h-6 w-6 text-red-800" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Troubleshooting</h3>
                <p className="text-gray-600 mb-4">
                  Solutions to common issues you might encounter while using Sokoby.
                </p>
                <Link href="/help-center/troubleshooting" className="text-red-800 hover:text-red-700 font-medium flex items-center">
                  View solutions
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 rounded-full bg-red-100 p-3 w-12 h-12 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-red-800" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Contact Support</h3>
                <p className="text-gray-600 mb-4">
                  Can&apos;t find what you&apos;re looking for? Contact our support team for help.
                </p>
                <Link href="/support/contact" className="text-red-800 hover:text-red-700 font-medium flex items-center">
                  Contact us
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="rounded-xl bg-gradient-to-r from-red-800 to-red-900 p-8 md:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Still need help?</h2>
              <p className="mb-8 text-white/80">
                Our support team is available 24/7 to assist you with any questions or issues you may have.
              </p>
              <div className="flex flex-col space-y-3 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
                <Button size="lg" className="bg-white text-red-900 hover:bg-gray-100">
                  Contact Support
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-red-800">
                  View Help Center
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
