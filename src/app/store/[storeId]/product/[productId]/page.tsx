"use client"

import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingBag } from "lucide-react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

interface ProductVariant {
  id: string
  name: string
  skuCode: string
  price: number
  stockQuantity: number
  barcode: string | null
}

interface ProductImage {
  id: string | null
  imageUrl: string
  productId: string | null
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
  productId: string
  title: string
  description: string
  storeId: string
  price: number
  status: string
  comparedPrice: number
  skuCode: string
  stockQuantity: number
  variants: ProductVariant[]
  collection: Collection | null
  images: ProductImage[]
  barcode: string
}

export default function ProductDetailsPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [showAllThumbnails, setShowAllThumbnails] = useState(false)
  const maxVisibleThumbnails = 5

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const authToken = localStorage.getItem("auth_token")
        const response = await fetch(`http://localhost:8080/api/product/${params.productId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        const data = await response.json()
        // Remove duplicate images
        const uniqueImages = data.images.filter(
          (image: ProductImage, index: number, self: ProductImage[]) =>
            index === self.findIndex((i) => i.imageUrl === image.imageUrl),
        )
        setProduct({ ...data, images: uniqueImages })
        // Set default variant if available
        if (data.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0].id)
        }
      } catch (error) {
        console.error("Error fetching product:", error)
        toast.error("Failed to fetch product details")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.productId])

  const addToCart = () => {
    if (!product) return

    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const variant = product.variants.find((v) => v.id === selectedVariant)

    cart.push({
      cartItemId: `${product.productId}-${selectedVariant || Date.now()}`,
      id: product.productId,
      title: product.title,
      price: variant ? variant.price : product.price,
      image: product.images[0]?.imageUrl,
      quantity: quantity,
      variantId: selectedVariant,
      variantName: variant?.name,
    })
    localStorage.setItem("cart", JSON.stringify(cart))
    toast.success("Added to cart")
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? product!.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === product!.images.length - 1 ? 0 : prev + 1))
  }

  const visibleThumbnails = showAllThumbnails ? product?.images : product?.images.slice(0, maxVisibleThumbnails)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading product...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Product not found</div>
      </div>
    )
  }

  const currentPrice = selectedVariant ? product.variants.find((v) => v.id === selectedVariant)?.price : product.price

  const discountPercentage =
    product.comparedPrice > 0 && currentPrice
      ? Math.round(((product.comparedPrice - currentPrice) / product.comparedPrice) * 100)
      : 0

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1200px] mx-auto px-4 py-10 md:py-16">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-gray-500">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="#" className="hover:text-gray-800">
                Home
              </a>
            </li>
            <li>
              <span>/</span>
            </li>
            <li>
              <a href="#" className="hover:text-gray-800">
                Products
              </a>
            </li>
            <li>
              <span>/</span>
            </li>
            <li className="text-gray-800 font-medium truncate">{product.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-200">
              <Image
                src={product.images[selectedImage]?.imageUrl || "/placeholder.png"}
                alt={product.title}
                fill
                className="object-cover transition-all duration-300 hover:scale-105"
                priority
              />

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {discountPercentage > 0 && (
                <div className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded">
                  SAVE {discountPercentage}%
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="relative">
                <div className="grid grid-cols-5 gap-2">
                  {visibleThumbnails?.map((image, index) => (
                    <button
                      key={index}
                      className={`relative aspect-square rounded-md overflow-hidden border transition-all ${
                        selectedImage === index
                          ? "border-gray-900 ring-1 ring-gray-900"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedImage(index)}
                      aria-label={`View image ${index + 1}`}
                    >
                      <Image
                        src={image.imageUrl || "/placeholder.svg"}
                        alt={`${product.title} - ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>

                {product.images.length > maxVisibleThumbnails && (
                  <button
                    onClick={() => setShowAllThumbnails(!showAllThumbnails)}
                    className="mt-2 text-sm text-gray-600 hover:text-gray-900 underline"
                  >
                    {showAllThumbnails ? "Show less" : `+ ${product.images.length - maxVisibleThumbnails} more`}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col space-y-6">
            <div className="space-y-2">
              {product.collection?.vendor && (
                <p className="text-sm font-medium text-gray-500">{product.collection.vendor}</p>
              )}
              <h1 className="text-3xl font-medium text-gray-900">{product.title}</h1>

              <div className="flex items-center gap-3 pt-1">
                <span className="text-2xl font-medium text-gray-900">${currentPrice?.toFixed(2)}</span>
                {product.comparedPrice > (currentPrice || 0) && (
                  <span className="text-lg text-gray-500 line-through">${product.comparedPrice.toFixed(2)}</span>
                )}
              </div>
            </div>

            <div className="border-t border-b border-gray-200 py-6">
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600">{product.description}</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Variants */}
              {product.variants.length > 0 && (
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-900">Variant</label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => {
                          setSelectedVariant(selectedVariant === variant.id ? null : variant.id)
                          setQuantity(1)
                        }}
                        className={`px-4 py-2 text-sm rounded-md border transition-all ${
                          selectedVariant === variant.id
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-300 hover:border-gray-900 text-gray-900"
                        }`}
                      >
                        {variant.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-900">Quantity</label>
                <div className="inline-flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={decrementQuantity}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-gray-900">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={addToCart}
                className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </Button>

              {/* Additional Info */}
              <div className="pt-4 text-sm text-gray-500 space-y-4">
                <div className="flex items-start gap-2">
                  <div className="font-medium">SKU:</div>
                  <div>
                    {selectedVariant
                      ? product.variants.find((v) => v.id === selectedVariant)?.skuCode
                      : product.skuCode}
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="font-medium">Availability:</div>
                  <div>
                    {((selectedVariant
                      ? product.variants.find((v) => v.id === selectedVariant)?.stockQuantity ?? 0
                      : product.stockQuantity) > 0
                      ? "In stock"
                      : "Out of stock")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

