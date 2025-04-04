"use client"

import { ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

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

interface ProductCollection {
  id: string
  productType: string
  storeId: string
  vendor: string
  type: string
  createdAt: string
  updatedAt: string | null
}

interface Product {
  id: string
  title: string
  description: string
  price: number
  comparedPrice: number
  imageUrls: ProductImage[]
  variant: ProductVariant[]
  collections: ProductCollection[]
  stock: number
  status: string
  sku: string
  createdAt: string
  updatedAt: string
}

interface CartItem {
  cartItemId: string
  id: string
  title: string
  price: number
  image: string
  quantity: number
}

export default function CollectionPage() {
  const params = useParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const authToken = localStorage.getItem("auth_token")
        if (!authToken) {
          console.error("No auth token found")
          return
        }

        const collectionType = params.type === "new" ? "New_arrival" : "sale"
        const response = await fetch(
          `http://localhost:8080/api/product/getByCollection?collectionType=${collectionType}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [params.type])

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const existingItem = cart.find((item: CartItem) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({
        cartItemId: `${product.id}-${Date.now()}`,
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.imageUrls[0]?.imageUrl || "",
        quantity: 1,
      })
    }

    localStorage.setItem("cart", JSON.stringify(cart))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-100 rounded-lg h-96"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          {params.type === "new" ? "New Arrivals" : "Sale"}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
                {product.imageUrls && product.imageUrls.length > 0 ? (
                  <Image
                    src={product.imageUrls[0].imageUrl}
                    alt={product.title}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/store/${params.storeId}/products/${product.id}`}>
                      {product.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    ${product.price}
                  </p>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <ShoppingBag className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 