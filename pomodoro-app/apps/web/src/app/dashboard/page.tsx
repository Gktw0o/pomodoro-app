'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Timer, 
  CheckSquare, 
  Target, 
  TrendingUp,
  Play,
  Plus,
  Calendar,
  Clock
} from 'lucide-react'
import { Button, Card, CardContent, CardHeader, CardTitle } from '@pomodoro/ui'
import { StatCard } from '@/components/ui/StatCard'
import { TaskCard } from '@/components/ui/TaskCard'
import { TimerCircle } from '@/components/ui/TimerCircle'

// Mock data - will be replaced with real data
const stats = [
  {
    title: 'Focus Time Today',
    value: '2h 45m',
    change: { value: 15, type: 'increase' as const, period: 'yesterday' },
    icon: Timer,
    color: 'primary' as const,
    trend: [20, 35, 25, 40, 30, 50, 45]
  },
  {
    title: 'Tasks Completed',
    value: 8,
    change: { value: 12, type: 'increase' as const, period: 'yesterday' },
    icon: CheckSquare,
    color: 'success' as const,
    trend: [5, 8, 6, 10, 7, 12, 8]
  },
  {
    title: 'Current Streak',
    value: '5 days',
    change: { value: 25, type: 'increase' as const, period: 'last week' },
    icon: Target,
    color: 'warning' as const,
    trend: [1, 2, 3, 4, 5, 4, 5]
  },
  {
    title: 'Productivity Score',
    value: '94%',
    change: { value: 8, type: 'increase' as const, period: 'last week' },
    icon: TrendingUp,
    color: 'secondary' as const,
    trend: [85, 88, 90, 87, 92, 95, 94]
  }
]

const recentTasks = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Write and review the Q1 project proposal document',
    completed: false,
    priority: 'HIGH' as const,
    dueDate: '2024-01-15',
    project: { name: 'Work Projects', color: '#3b82f6' },
    pomodoroCount: 3
  },
  {
    id: '2',
    title: 'Review team feedback',
    description: 'Go through feedback from last week\'s sprint review',
    completed: true,
    priority: 'MEDIUM' as const,
    project: { name: 'Work Projects', color: '#3b82f6' },
    pomodoroCount: 1
  },
  {
    id: '3',
    title: 'Read React documentation',
    description: 'Study the new features in React 18',
    completed: false,
    priority: 'MEDIUM' as const,
    dueDate: '2024-01-20',
    project: { name: 'Learning', color: '#8b5cf6' },
    pomodoroCount: 2
  }
]

const upcomingTasks = [
  { id: '1', title: 'Team standup meeting', time: '09:00', type: 'meeting' },
  { id: '2', title: 'Code review session', time: '14:30', type: 'work' },
  { id: '3', title: 'Gym workout', time: '18:00', type: 'personal' }
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">
                Good morning, Alex! 👋
              </h1>
              <p className="text-neutral-600 mt-1">
                Ready to make today productive? You have 5 tasks pending.
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" leftIcon={<Plus />} size="sm" className="md:size-md">
                New Task
              </Button>
              <Button variant="primary" leftIcon={<Play />} size="sm" className="md:size-md">
                Start Pomodoro
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Active Timer */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Timer className="w-5 h-5 text-primary-600" />
                  <span>Focus Timer</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <TimerCircle
                  progress={68}
                  timeLeft="08:15"
                  isActive={true}
                  isPaused={false}
                  size="md"
                  color="primary"
                />
                
                <div className="mt-6 space-y-3">
                  <p className="text-sm text-neutral-600">
                    Working on: <span className="font-medium">Complete project proposal</span>
                  </p>
                  
                  <div className="flex items-center justify-center space-x-2">
                    <Button variant="outline" size="sm">
                      Pause
                    </Button>
                    <Button variant="primary" size="sm">
                      Complete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Tasks */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <CheckSquare className="w-5 h-5 text-green-600" />
                    <span>Recent Tasks</span>
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <TaskCard {...task} />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-8">
          {/* Today's Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span>Today's Schedule</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-neutral-900">
                          {task.title}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-neutral-500">
                        <Clock className="w-4 h-4" />
                        <span>{task.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      className="w-full h-20 flex-col space-y-2"
                    >
                      <Timer className="w-6 h-6" />
                      <span className="text-sm">Start Focus</span>
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      className="w-full h-20 flex-col space-y-2"
                    >
                      <Plus className="w-6 h-6" />
                      <span className="text-sm">Add Task</span>
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      className="w-full h-20 flex-col space-y-2"
                    >
                      <Calendar className="w-6 h-6" />
                      <span className="text-sm">Schedule</span>
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      className="w-full h-20 flex-col space-y-2"
                    >
                      <TrendingUp className="w-6 h-6" />
                      <span className="text-sm">Analytics</span>
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}