"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, ShieldCheck, User, Edit, KeyRound, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"


interface MerchantProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  createdAt: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<MerchantProfile | null>(null)
  const router = useRouter()

  useEffect(() => {
    const profileData = localStorage.getItem("merchantProfile")

    if (!profileData) {
      toast.error("No profile data found. Please log in again.")
      router.push("/auth")
      return
    }

    try {
      const parsedProfile = JSON.parse(profileData) as MerchantProfile
      setProfile(parsedProfile)
    } catch (error) {
      console.error("Failed to parse profile data:", error)
      toast.error("Invalid profile data. Please log in again.")
      router.push("/auth")
    }
  }, [router])

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-red-800 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center">
            <Image src="/sokobylogo.png" alt="Sokoby" width={150} height={50} className="h-11 w-auto" />
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
        </div>
      </header>

      <div className="flex-1 bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
            <p className="text-gray-600 mt-1">Manage your profile and account preferences</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <Card className="border-0 shadow-sm sticky top-24">
                <CardContent className="p-0">
                  <div className="p-6 flex items-center">
                    <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <span className="text-lg font-bold text-red-800">
                        {getInitials(profile.firstName, profile.lastName)}
                      </span>
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-900">
                        {profile.firstName} {profile.lastName}
                      </h2>
                      <p className="text-sm text-gray-500">{profile.email}</p>
                    </div>
                  </div>

                  <Separator />

                  <nav className="p-2">
                    <Link href="/profile" className="flex items-center p-3 rounded-md bg-red-50 text-red-800">
                      <User className="h-5 w-5 mr-3" />
                      <span className="font-medium">My Profile</span>
                    </Link>
                    {/* <Link href="/orders" className="flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-100">
                      <ShoppingBag className="h-5 w-5 mr-3" />
                      <span>Orders</span>
                    </Link>
                    <Link href="/payments" className="flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-100">
                      <CreditCard className="h-5 w-5 mr-3" />
                      <span>Payment Methods</span>
                    </Link>
                    <Link href="/security" className="flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-100">
                      <Shield className="h-5 w-5 mr-3" />
                      <span>Security</span>
                    </Link> */}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2">
              <Card className="border-0 shadow-sm mb-6">
                <CardHeader className="border-b bg-white px-6 py-4">
                  <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <div className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-4 py-2">
                        <span>{profile.firstName}</span>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4 text-gray-500" />
                          <span className="sr-only">Edit first name</span>
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <div className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-4 py-2">
                        <span>{profile.lastName}</span>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4 text-gray-500" />
                          <span className="sr-only">Edit last name</span>
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <div className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-4 py-2">
                        <span>{profile.email}</span>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4 text-gray-500" />
                          <span className="sr-only">Edit email</span>
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <div className="rounded-md border border-gray-200 bg-gray-50 px-4 py-2">
                        <span>{profile.role}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm mb-6">
                <CardHeader className="border-b bg-white px-6 py-4">
                  <h3 className="text-xl font-semibold text-gray-900">Account Security</h3>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <button className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                          <KeyRound className="h-5 w-5 text-red-800" />
                        </div>
                        <div className="text-left">
                          <h4 className="font-medium text-gray-900">Change Password</h4>
                          <p className="text-sm text-gray-500">Update your password for better security</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>

                    <button className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                          <ShieldCheck className="h-5 w-5 text-red-800" />
                        </div>
                        <div className="text-left">
                          <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader className="border-b bg-white px-6 py-4">
                  <h3 className="text-xl font-semibold text-gray-900">Account Information</h3>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center p-4 rounded-lg bg-gray-50 mb-6">
                    <Calendar className="h-5 w-5 text-red-800 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Member since</p>
                      <p className="font-medium">{formatDate(profile.createdAt)}</p>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button variant="outline">Download My Data</Button>
                    <Button className="bg-red-800 hover:bg-red-700">Update Profile</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} Sokoby. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="#" className="text-sm text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}



