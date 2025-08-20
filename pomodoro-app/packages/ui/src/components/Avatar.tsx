'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import { cn } from '../utils/cn'

export interface AvatarProps {
  src?: string
  alt?: string
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  variant?: 'circular' | 'rounded' | 'square'
  status?: 'online' | 'offline' | 'away' | 'busy'
  showStatus?: boolean
  fallbackColor?: string
  animate?: boolean
  className?: string
  onClick?: () => void
}

const sizeStyles = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
  '2xl': 'w-20 h-20 text-2xl'
}

const variantStyles = {
  circular: 'rounded-full',
  rounded: 'rounded-lg',
  square: 'rounded-none'
}

const statusColors = {
  online: 'bg-green-500',
  offline: 'bg-neutral-400',
  away: 'bg-orange-500',
  busy: 'bg-red-500'
}

const statusSizes = {
  xs: 'w-2 h-2',
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-3 h-3',
  xl: 'w-4 h-4',
  '2xl': 'w-4 h-4'
}

// Generate initials from name
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Generate consistent color from string
const getColorFromString = (str: string): string => {
  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-amber-500',
    'bg-yellow-500',
    'bg-lime-500',
    'bg-green-500',
    'bg-emerald-500',
    'bg-teal-500',
    'bg-cyan-500',
    'bg-sky-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-violet-500',
    'bg-purple-500',
    'bg-fuchsia-500',
    'bg-pink-500',
    'bg-rose-500'
  ]
  
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  return colors[Math.abs(hash) % colors.length]
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  variant = 'circular',
  status,
  showStatus = false,
  fallbackColor,
  animate = true,
  className,
  onClick
}) => {
  const [imageError, setImageError] = React.useState(false)
  const [imageLoaded, setImageLoaded] = React.useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const initials = name ? getInitials(name) : ''
  const bgColor = fallbackColor || (name ? getColorFromString(name) : 'bg-neutral-500')

  const avatarClasses = cn(
    'relative inline-flex items-center justify-center overflow-hidden font-medium text-white',
    sizeStyles[size],
    variantStyles[variant],
    onClick && 'cursor-pointer hover:opacity-80 transition-opacity',
    className
  )

  const AvatarComponent = animate ? motion.div : 'div'
  const motionProps = animate ? {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.2 }
  } : {}

  return (
    <div className="relative inline-flex">
      <AvatarComponent
        className={avatarClasses}
        onClick={onClick}
        {...(animate ? motionProps : {})}
      >
        {src && !imageError ? (
          <>
            <img
              src={src}
              alt={alt || name || 'Avatar'}
              className={cn(
                'w-full h-full object-cover transition-opacity duration-200',
                imageLoaded ? 'opacity-100' : 'opacity-0'
              )}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
            {!imageLoaded && (
              <div className={cn('absolute inset-0 flex items-center justify-center', bgColor)}>
                {initials || <User className="w-1/2 h-1/2" />}
              </div>
            )}
          </>
        ) : (
          <div className={cn('w-full h-full flex items-center justify-center', bgColor)}>
            {initials || <User className="w-1/2 h-1/2" />}
          </div>
        )}
      </AvatarComponent>

      {/* Status indicator */}
      {showStatus && status && (
        <motion.div
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-white',
            statusColors[status],
            statusSizes[size]
          )}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        />
      )}
    </div>
  )
}

// Avatar Group Component
export interface AvatarGroupProps {
  avatars: Array<{
    src?: string
    alt?: string
    name?: string
  }>
  max?: number
  size?: AvatarProps['size']
  variant?: AvatarProps['variant']
  spacing?: 'tight' | 'normal' | 'loose'
  className?: string
}

const spacingStyles = {
  tight: '-space-x-1',
  normal: '-space-x-2',
  loose: '-space-x-3'
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 5,
  size = 'md',
  variant = 'circular',
  spacing = 'normal',
  className
}) => {
  const visibleAvatars = avatars.slice(0, max)
  const remainingCount = avatars.length - max

  return (
    <div className={cn('flex items-center', spacingStyles[spacing], className)}>
      {visibleAvatars.map((avatar, index) => (
        <div key={index} className="relative border-2 border-white rounded-full">
          <Avatar
            {...avatar}
            size={size}
            variant={variant}
            animate={false}
          />
        </div>
      ))}
      
      {remainingCount > 0 && (
        <div className="relative border-2 border-white rounded-full">
          <Avatar
            name={`+${remainingCount}`}
            size={size}
            variant={variant}
            fallbackColor="bg-neutral-500"
            animate={false}
          />
        </div>
      )}
    </div>
  )
}