"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

type Language = 'en' | 'es' | 'fr'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('preferred_language') as Language) || 'en'
    }
    return 'en'
  })
  const [translations, setTranslations] = useState<Record<string, string>>({})

  useEffect(() => {
    // Load translations for the current language
    import(`@/translations/${language}.json`)
      .then(module => {
        setTranslations(module.default)
      })
      .catch(error => {
        console.error(`Failed to load translations for ${language}:`, error)
      })
  }, [language])

  const t = (key: string): string => {
    return translations[key] || key
  }

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred_language', newLanguage)
      document.documentElement.lang = newLanguage
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 