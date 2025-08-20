'use client'

import { useState, useEffect, useCallback, createContext, useContext } from 'react'

type Theme = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

// Create theme context
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Custom hook for theme management
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Theme provider hook
export const useThemeProvider = () => {
  const [theme, setThemeState] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light')

  // Get system preference
  const getSystemTheme = useCallback((): ResolvedTheme => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  }, [])

  // Update resolved theme
  const updateResolvedTheme = useCallback((currentTheme: Theme) => {
    const newResolvedTheme = currentTheme === 'system' ? getSystemTheme() : currentTheme
    setResolvedTheme(newResolvedTheme)
    
    // Update document class
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      root.classList.remove('light', 'dark')
      root.classList.add(newResolvedTheme)
      root.setAttribute('data-theme', newResolvedTheme)
    }
  }, [getSystemTheme])

  // Set theme
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    updateResolvedTheme(newTheme)
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme)
    }
  }, [updateResolvedTheme])

  // Toggle between light and dark (ignoring system)
  const toggleTheme = useCallback(() => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }, [resolvedTheme, setTheme])

  // Initialize theme
  useEffect(() => {
    // Get saved theme or default to system
    const savedTheme = (typeof window !== 'undefined' ? localStorage.getItem('theme') : null) as Theme | null
    const initialTheme = savedTheme || 'system'
    
    setThemeState(initialTheme)
    updateResolvedTheme(initialTheme)
  }, [updateResolvedTheme])

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = () => {
      if (theme === 'system') {
        updateResolvedTheme('system')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, updateResolvedTheme])

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme
  }
}

// Theme detection hook (standalone)
export const useSystemTheme = () => {
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>('light')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const updateSystemTheme = () => {
      setSystemTheme(mediaQuery.matches ? 'dark' : 'light')
    }

    updateSystemTheme()
    mediaQuery.addEventListener('change', updateSystemTheme)

    return () => mediaQuery.removeEventListener('change', updateSystemTheme)
  }, [])

  return systemTheme
}

// Preferred color scheme hook
export const usePreferredColorScheme = () => {
  const [preferredScheme, setPreferredScheme] = useState<'light' | 'dark' | 'no-preference'>('no-preference')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const lightQuery = window.matchMedia('(prefers-color-scheme: light)')

    const updatePreference = () => {
      if (darkQuery.matches) {
        setPreferredScheme('dark')
      } else if (lightQuery.matches) {
        setPreferredScheme('light')
      } else {
        setPreferredScheme('no-preference')
      }
    }

    updatePreference()
    
    darkQuery.addEventListener('change', updatePreference)
    lightQuery.addEventListener('change', updatePreference)

    return () => {
      darkQuery.removeEventListener('change', updatePreference)
      lightQuery.removeEventListener('change', updatePreference)
    }
  }, [])

  return preferredScheme
}