'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@pomodoro/ui'

interface StatCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: 'increase' | 'decrease'
    period: string
  }
  icon: LucideIcon
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  trend?: number[] // For sparkline
  className?: string
}

const colorStyles = {
  primary: {
    icon: 'text-primary-600 bg-primary-100',
    value: 'text-primary-600',
    change: {
      increase: 'text-green-600 bg-green-100',
      decrease: 'text-red-600 bg-red-100'
    }
  },
  secondary: {
    icon: 'text-secondary-600 bg-secondary-100',
    value: 'text-secondary-600',
    change: {
      increase: 'text-green-600 bg-green-100',
      decrease: 'text-red-600 bg-red-100'
    }
  },
  success: {
    icon: 'text-green-600 bg-green-100',
    value: 'text-green-600',
    change: {
      increase: 'text-green-600 bg-green-100',
      decrease: 'text-red-600 bg-red-100'
    }
  },
  warning: {
    icon: 'text-orange-600 bg-orange-100',
    value: 'text-orange-600',
    change: {
      increase: 'text-green-600 bg-green-100',
      decrease: 'text-red-600 bg-red-100'
    }
  },
  danger: {
    icon: 'text-red-600 bg-red-100',
    value: 'text-red-600',
    change: {
      increase: 'text-green-600 bg-green-100',
      decrease: 'text-red-600 bg-red-100'
    }
  }
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  color = 'primary',
  trend,
  className
}) => {
  const styles = colorStyles[color]

  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`
      if (val >= 1000) return `${(val / 1000).toFixed(1)}K`
      return val.toString()
    }
    return val
  }

  return (
    <motion.div
      className={cn(
        'bg-white rounded-xl p-6 border border-neutral-200 hover:shadow-lg transition-all duration-200',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <motion.div
              className={cn('p-3 rounded-lg', styles.icon)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-6 h-6" />
            </motion.div>
            
            <div>
              <p className="text-sm font-medium text-neutral-600">{title}</p>
              <motion.p
                className={cn('text-2xl font-bold mt-1', styles.value)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {formatValue(value)}
              </motion.p>
            </div>
          </div>

          {/* Change indicator */}
          {change && (
            <motion.div
              className="flex items-center mt-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className={cn(
                'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                styles.change[change.type]
              )}>
                {change.type === 'increase' ? '↗' : '↘'} {Math.abs(change.value)}%
              </span>
              <span className="text-xs text-neutral-500 ml-2">
                vs {change.period}
              </span>
            </motion.div>
          )}
        </div>

        {/* Mini sparkline */}
        {trend && trend.length > 0 && (
          <div className="w-20 h-12">
            <svg className="w-full h-full" viewBox="0 0 80 48">
              <motion.polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={styles.value}
                points={trend
                  .map((point, index) => {
                    const x = (index / (trend.length - 1)) * 80
                    const y = 48 - ((point / Math.max(...trend)) * 48)
                    return `${x},${y}`
                  })
                  .join(' ')
                }
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  )
}