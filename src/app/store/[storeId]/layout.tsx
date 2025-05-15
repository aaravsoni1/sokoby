"use client"

import { Menu, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { storeService } from "@/services/storeService"

interface Store {
  id: string
  name: string
  domain: string
  stripeAccountId: string | null
  description: string
  createdAt: string
  updatedAt: string
  merchantId: string
  productType: string
  businessType: string
  revenue: string
  industry: string
  imageUrl: string
}

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const [store, setStore] = useState<Store | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStore = async () => {
      try {
        // Get store ID from URL parameters
        const storeId = params?.storeId as string
        if (!storeId) {
          throw new Error('Store ID not found in URL')
        }
        
        const storeData = await storeService.getStore(storeId)
        setStore(storeData)
      } catch (error) {
        console.error("Error fetching store:", error)
        toast.error("Failed to fetch store information")
      } finally {
        setLoading(false)
      }
    }

    fetchStore()
  }, [params?.storeId])

  if (loading) {
    return <div className="min-h-screen bg-white">Loading...</div>
  }

  if (!store) {
    return <div className="min-h-screen bg-white">Store not found</div>
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href={`/store/${params?.storeId || ''}`} className="flex items-center gap-2">
              {store.imageUrl && (
                <div className="relative w-20 h-20">
                  <Image
                    src={store.imageUrl}
                    alt={store.name}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <span className="text-xl font-bold">{store.name}</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href={`/store/${params?.storeId || ''}`} className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <Link href={`/store/${params?.storeId || ''}/collections/all`} className="text-gray-600 hover:text-gray-900">
                Products
              </Link>
              <Link href={`/store/${params?.storeId || ''}/collections/new`} className="text-gray-600 hover:text-gray-900">
                New Arrivals
              </Link>
              <Link href={`/store/${params?.storeId || ''}/collections/sale`} className="text-gray-600 hover:text-gray-900">
                Sale
              </Link>
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <Link href={`/store/${params?.storeId || ''}/cart`} className="p-2 hover:bg-gray-100 rounded-full relative">
                <ShoppingBag className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {JSON.parse(localStorage.getItem('cart') || '[]').length}
                </span>
              </Link>
              <Sheet>
                <SheetTrigger asChild>
                  <button className="md:hidden p-2 hover:bg-gray-100 rounded-full">
                    <Menu className="h-5 w-5 text-gray-600" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                  <SheetHeader>
                    <SheetTitle>{store.name}</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    <Link 
                      href={`/store/${params?.storeId || ''}`} 
                      className="block py-2 text-lg font-medium text-gray-900 hover:text-red-800"
                    >
                      Home
                    </Link>
                    <Link 
                      href={`/store/${params?.storeId || ''}/collections/all`} 
                      className="block py-2 text-lg font-medium text-gray-900 hover:text-red-800"
                    >
                      Products
                    </Link>
                    <Link 
                      href={`/store/${params?.storeId || ''}/collections/new`} 
                      className="block py-2 text-lg font-medium text-gray-900 hover:text-red-800"
                    >
                      New Arrivals
                    </Link>
                    <Link 
                      href={`/store/${params?.storeId || ''}/collections/sale`} 
                      className="block py-2 text-lg font-medium text-gray-900 hover:text-red-800"
                    >
                      Sale
                    </Link>
                    <Link 
                      href={`/store/${params?.storeId || ''}/cart`} 
                      className="block py-2 text-lg font-medium text-gray-900 hover:text-red-800"
                    >
                      Cart
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">About Us</h3>
              <p className="text-gray-600">{store.description}</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="#" className="hover:text-gray-900">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-gray-900">Shipping Policy</Link></li>
                <li><Link href="#" className="hover:text-gray-900">Returns & Exchanges</Link></li>
                <li><Link href="#" className="hover:text-gray-900">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="#" className="hover:text-gray-900">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-gray-900">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-gray-900">Refund Policy</Link></li>
                <li><Link href="#" className="hover:text-gray-900">Shipping Information</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Newsletter</h3>
              <p className="text-gray-600 mb-4">
                Subscribe to our newsletter for updates and exclusive offers.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-r-md hover:bg-red-700"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} {store.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 