"use client"

import { AlertCircle, ArrowRight, Building, CheckCircle, Eye, EyeOff, Lock, Mail, Shield, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { authService, LoginDto, MerchantDto } from "@/services/authService"

export default function AuthPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [isLoading, setIsLoading] = useState(false)

  // Form states
  const [loginForm, setLoginForm] = useState<LoginDto>({
    email: "",
    password: "",
  })

  const [signupForm, setSignupForm] = useState<MerchantDto>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  })

  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await authService.login(loginForm)
      if (response.token) {
        // Store token in localStorage or secure cookie
        localStorage.setItem("auth_token", response.token)
        toast.success("Login successful!")
        router.push("/auth/store-setup")
      }
    } catch (error) {
      toast.error("Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle signup form submission
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await authService.signup(signupForm)
      toast.success("Account created successfully!")
      setActiveTab("login")
      setLoginForm({ email: signupForm.email, password: "" })
    } catch (error) {
      toast.error("Failed to create account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Google login
  const handleGoogleLogin = async () => {
    await authService.googleLogin()
  }

  // Handle form input changes
  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    })
  }

  const handleSignupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm({
      ...signupForm,
      [e.target.name]: e.target.value,
    })
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

            <h2 className="text-4xl font-bold leading-tight tracking-tight">
              {activeTab === "login"
                ? "Enterprise-grade e-commerce solutions"
                : "Join the leading e-commerce platform for businesses"}
            </h2>

            <p className="mt-6 text-xl leading-relaxed text-white/90">
              {activeTab === "login"
                ? "Access your business dashboard and manage your online store with our comprehensive suite of tools designed for enterprise growth."
                : "Over 10,000 businesses trust Sokoby to power their online operations with secure, scalable, and customizable solutions."}
            </p>

            <div className="mt-12 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-white/10 p-3">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Enterprise Security</h3>
                  <p className="text-white/80">Bank-level encryption and data protection</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-white/10 p-3">
                  <Building className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Business Analytics</h3>
                  <p className="text-white/80">Comprehensive reporting and insights</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-white/10 p-3">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">99.9% Uptime</h3>
                  <p className="text-white/80">Reliable platform for your business operations</p>
                </div>
              </div>
            </div>

            <div className="mt-16 border-t border-white/20 pt-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-lg">Trusted by industry leaders</p>
                  <div className="mt-2 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 text-yellow-300 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-white/90">4.9/5 business rating</span>
                  </div>
                </div>
                <div className="flex -space-x-3">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-12 w-12 rounded-full border-2 border-white bg-red-700 flex items-center justify-center"
                    >
                      <span className="text-xs font-medium">{String.fromCharCode(65 + i)}</span>
                    </div>
                  ))}
                </div>
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
              {activeTab === "login" ? "Sign in to your business account" : "Create your business account"}
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              {activeTab === "login"
                ? "Access your dashboard and manage your e-commerce operations"
                : "Start your e-commerce journey with our enterprise platform"}
            </p>
          </div>

          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-10 p-1.5">
              <TabsTrigger value="login" className="text-base py-3">
                Business Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="text-base py-3">
                Business Registration
              </TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <div className="rounded-xl border bg-white p-10 shadow-md">
                <form className="space-y-8" onSubmit={handleLogin}>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-base font-medium">
                        Business Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-500" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="name@company.com"
                          className="pl-12 py-7 text-base border-gray-300"
                          value={loginForm.email}
                          onChange={handleLoginInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-base font-medium">
                          Password
                        </Label>
                        <Link
                          href="/auth/forgot-password"
                          className="text-sm font-medium text-red-800 hover:text-red-700"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-500" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-12 py-7 text-base border-gray-300"
                          value={loginForm.password}
                          onChange={handleLoginInputChange}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" className="h-5 w-5 rounded border-gray-300" />
                      <Label htmlFor="remember" className="text-sm font-medium">
                        Keep me signed in
                      </Label>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Shield className="mr-1.5 h-4 w-4" />
                      <span>Secure login</span>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-red-800 hover:bg-red-700 py-7 text-base font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Log in "}
                  </Button>

                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm uppercase">
                      <span className="bg-white px-4 text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <Button 
                      type="button"
                      variant="outline" 
                      className="h-14 border-gray-300 hover:bg-gray-50"
                      onClick={handleGoogleLogin}
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      <span className="sr-only">Google</span>
                    </Button>
                    <Button variant="outline" className="h-14 border-gray-300 hover:bg-gray-50">
                      <svg className="h-5 w-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                      </svg>
                      <span className="sr-only">Facebook</span>
                    </Button>
                    <Button variant="outline" className="h-14 border-gray-300 hover:bg-gray-50">
                      <svg className="h-5 w-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </div>
                </form>
              </div>
            </TabsContent>

            {/* Sign Up Form */}
            <TabsContent value="signup">
              <div className="rounded-xl border bg-white p-10 shadow-md">
                <form className="space-y-8" onSubmit={handleSignup}>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="firstName" className="text-base font-medium">
                          First name
                        </Label>
                        <div className="relative">
                          <User className="absolute left-4 top-4 h-5 w-5 text-gray-500" />
                          <Input 
                            id="firstName" 
                            name="firstName"
                            placeholder="John" 
                            className="pl-12 py-7 text-base border-gray-300"
                            value={signupForm.firstName}
                            onChange={handleSignupInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="lastName" className="text-base font-medium">
                          Last name
                        </Label>
                        <Input 
                          id="lastName" 
                          name="lastName"
                          placeholder="Doe" 
                          className="py-7 text-base border-gray-300"
                          value={signupForm.lastName}
                          onChange={handleSignupInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-base font-medium">
                        Business email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-500" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="name@company.com"
                          className="pl-12 py-7 text-base border-gray-300"
                          value={signupForm.email}
                          onChange={handleSignupInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="password" className="text-base font-medium">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-500" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a secure password"
                          className="pl-12 py-7 text-base border-gray-300"
                          value={signupForm.password}
                          onChange={handleSignupInputChange}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                        </button>
                      </div>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4 border border-gray-200">
                      <Label className="text-base font-medium mb-3 block">Password requirements</Label>
                      <div className="space-y-2">
                        <div className="flex w-full gap-2 mb-3">
                          <div className="h-2 w-1/4 rounded-full bg-green-500"></div>
                          <div className="h-2 w-1/4 rounded-full bg-green-500"></div>
                          <div className="h-2 w-1/4 rounded-full bg-green-500"></div>
                          <div className="h-2 w-1/4 rounded-full bg-gray-200"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center text-sm">
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                            <span>Minimum 8 characters</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                            <span>At least one uppercase</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                            <span>At least one number</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <AlertCircle className="mr-2 h-4 w-4 text-gray-400" />
                            <span>At least one symbol</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox id="terms" className="mt-1 h-5 w-5 rounded border-gray-300" required />
                    <Label htmlFor="terms" className="text-sm">
                      By creating an account, I agree to Sokoby&apos;s{" "}
                      <Link href="/terms" className="font-medium text-red-800 hover:underline">
                        Terms of Service
                      </Link>
                      {", "}
                      <Link href="/privacy" className="font-medium text-red-800 hover:underline">
                        Privacy Policy
                      </Link>{" "}
                      and{" "}
                      <Link href="/dpa" className="font-medium text-red-800 hover:underline">
                        Data Processing Agreement
                      </Link>
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-red-800 hover:bg-red-700 py-7 text-base font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Business Account"}
                  </Button>

                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm uppercase">
                      <span className="bg-white px-4 text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <Button variant="outline" className="h-14 border-gray-300 hover:bg-gray-50">
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      <span className="sr-only">Google</span>
                    </Button>
                    <Button variant="outline" className="h-14 border-gray-300 hover:bg-gray-50">
                      <svg className="h-5 w-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                      </svg>
                      <span className="sr-only">Facebook</span>
                    </Button>
                    <Button variant="outline" className="h-14 border-gray-300 hover:bg-gray-50">
                      <svg className="h-5 w-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </div>
                </form>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm text-gray-600 mb-4 sm:mb-0">
              {activeTab === "login" ? "New to Sokoby?" : "Already have an account?"}{" "}
              <button
                onClick={() => setActiveTab(activeTab === "login" ? "signup" : "login")}
                className="font-medium text-red-800 hover:text-red-700 hover:underline"
              >
                {activeTab === "login" ? "Create a business account" : "Sign in"}
              </button>
            </p>

            <Link href="/" className="inline-flex items-center text-sm font-medium text-red-800 hover:text-red-700">
              <ArrowRight className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

