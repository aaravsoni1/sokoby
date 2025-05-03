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
        <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-3xl font-bold">Theme Customization</h1>
            <Button
              onClick={() => setShowCustomizer(!showCustomizer)}
              variant="outline"
              className="w-full sm:w-auto text-xs sm:text-sm"
            >
              <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              {showCustomizer ? 'Close Customizer' : 'Open Customizer'}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Theme Preview Cards */}
            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="aspect-video relative">
                <img
                  src="https://images.unsplash.com/photo-1675185521859-0342ab38c2fb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Dawn Theme Preview"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="text-base sm:text-xl font-semibold mb-2">Dawn</h3>
                <p className="text-gray-600 mb-2 sm:mb-4 text-xs sm:text-base">
                  A clean, modern theme optimized for performance
                </p>
                <Button className="w-full text-xs sm:text-sm">Select Theme</Button>
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