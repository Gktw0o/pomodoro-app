'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Timer, User, Settings, LogOut, Bell, Search } from 'lucide-react'
import { Button } from '@pomodoro/ui'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

interface HeaderProps {
  isAuthenticated?: boolean
  user?: {
    name: string
    avatar?: string
  }
}

export const Header: React.FC<HeaderProps> = ({ isAuthenticated = false, user }) => {
  return (
    <motion.header 
      className="bg-white border-b border-neutral-200 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={isAuthenticated ? '/dashboard' : '/'}>
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <Timer className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-neutral-800">PomodoroApp</span>
            </motion.div>
          </Link>

          {/* Navigation */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Notifications */}
              <motion.button
                className="relative p-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                  2
                </span>
              </motion.button>

              {/* User Menu */}
              <div className="relative group">
                <motion.button
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-600" />
                    </div>
                  )}
                  <span className="hidden md:block text-sm font-medium text-neutral-700">
                    {user?.name || 'User'}
                  </span>
                </motion.button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <Link href="/settings" className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </Link>
                    <Link href="/premium" className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                      <Timer className="w-4 h-4 mr-3" />
                      Upgrade to Pro
                    </Link>
                    <hr className="my-2" />
                    <button className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  )
}