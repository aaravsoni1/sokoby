"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2, Edit, Plus, Store, Globe, Calendar, Briefcase, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Separator } from "@/components/ui/separator"

interface StoreType {
  id: string
  name: string
  domain: string
  description: string
  createdAt: string
  imageUrl: string
  productType: string
  businessType: string
  revenue: string
  industry: string
}

export default function StoresPage() {
  const [stores, setStores] = useState<StoreType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const merchantId = localStorage.getItem("merchantId")
        const authToken = localStorage.getItem("auth_token")

        // Log merchantId for verification
        console.log("Merchant ID from localStorage:", merchantId)

        if (!merchantId) {
          toast.error("Merchant ID not found. Please log in again.")
          router.push("/auth")
          return
        }

        if (!authToken) {
          toast.error("Authentication token not found. Please log in again.")
          router.push("/auth")
          return
        }

        const response = await fetch(`http://localhost:8080/api/store/merchant/${merchantId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          if (response.status === 401) {
            toast.error("Unauthorized. Please log in again.")
            localStorage.removeItem("auth_token")
            localStorage.removeItem("merchantId")
            router.push("/auth")
            return
          }
          throw new Error("Failed to fetch stores")
        }

        const storesData = await response.json()

        // Log the raw response data for debugging
        console.log("Raw stores data:", storesData)

        // Validate the response
        if (!storesData) {
          console.warn("No stores data received")
          setStores([])
          setIsLoading(false)
          return
        }

        // Handle both array and single object cases
        const validStores = Array.isArray(storesData)
          ? storesData
          : storesData.stores || storesData.data
            ? Array.isArray(storesData.stores)
              ? storesData.stores
              : [storesData.stores]
            : storesData.id
              ? [storesData]
              : []

        // Additional logging for debugging
        console.log("Processed stores:", validStores)
        console.log("Number of stores:", validStores.length)

        setStores(validStores)
        setIsLoading(false)
      } catch (error) {
        console.error("Stores fetch failed:", error)
        toast.error("Failed to load stores. Please try again.")
        setStores([])
        setIsLoading(false)
      }
    }

    fetchStores()
  }, [router])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (isLoading) {
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

        <div className="flex items-center justify-center flex-1">
          <div className="w-8 h-8 border-4 border-red-800 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
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

      <div className="bg-gray-50 flex-1">
        {/* Page Header */}
        <div className="bg-red-900 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center">
                  <Store className="mr-3 h-8 w-8" />
                  My Stores
                </h1>
                <p className="text-white/80 mt-2">Manage and monitor all your e-commerce stores in one place</p>
              </div>
              <Link href="/auth/store-setup">
                <Button className="bg-white text-red-900 hover:bg-gray-100">
                  <Plus className="mr-2 h-4 w-4" /> Create New Store
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        {/* <div className="container mx-auto px-4 -mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-0 shadow-sm"> */}
              {/* <CardContent className="p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <ShoppingBag className="h-6 w-6 text-red-800" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Stores</p>
                  <p className="text-2xl font-bold text-gray-900">{stores.length}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <Globe className="h-6 w-6 text-red-800" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Domains</p>
                  <p className="text-2xl font-bold text-gray-900">{stores.length}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <Tag className="h-6 w-6 text-red-800" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Products</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <BarChart2 className="h-6 w-6 text-red-800" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">$0</p>
                </div> */}
              {/* </CardContent>
            </Card> */}
          {/* </div>
        </div> */}

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {stores.length === 0 ? (
            <Card className="border-0 shadow-sm my-8">
              <CardContent className="p-0">
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
                    <Store className="h-10 w-10 text-red-800" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">No stores yet</h2>
                  <p className="text-gray-600 mb-8 text-center max-w-md">
                    Create your first online store to start selling products and reaching customers worldwide.
                  </p>
                  <Link href="/auth/store-setup">
                    <Button className="bg-red-800 hover:bg-red-700">
                      <Plus className="mr-2 h-4 w-4" /> Create Your First Store
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Stores</h2>
                <p className="text-gray-600">Select a store to manage or view analytics</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {stores.map((store) => (
                  <Card key={store.id} className="border-0 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-video w-full overflow-hidden bg-gray-100">
                      {store.imageUrl ? (
                        <Image
                          src={store.imageUrl || "/placeholder.svg"}
                          alt={`${store.name} logo`}
                          width={400}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-red-50">
                          <Store className="h-12 w-12 text-red-200" />
                        </div>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-xl font-bold">{store.name}</CardTitle>
                        <div className="flex space-x-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-gray-500 hover:text-red-800"
                            title="Edit Store"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-gray-500 hover:text-red-800"
                            title="Store Analytics"
                          >
                            <BarChart2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center text-sm">
                          <Globe className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-gray-600">{store.domain}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-gray-600">Created {formatDate(store.createdAt)}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Briefcase className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-gray-600">{store.industry}</span>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <Link href={`/store/${store.id}`} target="_blank">
                        <Button variant="outline" className="w-full group">
                          <span>Manage Store</span>
                          <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
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

