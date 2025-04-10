"use client";

import {
  ArrowRight,
  Building2,
  Globe,
  Heart,
  ShoppingBag,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold text-gray-900">
              Empowering the future of Ecommerce
            </h1>
            <p className="mb-8 text-xl text-gray-600">
              At Sokoby, we&apos;re building the future of digital Ecommerce.
              Our mission is to provide entrepreneurs with the tools and
              platform they need to succeed in the ever-evolving digital
              marketplace.
            </p>
            <div className="flex justify-center space-x-5">
              <Link href="/auth/store-setup" passHref>
                <Button size="lg" className="bg-red-800 hover:bg-red-700">
                  Start your journey
                </Button>
              </Link>
              <Link href="/about/our-story" passHref>
                <Button
                  size="lg"
                  variant="outline"
                  className="hover:bg-red-200"
                >
                  Watch our story
              </Button>
              </Link>
            </div>
                  </div>
                  </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
                  <div>
                <h2 className="mb-6 text-4xl font-bold text-gray-900">
                  Our Story
                </h2>
                <p className="mb-6 text-lg text-gray-600">
                  Founded in 2024, Sokoby emerged from a simple yet powerful
                  vision: to democratize Ecommerce and make it accessible to
                  everyone. We recognized that traditional Ecommerce platforms
                  were often complex and costly, creating barriers for aspiring
                  entrepreneurs.
                </p>
                <p className="text-lg text-gray-600">
                  Today, we&apos;re proud to serve merchants across 175
                  countries, helping them turn their dreams into thriving online
                  businesses. Our platform combines powerful features with
                  intuitive design, making it easier than ever to start, run,
                  and grow an online store.
                </p>
                  </div>
              <div className="relative h-96 overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1632910121591-29e2484c0259?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Team collaboration"
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
                  </div>
                  </div>
                  </div>
                </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <ShoppingBag className="h-8 w-8 text-red-800" />
              </div>
              <h3 className="mb-2 text-4xl font-bold text-gray-900">1M+</h3>
              <p className="text-gray-600">Active stores</p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <Globe className="h-8 w-8 text-red-800" />
              </div>
              <h3 className="mb-2 text-4xl font-bold text-gray-900">175</h3>
              <p className="text-gray-600">Countries served</p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <Users className="h-8 w-8 text-red-800" />
              </div>
              <h3 className="mb-2 text-4xl font-bold text-gray-900">2M+</h3>
              <p className="text-gray-600">Entrepreneurs supported</p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <Star className="h-8 w-8 text-red-800" />
              </div>
              <h3 className="mb-2 text-4xl font-bold text-gray-900">$50B+</h3>
              <p className="text-gray-600">Annual GMV</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900">
              Our Core Values
            </h2>
            <p className="mb-12 text-xl text-gray-600">
              These principles guide everything we do at Sokoby
            </p>
          </div>
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="p-8 transition-all duration-200 hover:shadow-lg">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <Heart className="h-6 w-6 text-red-800" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  Merchant First
                </h3>
                <p className="text-gray-600">
                  Every decision we make starts with our merchants. Their
                  success is our success, and we&apos;re committed to providing
                  the tools and support they need to thrive.
                </p>
              </Card>
              <Card className="p-8 transition-all duration-200 hover:shadow-lg">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <Building2 className="h-6 w-6 text-red-800" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  Build for Scale
                </h3>
                <p className="text-gray-600">
                  We create solutions that grow with our merchants, from their
                  first sale to their millionth customer. Our platform is built
                  to scale seamlessly.
                </p>
              </Card>
              <Card className="p-8 transition-all duration-200 hover:shadow-lg">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <Globe className="h-6 w-6 text-red-800" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  Global Impact
                </h3>
                <p className="text-gray-600">
                  We believe Ecommerce should have no boundaries. Our platform
                  empowers entrepreneurs worldwide to reach customers anywhere.
                </p>
              </Card>
      </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-900 py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
                <div>
                <h2 className="mb-6 text-4xl font-bold">Our Mission</h2>
                <p className="mb-8 text-lg text-gray-300">
                  We&apos;re on a mission to make Ecommerce better for everyone.
                  This means:
                </p>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="mr-4 rounded-full bg-red-800 p-2">
                      <ShoppingBag className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">
                        Democratizing Ecommerce
                      </h3>
                      <p className="text-gray-300">
                        Making it possible for anyone to start and grow a
                        business
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 rounded-full bg-red-800 p-2">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">
                        Supporting Entrepreneurs
                      </h3>
                      <p className="text-gray-300">
                        Providing the tools and knowledge needed for success
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 rounded-full bg-red-800 p-2">
                      <Globe className="h-6 w-6" />
                </div>
                <div>
                      <h3 className="text-xl font-bold">Driving Innovation</h3>
                      <p className="text-gray-300">
                        Constantly evolving to meet the future of Ecommerce
                      </p>
                    </div>
                  </li>
                </ul>
                      </div>
              <div className="relative h-96">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                  alt="Team collaboration"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
                                </div>
                              </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900">
              Join the future of Ecommerce
            </h2>
            <p className="mb-8 text-xl text-gray-600">
              Start your journey with Sokoby today and be part of the next
              generation of successful online businesses.
            </p>
            <Link href="/auth/store-setup">
              <Button size="lg" className="bg-red-800 hover:bg-red-700">
                Start free trial
                <ArrowRight className="ml-2 h-5 w-5" />
                                  </Button>
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              No credit card required
            </p>
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
                The complete e-Ecommerce platform that helps you sell online, on
                social media, or in person.
              </p>
                          </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-white"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-gray-400 hover:text-white"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/press"
                    className="text-gray-400 hover:text-white"
                  >
                    Press
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-400 hover:text-white"
                  >
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
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Sokoby. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
