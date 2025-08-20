'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@pomodoro/ui'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'neutral' | 'white'
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars' | 'circle'
  className?: string
}

const sizeStyles = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12'
}

const colorStyles = {
  primary: 'text-primary-500',
  secondary: 'text-secondary-500',
  neutral: 'text-neutral-500',
  white: 'text-white'
}

// Spinner variant
const SpinnerVariant: React.FC<LoadingSpinnerProps> = ({ size = 'md', color = 'primary', className }) => (
  <motion.div
    className={cn('border-2 border-current border-t-transparent rounded-full', sizeStyles[size], colorStyles[color], className)}
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
  />
)

// Dots variant
const DotsVariant: React.FC<LoadingSpinnerProps> = ({ size = 'md', color = 'primary', className }) => {
  const dotSize = size === 'sm' ? 'w-1 h-1' : size === 'md' ? 'w-2 h-2' : size === 'lg' ? 'w-3 h-3' : 'w-4 h-4'
  
  return (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={cn('rounded-full bg-current', dotSize, colorStyles[color])}
          animate={{
            y: [0, -8, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.1
          }}
        />
      ))}
    </div>
  )
}

// Pulse variant
const PulseVariant: React.FC<LoadingSpinnerProps> = ({ size = 'md', color = 'primary', className }) => (
  <motion.div
    className={cn('rounded-full bg-current', sizeStyles[size], colorStyles[color], className)}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5]
    }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: 'easeInOut'
    }}
  />
)

// Bars variant
const BarsVariant: React.FC<LoadingSpinnerProps> = ({ size = 'md', color = 'primary', className }) => {
  const barHeight = size === 'sm' ? 'h-4' : size === 'md' ? 'h-6' : size === 'lg' ? 'h-8' : 'h-12'
  
  return (
    <div className={cn('flex items-end space-x-1', className)}>
      {[0, 1, 2, 3].map((index) => (
        <motion.div
          key={index}
          className={cn('w-1 bg-current rounded-sm', barHeight, colorStyles[color])}
          animate={{
            scaleY: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: index * 0.1
          }}
        />
      ))}
    </div>
  )
}

// Circle variant (growing circle)
const CircleVariant: React.FC<LoadingSpinnerProps> = ({ size = 'md', color = 'primary', className }) => (
  <div className={cn('relative', sizeStyles[size], className)}>
    <motion.div
      className={cn('absolute inset-0 rounded-full border-2 border-current', colorStyles[color])}
      animate={{
        scale: [0, 1],
        opacity: [1, 0]
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'easeOut'
      }}
    />
    <motion.div
      className={cn('absolute inset-0 rounded-full border-2 border-current', colorStyles[color])}
      animate={{
        scale: [0, 1],
        opacity: [1, 0]
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        delay: 0.5,
        ease: 'easeOut'
      }}
    />
  </div>
)

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ variant = 'spinner', ...props }) => {
  switch (variant) {
    case 'dots':
      return <DotsVariant {...props} />
    case 'pulse':
      return <PulseVariant {...props} />
    case 'bars':
      return <BarsVariant {...props} />
    case 'circle':
      return <CircleVariant {...props} />
    default:
      return <SpinnerVariant {...props} />
  }
}

// Full screen loading overlay
export const LoadingOverlay: React.FC<{
  isVisible: boolean
  message?: string
  variant?: LoadingSpinnerProps['variant']
}> = ({ isVisible, message = 'Loading...', variant = 'spinner' }) => {
  if (!isVisible) return null

  return (
    <motion.div
      className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinner size="lg" variant={variant} />
        <p className="text-neutral-600 font-medium">{message}</p>
      </div>
    </motion.div>
  )
}

// Skeleton loader
export const Skeleton: React.FC<{
  className?: string
  variant?: 'text' | 'rectangular' | 'circular'
  animation?: 'pulse' | 'wave'
}> = ({ className, variant = 'text', animation = 'pulse' }) => {
  const baseClasses = 'bg-neutral-200 rounded'
  
  const variantClasses = {
    text: 'h-4',
    rectangular: 'h-12',
    circular: 'rounded-full aspect-square'
  }

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-pulse' // Could be enhanced with wave animation
  }

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
    />
  )
}

// Skeleton text lines
export const SkeletonText: React.FC<{
  lines?: number
  className?: string
}> = ({ lines = 3, className }) => (
  <div className={cn('space-y-2', className)}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton
        key={index}
        className={index === lines - 1 ? 'w-3/4' : 'w-full'}
      />
    ))}
  </div>
)