"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Mail, CheckCircle, Shield, AlertTriangle, HelpCircle, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Column - Business Context */}
      <div className="hidden w-5/12 bg-gradient-to-br from-red-900 to-red-800 lg:block">
        <div className="relative flex h-full w-full items-center justify-center">
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl p-16 text-white">
          <Image
              src="/sokobylogo.png" 
              alt="Sokoby"
              width={150} 
              height={50} 
              className="h-11 w-auto"
            />

            <h2 className="text-4xl font-bold leading-tight tracking-tight">Account Recovery</h2>

            <p className="mt-6 text-xl leading-relaxed text-white/90">
              We understand the importance of uninterrupted access to your business operations. Our secure recovery
              process helps you regain access quickly.
            </p>

            <div className="mt-12 rounded-lg bg-white/10 p-8 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4">Security Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Shield className="mr-3 h-5 w-5 text-green-300 shrink-0 mt-0.5" />
                  <p>We&apos;ll never ask for your password in emails or phone calls</p>
                </div>
                <div className="flex items-start">
                  <Info className="mr-3 h-5 w-5 text-green-300 shrink-0 mt-0.5" />
                  <p>Recovery links expire after 30 minutes for security</p>
                </div>
                <div className="flex items-start">
                  <AlertTriangle className="mr-3 h-5 w-5 text-yellow-300 shrink-0 mt-0.5" />
                  <p>If you didn&apos;t request this password reset, please contact our security team immediately</p>
                </div>
              </div>
            </div>

            <div className="mt-12 border-t border-white/20 pt-8">
              <div className="flex items-center">
                <HelpCircle className="mr-3 h-5 w-5 text-white" />
                <p>
                  Need additional help? Contact our business support team at{" "}
                  <span className="font-medium">support@sokoby.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="flex w-full items-center justify-center p-8 lg:w-7/12 xl:p-16">
        <div className="w-full max-w-2xl">
          <div className="mb-10 text-center lg:hidden">
            <Link href="/">
            <Image
              src="/sokobylogo.png" 
              alt="Sokoby"
              width={150} 
              height={50} 
              className="h-11 w-auto"
            />
            </Link>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl">
              {isSubmitted ? "Check your email" : "Reset your password"}
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              {isSubmitted
                ? "We've sent you instructions to reset your password"
                : "Enter your business email and we'll send you instructions to reset your password"}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-10 shadow-md">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center space-y-8 py-10">
                <div className="rounded-full bg-green-100 p-5">
                  <CheckCircle className="h-14 w-14 text-green-600" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-medium mb-3">Recovery email sent</h3>
                  <p className="text-gray-600 max-w-md text-lg">
                    We&apos;ve sent a password reset link to your business email address. Please check your inbox and follow
                    the instructions.
                  </p>
                </div>
                <div className="w-full max-w-md rounded-lg bg-blue-50 border border-blue-200 p-4 mt-4">
                  <div className="flex">
                    <Info className="h-5 w-5 text-blue-500 mr-3 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-800">
                        The recovery link will expire in 30 minutes for security reasons. If you don&apos;t see the email,
                        please check your spam folder.
                      </p>
                    </div>
                  </div>
                </div>
                <Button onClick={() => setIsSubmitted(false)} variant="outline" className="mt-4 h-12 text-base">
                  Try with a different email
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-base font-medium">
                      Business email address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-500" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@company.com"
                        className="pl-12 py-7 text-base border-gray-300"
                        required
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      We&apos;ll send a secure password reset link to this email address
                    </p>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-4 border border-gray-200">
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-gray-500 mr-3 shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600">
                      For security reasons, we&apos;ll verify that you have access to this email address before allowing you
                      to reset your password.
                    </p>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-red-800 hover:bg-red-700 py-7 text-base font-medium">
                  Send Recovery Link
                </Button>
              </form>
            )}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/auth"
              className="inline-flex items-center text-base font-medium text-red-800 hover:text-red-700"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

