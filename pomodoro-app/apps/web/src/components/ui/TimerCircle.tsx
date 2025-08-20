'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@pomodoro/ui'

interface TimerCircleProps {
  progress: number // 0-100
  timeLeft: string // "25:00"
  isActive: boolean
  isPaused: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'warning'
  showLabels?: boolean
  className?: string
}

const sizes = {
  sm: { circle: 'w-24 h-24', stroke: 4, text: 'text-lg', label: 'text-xs' },
  md: { circle: 'w-32 h-32', stroke: 6, text: 'text-xl', label: 'text-sm' },
  lg: { circle: 'w-48 h-48', stroke: 8, text: 'text-3xl', label: 'text-base' },
  xl: { circle: 'w-64 h-64', stroke: 10, text: 'text-4xl', label: 'text-lg' }
}

const colors = {
  primary: {
    bg: 'stroke-primary-100',
    progress: 'stroke-primary-500',
    text: 'text-primary-700',
    glow: 'drop-shadow-lg filter'
  },
  secondary: {
    bg: 'stroke-secondary-100',
    progress: 'stroke-secondary-500',
    text: 'text-secondary-700',
    glow: 'drop-shadow-lg filter'
  },
  warning: {
    bg: 'stroke-orange-100',
    progress: 'stroke-orange-500',
    text: 'text-orange-700',
    glow: 'drop-shadow-lg filter'
  }
}

export const TimerCircle: React.FC<TimerCircleProps> = ({
  progress,
  timeLeft,
  isActive,
  isPaused,
  size = 'lg',
  color = 'primary',
  showLabels = true,
  className
}) => {
  const sizeConfig = sizes[size]
  const colorConfig = colors[color]
  const radius = size === 'xl' ? 120 : size === 'lg' ? 88 : size === 'md' ? 58 : 44
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className={cn('flex flex-col items-center space-y-4', className)}>
      <div className="relative">
        {/* Outer glow effect when active */}
        {isActive && (
          <motion.div
            className={cn(
              'absolute inset-0 rounded-full',
              color === 'primary' ? 'bg-primary-500/20' : 
              color === 'secondary' ? 'bg-secondary-500/20' : 'bg-orange-500/20'
            )}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}

        {/* SVG Circle */}
        <motion.div
          className={cn(sizeConfig.circle, 'relative')}
          animate={isActive && !isPaused ? { rotate: 360 } : {}}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg
            className={cn('transform -rotate-90', sizeConfig.circle, colorConfig.glow)}
            viewBox={`0 0 ${radius * 2 + 20} ${radius * 2 + 20}`}
          >
            {/* Background circle */}
            <circle
              cx={radius + 10}
              cy={radius + 10}
              r={radius}
              fill="none"
              className={colorConfig.bg}
              strokeWidth={sizeConfig.stroke}
            />
            
            {/* Progress circle */}
            <motion.circle
              cx={radius + 10}
              cy={radius + 10}
              r={radius}
              fill="none"
              className={colorConfig.progress}
              strokeWidth={sizeConfig.stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </svg>

          {/* Timer Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-center"
              animate={isPaused ? { opacity: [1, 0.5, 1] } : {}}
              transition={{ duration: 1, repeat: isPaused ? Infinity : 0 }}
            >
              <div className={cn(sizeConfig.text, colorConfig.text, 'font-mono font-bold')}>
                {timeLeft}
              </div>
              {showLabels && (
                <div className={cn(sizeConfig.label, 'text-neutral-500 font-medium')}>
                  {isActive ? (isPaused ? 'PAUSED' : 'FOCUS') : 'READY'}
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Pulse effect for active state */}
        {isActive && !isPaused && (
          <motion.div
            className={cn(
              'absolute inset-0 rounded-full border-2',
              color === 'primary' ? 'border-primary-300' :
              color === 'secondary' ? 'border-secondary-300' : 'border-orange-300'
            )}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>

      {/* Progress indicator */}
      {showLabels && (
        <div className="text-center space-y-1">
          <div className={cn(sizeConfig.label, 'text-neutral-600 font-medium')}>
            {Math.round(progress)}% Complete
          </div>
          <div className="w-24 h-1 bg-neutral-200 rounded-full overflow-hidden">
            <motion.div
              className={cn(
                'h-full rounded-full',
                color === 'primary' ? 'bg-primary-500' :
                color === 'secondary' ? 'bg-secondary-500' : 'bg-orange-500'
              )}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}
    </div>
  )
}