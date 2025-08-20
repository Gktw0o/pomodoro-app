'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Timer, 
  CheckSquare, 
  Calendar,
  BarChart3,
  Plus
} from 'lucide-react'
import { cn } from '@pomodoro/ui'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    color: 'text-blue-600'
  },
  {
    name: 'Pomodoro',
    href: '/pomodoro',
    icon: Timer,
    color: 'text-primary-600'
  },
  {
    name: 'Add',
    href: '/tasks/new',
    icon: Plus,
    color: 'text-secondary-600',
    isSpecial: true
  },
  {
    name: 'Tasks',
    href: '/tasks',
    icon: CheckSquare,
    color: 'text-green-600'
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    color: 'text-orange-600'
  }
]

export const MobileNavigation: React.FC = () => {
  const pathname = usePathname()

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 px-4 py-2 z-40 md:hidden"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-around">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const isSpecial = item.isSpecial
          
          return (
            <Link key={item.name} href={item.href}>
              <motion.div
                className={cn(
                  'relative flex flex-col items-center justify-center p-2 min-w-[60px]',
                  isSpecial && 'transform -translate-y-2'
                )}
                whileTap={{ scale: 0.95 }}
              >
                {/* Special button background */}
                {isSpecial && (
                  <div className="absolute inset-0 bg-primary-500 rounded-full shadow-lg" />
                )}
                
                {/* Icon */}
                <div className={cn(
                  'relative flex items-center justify-center w-6 h-6 mb-1',
                  isSpecial ? 'text-white' : isActive ? item.color : 'text-neutral-400'
                )}>
                  <item.icon className="w-5 h-5" />
                </div>
                
                {/* Label */}
                <span className={cn(
                  'text-xs font-medium',
                  isSpecial ? 'text-white' : isActive ? item.color : 'text-neutral-400'
                )}>
                  {item.name}
                </span>
                
                {/* Active indicator */}
                {isActive && !isSpecial && (
                  <motion.div
                    className={cn('absolute -top-1 w-1 h-1 rounded-full', item.color.replace('text-', 'bg-'))}
                    layoutId="mobileActiveIndicator"
                  />
                )}
              </motion.div>
            </Link>
          )
        })}
      </div>
    </motion.nav>
  )
}