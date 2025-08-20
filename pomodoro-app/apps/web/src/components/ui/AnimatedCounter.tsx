'use client'

import React, { useEffect, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
  onComplete?: () => void
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
  onComplete
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const spring = useSpring(0, { stiffness: 75, damping: 15 })
  const display = useTransform(spring, (current) => {
    const num = current.toFixed(decimals)
    return `${prefix}${num}${suffix}`
  })

  useEffect(() => {
    if (isVisible) {
      spring.set(value)
      
      // Call onComplete when animation finishes
      if (onComplete) {
        const timer = setTimeout(onComplete, duration * 1000)
        return () => clearTimeout(timer)
      }
    }
  }, [spring, value, isVisible, duration, onComplete])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.span>{display}</motion.span>
    </motion.span>
  )
}

// Animated number that counts up from 0
export const CountUp: React.FC<{
  end: number
  start?: number
  duration?: number
  decimals?: number
  className?: string
}> = ({ end, start = 0, duration = 2, decimals = 0, className = '' }) => {
  const [count, setCount] = useState(start)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp

      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      
      const currentCount = start + (end - start) * easeOutQuart
      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, start, duration])

  return (
    <span className={className}>
      {count.toFixed(decimals)}
    </span>
  )
}