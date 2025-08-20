'use client'

import { useState, useEffect } from 'react'

// Breakpoint values (matching Tailwind CSS)
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
}

type Breakpoint = keyof typeof breakpoints

export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState<{
    width: number
    height: number
  }>({
    width: 0,
    height: 0
  })

  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint | null>(null)

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      setScreenSize({ width, height })

      // Determine current breakpoint
      if (width >= breakpoints['2xl']) {
        setCurrentBreakpoint('2xl')
      } else if (width >= breakpoints.xl) {
        setCurrentBreakpoint('xl')
      } else if (width >= breakpoints.lg) {
        setCurrentBreakpoint('lg')
      } else if (width >= breakpoints.md) {
        setCurrentBreakpoint('md')
      } else if (width >= breakpoints.sm) {
        setCurrentBreakpoint('sm')
      } else {
        setCurrentBreakpoint(null) // Below sm
      }
    }

    // Set initial values
    updateScreenSize()

    // Add event listener
    window.addEventListener('resize', updateScreenSize)

    // Cleanup
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

  // Helper functions
  const isMobile = screenSize.width < breakpoints.md
  const isTablet = screenSize.width >= breakpoints.md && screenSize.width < breakpoints.lg
  const isDesktop = screenSize.width >= breakpoints.lg

  const isBreakpoint = (breakpoint: Breakpoint) => {
    return screenSize.width >= breakpoints[breakpoint]
  }

  const isBetween = (min: Breakpoint, max: Breakpoint) => {
    return screenSize.width >= breakpoints[min] && screenSize.width < breakpoints[max]
  }

  return {
    screenSize,
    currentBreakpoint,
    isMobile,
    isTablet,
    isDesktop,
    isBreakpoint,
    isBetween,
    breakpoints
  }
}

// Hook for media queries
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}

// Predefined media query hooks
export const useIsMobile = () => useMediaQuery(`(max-width: ${breakpoints.md - 1}px)`)
export const useIsTablet = () => useMediaQuery(`(min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px)`)
export const useIsDesktop = () => useMediaQuery(`(min-width: ${breakpoints.lg}px)`)

// Hook for orientation
export const useOrientation = () => {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait')

  useEffect(() => {
    const updateOrientation = () => {
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape')
    }

    updateOrientation()
    window.addEventListener('resize', updateOrientation)

    return () => window.removeEventListener('resize', updateOrientation)
  }, [])

  return orientation
}

// Hook for device detection
export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')

  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth
      
      if (width < breakpoints.md) {
        setDeviceType('mobile')
      } else if (width < breakpoints.lg) {
        setDeviceType('tablet')
      } else {
        setDeviceType('desktop')
      }
    }

    updateDeviceType()
    window.addEventListener('resize', updateDeviceType)

    return () => window.removeEventListener('resize', updateDeviceType)
  }, [])

  return deviceType
}