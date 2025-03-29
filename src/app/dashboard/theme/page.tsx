"use client"

import { Button } from '@/components/ui/button'
import ThemeCustomizer from '@/themes/dawn/components/ThemeCustomizer'
import { ThemeProvider } from '@/themes/dawn/context/ThemeContext'
import BaseLayout from '@/themes/dawn/layouts/BaseLayout'
import { Settings } from 'lucide-react'
import { useState } from 'react'

export default function ThemePage() {
  const [showCustomizer, setShowCustomizer] = useState(false)

  return (
    <ThemeProvider>
      <BaseLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Theme Customization</h1>
            <Button
              onClick={() => setShowCustomizer(!showCustomizer)}
              variant="outline"
            >
              <Settings className="h-4 w-4 mr-2" />
              {showCustomizer ? 'Close Customizer' : 'Open Customizer'}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Theme Preview Cards */}
            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="aspect-video relative">
                <img
                  src="/themes/dawn-preview.jpg"
                  alt="Dawn Theme Preview"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Dawn</h3>
                <p className="text-gray-600 mb-4">
                  A clean, modern theme optimized for performance
                </p>
                <Button className="w-full">Select Theme</Button>
              </div>
            </div>

            {/* Add more theme preview cards here */}
          </div>
        </div>

        {/* Theme Customizer Sidebar */}
        {showCustomizer && <ThemeCustomizer />}
      </BaseLayout>
    </ThemeProvider>
  )
} 