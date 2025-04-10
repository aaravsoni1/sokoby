"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { UserProfileDropdown } from "@/components/UserProfileDropdown"

export function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const checkAuthentication = () => {
    const token = localStorage.getItem("auth_token")
    setIsAuthenticated(!!token)
  }

  useEffect(() => {
    // Check initial authentication
    checkAuthentication()

    // Add event listener for storage changes (for cross-tab logout)
    window.addEventListener('storage', checkAuthentication)

    // Cleanup listener
    return () => {
      window.removeEventListener('storage', checkAuthentication)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/sokobylogo.png" 
            alt="Sokoby"
            width={150} 
            height={50} 
            className="h-11 w-auto"
          />
        </Link>
        <nav className="hidden space-x-6 md:flex">
          <Link href="/support" className="text-sm font-medium text-gray-700 hover:text-red-800">
            Support
          </Link>
          <Link href="/solutions" className="text-sm font-medium text-gray-700 hover:text-red-800">
            Solutions
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-gray-700 hover:text-red-800">
            Pricing
          </Link>
          <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-red-800">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-red-800">
            Contact
          </Link>
        </nav>
        
        <div className="hidden md:flex md:items-center md:space-x-4">
          {isAuthenticated ? (
            <UserProfileDropdown />
          ) : (
            <>
              <Link href="/auth" className="text-sm font-medium text-gray-700 hover:text-red-800">
                Log in
              </Link>
              <Button className="bg-red-800 hover:bg-red-700">Get Started</Button>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          {isAuthenticated ? (
            <UserProfileDropdown />
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/auth" className="text-sm font-medium text-gray-700 hover:text-red-800">
                Log in
              </Link>
              <Button size="sm" className="bg-red-800 hover:bg-red-700">Get Started</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
} 