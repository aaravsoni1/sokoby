import React, { createContext, useContext, useEffect, useState } from 'react'
import themeConfig from '../config/theme.json'

interface ThemeContextType {
  settings: typeof themeConfig.settings
  updateSettings: (newSettings: Partial<typeof themeConfig.settings>) => void
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState(themeConfig.settings)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Load saved theme settings from localStorage
    const savedSettings = localStorage.getItem('themeSettings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const updateSettings = (newSettings: Partial<typeof themeConfig.settings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings }
      localStorage.setItem('themeSettings', JSON.stringify(updated))
      return updated
    })
  }

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev)
  }

  return (
    <ThemeContext.Provider
      value={{
        settings,
        updateSettings,
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
} 