"use client"

import { ArrowLeft, Calendar, ChevronRight, Globe, PlayCircle, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export default function OurStoryPage() {
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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
          <Link href="/about" className="flex items-center text-sm font-medium text-gray-600 hover:text-red-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to About
          </Link>
        </div>
      </header>

      {/* Hero Video Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gray-900/60">
          <Image
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Team working"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative flex h-full items-center justify-center">
          <div className="text-center text-white">
            <h1 className="mb-6 text-5xl font-bold">Our Journey to Transform E-commerce</h1>
            <p className="mb-8 text-xl">Watch how Sokoby is changing the way the world does business</p>
            <button
              onClick={() => setVideoOpen(true)}
              className="inline-flex items-center rounded-full bg-white px-6 py-3 text-gray-900 transition hover:bg-gray-100"
            >
              <PlayCircle className="mr-2 h-6 w-6" />
              Play Video
            </button>
          </div>
        </div>
      </section>

      {/* Founder's Message */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div className="relative h-[500px] overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a"
                  alt="Founder"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="mb-6 text-4xl font-bold">A Message from Our Founder</h2>
                <p className="mb-6 text-lg text-gray-600">
                  &quot;When we started Sokoby in 2024, we had a simple but ambitious vision: to make e-commerce accessible to everyone. 
                  We saw too many entrepreneurs struggling with complex, expensive platforms that were holding them back instead of helping them grow.&quot;
                </p>
                <p className="mb-6 text-lg text-gray-600">
                  &quot;Today, that vision has grown into a global platform that powers millions of businesses. But we&apos;re just getting started. 
                  Our commitment to democratizing e-commerce is stronger than ever.&quot;
                </p>
                <p className="text-lg font-semibold">- Alex Chen, Founder & CEO</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 px-130 text-4xl font-bold">Our Journey</h2>
          <div className="mx-auto max-w-2xl">
            <div className="space-y-12">
              <div className="relative flex items-start">
                <div className="mr-4 mt-1 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <Calendar className="h-6 w-6 text-red-800" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">2024 - The Beginning</h3>
                  <p className="mt-2 text-gray-600">Sokoby launches with a mission to democratize e-commerce</p>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="mr-4 mt-1 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <Users className="h-6 w-6 text-red-800" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">2024 Q2 - First 1,000 Merchants</h3>
                  <p className="mt-2 text-gray-600">Reached our first milestone of 1,000 active merchants</p>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="mr-4 mt-1 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <Globe className="h-6 w-6 text-red-800" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">2024 Q3 - Global Expansion</h3>
                  <p className="mt-2 text-gray-600">Expanded to serve merchants in over 50 countries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl rounded-2xl bg-gray-900 p-12 text-center text-white">
            <h2 className="mb-6 text-4xl font-bold">Be Part of Our Story</h2>
            <p className="mb-8 text-xl">
              Join thousands of entrepreneurs who are writing their success stories with Sokoby
            </p>
            <Link href="/auth/create-store">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                Start your story
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Video Dialog */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="sm:max-w-[900px]">
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/your-video-id"
              title="Sokoby Story"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 