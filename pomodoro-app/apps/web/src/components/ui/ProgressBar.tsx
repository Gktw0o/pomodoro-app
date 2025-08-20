'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@pomodoro/ui'

interface ProgressBarProps {
  value: number // 0-100
  max?: number
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  variant?: 'linear' | 'circular' | 'semicircular'
  showLabel?: boolean
  label?: string
  animated?: boolean
  striped?: boolean
  className?: string
}

const sizeStyles = {
  linear: {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  },
  circular: {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  }
}

const colorStyles = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
  success: 'bg-green-500',
  warning: 'bg-orange-500',
  danger: 'bg-red-500'
}

const backgroundStyles = {
  primary: 'bg-primary-100',
  secondary: 'bg-secondary-100',
  success: 'bg-green-100',
  warning: 'bg-orange-100',
  danger: 'bg-red-100'
}

// Linear Progress Bar
const LinearProgress: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  size = 'md',
  color = 'primary',
  showLabel = false,
  label,
  animated = true,
  striped = false,
  className
}) => {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-neutral-700">
            {label || 'Progress'}
          </span>
          <span className="text-sm text-neutral-500">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      
      <div className={cn(
        'w-full rounded-full overflow-hidden',
        sizeStyles.linear[size],
        backgroundStyles[color]
      )}>
        <motion.div
          className={cn(
            'h-full rounded-full transition-colors',
            colorStyles[color],
            striped && 'bg-stripes',
            animated && striped && 'animate-stripes'
          )}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

// Circular Progress Bar
const CircularProgress: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  size = 'md',
  color = 'primary',
  showLabel = true,
  className
}) => {
  const percentage = Math.min((value / max) * 100, 100)
  const radius = size === 'sm' ? 28 : size === 'md' ? 44 : 60
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className={cn('relative', sizeStyles.circular[size], className)}>
      <svg
        className="transform -rotate-90 w-full h-full"
        viewBox={`0 0 ${radius * 2 + 16} ${radius * 2 + 16}`}
      >
        {/* Background circle */}
        <circle
          cx={radius + 8}
          cy={radius + 8}
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className={cn('opacity-20', colorStyles[color].replace('bg-', 'text-'))}
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={radius + 8}
          cy={radius + 8}
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={colorStyles[color].replace('bg-', 'text-')}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn(
            'font-bold',
            size === 'sm' ? 'text-sm' : size === 'md' ? 'text-lg' : 'text-2xl',
            colorStyles[color].replace('bg-', 'text-')
          )}>
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  )
}

// Semicircular Progress Bar
const SemicircularProgress: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  size = 'md',
  color = 'primary',
  showLabel = true,
  className
}) => {
  const percentage = Math.min((value / max) * 100, 100)
  const radius = size === 'sm' ? 40 : size === 'md' ? 60 : 80
  const circumference = Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className={cn('relative', className)} style={{ width: radius * 2 + 16, height: radius + 8 }}>
      <svg
        className="transform rotate-0 w-full h-full"
        viewBox={`0 0 ${radius * 2 + 16} ${radius + 8}`}
      >
        {/* Background arc */}
        <path
          d={`M 8 ${radius + 8} A ${radius} ${radius} 0 0 1 ${radius * 2 + 8} ${radius + 8}`}
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className={cn('opacity-20', colorStyles[color].replace('bg-', 'text-'))}
        />
        
        {/* Progress arc */}
        <motion.path
          d={`M 8 ${radius + 8} A ${radius} ${radius} 0 0 1 ${radius * 2 + 8} ${radius + 8}`}
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={colorStyles[color].replace('bg-', 'text-')}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      
      {showLabel && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
          <span className={cn(
            'font-bold',
            size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : 'text-3xl',
            colorStyles[color].replace('bg-', 'text-')
          )}>
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  )
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ variant = 'linear', ...props }) => {
  switch (variant) {
    case 'circular':
      return <CircularProgress {...props} />
    case 'semicircular':
      return <SemicircularProgress {...props} />
    default:
      return <LinearProgress {...props} />
  }
}

// Multi-step progress indicator
export const StepProgress: React.FC<{
  steps: Array<{ label: string; completed: boolean }>
  currentStep: number
  color?: ProgressBarProps['color']
  className?: string
}> = ({ steps, currentStep, color = 'primary', className }) => {
  return (
    <div className={cn('flex items-center', className)}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {/* Step circle */}
          <motion.div
            className={cn(
              'flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium',
              index <= currentStep
                ? `${colorStyles[color]} border-transparent text-white`
                : `bg-white ${backgroundStyles[color]} border-current text-neutral-500`
            )}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {step.completed ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <span>{index + 1}</span>
            )}
          </motion.div>
          
          {/* Connector line */}
          {index < steps.length - 1 && (
            <motion.div
              className={cn(
                'flex-1 h-0.5 mx-2',
                index < currentStep ? colorStyles[color] : backgroundStyles[color]
              )}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}