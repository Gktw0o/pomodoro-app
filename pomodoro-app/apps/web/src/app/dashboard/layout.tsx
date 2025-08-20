'use client'

import React, { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { MobileHeader } from '@/components/layout/MobileHeader'
import { MobileNavigation } from '@/components/layout/MobileNavigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Mock user data - will be replaced with real user data
  const user = {
    name: 'Alex Johnson',
    avatar: undefined
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <Header isAuthenticated={true} user={user} />
      </div>
      
      {/* Mobile Header */}
      <div className="md:hidden">
        <MobileHeader user={user} title="Dashboard" />
      </div>
      
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar 
            isCollapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>
        
        <main className="flex-1 overflow-hidden pb-20 md:pb-0">
          {children}
        </main>
      </div>
      
      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  )
}