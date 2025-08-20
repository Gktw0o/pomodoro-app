'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  Pause, 
  Square, 
  Plus,
  Check,
  Timer,
  User,
  Moon,
  Sun,
  Bell,
  Settings
} from 'lucide-react'
import { 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  Input, 
  Badge,
  Avatar,
  Modal,
  Toast
} from '@pomodoro/ui'
import { TimerCircle } from '@/components/ui/TimerCircle'
import { TaskCard } from '@/components/ui/TaskCard'
import { StatCard } from '@/components/ui/StatCard'
import { ThemeToggle, ThemeSelector, AnimatedThemeToggle } from '@/components/ui/ThemeToggle'
import { LoadingSpinner, LoadingOverlay, Skeleton, SkeletonText } from '@/components/ui/LoadingSpinner'
import { ProgressBar, StepProgress } from '@/components/ui/ProgressBar'
import { AnimatedCounter, CountUp } from '@/components/ui/AnimatedCounter'

export default function PrototypePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [timerActive, setTimerActive] = useState(false)
  const [timerProgress, setTimerProgress] = useState(68)
  const [showToast, setShowToast] = useState(false)

  const mockTask = {
    id: '1',
    title: 'Complete prototype testing',
    description: 'Test all UI components and interactions in the prototype',
    completed: false,
    priority: 'HIGH' as const,
    dueDate: '2024-01-15',
    project: { name: 'Design System', color: '#8b5cf6' },
    pomodoroCount: 2
  }

  const steps = [
    { label: 'Planning', completed: true },
    { label: 'Design', completed: true },
    { label: 'Development', completed: false },
    { label: 'Testing', completed: false }
  ]

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                🧪 Prototype Testing
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                Interactive component testing and validation
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <AnimatedThemeToggle />
            </div>
          </div>
          
          <ThemeSelector />
        </motion.div>

        {/* Component Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Timer & Controls */}
          <div className="space-y-6">
            {/* Timer Component */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Timer className="w-5 h-5 text-primary-600" />
                  <span>Timer Component</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <TimerCircle
                  progress={timerProgress}
                  timeLeft="08:15"
                  isActive={timerActive}
                  isPaused={false}
                  size="md"
                  color="primary"
                />
                
                <div className="mt-6 flex justify-center space-x-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setTimerActive(!timerActive)}
                    leftIcon={timerActive ? <Pause /> : <Play />}
                  >
                    {timerActive ? 'Pause' : 'Start'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setTimerActive(false)
                      setTimerProgress(0)
                    }}
                    leftIcon={<Square />}
                  >
                    Stop
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Button Variations */}
            <Card>
              <CardHeader>
                <CardTitle>Button Variations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Button variant="primary" size="sm">Primary</Button>
                    <Button variant="secondary" size="sm">Secondary</Button>
                    <Button variant="outline" size="sm">Outline</Button>
                    <Button variant="ghost" size="sm">Ghost</Button>
                    <Button variant="danger" size="sm">Danger</Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button variant="primary" leftIcon={<Plus />}>With Icon</Button>
                    <Button variant="outline" isLoading>Loading</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loading States */}
            <Card>
              <CardHeader>
                <CardTitle>Loading Components</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <LoadingSpinner variant="spinner" size="sm" />
                    <LoadingSpinner variant="dots" size="sm" />
                    <LoadingSpinner variant="pulse" size="sm" />
                    <LoadingSpinner variant="bars" size="sm" />
                  </div>
                  
                  <SkeletonText lines={2} />
                  
                  <Button
                    variant="outline"
                    onClick={() => setShowLoading(true)}
                  >
                    Show Loading Overlay
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Cards & Content */}
          <div className="space-y-6">
            {/* Task Card */}
            <Card>
              <CardHeader>
                <CardTitle>Task Card Component</CardTitle>
              </CardHeader>
              <CardContent>
                <TaskCard {...mockTask} />
              </CardContent>
            </Card>

            {/* Progress Components */}
            <Card>
              <CardHeader>
                <CardTitle>Progress Components</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Linear Progress</h4>
                    <ProgressBar
                      value={75}
                      color="primary"
                      showLabel
                      label="Task Completion"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Circular Progress</h4>
                      <ProgressBar
                        variant="circular"
                        value={60}
                        size="sm"
                        color="secondary"
                      />
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Semicircular</h4>
                      <ProgressBar
                        variant="semicircular"
                        value={80}
                        size="sm"
                        color="success"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Step Progress</h4>
                    <StepProgress
                      steps={steps}
                      currentStep={1}
                      color="primary"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Form Components */}
            <Card>
              <CardHeader>
                <CardTitle>Form Components</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    label="Task Title"
                    placeholder="Enter task title..."
                    leftIcon={<Check />}
                  />
                  
                  <Input
                    label="Search"
                    placeholder="Search tasks..."
                    variant="filled"
                  />
                  
                  <Input
                    label="With Error"
                    placeholder="This field has an error"
                    error="This field is required"
                    variant="outlined"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Stats & Interactions */}
          <div className="space-y-6">
            {/* Stat Cards */}
            <StatCard
              title="Focus Time Today"
              value="2h 45m"
              change={{ value: 15, type: 'increase', period: 'yesterday' }}
              icon={Timer}
              color="primary"
              trend={[20, 35, 25, 40, 30, 50, 45]}
            />

            <StatCard
              title="Tasks Completed"
              value={8}
              change={{ value: 12, type: 'increase', period: 'yesterday' }}
              icon={Check}
              color="success"
            />

            {/* Animated Counter */}
            <Card>
              <CardHeader>
                <CardTitle>Animated Counters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <AnimatedCounter
                      value={1250}
                      duration={2}
                      className="text-2xl font-bold text-primary-600"
                    />
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Total Sessions</p>
                  </div>
                  
                  <div className="text-center">
                    <CountUp
                      end={95}
                      duration={1.5}
                      className="text-xl font-semibold text-secondary-600"
                    />
                    <span className="text-xl font-semibold text-secondary-600">%</span>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Completion Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Badges & Avatars */}
            <Card>
              <CardHeader>
                <CardTitle>Badges & Avatars</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="danger">Danger</Badge>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Avatar name="John Doe" size="sm" />
                    <Avatar name="Jane Smith" size="md" status="online" showStatus />
                    <Avatar name="Alex Johnson" size="lg" variant="rounded" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Interactive Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Open Modal
                  </Button>
                  
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => setShowToast(!showToast)}
                  >
                    Toggle Toast
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setTimerProgress(Math.random() * 100)
                    }}
                  >
                    Randomize Progress
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Test Modal"
          size="md"
        >
          <div className="space-y-4">
            <p className="text-neutral-600 dark:text-neutral-400">
              This is a test modal to demonstrate the modal component functionality.
              It includes animations, backdrop blur, and proper focus management.
            </p>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                Confirm
              </Button>
            </div>
          </div>
        </Modal>

        {/* Loading Overlay */}
        <LoadingOverlay
          isVisible={showLoading}
          message="Testing loading overlay..."
        />

        {/* Auto-hide loading overlay */}
        {showLoading && setTimeout(() => setShowLoading(false), 3000)}

        {/* Toast */}
        {showToast && (
          <div className="fixed top-4 right-4 z-50">
            <Toast
              id="test-toast"
              title="Test Toast"
              message="This is a test toast notification!"
              type="success"
              isVisible={showToast}
              onClose={() => setShowToast(false)}
            />
          </div>
        )}
      </div>
    </div>
  )
}