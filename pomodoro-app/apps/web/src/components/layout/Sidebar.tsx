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
  Settings,
  Crown,
  Plus,
  Folder
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
    name: 'Tasks',
    href: '/tasks',
    icon: CheckSquare,
    color: 'text-green-600'
  },
  {
    name: 'Calendar',
    href: '/calendar',
    icon: Calendar,
    color: 'text-purple-600'
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    color: 'text-orange-600'
  }
]

const projects = [
  { id: '1', name: 'Work Projects', color: '#3b82f6', taskCount: 12 },
  { id: '2', name: 'Personal', color: '#10b981', taskCount: 5 },
  { id: '3', name: 'Learning', color: '#8b5cf6', taskCount: 8 }
]

interface SidebarProps {
  isCollapsed?: boolean
  onToggle?: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false }) => {
  const pathname = usePathname()

  return (
    <motion.aside 
      className={cn(
        'bg-white border-r border-neutral-200 h-screen sticky top-0 transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col h-full">
        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <motion.div
                  className={cn(
                    'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                  )}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon 
                    className={cn(
                      'w-5 h-5 mr-3',
                      isActive ? 'text-primary-600' : item.color
                    )} 
                  />
                  {!isCollapsed && (
                    <span className="truncate">{item.name}</span>
                  )}
                  {isActive && !isCollapsed && (
                    <motion.div
                      className="ml-auto w-2 h-2 bg-primary-500 rounded-full"
                      layoutId="activeIndicator"
                    />
                  )}
                </motion.div>
              </Link>
            )
          })}
        </nav>

        {/* Projects Section */}
        {!isCollapsed && (
          <div className="px-3 py-4 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-neutral-900">Projects</h3>
              <motion.button
                className="p-1 text-neutral-400 hover:text-primary-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Plus className="w-4 h-4" />
              </motion.button>
            </div>
            
            <div className="space-y-2">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  className="flex items-center px-2 py-1.5 rounded-md hover:bg-neutral-50 cursor-pointer group"
                  whileHover={{ x: 2 }}
                >
                  <div 
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: project.color }}
                  />
                  <span className="text-sm text-neutral-700 truncate flex-1">
                    {project.name}
                  </span>
                  <span className="text-xs text-neutral-400 group-hover:text-neutral-600">
                    {project.taskCount}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Section */}
        <div className="px-3 py-4 border-t border-neutral-200 space-y-2">
          <Link href="/premium">
            <motion.div
              className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-amber-600 hover:bg-amber-50 transition-colors"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Crown className="w-5 h-5 mr-3" />
              {!isCollapsed && <span>Upgrade to Pro</span>}
            </motion.div>
          </Link>
          
          <Link href="/settings">
            <motion.div
              className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-colors"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Settings className="w-5 h-5 mr-3" />
              {!isCollapsed && <span>Settings</span>}
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.aside>
  )
}