"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, ArrowRight } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [inquiryType, setInquiryType] = useState("general")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would handle form submission here
    setFormSubmitted(true)
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
            <Link href="/contact" className="text-sm font-medium text-red-800 hover:text-red-700">
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
      <section className="bg-red-900 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Get in Touch</h1>
            <p className="mb-8 text-xl text-white/90">
              Have questions about our platform? Need help with your store? Our team is here to help you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <Phone className="h-6 w-6 text-red-800" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">Call Us</h3>
              <p className="mb-4 text-gray-600">Speak directly with our support team</p>
              <p className="text-lg font-medium text-red-800">+1 (800) 123-4567</p>
              <p className="mt-2 text-sm text-gray-500">Monday-Friday, 9am-5pm EST</p>
            </div>
            
            <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <Mail className="h-6 w-6 text-red-800" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">Email Us</h3>
              <p className="mb-4 text-gray-600">Get a response within 24 hours</p>
              <p className="text-lg font-medium text-red-800">support@sokoby.com</p>
              <p className="mt-2 text-sm text-gray-500">For general inquiries and support</p>
            </div>
            
            <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <MessageSquare className="h-6 w-6 text-red-800" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">Live Chat</h3>
              <p className="mb-4 text-gray-600">Chat with our support team in real-time</p>
              <Button className="bg-red-800 hover:bg-red-700">
                Start Chat
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="mt-2 text-sm text-gray-500">Available 24/7 for urgent issues</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Office Locations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Send Us a Message</h2>
              
              {formSubmitted ? (
                <div className="rounded-lg border border-green-200 bg-green-50 p-6">
                  <h3 className="mb-2 text-lg font-semibold text-green-800">Thank You!</h3>
                  <p className="text-green-700">
                    Your message has been sent successfully. We&apos;ll get back to you as soon as possible.
                  </p>
                  <Button 
                    className="mt-4 bg-green-600 hover:bg-green-700"
                    onClick={() => setFormSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input id="phone" type="tel" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>What can we help you with?</Label>
                    <RadioGroup 
                      value={inquiryType} 
                      onValueChange={setInquiryType}
                      className="grid gap-2 md:grid-cols-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="general" id="general" />
                        <Label htmlFor="general">General Inquiry</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sales" id="sales" />
                        <Label htmlFor="sales">Sales Question</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="support" id="support" />
                        <Label htmlFor="support">Technical Support</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="billing" id="billing" />
                        <Label htmlFor="billing">Billing Issue</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {inquiryType === "support" && (
                    <div className="space-y-2">
                      <Label htmlFor="store-url">Your Store URL (if applicable)</Label>
                      <Input id="store-url" type="url" placeholder="https://your-store.sokoby.com" />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" rows={5} required />
                  </div>
                  
                  <Button type="submit" className="w-full bg-red-800 hover:bg-red-700">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>
            
            {/* Office Locations */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Our Offices</h2>
              
              <Tabs defaultValue="headquarters">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="headquarters">Headquarters</TabsTrigger>
                  <TabsTrigger value="europe">Europe</TabsTrigger>
                  <TabsTrigger value="asia">Asia-Pacific</TabsTrigger>
                </TabsList>
                
                <TabsContent value="headquarters" className="mt-6">
                  <div className="rounded-lg overflow-hidden">
                    <div className="relative h-64 w-full">
                      <Image
                        src="https://images.unsplash.com/photo-1669093374970-368f9a1af2cc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Headquarters Office"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="bg-white p-6 border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">New York Headquarters</h3>
                      <div className="mt-4 space-y-3">
                        <div className="flex items-start">
                          <MapPin className="mr-3 h-5 w-5 text-red-800 flex-shrink-0" />
                          <div>
                            <p className="text-gray-900">123 Commerce Street</p>
                            <p className="text-gray-600">New York, NY 10001</p>
                            <p className="text-gray-600">United States</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Phone className="mr-3 h-5 w-5 text-red-800 flex-shrink-0" />
                          <div>
                            <p className="text-gray-900">+1 (800) 123-4567</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Clock className="mr-3 h-5 w-5 text-red-800 flex-shrink-0" />
                          <div>
                            <p className="text-gray-900">Monday-Friday: 9am-6pm EST</p>
                            <p className="text-gray-600">Saturday-Sunday: Closed</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="europe" className="mt-6">
                  <div className="rounded-lg overflow-hidden">
                    <div className="relative h-64 w-full">
                      <Image
                        src="https://images.unsplash.com/photo-1590744164217-7496fb94b700?q=80&w=2040&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Europe Office"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="bg-white p-6 border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">London Office</h3>
                      <div className="mt-4 space-y-3">
                        <div className="flex items-start">
                          <MapPin className="mr-3 h-5 w-5 text-red-800 flex-shrink-0" />
                          <div>
                            <p className="text-gray-900">45 Tech Square</p>
                            <p className="text-gray-600">London, EC2A 4BX</p>
                            <p className="text-gray-600">United Kingdom</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Phone className="mr-3 h-5 w-5 text-red-800 flex-shrink-0" />
                          <div>
                            <p className="text-gray-900">+44 20 1234 5678</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Clock className="mr-3 h-5 w-5 text-red-800 flex-shrink-0" />
                          <div>
                            <p className="text-gray-900">Monday-Friday: 9am-6pm GMT</p>
                            <p className="text-gray-600">Saturday-Sunday: Closed</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="asia" className="mt-6">
                  <div className="rounded-lg overflow-hidden">
                    <div className="relative h-64 w-full">
                      <Image
                        src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Asia-Pacific Office"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="bg-white p-6 border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Singapore Office</h3>
                      <div className="mt-4 space-y-3">
                        <div className="flex items-start">
                          <MapPin className="mr-3 h-5 w-5 text-red-800 flex-shrink-0" />
                          <div>
                            <p className="text-gray-900">78 Digital Avenue</p>
                            <p className="text-gray-600">Singapore, 018956</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Phone className="mr-3 h-5 w-5 text-red-800 flex-shrink-0" />
                          <div>
                            <p className="text-gray-900">+65 6123 4567</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Clock className="mr-3 h-5 w-5 text-red-800 flex-shrink-0" />
                          <div>
                            <p className="text-gray-900">Monday-Friday: 9am-6pm SGT</p>
                            <p className="text-gray-600">Saturday-Sunday: Closed</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-2xl font-bold text-center text-gray-900">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  question: "How quickly can I expect a response?",
                  answer: "For general inquiries, we aim to respond within 24 hours. For urgent technical issues, our support team is available 24/7 via live chat."
                },
                {
                  question: "Do you offer phone support?",
                  answer: "Yes, our phone support is available Monday through Friday, 9am to 5pm EST. For issues outside these hours, please use our live chat or email support."
                },
                {
                  question: "I'm having trouble with my store. How can I get help?",
                  answer: "For technical support, please include your store URL and a detailed description of the issue when contacting us. This helps our team provide faster and more accurate assistance."
                },
                {
                  question: "How do I report a bug?",
                  answer: "You can report bugs through our contact form by selecting 'Technical Support' as the inquiry type. Please include steps to reproduce the issue, screenshots if possible, and your store URL."
                },
              ].map((faq, index) => (
                <div key={index} className="rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-900 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">Ready to start your e-commerce journey?</h2>
            <p className="mb-8 text-xl text-white/90">
              Join thousands of merchants who trust Sokoby to power their online businesses.
            </p>
            <Link href="/auth/create-store">
            <Button size="lg" className="bg-white text-red-900 hover:bg-gray-100">
              Start your free trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            </Link>
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
