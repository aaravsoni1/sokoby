"use client"

import {
  Filter,
  Plus,
  Search,
  Settings2
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

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
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Denim Jeans",
    status: "Active",
    inventory: 50,
    price: 79.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=2026&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Running Shoes",
    status: "Draft",
    inventory: 0,
    price: 99.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
  },
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter products based on search query
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toString().includes(searchQuery)

    return matchesSearch
  })

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
              {filteredProducts.map((product) => (
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
                  <TableCell>${product.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

