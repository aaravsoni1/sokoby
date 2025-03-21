"use client"

import {
  AlertCircle,
  CheckCircle,
  Filter,
  Plus,
  Search,
  Settings2
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data - replace with actual data from your backend
const products = [
  {
    id: 1,
    title: "Classic T-Shirt",
    status: "Active",
    inventory: 100,
    price: "$29.99",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Denim Jeans",
    status: "Active",
    inventory: 50,
    price: "$79.99",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=2026&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Running Shoes",
    status: "Draft",
    inventory: 0,
    price: "$99.99",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
  },
]

// Sample collections data
const collections = [
  { id: 1, name: "New Arrivals", count: 12 },
  { id: 2, name: "Best Sellers", count: 8 },
  { id: 3, name: "Summer Collection", count: 15 },
  { id: 4, name: "Sale Items", count: 6 },
  { id: 5, name: "Featured Products", count: 10 },
]

// Sample vendors data
const vendors = [
  { id: 1, name: "LeatherCraft", count: 8 },
  { id: 2, name: "AudioTech", count: 12 },
  { id: 3, name: "EcoApparel", count: 15 },
  { id: 4, name: "SmartHome", count: 7 },
  { id: 5, name: "EcoWare", count: 9 },
  { id: 6, name: "ArtisanCrafts", count: 11 },
  { id: 7, name: "EcoHome", count: 6 },
  { id: 8, name: "FitTech", count: 5 },
]

// Status badge component
function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    active: { color: "bg-green-100 text-green-800", icon: <CheckCircle className="mr-1 h-3.5 w-3.5" /> },
    low_inventory: { color: "bg-yellow-100 text-yellow-800", icon: <AlertCircle className="mr-1 h-3.5 w-3.5" /> },
    out_of_stock: { color: "bg-red-100 text-red-800", icon: <AlertCircle className="mr-1 h-3.5 w-3.5" /> },
    draft: { color: "bg-gray-100 text-gray-800", icon: null },
  }[status] || { color: "bg-gray-100 text-gray-800", icon: null }

  const statusText =
    {
      active: "Active",
      low_inventory: "Low Stock",
      out_of_stock: "Out of Stock",
      draft: "Draft",
    }[status] || status

  return (
    <Badge variant="outline" className={`flex items-center ${statusConfig.color}`}>
      {statusConfig.icon}
      <span>{statusText}</span>
    </Badge>
  )
}

export default function ProductsPage() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("table")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [sortField, setSortField] = useState("dateAdded")
  const [sortDirection, setSortDirection] = useState("desc")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterVendor, setFilterVendor] = useState("all")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)

  // Handle checkbox selection
  const toggleProductSelection = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    } else {
      setSelectedProducts([...selectedProducts, productId])
    }
  }

  // Handle select all
  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map((product) => product.id))
    }
  }

  // Filter products based on search query and filters
  const filteredProducts = products.filter((product) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toString().includes(searchQuery)

    // Status filter
    const matchesStatus = filterStatus === "all" || product.status === filterStatus

    return matchesSearch && matchesStatus
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortField === "price") {
      return sortDirection === "asc" ? a.price - b.price : b.price - a.price
    } else if (sortField === "inventory") {
      return sortDirection === "asc" ? a.inventory - b.inventory : b.inventory - a.inventory
    } else if (sortField === "name") {
      return sortDirection === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    } else if (sortField === "dateAdded") {
      return sortDirection === "asc"
        ? new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
        : new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    }
    return 0
  })

  // Pagination
  const indexOfLastProduct = currentPage * itemsPerPage
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)

  // Handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Get unique categories for filter
  const categories = Array.from(new Set(products.map((product) => product.status)))

  // Handle bulk actions
  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on products:`, selectedProducts)
    // In a real app, this would call an API to perform the action
    // For now, just clear the selection
    setSelectedProducts([])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-gray-500">Manage your products and inventory</p>
        </div>
        <Link href="/dashboard/products/new">
          <Button className="bg-red-800 hover:bg-red-700">
            <Plus className="h-4 w-4 mr-2" />
            Add product
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
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
                className="pl-8"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Inventory</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-lg">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{product.title}</div>
                        <div className="text-sm text-gray-500">SKU: {product.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      product.status === "Active" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {product.status}
                    </span>
                  </TableCell>
                  <TableCell>{product.inventory}</TableCell>
                  <TableCell>{product.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

