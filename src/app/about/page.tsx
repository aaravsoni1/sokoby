"use client"

import {
    AlertCircle,
    ArrowUpDown,
    CheckCircle,
    Copy,
    Download,
    Edit,
    Eye,
    Grid,
    List,
    MoreHorizontal,
    Package,
    Plus,
    Search,
    Tag,
    Trash2,
    Upload,
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

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
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your product catalog, inventory, and pricing</p>
        </div>

        <div className="flex items-center gap-2">
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button className="bg-red-800 hover:bg-red-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Fill in the details to add a new product to your store.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="product-name" className="text-right">
                      Product Name
                    </Label>
                    <Input id="product-name" placeholder="Enter product name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="product-price" className="text-right">
                      Price
                    </Label>
                    <Input id="product-price" placeholder="0.00" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="product-sku" className="text-right">
                      SKU
                    </Label>
                    <Input id="product-sku" placeholder="SKU-123" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="product-category" className="text-right">
                      Category
                    </Label>
                    <Select>
                      <SelectTrigger id="product-category" className="mt-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="product-inventory" className="text-right">
                      Inventory
                    </Label>
                    <Input id="product-inventory" type="number" placeholder="0" className="mt-1" />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="product-description" className="text-right">
                      Description
                    </Label>
                    <Textarea id="product-description" placeholder="Enter product description" className="mt-1" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-red-800 hover:bg-red-700">
                  Add Product
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export All Products</DropdownMenuItem>
              <DropdownMenuItem>Export Selected Products</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Export as Excel</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Import Products</DropdownMenuItem>
              <DropdownMenuItem>Import Inventory</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Download Import Template</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="all-products" className="space-y-4">
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="all-products">All Products</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="low-inventory">Low Inventory</TabsTrigger>
            <TabsTrigger value="out-of-stock">Out of Stock</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className={viewMode === "table" ? "bg-gray-100" : ""}
              onClick={() => setViewMode("table")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={viewMode === "grid" ? "bg-gray-100" : ""}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/4 lg:w-1/5 space-y-4">
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base">Filters</CardTitle>
              </CardHeader>
              <CardContent className="py-2 space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Status</h3>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="status-all"
                        name="status"
                        value="all"
                        checked={filterStatus === "all"}
                        onChange={() => setFilterStatus("all")}
                        className="mr-2"
                      />
                      <label htmlFor="status-all" className="text-sm">
                        All
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="status-active"
                        name="status"
                        value="active"
                        checked={filterStatus === "active"}
                        onChange={() => setFilterStatus("active")}
                        className="mr-2"
                      />
                      <label htmlFor="status-active" className="text-sm">
                        Active
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="status-low"
                        name="status"
                        value="low_inventory"
                        checked={filterStatus === "low_inventory"}
                        onChange={() => setFilterStatus("low_inventory")}
                        className="mr-2"
                      />
                      <label htmlFor="status-low" className="text-sm">
                        Low Inventory
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="status-out"
                        name="status"
                        value="out_of_stock"
                        checked={filterStatus === "out_of_stock"}
                        onChange={() => setFilterStatus("out_of_stock")}
                        className="mr-2"
                      />
                      <label htmlFor="status-out" className="text-sm">
                        Out of Stock
                      </label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Category</h3>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="category-all"
                        name="category"
                        value="all"
                        checked={filterCategory === "all"}
                        onChange={() => setFilterCategory("all")}
                        className="mr-2"
                      />
                      <label htmlFor="category-all" className="text-sm">
                        All Categories
                      </label>
                    </div>
                    {categories.map((category) => (
                      <div key={category} className="flex items-center">
                        <input
                          type="radio"
                          id={`category-${category}`}
                          name="category"
                          value={category}
                          checked={filterCategory === category}
                          onChange={() => setFilterCategory(category)}
                          className="mr-2"
                        />
                        <label htmlFor={`category-${category}`} className="text-sm">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Collections</h3>
                  <div className="space-y-1">
                    {collections.map((collection) => (
                      <div key={collection.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Checkbox id={`collection-${collection.id}`} className="mr-2" />
                          <label htmlFor={`collection-${collection.id}`} className="text-sm">
                            {collection.name}
                          </label>
                        </div>
                        <span className="text-xs text-gray-500">{collection.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Vendor</h3>
                  <Select value={filterVendor} onValueChange={setFilterVendor}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Vendors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Vendors</SelectItem>
                      {vendors.map((vendor) => (
                        <SelectItem key={vendor.id} value={vendor.name}>
                          {vendor.name} ({vendor.count})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setFilterStatus("all")
                    setFilterCategory("all")
                    setFilterVendor("all")
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-3/4 lg:w-4/5 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search products by name, SKU, or ID..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {selectedProducts.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Bulk Actions ({selectedProducts.length})</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleBulkAction("edit")}>Edit Selected</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkAction("delete")}>Delete Selected</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleBulkAction("archive")}>Archive Selected</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkAction("duplicate")}>
                      Duplicate Selected
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleBulkAction("add-to-collection")}>
                      Add to Collection
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkAction("remove-from-collection")}>
                      Remove from Collection
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            <TabsContent value="all-products" className="m-0">
              {viewMode === "table" ? (
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox
                            checked={currentProducts.length > 0 && selectedProducts.length === currentProducts.length}
                            onCheckedChange={toggleSelectAll}
                            aria-label="Select all products"
                          />
                        </TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            className="flex items-center p-0 hover:bg-transparent"
                            onClick={() => handleSort("name")}
                          >
                            Product
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            className="flex items-center p-0 hover:bg-transparent"
                            onClick={() => handleSort("inventory")}
                          >
                            Inventory
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            className="flex items-center p-0 hover:bg-transparent"
                            onClick={() => handleSort("price")}
                          >
                            Price
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentProducts.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8">
                            <div className="flex flex-col items-center justify-center">
                              <Package className="h-12 w-12 text-gray-300 mb-2" />
                              <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                              <p className="text-gray-500 mt-1">
                                {searchQuery
                                  ? "Try adjusting your search or filters"
                                  : "Add your first product to get started"}
                              </p>
                              {!searchQuery && (
                                <Button
                                  className="mt-4 bg-red-800 hover:bg-red-700"
                                  onClick={() => setIsAddProductOpen(true)}
                                >
                                  <Plus className="mr-2 h-4 w-4" />
                                  Add Product
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        currentProducts.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedProducts.includes(product.id)}
                                onCheckedChange={() => toggleProductSelection(product.id)}
                                aria-label={`Select ${product.name}`}
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <Image
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    width={40}
                                    height={40}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="font-medium text-gray-900">{product.name}</div>
                                  <div className="text-xs text-gray-500">ID: {product.id}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <StatusBadge status={product.status} />
                            </TableCell>
                            <TableCell>
                              <div className={`${product.inventory <= 5 ? "text-red-600 font-medium" : ""}`}>
                                {product.inventory} in stock
                              </div>
                            </TableCell>
                            <TableCell>${product.price.toFixed(2)}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.sku}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Copy className="mr-2 h-4 w-4" />
                                    Duplicate
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Tag className="mr-2 h-4 w-4" />
                                    Add to Collection
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </Card>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {currentProducts.length === 0 ? (
                    <div className="col-span-full text-center py-8">
                      <div className="flex flex-col items-center justify-center">
                        <Package className="h-12 w-12 text-gray-300 mb-2" />
                        <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                        <p className="text-gray-500 mt-1">
                          {searchQuery
                            ? "Try adjusting your search or filters"
                            : "Add your first product to get started"}
                        </p>
                        {!searchQuery && (
                          <Button
                            className="mt-4 bg-red-800 hover:bg-red-700"
                            onClick={() => setIsAddProductOpen(true)}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Product
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    currentProducts.map((product) => (
                      <Card key={product.id} className="overflow-hidden">
                        <div className="relative">
                          <div className="aspect-square overflow-hidden">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={300}
                              height={300}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="absolute top-2 left-2">
                            <StatusBadge status={product.status} />
                          </div>
                          <div className="absolute top-2 right-2">
                            <Checkbox
                              checked={selectedProducts.includes(product.id)}
                              onCheckedChange={() => toggleProductSelection(product.id)}
                              aria-label={`Select ${product.name}`}
                            />
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-gray-900 line-clamp-1">{product.name}</h3>
                          <div className="mt-1 flex items-center justify-between">
                            <div className="text-sm font-medium">${product.price.toFixed(2)}</div>
                            <div className="text-xs text-gray-500">SKU: {product.sku}</div>
                          </div>
                          <div className="mt-1 flex items-center justify-between">
                            <div
                              className={`text-xs ${product.inventory <= 5 ? "text-red-600 font-medium" : "text-gray-500"}`}
                            >
                              {product.inventory} in stock
                            </div>
                            <div className="text-xs text-gray-500">{product.category}</div>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <Button variant="outline" size="sm" className="w-full">
                              <Edit className="mr-2 h-3 w-3" />
                              Edit
                            </Button>
                            <Button variant="ghost" size="icon" className="ml-2">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              )}

              {currentProducts.length > 0 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-500">
                    Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, sortedProducts.length)} of{" "}
                    {sortedProducts.length} products
                  </div>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                          aria-disabled={currentPage === 1}
                        />
                      </PaginationItem>
                      {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
                        let pageNumber = currentPage
                        if (totalPages <= 5) {
                          pageNumber = index + 1
                        } else if (currentPage <= 3) {
                          pageNumber = index + 1
                        } else if (currentPage >= totalPages - 2) {
                          pageNumber = totalPages - 4 + index
                        } else {
                          pageNumber = currentPage - 2 + index
                        }

                        return (
                          <PaginationItem key={index}>
                            <PaginationLink
                              isActive={currentPage === pageNumber}
                              onClick={() => setCurrentPage(pageNumber)}
                            >
                              {pageNumber}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      })}
                      {totalPages > 5 && currentPage < totalPages - 2 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                          aria-disabled={currentPage === totalPages}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </TabsContent>

            <TabsContent value="active" className="m-0">
              {/* Similar content as all-products but filtered for active products */}
              <Card>
                <CardContent className="p-6">
                  <p>Active products content would go here, filtered to show only active products.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="low-inventory" className="m-0">
              <Card>
                <CardContent className="p-6">
                  <p>Low inventory products content would go here, filtered to show only products with low stock.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="out-of-stock" className="m-0">
              <Card>
                <CardContent className="p-6">
                  <p>
                    Out of stock products content would go here, filtered to show only products with zero inventory.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}

