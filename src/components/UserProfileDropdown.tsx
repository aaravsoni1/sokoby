"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/LanguageContext"
import {
    ChevronDown,
    CreditCard,
    Languages,
    LogOut,
    User
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export function UserProfileDropdown() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { setLanguage, t } = useLanguage()

  const handleLogout = () => {
    try {
      // Clear authentication token and merchant ID
      localStorage.removeItem("auth_token")
      localStorage.removeItem("merchantId")
      
      // Dispatch storage event for cross-tab logout
      window.dispatchEvent(new Event('storage'))
      
      // Show logout toast
      toast.success("Logged out successfully", {
        duration: 2000,
        position: "top-right"
      })
      
      // Redirect to home page
      router.push("/")
    } catch (error) {
      console.error("Logout failed:", error)
      toast.error("Logout failed. Please try again.")
    }
  }

  const handleProfileClick = async () => {
    try {
      const merchantId = localStorage.getItem("merchantId")
      const authToken = localStorage.getItem("auth_token")
      
      if (!merchantId) {
        toast.error("Merchant ID not found. Please log in again.")
        return
      }

      if (!authToken) {
        toast.error("Authentication token not found. Please log in again.")
        return
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/merchant/getById?id=${merchantId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (!response.ok) {
        // Check for specific error status
        if (response.status === 401) {
          toast.error("Unauthorized. Please log in again.")
          // Clear tokens and redirect to login
          localStorage.removeItem("auth_token")
          localStorage.removeItem("merchantId")
          router.push("/auth")
          return
        }
        throw new Error('Failed to fetch profile')
      }

      const profileData = await response.json()
      
      // Store profile data in localStorage for profile page to use
      localStorage.setItem("merchantProfile", JSON.stringify(profileData))
      
      // Navigate to profile page
      router.push("/profile")
    } catch (error) {
      console.error("Profile fetch failed:", error)
      toast.error("Failed to load profile. Please try again.")
    }
  }

  const handleSubscriptionsClick = () => {
    router.push("/subscriptions")
  }

  const handleLanguageChange = (newLanguage: 'en' | 'es' | 'fr') => {
    setLanguage(newLanguage)
    toast.success(`Language changed to ${newLanguage.toUpperCase()}`)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          {t('my_account')}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{t('my_account')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleProfileClick}>
          <User className="mr-2 h-4 w-4" />
          <span>{t('my_profile')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSubscriptionsClick}>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>{t('subscriptions')}</span>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Languages className="mr-2 h-4 w-4" />
            <span>{t('languages')}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguageChange('es')}>
              Español
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguageChange('fr')}>
              Français
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t('logout')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 