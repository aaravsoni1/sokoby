"use client"

import { productService } from "@/services/productService"
import { AxiosError } from "axios"
import { ArrowLeft, Image as ImageIcon, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function NewProductPage() {
  const router = useRouter()
  const [images, setImages] = useState<{url: string, file: File}[]>([])
  const [variants, setVariants] = useState([{ id: 1, title: "", price: "", sku: "", stock: "" }])
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    comparedPrice: "",
    skuCode: "",
    stockQuantity: "",
    status: "DRAFT",
    barcode: "",
    productType: "",
    vendor: "",
    collectionType: "",
  })

  useEffect(() => {
    // Check if user is authenticated and has store ID
    const authToken = localStorage.getItem("auth_token")
    const currentStoreId = localStorage.getItem("currentStoreId")
    if (!authToken || !currentStoreId) {
      router.push("/auth")
    }
  }, [router])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map(file => ({
        url: URL.createObjectURL(file),
        file: file
      }))
      setImages([...images, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const addVariant = () => {
    setVariants([...variants, { id: variants.length + 1, title: "", price: "", sku: "", stock: "" }])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleVariantChange = (index: number, field: string, value: string) => {
    setVariants(prev => prev.map((variant, i) => 
      i === index ? { ...variant, [field]: value } : variant
    ))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const formDataToSend = new FormData()
      const currentStoreId = localStorage.getItem("currentStoreId")
      const authToken = localStorage.getItem("auth_token")

      if (!currentStoreId || !authToken) {
        toast.error("Please login and select a store first")
        router.push("/login")
        return
      }

      // Add basic product information
      formDataToSend.append("title", formData.title)
      formDataToSend.append("description", formData.description)
      formDataToSend.append("price", formData.price)
      formDataToSend.append("comparedPrice", formData.comparedPrice)
      formDataToSend.append("skuCode", formData.skuCode)
      formDataToSend.append("stockQuantity", formData.stockQuantity)
      formDataToSend.append("status", formData.status)
      formDataToSend.append("barcode", formData.barcode)
      formDataToSend.append("storeId", currentStoreId)

      // Add collection information
      formDataToSend.append("collection.productType", formData.productType)
      formDataToSend.append("collection.vendor", formData.vendor)
      formDataToSend.append("collection.type", formData.collectionType)

      // Add variants information
      variants.forEach((variant, index) => {
        formDataToSend.append(`variants[${index}].name`, variant.title)
        formDataToSend.append(`variants[${index}].price`, variant.price)
        formDataToSend.append(`variants[${index}].skuCode`, variant.sku)
        formDataToSend.append(`variants[${index}].stockQuantity`, variant.stock)
      })

      // Add images using the stored File objects
      images.forEach((image) => {
        formDataToSend.append("files", image.file)
      })

      const response = await productService.createProductWithFormData(formDataToSend)
      console.log('Product creation response:', response)
      
      // Store the product ID in localStorage
      if (response && response.productId) {
        console.log('Setting product ID in localStorage:', response.productId)
        localStorage.setItem('currentProductId', response.productId)
        toast.success("Product created successfully")
        console.log('Redirecting to products page...')
        await router.replace("/dashboard/products")
      } else {
        console.log('No product ID in response:', response)
        toast.error("Failed to create product: No product ID received")
      }
    } catch (error: unknown) {
      console.error("Error creating product:", error)
      
      // Handle authentication errors
      if (error instanceof AxiosError && (error.response?.status === 401 || error.response?.status === 403)) {
        toast.error("Your session has expired. Please login again.")
        localStorage.removeItem("auth_token")
        localStorage.removeItem("currentStoreId")
        router.push("/login")
        return
      }

      // Handle other errors
      if (error instanceof AxiosError && error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Failed to create product. Please try again.")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container flex flex-col gap-4 md:flex-row h-auto md:h-16 items-start md:items-center justify-between px-2 sm:px-4 md:px-4 py-4 md:py-0">
          <div className="flex items-center gap-3 md:gap-4 w-full">
            <Link href="/dashboard/products" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-lg md:text-xl font-semibold">Add product</h1>
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4 w-full md:w-auto">
            <Button variant="outline" className="w-full md:w-auto" onClick={() => setFormData(prev => ({ ...prev, status: "DRAFT" }))}>
              Save as draft
            </Button>
            <Button 
              className="bg-red-800 hover:bg-red-700 w-full md:w-auto"
              onClick={(e) => {
                setFormData(prev => ({ ...prev, status: "ACTIVE" }))
                handleSubmit(e)
              }}
            >
              Save product
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-4 sm:py-8 px-2 sm:px-4">
        <form onSubmit={handleSubmit} className="grid gap-6 md:gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Basic information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Product title</Label>
                  <Input 
                    id="title" 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter product title" 
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description" 
                    className="min-h-[100px] md:min-h-[150px] text-sm"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="simple">
                  <TabsList className="mb-4 md:mb-6">
                    <TabsTrigger value="simple">Simple pricing</TabsTrigger>
                    <TabsTrigger value="variants">Variants</TabsTrigger>
                  </TabsList>
                  <TabsContent value="simple" className="space-y-4 md:space-y-6">
                    <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="price">Price</Label>
                        <Input 
                          id="price" 
                          name="price"
                          type="number" 
                          value={formData.price}
                          onChange={handleInputChange}
                          placeholder="0.00" 
                          className="text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="comparedPrice">Compare at price</Label>
                        <Input 
                          id="comparedPrice" 
                          name="comparedPrice"
                          type="number" 
                          value={formData.comparedPrice}
                          onChange={handleInputChange}
                          placeholder="0.00" 
                          className="text-sm"
                        />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="variants" className="space-y-4 md:space-y-6">
                    <div className="space-y-4">
                      {variants.map((variant, index) => (
                        <div key={variant.id} className="grid gap-4 p-4 border rounded-lg">
                          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                            <h3 className="font-medium">Variant {index + 1}</h3>
                            <Button 
                              type="button"
                              variant="ghost" 
                              size="icon" 
                              className="text-red-600 hover:text-red-700"
                              onClick={() => setVariants(prev => prev.filter((_, i) => i !== index))}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                              <Label>Title</Label>
                              <Input 
                                value={variant.title}
                                onChange={(e) => handleVariantChange(index, "title", e.target.value)}
                                placeholder="e.g., Size, Color" 
                                className="text-sm"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Price</Label>
                              <Input 
                                type="number" 
                                value={variant.price}
                                onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                                placeholder="0.00" 
                                className="text-sm"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>SKU</Label>
                              <Input 
                                value={variant.sku}
                                onChange={(e) => handleVariantChange(index, "sku", e.target.value)}
                                placeholder="Enter SKU" 
                                className="text-sm"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Stock</Label>
                              <Input 
                                type="number"
                                value={variant.stock}
                                onChange={(e) => handleVariantChange(index, "stock", e.target.value)}
                                placeholder="Enter stock quantity" 
                                className="text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button 
                        type="button"
                        variant="outline" 
                        onClick={addVariant} 
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add variant
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Inventory */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Inventory</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="skuCode">SKU</Label>
                  <Input 
                    id="skuCode" 
                    name="skuCode"
                    value={formData.skuCode}
                    onChange={handleInputChange}
                    placeholder="Enter SKU" 
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="barcode">Barcode</Label>
                  <Input 
                    id="barcode" 
                    name="barcode"
                    value={formData.barcode}
                    onChange={handleInputChange}
                    placeholder="Enter barcode" 
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stockQuantity">Quantity</Label>
                  <Input 
                    id="stockQuantity" 
                    name="stockQuantity"
                    type="number" 
                    value={formData.stockQuantity}
                    onChange={handleInputChange}
                    placeholder="0" 
                    className="text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 md:space-y-8">
            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Select 
                  value={formData.status}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="ARCHIVED">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Product Images */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Product images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative aspect-square">
                        <Image
                          src={image.url}
                          alt={`Product image ${index + 1}`}
                          fill
                          className="object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    {images.length < 4 && (
                      <label className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                        <div className="text-center">
                          <ImageIcon className="h-8 w-8 mx-auto text-gray-400" />
                          <span className="mt-2 text-xs md:text-sm text-gray-600">Add images</span>
                        </div>
                      </label>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organization */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Organization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="productType">Product type</Label>
                  <Input 
                    id="productType" 
                    name="productType"
                    value={formData.productType}
                    onChange={handleInputChange}
                    placeholder="e.g., Shirt, Mug" 
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vendor">Vendor</Label>
                  <Input 
                    id="vendor" 
                    name="vendor"
                    value={formData.vendor}
                    onChange={handleInputChange}
                    placeholder="Enter vendor name" 
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="collectionType">Collection type</Label>
                  <Select
                    value={formData.collectionType}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, collectionType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select collection type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NEW_ARRIVAL">New Arrival</SelectItem>
                      <SelectItem value="SALE">Sale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </main>
    </div>
  )
} 