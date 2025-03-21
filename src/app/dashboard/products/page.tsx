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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample product data
const products = [
  {
    id: "PRD-001",
    name: "Premium Leather Backpack",
    image: "/placeholder.svg?height=40&width=40",
    price: 129.99,
    inventory: 45,
    status: "active",
    category: "Bags",
    vendor: "LeatherCraft",
    dateAdded: "2023-03-15",
    sku: "BKP-LTR-001",
  },
  {
    id: "PRD-002",
    name: "Wireless Noise-Cancelling Headphones",
    image: "/placeholder.svg?height=40&width=40",
    price: 199.99,
    inventory: 32,
    status: "active",
    category: "Electronics",
    vendor: "AudioTech",
    dateAdded: "2023-03-14",
    sku: "HDPH-WL-002",
  },
  {
    id: "PRD-003",
    name: "Organic Cotton T-Shirt",
    image: "/placeholder.svg?height=40&width=40",
    price: 34.99,
    inventory: 120,
    status: "active",
    category: "Clothing",
    vendor: "EcoApparel",
    dateAdded: "2023-03-14",
    sku: "TSH-OCT-003",
  },
  {
    id: "PRD-004",
    name: "Smart Home Security Camera",
    image: "/placeholder.svg?height=40&width=40",
    price: 79.99,
    inventory: 18,
    status: "low_inventory",
    category: "Electronics",
    vendor: "SmartHome",
    dateAdded: "2023-03-13",
    sku: "CAM-SH-004",
  },
  {
    id: "PRD-005",
    name: "Stainless Steel Water Bottle",
    image: "/placeholder.svg?height=40&width=40",
    price: 24.99,
    inventory: 85,
    status: "active",
    category: "Home & Kitchen",
    vendor: "EcoWare",
    dateAdded: "2023-03-12",
    sku: "BTL-SS-005",
  },
  {
    id: "PRD-006",
    name: "Handcrafted Ceramic Mug Set",
    image: "/placeholder.svg?height=40&width=40",
    price: 39.99,
    inventory: 0,
    status: "out_of_stock",
    category: "Home & Kitchen",
    vendor: "ArtisanCrafts",
    dateAdded: "2023-03-11",
    sku: "MUG-CER-006",
  },
  {
    id: "PRD-007",
    name: "Bluetooth Portable Speaker",
    image: "/placeholder.svg?height=40&width=40",
    price: 89.99,
    inventory: 42,
    status: "active",
    category: "Electronics",
    vendor: "AudioTech",
    dateAdded: "2023-03-10",
    sku: "SPK-BT-007",
  },
  {
    id: "PRD-008",
    name: "Organic Bamboo Bed Sheets",
    image: "/placeholder.svg?height=40&width=40",
    price: 119.99,
    inventory: 28,
    status: "active",
    category: "Home & Kitchen",
    vendor: "EcoHome",
    dateAdded: "2023-03-09",
    sku: "SHT-BAM-008",
  },
  {
    id: "PRD-009",
    name: "Fitness Tracker Watch",
    image: "/placeholder.svg?height=40&width=40",
    price: 149.99,
    inventory: 5,
    status: "low_inventory",
    category: "Electronics",
    vendor: "FitTech",
    dateAdded: "2023-03-08",
    sku: "WCH-FIT-009",
  },
  {
    id: "PRD-010",
    name: "Leather Wallet",
    image: "/placeholder.svg?height=40&width=40",
    price: 59.99,
    inventory: 65,
    status: "active",
    category: "Accessories",
    vendor: "LeatherCraft",
    dateAdded: "2023-03-07",
    sku: "WLT-LTR-010",
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
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toLowerCase().includes(searchQuery.toLowerCase())

    // Status filter
    const matchesStatus = filterStatus === "all" || product.status === filterStatus

    // Category filter
    const matchesCategory = filterCategory === "all" || product.category === filterCategory

    // Vendor filter
    const matchesVendor = filterVendor === "all" || product.vendor === filterVendor

    return matchesSearch && matchesStatus && matchesCategory && matchesVendor
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortField === "price") {
      return sortDirection === "asc" ? a.price - b.price : b.price - a.price
    } else if (sortField === "inventory") {
      return sortDirection === "asc" ? a.inventory - b.inventory : b.inventory - a.inventory
    } else if (sortField === "name") {
      return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
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
  const categories = Array.from(new Set(products.map((product) => product.category)))

  // Handle bulk actions
  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on products:`, selectedProducts)
    // In a real app, this would call an API to perform the action
    // For now, just clear the selection
    setSelectedProducts([])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-semibold">Products</h1>
          <Link href="/dashboard/products/new">
            <Button className="bg-red-800 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Add product
            </Button>
          </Link>
        </div>
      </header>

      <main className="container py-8">
        {/* Filters and Search */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input
                    placeholder="Search products..."
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button variant="outline">
                  <Settings2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>All products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Image</TableHead>
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
                      <div className="relative h-16 w-16">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <Link href={`/dashboard/products/${product.id}`} className="hover:text-red-800">
                        {product.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        product.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {product.status}
                      </span>
                    </TableCell>
                    <TableCell>{product.inventory} in stock</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

