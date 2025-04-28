"use client"

import { ArrowLeft, ImagePlus, Save, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ProductImage {
  id?: string
  imageUrl: string
  productId?: string
  file?: File
  isNew?: boolean
  uniqueKey?: string
}

interface ProductVariant {
  id?: string
  name: string
  skuCode: string
  price: number
  stockQuantity: number
}

interface Collection {
  [key: string]: unknown
}

export default function EditProductPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    storeId: "",
    status: "ACTIVE",
    comparedPrice: 0,
    skuCode: "",
    stockQuantity: 0,
    variants: [] as ProductVariant[],
    collection: {} as Collection, // Empty object
    removeImageIds: [] as string[],
    images: [] as ProductImage[]
  })

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const authToken = localStorage.getItem("auth_token")
        const productId = localStorage.getItem("currentProductId")
        
        if (!authToken) {
          toast.error("Please login first")
          router.push("/auth")
          return
        }
        
        if (!productId) {
          toast.error("No product selected")
          router.push("/dashboard/products")
          return
        }
        
        const response = await fetch(`http://localhost:8080/api/product/${productId}`, {
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
        
        const productData = await response.json()
        
        // Initialize form data with product data
        setFormData({
          title: productData.title || "",
          description: productData.description || "",
          price: productData.price || 0,
          storeId: productData.storeId || "",
          status: productData.status || "ACTIVE",
          comparedPrice: productData.comparedPrice || 0,
          skuCode: productData.skuCode || "",
          stockQuantity: productData.stockQuantity || 0,
          variants: productData.variants || [],
          collection: {}, // Empty collection
          removeImageIds: [],
          images: productData.images.map((img: ProductImage) => ({
            id: img.id,
            imageUrl: img.imageUrl,
            productId: img.productId,
            uniqueKey: `existing-${img.id || Date.now()}-${Math.random().toString(36).substr(2, 9)}`
          }))
        })
      } catch (error) {
        console.error("Error fetching product data:", error)
        toast.error("Failed to fetch product data")
      } finally {
        setLoading(false)
      }
    }

    fetchProductData()
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" || name === "comparedPrice" || name === "stockQuantity" 
        ? parseFloat(value) || 0 
        : value
    }))
  }

  const handleVariantChange = (index: number, field: string, value: string | number) => {
    setFormData(prev => {
      const updatedVariants = [...prev.variants]
      updatedVariants[index] = {
        ...updatedVariants[index],
        [field]: field === "price" || field === "stockQuantity" ? parseFloat(value as string) || 0 : value
      }
      return {
        ...prev,
        variants: updatedVariants
      }
    })
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const newImages: ProductImage[] = []
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      
      // More robust duplicate check
      const isDuplicate = formData.images.some(img => {
        // Check for existing URLs
        if (img.imageUrl === URL.createObjectURL(file)) return true
        
        // Check for existing files
        if (img.file && 
            img.file.name === file.name && 
            img.file.size === file.size && 
            img.file.type === file.type) return true
        
        return false
      })
      
      if (isDuplicate) {
        toast.warning(`Image ${file.name} is already added`)
        continue
      }

      newImages.push({
        imageUrl: URL.createObjectURL(file),
        file: file,
        isNew: true,
        uniqueKey: `new-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      })
    }

    // Update form data with new images
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }))
  }

  const handleImageRemoval = (imageToRemove: ProductImage) => {
    setFormData(prev => {
      // Improved image removal logic
      const updatedRemoveImageIds = imageToRemove.id 
        ? [...new Set([...prev.removeImageIds, imageToRemove.id])] 
        : prev.removeImageIds

      // Filter out the image, ensuring we remove by unique key
      const updatedImages = prev.images.filter(
        img => img.uniqueKey !== imageToRemove.uniqueKey
      )

      return {
        ...prev,
        removeImageIds: updatedRemoveImageIds,
        images: updatedImages
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setSaving(true)
      const authToken = localStorage.getItem("auth_token")
      const productId = localStorage.getItem("currentProductId")
      
      if (!authToken || !productId) {
        toast.error("Authentication error")
        return
      }
      
      // Prepare data for submission
      const dataToSubmit = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        storeId: formData.storeId,
        status: formData.status,
        comparedPrice: formData.comparedPrice,
        skuCode: formData.skuCode,
        stockQuantity: formData.stockQuantity,
        variants: formData.variants.map(variant => ({
          id: variant.id,
          name: variant.name,
          skuCode: variant.skuCode,
          price: variant.price,
          stockQuantity: variant.stockQuantity
        })),
        collection: {}, // Empty collection
        removeImageIds: formData.removeImageIds.length > 0 ? formData.removeImageIds : null
      }
      
      // Create FormData for file upload
      const formDataToSubmit = new FormData()
      
      // Add new images
      const newImageFiles = formData.images
        .filter(img => img.isNew && img.file)
        .map(img => img.file)
      
      if (newImageFiles && newImageFiles.length > 0) {
        newImageFiles.forEach((file) => {
          if (file) {
            formDataToSubmit.append('files', file)
          }
        })
      }
      
      // Append product data as JSON
      formDataToSubmit.append('productData', new Blob([JSON.stringify(dataToSubmit)], {
        type: 'application/json'
      }), 'productData.json')
      
      const response = await fetch(`http://localhost:8080/api/product/update/${productId}`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        credentials: 'include',
        body: formDataToSubmit
      })
      
      if (!response.ok) {
        // Try to get more detailed error information
        const errorText = await response.text()
        console.error('Server error response:', errorText)
        throw new Error(`Failed to update product: ${response.status} ${errorText}`)
      }
      
      toast.success("Product updated successfully")
      router.push("/dashboard/products")
    } catch (error) {
      console.error("Error updating product:", error)
      toast.error(error instanceof Error ? error.message : "Failed to update product")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading product data...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/products">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Edit Product</h1>
            <p className="text-gray-500">Update your product information</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Product Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="skuCode">SKU Code</Label>
                <Input
                  id="skuCode"
                  name="skuCode"
                  value={formData.skuCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="comparedPrice">Compare at Price</Label>
                <Input
                  id="comparedPrice"
                  name="comparedPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.comparedPrice}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="stockQuantity">Stock Quantity</Label>
                <Input
                  id="stockQuantity"
                  name="stockQuantity"
                  type="number"
                  min="0"
                  value={formData.stockQuantity}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="DRAFT">Draft</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
              />
            </div>
            
            {/* Product Images */}
            <div className="space-y-2">
              <Label>Product Images</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Add Image Button */}
                <div 
                  className="relative h-32 w-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-500 transition cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    className="hidden" 
                    accept="image/*" 
                    multiple
                    onChange={handleImageUpload}
                  />
                  <div className="text-center">
                    <ImagePlus className="mx-auto mb-2 text-gray-500" />
                    <p className="text-sm text-gray-500">Add Images</p>
                  </div>
                </div>

                {/* Existing and New Images */}
                {formData.images.map((image) => {
                  const isMarkedForRemoval = formData.removeImageIds.includes(image.id || '')
                  
                  return (
                    <div 
                      key={image.uniqueKey || image.id || image.imageUrl} 
                      className={`relative ${isMarkedForRemoval ? 'opacity-50' : ''}`}
                    >
                      <div className="relative h-32 w-full overflow-hidden rounded-lg">
                        <Image
                          src={image.imageUrl}
                          alt={`Product image`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <Button
                        type="button"
                        variant={isMarkedForRemoval ? "outline" : "destructive"}
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={() => handleImageRemoval(image)}
                      >
                        {isMarkedForRemoval ? (
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        ) : (
                          <Trash2 className="h-3 w-3" />
                        )}
                      </Button>
                      {isMarkedForRemoval && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                            Will be removed
                          </span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
            
            {/* Product Variants */}
            {formData.variants.length > 0 && (
              <div className="space-y-4">
                <Label>Product Variants</Label>
                {formData.variants.map((variant, index) => (
                  <Card key={variant.id}>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`variant-name-${index}`}>Variant Name</Label>
                          <Input
                            id={`variant-name-${index}`}
                            value={variant.name}
                            onChange={(e) => handleVariantChange(index, "name", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`variant-sku-${index}`}>SKU Code</Label>
                          <Input
                            id={`variant-sku-${index}`}
                            value={variant.skuCode}
                            onChange={(e) => handleVariantChange(index, "skuCode", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`variant-price-${index}`}>Price</Label>
                          <Input
                            id={`variant-price-${index}`}
                            type="number"
                            min="0"
                            step="0.01"
                            value={variant.price}
                            onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`variant-stock-${index}`}>Stock Quantity</Label>
                          <Input
                            id={`variant-stock-${index}`}
                            type="number"
                            min="0"
                            value={variant.stockQuantity}
                            onChange={(e) => handleVariantChange(index, "stockQuantity", e.target.value)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            <div className="flex justify-end">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
                <Save className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
} 