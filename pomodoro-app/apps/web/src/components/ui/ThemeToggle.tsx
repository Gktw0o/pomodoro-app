'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Button } from '@pomodoro/ui'

interface ThemeToggleProps {
  variant?: 'icon' | 'button' | 'dropdown'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

const themeIcons = {
  light: Sun,
  dark: Moon,
  system: Monitor
}

const themeLabels = {
  light: 'Light',
  dark: 'Dark',
  system: 'System'
}

// Simple toggle button (cycles through themes)
export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'icon',
  size = 'md',
  showLabel = false,
  className
}) => {
  const { theme, setTheme } = useTheme()

  const cycleTheme = () => {
    const themes = ['light', 'dark', 'system'] as const
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const CurrentIcon = themeIcons[theme]

  if (variant === 'icon') {
    return (
      <motion.button
        onClick={cycleTheme}
        className={`p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-800 transition-colors ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={`Current theme: ${themeLabels[theme]}`}
      >
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <CurrentIcon className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'}`} />
        </motion.div>
      </motion.button>
    )
  }

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={cycleTheme}
      leftIcon={<CurrentIcon />}
      className={className}
    >
      {showLabel && themeLabels[theme]}
    </Button>
  )
}

// Theme selector with all options
export const ThemeSelector: React.FC<{
  className?: string
}> = ({ className }) => {
  const { theme, setTheme } = useTheme()

  const themes = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor }
  ] as const

  return (
    <div className={`flex items-center space-x-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg ${className}`}>
      {themes.map(({ value, label, icon: Icon }) => (
        <motion.button
          key={value}
          onClick={() => setTheme(value)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            theme === value
              ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Icon className="w-4 h-4" />
          <span>{label}</span>
        </motion.button>
      ))}
    </div>
  )
}

// Animated theme toggle with sun/moon transition
export const AnimatedThemeToggle: React.FC<{
  className?: string
}> = ({ className }) => {
  const { resolvedTheme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
        resolvedTheme === 'dark' 
          ? 'bg-neutral-700' 
          : 'bg-yellow-200'
      } ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors duration-300 ${
          resolvedTheme === 'dark'
            ? 'bg-neutral-300'
            : 'bg-yellow-500'
        }`}
        animate={{
          x: resolvedTheme === 'dark' ? 24 : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30
        }}
      >
        <motion.div
          key={resolvedTheme}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {resolvedTheme === 'dark' ? (
            <Moon className="w-3 h-3 text-neutral-700" />
          ) : (
            <Sun className="w-3 h-3 text-yellow-700" />
          )}
        </motion.div>
      </motion.div>
    </motion.button>
  )
}