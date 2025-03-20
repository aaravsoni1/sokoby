"use client"

import {
    ChevronRight,
    Heart,
    HelpCircle,
    Minus,
    Plus,
    RotateCcw,
    Share2,
    Shield,
    ShoppingBag,
    Star,
    Truck,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample product data
const product = {
  id: 1,
  name: "Premium Leather Backpack",
  price: 129.99,
  salePrice: null,
  rating: 4.8,
  reviewCount: 124,
  description:
    "Our premium leather backpack combines style and functionality. Crafted from high-quality full-grain leather, this backpack features a spacious main compartment, padded laptop sleeve, and multiple pockets for organization. Perfect for work, travel, or everyday use.",
  features: [
    "Made from premium full-grain leather",
    'Padded 15" laptop compartment',
    "Water-resistant interior lining",
    "Adjustable padded shoulder straps",
    "Multiple interior and exterior pockets",
    "Durable YKK zippers",
  ],
  specifications: {
    Dimensions: '18" H x 12" W x 6" D',
    Weight: "2.5 lbs",
    Material: "Full-grain leather, brass hardware",
    Capacity: "22L",
    Warranty: "Lifetime limited warranty",
  },
  colors: [
    { name: "Black", value: "#000000" },
    { name: "Brown", value: "#8B4513" },
    { name: "Tan", value: "#D2B48C" },
  ],
  sizes: ["Small", "Medium", "Large"],
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ],
  stock: 15,
  sku: "BKP-LTR-001",
  brand: "Sokoby",
  categories: ["Bags", "Accessories", "Travel"],
  tags: ["leather", "backpack", "premium"],
  relatedProducts: [
    {
      id: 2,
      name: "Canvas Messenger Bag",
      price: 89.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.5,
    },
    {
      id: 3,
      name: "Leather Wallet",
      price: 49.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Travel Duffel Bag",
      price: 119.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
    },
    {
      id: 5,
      name: "Laptop Sleeve",
      price: 39.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.4,
    },
  ],
  reviews: [
    {
      id: 1,
      author: "John D.",
      rating: 5,
      date: "2 months ago",
      title: "Excellent quality and design",
      content:
        "I've been using this backpack for two months now and I'm extremely impressed with the quality. The leather is beautiful and the craftsmanship is excellent. Plenty of room for all my daily essentials and my laptop.",
      verified: true,
    },
    {
      id: 2,
      author: "Sarah M.",
      rating: 4,
      date: "1 month ago",
      title: "Great backpack, but could use more pockets",
      content:
        "The quality of this backpack is outstanding. The leather is soft yet durable, and the stitching is perfect. My only complaint is that I wish it had a few more internal pockets for organization.",
      verified: true,
    },
    {
      id: 3,
      author: "Michael T.",
      rating: 5,
      date: "3 weeks ago",
      title: "Worth every penny",
      content:
        "This backpack is exactly what I was looking for. The leather is high quality and the design is both functional and stylish. It's comfortable to wear even when fully loaded. Highly recommend!",
      verified: true,
    },
  ],
}

export default function ProductPage() {
  const [mainImage, setMainImage] = useState(product.images[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[1])
  const [quantity, setQuantity] = useState(1)

  const handleThumbnailClick = (image: string) => {
    setMainImage(image)
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header - Same as store page, omitted for brevity */}
      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Link href="/" className="mr-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sokoby%20mk.png-gToWGGxndAiqQ6pEyC5uaZnjZdJgdq.jpeg"
                alt="Sokoby"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <nav className="hidden space-x-6 md:flex">
              <Link href="/store" className="text-sm font-medium text-red-800 hover:text-red-700">
                Shop
              </Link>
              <Link href="/collections" className="text-sm font-medium text-gray-700 hover:text-red-800">
                Collections
              </Link>
              <Link href="/new-arrivals" className="text-sm font-medium text-gray-700 hover:text-red-800">
                New Arrivals
              </Link>
              <Link href="/sale" className="text-sm font-medium text-gray-700 hover:text-red-800">
                Sale
              </Link>
            </nav>
          </div>

          <div className="hidden flex-1 max-w-md mx-8 lg:block">
            <div className="relative">
              <Input type="search" placeholder="Search products..." className="pl-10 pr-4 py-2 w-full" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center text-sm font-medium text-gray-700 hover:text-red-800">
              <ShoppingBag className="mr-1 h-5 w-5" />
              <span className="sr-only md:not-sr-only">Cart (3)</span>
            </button>
            <Link href="/auth" className="hidden md:block text-sm font-medium text-gray-700 hover:text-red-800">
              Account
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
            <Link href="/store" className="text-gray-500 hover:text-gray-700">
              Store
            </Link>
            <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
            <Link href="#" className="text-gray-500 hover:text-gray-700">
              {product.categories[0]}
            </Link>
            <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
          {/* Product Images */}
          <div className="mb-8 lg:mb-0">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
              <Image
                src={mainImage || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="h-full w-full object-cover object-center"
              />
              <button className="absolute top-4 right-4 rounded-full bg-white p-2 text-gray-900 shadow-sm hover:bg-gray-100">
                <Heart className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`aspect-square overflow-hidden rounded-md bg-gray-100 ${
                    mainImage === image ? "ring-2 ring-red-800" : ""
                  }`}
                  onClick={() => handleThumbnailClick(image)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 1}`}
                    width={150}
                    height={150}
                    className="h-full w-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{product.name}</h1>
                <button className="text-gray-500 hover:text-gray-700">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-2 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
              <div className="mt-4">
                {product.salePrice ? (
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-red-600">${Number(product.salePrice).toFixed(2)}</span>
                    <span className="ml-2 text-lg text-gray-500 line-through">${product.price.toFixed(2)}</span>
                    <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                      Save ${(product.price - Number(product.salePrice)).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                )}
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <span className="font-medium text-green-600">In Stock</span> - {product.stock} available
              </div>
            </div>

            <div className="space-y-6">
              {/* Color Selection */}
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Color: {selectedColor.name}</h3>
                  <span className="text-sm text-gray-500">{product.colors.length} options</span>
                </div>
                <RadioGroup
                  value={selectedColor.name}
                  onValueChange={(value) => {
                    const color = product.colors.find((c) => c.name === value)
                    if (color) setSelectedColor(color)
                  }}
                  className="mt-2 flex space-x-3"
                >
                  {product.colors.map((color) => (
                    <div key={color.name} className="flex items-center space-x-2">
                      <RadioGroupItem value={color.name} id={`color-${color.name}`} className="sr-only" />
                      <Label
                        htmlFor={`color-${color.name}`}
                        className={`relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ${
                          selectedColor.name === color.name ? "ring-2 ring-red-800" : ""
                        }`}
                      >
                        <span
                          className="h-8 w-8 rounded-full border border-gray-300"
                          style={{ backgroundColor: color.value }}
                          aria-hidden="true"
                        />
                        <span className="sr-only">{color.name}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size: {selectedSize}</h3>
                  <button className="text-sm font-medium text-red-800 hover:text-red-700">Size Guide</button>
                </div>
                <RadioGroup
                  value={selectedSize}
                  onValueChange={setSelectedSize}
                  className="mt-2 grid grid-cols-3 gap-3"
                >
                  {product.sizes.map((size) => (
                    <div key={size}>
                      <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
                      <Label
                        htmlFor={`size-${size}`}
                        className={`flex cursor-pointer items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase hover:bg-gray-50 ${
                          selectedSize === size
                            ? "border-red-800 bg-red-50 text-red-800"
                            : "border-gray-300 text-gray-900"
                        }`}
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
                <div className="mt-2 flex items-center">
                  <button
                    type="button"
                    className="rounded-l-md border border-r-0 border-gray-300 p-3 hover:bg-gray-50"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => {
                      const val = Number.parseInt(e.target.value)
                      if (!isNaN(val) && val >= 1 && val <= product.stock) {
                        setQuantity(val)
                      }
                    }}
                    className="w-16 border-y border-gray-300 py-3 text-center text-sm"
                  />
                  <button
                    type="button"
                    className="rounded-r-md border border-l-0 border-gray-300 p-3 hover:bg-gray-50"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex space-x-4">
                <Button className="flex-1 bg-red-800 hover:bg-red-700 py-6">Add to Cart</Button>
                <Button variant="outline" className="py-6">
                  Buy Now
                </Button>
              </div>

              {/* Shipping & Returns */}
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Truck className="mr-3 h-5 w-5 text-gray-500" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Free shipping</h4>
                      <p className="text-sm text-gray-500">Free standard shipping on orders over $50</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <RotateCcw className="mr-3 h-5 w-5 text-gray-500" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Free returns</h4>
                      <p className="text-sm text-gray-500">Return within 30 days for a full refund</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Shield className="mr-3 h-5 w-5 text-gray-500" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Secure checkout</h4>
                      <p className="text-sm text-gray-500">SSL encrypted checkout for your security</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-2">
              <div className="prose max-w-none">
                <p className="text-gray-600">{product.description}</p>
              </div>
            </TabsContent>
            <TabsContent value="features" className="mt-2">
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="specifications" className="mt-2">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key}>
                        <td className="py-4 text-sm font-medium text-gray-900 w-1/3">{key}</td>
                        <td className="py-4 text-sm text-gray-600">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-2">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
                    <div className="mt-1 flex items-center">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">Based on {product.reviewCount} reviews</span>
                    </div>
                  </div>
                  <Button>Write a Review</Button>
                </div>

                <div className="divide-y divide-gray-200">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="py-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{review.title}</h4>
                          <div className="mt-1 flex items-center">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">{review.content}</p>
                      </div>
                      <div className="mt-2 flex items-center text-sm">
                        <span className="font-medium text-gray-900">{review.author}</span>
                        {review.verified && (
                          <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">How do I care for my leather backpack?</AccordionTrigger>
                <AccordionContent>
                  We recommend using a leather conditioner every 3-6 months to keep the leather soft and prevent it from
                  drying out. Avoid exposing your backpack to excessive moisture or direct sunlight for prolonged
                  periods. For small stains, use a damp cloth to gently wipe the surface.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">What size laptop can fit in this backpack?</AccordionTrigger>
                <AccordionContent>
                  The backpack has a padded compartment that can accommodate laptops up to 15 inches in size. The
                  compartment is well-padded to provide protection for your device.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">Is this backpack water-resistant?</AccordionTrigger>
                <AccordionContent>
                  While the leather itself is not completely waterproof, the backpack has a water-resistant interior
                  lining to help protect your belongings. We recommend avoiding heavy rain or submerging the backpack in
                  water.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">What is your warranty policy?</AccordionTrigger>
                <AccordionContent>
                  We offer a lifetime limited warranty that covers manufacturing defects. This warranty does not cover
                  normal wear and tear, misuse, or accidental damage. Please contact our customer service team if you
                  have any issues with your backpack.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  Can I return this product if I&apos;m not satisfied?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, we offer a 30-day return policy. If you&apos;re not completely satisfied with your purchase, you can
                  return it within 30 days for a full refund or exchange. The product must be in its original condition
                  and packaging. Please note that shipping costs for returns are the responsibility of the customer
                  unless the return is due to a defect.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-8 text-center">
              <p className="text-gray-600">Still have questions?</p>
              <Button variant="outline" className="mt-4">
                <HelpCircle className="mr-2 h-4 w-4" />
                Contact Customer Support
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
            {product.relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="group relative">
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                  <Link href={`/store/product/${relatedProduct.id}`}>
                    <Image
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover object-center group-hover:opacity-90 transition-opacity"
                    />
                  </Link>
                  <button className="absolute top-2 right-2 rounded-full bg-white p-1.5 text-gray-900 shadow-sm hover:bg-gray-100">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    <Link href={`/store/product/${relatedProduct.id}`}>{relatedProduct.name}</Link>
                  </h3>
                  <div className="mt-1 flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(relatedProduct.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 text-sm font-medium text-gray-900">${relatedProduct.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recently Viewed */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Recently Viewed</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
            {product.relatedProducts
              .slice(0, 4)
              .reverse()
              .map((relatedProduct) => (
                <div key={relatedProduct.id} className="group relative">
                  <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                    <Link href={`/store/product/${relatedProduct.id}`}>
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        width={300}
                        height={300}
                        className="h-full w-full object-cover object-center group-hover:opacity-90 transition-opacity"
                      />
                    </Link>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      <Link href={`/store/product/${relatedProduct.id}`}>{relatedProduct.name}</Link>
                    </h3>
                    <p className="mt-1 text-sm font-medium text-gray-900">${relatedProduct.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Footer - Same as store page, omitted for brevity */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Shop</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Best Sellers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Sale
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Customer Service</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Shipping & Returns
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Track Order
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Affiliates
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
              </div>
              <div className="mt-4">
                <h3 className="mb-2 text-lg font-semibold">Payment Methods</h3>
                <div className="flex space-x-2">
                  <div className="h-8 w-12 rounded bg-gray-700"></div>
                  <div className="h-8 w-12 rounded bg-gray-700"></div>
                  <div className="h-8 w-12 rounded bg-gray-700"></div>
                  <div className="h-8 w-12 rounded bg-gray-700"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Sokoby. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

