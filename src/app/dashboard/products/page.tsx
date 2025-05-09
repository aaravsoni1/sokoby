"use client"

import {
  Edit,
  Filter,
  Plus,
  Search,
  Settings2,
  Trash2
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  productId?: string
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
  createdAt?: string
  updatedAt?: string
}

export default function ProductsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const handleDeleteProduct = async (productId: string) => {
    try {
      await productService.deleteProduct(productId)
      // Remove the deleted product from the state
      setProducts(products.filter(product => product.id !== productId))
      toast.success("Product deleted successfully")
    } catch (error) {
      console.error("Error deleting product:", error)
      toast.error("Failed to delete product")
    }
  }

  const handleEditProduct = async (productId: string) => {
    try {
      // Store the current product ID in localStorage
      localStorage.setItem("currentProductId", productId)
      
      // Fetch the product data
      const authToken = localStorage.getItem("auth_token")
      if (!authToken) {
        toast.error("Please login first")
        router.push("/auth")
        return
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include'
      })
      
      if (!response.ok) {
        throw new Error("Failed to fetch product data")
      }
      
      // Navigate to the edit page
      router.push(`/dashboard/products/edit`)
    } catch (error) {
      console.error("Error fetching product data:", error)
      toast.error("Failed to fetch product data")
    }
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const authToken = localStorage.getItem("auth_token")
        if (!authToken) {
          toast.error("Please login first")
          router.push("/auth")
          return
        }

        const data = await productService.getAllProducts()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
        toast.error("Failed to fetch products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [router])

  // Filter products based on search query
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesSearch
  })

  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Products</h1>
          <p className="text-gray-500 text-sm">Manage your products and inventory</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <Button 
            variant="outline"
            onClick={() => window.open(`/store/${products[0]?.storeId}`, '_blank')}
            className="w-full sm:w-auto"
          >
            Preview your store
          </Button>
          <Link href="/dashboard/products/new" className="w-full sm:w-auto">
            <Button className="bg-red-800 hover:bg-red-700 w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add product
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>All products</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search products..."
                className="pl-8 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto hidden md:block">
            <Table className="min-w-[600px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Inventory</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      Loading products...
                    </TableCell>
                  </TableRow>
                ) : filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No products found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="relative h-8 w-8 sm:h-10 sm:w-10 overflow-hidden rounded-lg">
                            <Image
                              src={product.imageUrls[0]?.imageUrl || "/placeholder.png"}
                              alt={product.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-sm sm:text-base">{product.title}</div>
                            <div className="text-xs sm:text-sm text-gray-500">SKU: {product.sku}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          product.status === "ACTIVE" 
                            ? "bg-green-100 text-green-700" 
                            : product.status === "DRAFT"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {product.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm">{product.stock}</TableCell>
                      <TableCell className="text-sm">${product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            onClick={() => handleEditProduct(product.id!)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteProduct(product.id!)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Product List */}
          <div className="md:hidden space-y-4">
            {loading ? (
              <div className="text-center py-4">Loading products...</div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-4">No products found</div>
            ) : (
              filteredProducts.map((product) => (
                <Card key={product.id} className="w-full">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                        <Image
                          src={product.imageUrls[0]?.imageUrl || "/placeholder.png"}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-base">{product.title}</h3>
                        <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Status</p>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          product.status === "ACTIVE" 
                            ? "bg-green-100 text-green-700" 
                            : product.status === "DRAFT"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {product.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Inventory</p>
                        <p className="text-sm">{product.stock}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Price</p>
                        <p className="text-sm">${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        className="w-[48%]"
                        onClick={() => handleEditProduct(product.id!)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        className="w-[48%]"
                        onClick={() => handleDeleteProduct(product.id!)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

