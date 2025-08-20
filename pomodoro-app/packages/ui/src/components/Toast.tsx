'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { cn } from '../utils/cn'

export interface ToastProps {
  id: string
  title: string
  message?: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  isVisible: boolean
  onClose: () => void
}

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info
}

const toastStyles = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-orange-50 border-orange-200 text-orange-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800'
}

const iconStyles = {
  success: 'text-green-500',
  error: 'text-red-500',
  warning: 'text-orange-500',
  info: 'text-blue-500'
}

export const Toast: React.FC<ToastProps> = ({
  id,
  title,
  message,
  type = 'info',
  duration = 5000,
  isVisible,
  onClose
}) => {
  const Icon = toastIcons[type]

  React.useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={id}
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'max-w-sm w-full border rounded-lg shadow-lg pointer-events-auto',
            toastStyles[type]
          )}
        >
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Icon className={cn('w-5 h-5', iconStyles[type])} />
              </div>
              
              <div className="ml-3 w-0 flex-1">
                <p className="text-sm font-medium">{title}</p>
                {message && (
                  <p className="mt-1 text-sm opacity-90">{message}</p>
                )}
              </div>
              
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  onClick={onClose}
                  className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          {duration > 0 && (
            <motion.div
              className="h-1 bg-current opacity-20"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
              style={{ originX: 0 }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Toast Container Component
interface ToastContainerProps {
  toasts: ToastProps[]
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
}

const positionStyles = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  position = 'top-right'
}) => {
  return (
    <div className={cn('fixed z-50 pointer-events-none', positionStyles[position])}>
      <div className="space-y-3">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </div>
  )
}