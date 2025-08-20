'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  Search, 
  Bell, 
  Settings,
  Timer,
  User,
  LogOut
} from 'lucide-react'
import { Avatar, DotBadge } from '@pomodoro/ui'

interface MobileHeaderProps {
  user?: {
    name: string
    avatar?: string
  }
  title?: string
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ 
  user, 
  title = 'Dashboard' 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <>
      <motion.header
        className="bg-white border-b border-neutral-200 px-4 py-3 sticky top-0 z-50 md:hidden"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 -ml-2 text-neutral-600 hover:text-neutral-900 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="w-5 h-5" />
            </motion.button>
            
            <div>
              <h1 className="text-lg font-semibold text-neutral-900">{title}</h1>
              {user && (
                <p className="text-sm text-neutral-500">Hello, {user.name.split(' ')[0]}!</p>
              )}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <Search className="w-5 h-5" />
            </motion.button>

            <DotBadge count={2} size="sm">
              <motion.button
                className="p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                <Bell className="w-5 h-5" />
              </motion.button>
            </DotBadge>

            <Avatar
              src={user?.avatar}
              name={user?.name}
              size="sm"
              onClick={() => setIsMenuOpen(true)}
            />
          </div>
        </div>
      </motion.header>

      {/* Side Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu */}
            <motion.div
              className="fixed top-0 left-0 bottom-0 w-80 bg-white shadow-xl z-50 md:hidden"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-neutral-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                    <Timer className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold text-neutral-900">PomodoroApp</span>
                </div>
                
                <motion.button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-neutral-400 hover:text-neutral-600"
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* User Info */}
              {user && (
                <div className="p-4 border-b border-neutral-200">
                  <div className="flex items-center space-x-3">
                    <Avatar
                      src={user.avatar}
                      name={user.name}
                      size="md"
                    />
                    <div>
                      <p className="font-medium text-neutral-900">{user.name}</p>
                      <p className="text-sm text-neutral-500">Free Plan</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Menu Items */}
              <div className="flex-1 py-4">
                <nav className="space-y-2 px-4">
                  {[
                    { name: 'Dashboard', icon: Timer, href: '/dashboard' },
                    { name: 'Settings', icon: Settings, href: '/settings' },
                    { name: 'Profile', icon: User, href: '/profile' }
                  ].map((item) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </motion.a>
                  ))}
                </nav>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-neutral-200">
                <motion.button
                  className="flex items-center space-x-3 px-3 py-2 w-full text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-6">
                <motion.button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 -ml-2 text-neutral-600"
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
                
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search tasks, projects..."
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    autoFocus
                  />
                </div>
              </div>

              {/* Search Results */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wide">
                  Recent Searches
                </h3>
                
                {['Complete project proposal', 'Review team feedback', 'Plan weekend trip'].map((item, index) => (
                  <motion.div
                    key={item}
                    className="flex items-center space-x-3 p-3 hover:bg-neutral-50 rounded-lg cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Search className="w-4 h-4 text-neutral-400" />
                    <span className="text-neutral-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}