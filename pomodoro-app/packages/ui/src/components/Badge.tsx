'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../utils/cn'

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  rounded?: boolean
  animate?: boolean
  className?: string
}

const badgeVariants = {
  primary: 'bg-primary-100 text-primary-800 border-primary-200',
  secondary: 'bg-secondary-100 text-secondary-800 border-secondary-200',
  success: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-orange-100 text-orange-800 border-orange-200',
  danger: 'bg-red-100 text-red-800 border-red-200',
  neutral: 'bg-neutral-100 text-neutral-800 border-neutral-200'
}

const badgeSizes = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-2.5 py-1.5 text-sm',
  lg: 'px-3 py-2 text-base'
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  rounded = true,
  animate = true,
  className
}) => {
  const badgeClasses = cn(
    'inline-flex items-center font-medium border',
    badgeVariants[variant],
    badgeSizes[size],
    rounded ? 'rounded-full' : 'rounded-md',
    className
  )

  if (animate) {
    return (
      <motion.span
        className={badgeClasses}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        whileHover={{ scale: 1.05 }}
      >
        {children}
      </motion.span>
    )
  }

  return (
    <span className={badgeClasses}>
      {children}
    </span>
  )
}

// Dot Badge for notifications
export interface DotBadgeProps {
  count?: number
  showZero?: boolean
  max?: number
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children?: React.ReactNode
}

const dotVariants = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
  success: 'bg-green-500',
  warning: 'bg-orange-500',
  danger: 'bg-red-500'
}

const dotSizes = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4'
}

export const DotBadge: React.FC<DotBadgeProps> = ({
  count,
  showZero = false,
  max = 99,
  variant = 'danger',
  size = 'md',
  className,
  children
}) => {
  const shouldShow = count !== undefined && (count > 0 || showZero)
  const displayCount = count !== undefined && count > max ? `${max}+` : count

  return (
    <div className="relative inline-flex">
      {children}
      {shouldShow && (
        <motion.div
          className={cn(
            'absolute -top-1 -right-1 rounded-full flex items-center justify-center',
            dotVariants[variant],
            count !== undefined && count > 0 ? 'min-w-[1.25rem] h-5 px-1' : dotSizes[size],
            className
          )}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          {count !== undefined && count > 0 && (
            <span className="text-xs font-medium text-white leading-none">
              {displayCount}
            </span>
          )}
        </motion.div>
      )}
    </div>
  )
}