"use client"

import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ThemePage() {
  const [previewMode, setPreviewMode] = useState("desktop")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-semibold">Theme customizer</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex rounded-lg border">
              <Button
                variant={previewMode === "desktop" ? "default" : "ghost"}
                size="sm"
                onClick={() => setPreviewMode("desktop")}
              >
                Desktop
              </Button>
              <Button
                variant={previewMode === "mobile" ? "default" : "ghost"}
                size="sm"
                onClick={() => setPreviewMode("mobile")}
              >
                Mobile
              </Button>
            </div>
            <Button className="bg-red-800 hover:bg-red-700">Save changes</Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Theme Settings */}
          <div className="space-y-8">
            <Tabs defaultValue="colors" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="typography">Typography</TabsTrigger>
                <TabsTrigger value="layout">Layout</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Colors */}
              <TabsContent value="colors" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Brand colors</CardTitle>
                    <CardDescription>Customize your brand colors</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Primary color</Label>
                      <div className="flex gap-2">
                        <Input type="color" className="w-20" defaultValue="#991b1b" />
                        <Input placeholder="#991b1b" defaultValue="#991b1b" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Secondary color</Label>
                      <div className="flex gap-2">
                        <Input type="color" className="w-20" defaultValue="#1e293b" />
                        <Input placeholder="#1e293b" defaultValue="#1e293b" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Background color</Label>
                      <div className="flex gap-2">
                        <Input type="color" className="w-20" defaultValue="#ffffff" />
                        <Input placeholder="#ffffff" defaultValue="#ffffff" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Text colors</CardTitle>
                    <CardDescription>Customize your text colors</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Heading color</Label>
                      <div className="flex gap-2">
                        <Input type="color" className="w-20" defaultValue="#111827" />
                        <Input placeholder="#111827" defaultValue="#111827" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Body text color</Label>
                      <div className="flex gap-2">
                        <Input type="color" className="w-20" defaultValue="#4b5563" />
                        <Input placeholder="#4b5563" defaultValue="#4b5563" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Typography */}
              <TabsContent value="typography" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Font settings</CardTitle>
                    <CardDescription>Customize your font settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Heading font</Label>
                      <Select defaultValue="inter">
                        <SelectTrigger>
                          <SelectValue placeholder="Select font" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inter">Inter</SelectItem>
                          <SelectItem value="roboto">Roboto</SelectItem>
                          <SelectItem value="open-sans">Open Sans</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Body font</Label>
                      <Select defaultValue="inter">
                        <SelectTrigger>
                          <SelectValue placeholder="Select font" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inter">Inter</SelectItem>
                          <SelectItem value="roboto">Roboto</SelectItem>
                          <SelectItem value="open-sans">Open Sans</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Base font size</Label>
                      <Slider defaultValue={[16]} max={24} step={1} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Layout */}
              <TabsContent value="layout" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Layout settings</CardTitle>
                    <CardDescription>Customize your layout settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Container width</Label>
                      <Select defaultValue="max-w-7xl">
                        <SelectTrigger>
                          <SelectValue placeholder="Select width" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="max-w-5xl">Narrow</SelectItem>
                          <SelectItem value="max-w-7xl">Medium</SelectItem>
                          <SelectItem value="max-w-full">Wide</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Header style</Label>
                      <Select defaultValue="sticky">
                        <SelectTrigger>
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sticky">Sticky</SelectItem>
                          <SelectItem value="static">Static</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings */}
              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Theme settings</CardTitle>
                    <CardDescription>Configure your theme settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Theme mode</Label>
                      <Select defaultValue="light">
                        <SelectTrigger>
                          <SelectValue placeholder="Select mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Rounded corners</Label>
                      <Select defaultValue="md">
                        <SelectTrigger>
                          <SelectValue placeholder="Select radius" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="sm">Small</SelectItem>
                          <SelectItem value="md">Medium</SelectItem>
                          <SelectItem value="lg">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>See how your changes look in real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`relative aspect-[4/3] overflow-hidden rounded-lg border bg-white ${
                  previewMode === "mobile" ? "max-w-[375px] mx-auto" : ""
                }`}>
                  <Image
                    src="https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2088&auto=format&fit=crop"
                    alt="Store preview"
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
} 