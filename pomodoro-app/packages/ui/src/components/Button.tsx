import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../utils/cn'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  animate?: boolean
}

const buttonVariants = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500',
  secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500',
  outline: 'border border-neutral-300 text-neutral-700 hover:bg-neutral-50 focus:ring-primary-500',
  ghost: 'text-neutral-600 hover:bg-neutral-100 focus:ring-primary-500',
  danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500'
}

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    leftIcon,
    rightIcon,
    animate = true,
    children, 
    disabled,
    ...props 
  }, ref) => {
    const buttonClasses = cn(
      // Base styles
      'inline-flex items-center justify-center gap-2 rounded-lg font-medium',
      'transition-all duration-200 ease-in-out',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      // Variant styles
      buttonVariants[variant],
      // Size styles
      buttonSizes[size],
      // Custom classes
      className
    )

    const ButtonComponent = animate ? motion.button : 'button'
    const motionProps = animate ? {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
      transition: { type: 'spring', stiffness: 400, damping: 17 }
    } : {}

    return (
      <ButtonComponent
        ref={ref}
        className={buttonClasses}
        disabled={disabled || isLoading}
        {...(animate ? motionProps : {})}
        {...props}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : leftIcon ? (
          <span className="w-4 h-4">{leftIcon}</span>
        ) : null}
        
        {children}
        
        {rightIcon && !isLoading && (
          <span className="w-4 h-4">{rightIcon}</span>
        )}
      </ButtonComponent>
    )
  }
)

Button.displayName = 'Button'