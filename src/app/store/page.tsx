import Link from "next/link"
import Image from "next/image"
import { Grid3X3, LayoutGrid, Search, ShoppingBag, Star, SlidersHorizontal, X, Heart, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

// Sample product data
const products = [
  {
    id: 1,
    name: "Premium Leather Backpack",
    price: 129.99,
    salePrice: null,
    rating: 4.8,
    reviewCount: 124,
    image: "/placeholder.svg?height=400&width=400",
    colors: ["Black", "Brown", "Tan"],
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 2,
    name: "Wireless Noise-Cancelling Headphones",
    price: 249.99,
    salePrice: 199.99,
    rating: 4.9,
    reviewCount: 356,
    image: "/placeholder.svg?height=400&width=400",
    colors: ["Black", "Silver", "Blue"],
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    price: 34.99,
    salePrice: null,
    rating: 4.5,
    reviewCount: 89,
    image: "/placeholder.svg?height=400&width=400",
    colors: ["White", "Black", "Gray", "Navy"],
    isNew: false,
    isBestSeller: false,
  },
  {
    id: 4,
    name: "Smart Home Security Camera",
    price: 79.99,
    salePrice: 59.99,
    rating: 4.6,
    reviewCount: 212,
    image: "/placeholder.svg?height=400&width=400",
    colors: ["White", "Black"],
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 5,
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    salePrice: null,
    rating: 4.7,
    reviewCount: 178,
    image: "/placeholder.svg?height=400&width=400",
    colors: ["Silver", "Black", "Blue", "Red"],
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 6,
    name: "Handcrafted Ceramic Mug Set",
    price: 39.99,
    salePrice: 29.99,
    rating: 4.4,
    reviewCount: 67,
    image: "/placeholder.svg?height=400&width=400",
    colors: ["White", "Black", "Beige"],
    isNew: false,
    isBestSeller: false,
  },
  {
    id: 7,
    name: "Bluetooth Portable Speaker",
    price: 89.99,
    salePrice: null,
    rating: 4.8,
    reviewCount: 245,
    image: "/placeholder.svg?height=400&width=400",
    colors: ["Black", "Blue", "Red"],
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 8,
    name: "Organic Bamboo Bed Sheets",
    price: 119.99,
    salePrice: 99.99,
    rating: 4.9,
    reviewCount: 156,
    image: "/placeholder.svg?height=400&width=400",
    colors: ["White", "Gray", "Sage", "Blue"],
    isNew: false,
    isBestSeller: true,
  },
]

// Sample categories
const categories = [
  { name: "All Products", count: 156 },
  { name: "Electronics", count: 42 },
  { name: "Home & Kitchen", count: 38 },
  { name: "Clothing", count: 24 },
  { name: "Accessories", count: 18 },
  { name: "Beauty & Personal Care", count: 16 },
  { name: "Sports & Outdoors", count: 12 },
  { name: "Books", count: 6 },
]

export default function StorePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
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
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-red-800 focus:ring-red-800"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="hidden md:flex items-center text-sm font-medium text-gray-700 hover:text-red-800">
              <Heart className="mr-1 h-5 w-5" />
              <span className="sr-only md:not-sr-only">Wishlist</span>
            </button>
            <button className="flex items-center text-sm font-medium text-gray-700 hover:text-red-800">
              <ShoppingBag className="mr-1 h-5 w-5" />
              <span className="sr-only md:not-sr-only">Cart (3)</span>
            </button>
            <Link href="/auth" className="hidden md:block text-sm font-medium text-gray-700 hover:text-red-800">
              Account
            </Link>
            <Button className="md:hidden" size="icon" variant="ghost">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Search (visible on small screens) */}
      <div className="border-b p-4 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input type="search" placeholder="Search products..." className="pl-10 pr-4 py-2 w-full" />
        </div>
      </div>

      {/* Collection Header */}
      <div className="bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">All Products</h1>
            <p className="mt-4 text-lg text-gray-600">
              Discover our curated collection of high-quality products designed to enhance your lifestyle. From everyday
              essentials to unique finds, we&apos;ve got something for everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Collection Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar Filters (Desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.name} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Checkbox id={`category-${category.name}`} className="mr-2" />
                        <label htmlFor={`category-${category.name}`} className="text-sm text-gray-700 cursor-pointer">
                          {category.name}
                        </label>
                      </div>
                      <span className="text-xs text-gray-500">{category.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Price Range</h3>
                <div className="space-y-4">
                  <Slider defaultValue={[0, 500]} max={1000} step={10} />
                  <div className="flex items-center justify-between">
                    <div className="w-20">
                      <Input type="number" placeholder="Min" className="text-sm" />
                    </div>
                    <span className="text-gray-500">-</span>
                    <div className="w-20">
                      <Input type="number" placeholder="Max" className="text-sm" />
                    </div>
                    <Button variant="outline" size="sm" className="ml-2">
                      Apply
                    </Button>
                  </div>
                </div>
              </div>

              {/* Color */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {["Black", "White", "Gray", "Red", "Blue", "Green", "Yellow", "Purple", "Pink", "Brown"].map(
                    (color) => (
                      <div
                        key={color}
                        className="h-8 w-8 rounded-full border border-gray-300 cursor-pointer hover:ring-2 hover:ring-red-800 hover:ring-offset-1"
                        style={{
                          backgroundColor: color.toLowerCase(),
                          border: color.toLowerCase() === "white" ? "1px solid #e5e7eb" : "none",
                        }}
                        title={color}
                      />
                    ),
                  )}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Availability</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox id="in-stock" className="mr-2" />
                    <label htmlFor="in-stock" className="text-sm text-gray-700 cursor-pointer">
                      In Stock
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="out-of-stock" className="mr-2" />
                    <label htmlFor="out-of-stock" className="text-sm text-gray-700 cursor-pointer">
                      Out of Stock
                    </label>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <Checkbox id={`rating-${rating}`} className="mr-2" />
                      <label
                        htmlFor={`rating-${rating}`}
                        className="flex items-center text-sm text-gray-700 cursor-pointer"
                      >
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="ml-1">{rating === 5 ? "& up" : `& up`}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full" variant="outline">
                Clear All Filters
              </Button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {/* Mobile Filter Button */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <Button variant="outline" size="sm" className="flex items-center">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">View:</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Grid3X3 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <p className="text-sm text-gray-500 mb-4 sm:mb-0">
                Showing <span className="font-medium">1-24</span> of <span className="font-medium">156</span> products
              </p>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Sort by:</span>
                <Select defaultValue="featured">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="best-selling">Best Selling</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="flex items-center gap-1 px-3 py-1.5">
                  Price: $50 - $200
                  <X className="h-3 w-3 cursor-pointer" />
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 px-3 py-1.5">
                  Color: Black
                  <X className="h-3 w-3 cursor-pointer" />
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 px-3 py-1.5">
                  In Stock
                  <X className="h-3 w-3 cursor-pointer" />
                </Badge>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:gap-x-8 lg:gap-y-12">
              {products.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                    <Link href={`/store/product/${product.id}`}>
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="h-full w-full object-cover object-center group-hover:opacity-90 transition-opacity"
                      />
                    </Link>
                    {/* Quick shop button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button className="bg-white text-gray-900 hover:bg-gray-100">Quick Shop</Button>
                    </div>
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.isNew && (
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          New
                        </span>
                      )}
                      {product.isBestSeller && (
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                          Best Seller
                        </span>
                      )}
                      {product.salePrice && (
                        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                          Sale
                        </span>
                      )}
                    </div>
                    {/* Wishlist button */}
                    <button className="absolute top-2 right-2 rounded-full bg-white p-1.5 text-gray-900 shadow-sm hover:bg-gray-100">
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        <Link href={`/store/product/${product.id}`}>{product.name}</Link>
                      </h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 text-sm text-gray-500">{product.rating}</span>
                      </div>
                    </div>
                    <div className="mt-1 flex items-center">
                      {product.salePrice ? (
                        <>
                          <span className="text-sm font-medium text-red-600">${product.salePrice.toFixed(2)}</span>
                          <span className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                        </>
                      ) : (
                        <span className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="mt-1">
                      <p className="text-sm text-gray-500">
                        {product.colors.length} {product.colors.length === 1 ? "color" : "colors"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6">
              <Button variant="outline" disabled>
                Previous
              </Button>
              <div className="hidden md:flex">
                {[1, 2, 3, 4, 5].map((page) => (
                  <Button
                    key={page}
                    variant={page === 1 ? "default" : "ghost"}
                    className={page === 1 ? "bg-red-800 hover:bg-red-700" : ""}
                    size="icon"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-gray-900">Subscribe to our newsletter</h2>
            <p className="mt-4 text-gray-600">Get the latest updates on new products and upcoming sales.</p>
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2">
              <Input type="email" placeholder="Enter your email" className="sm:w-72" />
              <Button className="bg-red-800 hover:bg-red-700">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                <Link href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
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

