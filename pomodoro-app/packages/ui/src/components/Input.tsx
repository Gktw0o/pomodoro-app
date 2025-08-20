import React from 'react'
import { cn } from '../utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helper?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: 'default' | 'filled' | 'outlined'
}

const inputVariants = {
  default: 'border border-neutral-300 bg-white focus:border-primary-500 focus:ring-primary-500',
  filled: 'border-0 bg-neutral-100 focus:bg-white focus:ring-primary-500',
  outlined: 'border-2 border-neutral-300 bg-transparent focus:border-primary-500 focus:ring-0'
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type = 'text',
    label,
    error,
    helper,
    leftIcon,
    rightIcon,
    variant = 'default',
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    
    const inputClasses = cn(
      // Base styles
      'flex w-full rounded-lg px-3 py-2 text-sm',
      'transition-all duration-200 ease-in-out',
      'placeholder:text-neutral-400',
      'focus:outline-none focus:ring-2 focus:ring-offset-0',
      'disabled:cursor-not-allowed disabled:opacity-50',
      // Variant styles
      inputVariants[variant],
      // Icon padding
      leftIcon && 'pl-10',
      rightIcon && 'pr-10',
      // Error state
      error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
      // Custom classes
      className
    )

    return (
      <div className="space-y-1">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-neutral-700"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="w-4 h-4 text-neutral-400">{leftIcon}</span>
            </div>
          )}
          
          <input
            ref={ref}
            type={type}
            id={inputId}
            className={inputClasses}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="w-4 h-4 text-neutral-400">{rightIcon}</span>
            </div>
          )}
        </div>
        
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        
        {helper && !error && (
          <p className="text-sm text-neutral-500">{helper}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'