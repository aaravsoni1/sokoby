"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { productService } from "@/services/productService"

interface ProductImage {
  id: string
  imageUrl: string
  productId: string
}

interface ProductVariant {
  variantId: string
  productId: string
  skuCode: string
  price: number
  stockQuantity: number
}

interface Collection {
  id: string
  type: string
  storeId: string
  vendor: string
  products: Product[] | null
  createdAt: string
  updatedAt: string | null
}

interface Product {
  id?: string
  title: string
  storeId?: string
  imageUrls: ProductImage[]
  description?: string
  variant: ProductVariant[]
  stock: number
  status: string
  sku: string
  comparedPrice: number
  price: number
  collections: Collection[]
}

export default function StorePage() {
  const params = useParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts()
        setProducts(data.filter(product => product.status === "ACTIVE"))
      } catch (error) {
        console.error("Error fetching products:", error)
        toast.error("Failed to fetch products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    cart.push({
      cartItemId: `${product.id}-${Date.now()}`,
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.imageUrls[0]?.imageUrl,
      quantity: 1
    })
    localStorage.setItem('cart', JSON.stringify(cart))
    toast.success("Added to cart")
  }

  if (loading) {
    return <div className="container py-8">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gray-100">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Modern Store Interior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to Our Store
            </h1>
            <p className="text-lg mb-8">
              Discover our collection of high-quality products at great prices.
            </p>
            <Link href={`/store/${params?.storeId}/collections/all`}>
              <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600">Check out our most popular items</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 8).map((product) => (
              <div key={product.id} className="group">
                <Link href={`/store/${params?.storeId}/product/${product.id}`}>
                  <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={product.imageUrls[0]?.imageUrl || "/placeholder.png"}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                </Link>
                <h3 className="font-medium mb-2">{product.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="font-bold">${product.price.toFixed(2)}</span>
                  {product.comparedPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.comparedPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Stay updated with our latest products and exclusive offers.
          </p>
          <form className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-red-600 text-white rounded-r-md hover:bg-red-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
} 