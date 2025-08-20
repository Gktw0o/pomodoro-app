'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Pause, 
  Square, 
  SkipForward,
  Volume2,
  VolumeX,
  Settings,
  Coffee,
  Timer as TimerIcon
} from 'lucide-react'
import { Button, Card, CardContent, CardHeader, CardTitle } from '@pomodoro/ui'
import { TimerCircle } from '@/components/ui/TimerCircle'
import { TaskCard } from '@/components/ui/TaskCard'

type SessionType = 'WORK' | 'SHORT_BREAK' | 'LONG_BREAK'

interface TimerSettings {
  workDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  sessionsUntilLongBreak: number
}

const defaultSettings: TimerSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  sessionsUntilLongBreak: 4
}

// Mock active task
const activeTask = {
  id: '1',
  title: 'Complete project proposal',
  description: 'Write and review the Q1 project proposal document',
  completed: false,
  priority: 'HIGH' as const,
  dueDate: '2024-01-15',
  project: { name: 'Work Projects', color: '#3b82f6' },
  pomodoroCount: 3
}

// Mock session history
const sessionHistory = [
  { id: '1', type: 'WORK', duration: 25, completed: true, startedAt: '2024-01-10T09:00:00Z' },
  { id: '2', type: 'SHORT_BREAK', duration: 5, completed: true, startedAt: '2024-01-10T09:25:00Z' },
  { id: '3', type: 'WORK', duration: 25, completed: true, startedAt: '2024-01-10T09:30:00Z' },
  { id: '4', type: 'SHORT_BREAK', duration: 5, completed: true, startedAt: '2024-01-10T09:55:00Z' },
  { id: '5', type: 'WORK', duration: 25, completed: false, startedAt: '2024-01-10T10:00:00Z' }
]

export default function PomodoroPage() {
  const [currentSession, setCurrentSession] = useState<SessionType>('WORK')
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [timeLeft, setTimeLeft] = useState('25:00')
  const [progress, setProgress] = useState(0)
  const [completedSessions, setCompletedSessions] = useState(4)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [settings] = useState(defaultSettings)

  const getSessionColor = (type: SessionType) => {
    switch (type) {
      case 'WORK': return 'primary'
      case 'SHORT_BREAK': return 'secondary'
      case 'LONG_BREAK': return 'warning'
    }
  }

  const getSessionTitle = (type: SessionType) => {
    switch (type) {
      case 'WORK': return 'Focus Time'
      case 'SHORT_BREAK': return 'Short Break'
      case 'LONG_BREAK': return 'Long Break'
    }
  }

  const getNextSessionType = (): SessionType => {
    if (currentSession === 'WORK') {
      return completedSessions % settings.sessionsUntilLongBreak === 0 
        ? 'LONG_BREAK' 
        : 'SHORT_BREAK'
    }
    return 'WORK'
  }

  const handlePlayPause = () => {
    if (isActive) {
      setIsPaused(!isPaused)
    } else {
      setIsActive(true)
      setIsPaused(false)
    }
  }

  const handleStop = () => {
    setIsActive(false)
    setIsPaused(false)
    setProgress(0)
    // Reset time based on current session type
    const duration = currentSession === 'WORK' 
      ? settings.workDuration 
      : currentSession === 'SHORT_BREAK' 
        ? settings.shortBreakDuration 
        : settings.longBreakDuration
    setTimeLeft(`${duration}:00`)
  }

  const handleSkip = () => {
    const nextSession = getNextSessionType()
    setCurrentSession(nextSession)
    setIsActive(false)
    setIsPaused(false)
    setProgress(0)
    
    if (currentSession === 'WORK') {
      setCompletedSessions(prev => prev + 1)
    }
    
    const duration = nextSession === 'WORK' 
      ? settings.workDuration 
      : nextSession === 'SHORT_BREAK' 
        ? settings.shortBreakDuration 
        : settings.longBreakDuration
    setTimeLeft(`${duration}:00`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            {getSessionTitle(currentSession)}
          </h1>
          <p className="text-neutral-600">
            {currentSession === 'WORK' 
              ? 'Stay focused and productive' 
              : 'Take a well-deserved break'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timer Section */}
          <motion.div
            className="lg:col-span-2 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Main Timer */}
            <div className="mb-8">
              <TimerCircle
                progress={progress}
                timeLeft={timeLeft}
                isActive={isActive}
                isPaused={isPaused}
                size="xl"
                color={getSessionColor(currentSession)}
              />
            </div>

            {/* Timer Controls */}
            <motion.div
              className="flex items-center space-x-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={handlePlayPause}
                leftIcon={isActive && !isPaused ? <Pause /> : <Play />}
                className="px-8"
              >
                {isActive && !isPaused ? 'Pause' : 'Start'}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={handleStop}
                leftIcon={<Square />}
                disabled={!isActive}
              >
                Stop
              </Button>
              
              <Button
                variant="ghost"
                size="lg"
                onClick={handleSkip}
                leftIcon={<SkipForward />}
              >
                Skip
              </Button>
            </motion.div>

            {/* Session Progress */}
            <motion.div
              className="flex items-center space-x-2 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {Array.from({ length: settings.sessionsUntilLongBreak }).map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index < (completedSessions % settings.sessionsUntilLongBreak)
                      ? 'bg-primary-500'
                      : 'bg-neutral-300'
                  }`}
                />
              ))}
              <span className="text-sm text-neutral-600 ml-2">
                {completedSessions % settings.sessionsUntilLongBreak} / {settings.sessionsUntilLongBreak}
              </span>
            </motion.div>

            {/* Settings Bar */}
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSoundEnabled(!soundEnabled)}
                leftIcon={soundEnabled ? <Volume2 /> : <VolumeX />}
              >
                Sound {soundEnabled ? 'On' : 'Off'}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Settings />}
              >
                Settings
              </Button>
            </motion.div>
          </motion.div>

          {/* Side Panel */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Active Task */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <TimerIcon className="w-5 h-5 text-primary-600" />
                  <span>Active Task</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activeTask ? (
                  <TaskCard {...activeTask} />
                ) : (
                  <div className="text-center py-8 text-neutral-500">
                    <Coffee className="w-12 h-12 mx-auto mb-3 text-neutral-300" />
                    <p>No active task</p>
                    <Button variant="primary" size="sm" className="mt-3">
                      Select Task
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Session Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Completed Sessions</span>
                    <span className="font-semibold">{completedSessions}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Focus Time</span>
                    <span className="font-semibold">
                      {Math.floor(completedSessions * 25 / 60)}h {(completedSessions * 25) % 60}m
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Break Time</span>
                    <span className="font-semibold">
                      {Math.floor(completedSessions * 5 / 60)}h {(completedSessions * 5) % 60}m
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Session History */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <AnimatePresence>
                    {sessionHistory.slice(-5).map((session, index) => (
                      <motion.div
                        key={session.id}
                        className="flex items-center space-x-3 p-2 rounded-lg bg-neutral-50"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className={`w-3 h-3 rounded-full ${
                          session.type === 'WORK' 
                            ? 'bg-primary-500' 
                            : session.type === 'SHORT_BREAK'
                              ? 'bg-secondary-500'
                              : 'bg-orange-500'
                        }`} />
                        
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {session.type === 'WORK' 
                              ? 'Focus' 
                              : session.type === 'SHORT_BREAK'
                                ? 'Short Break'
                                : 'Long Break'}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {session.duration} min
                          </p>
                        </div>
                        
                        <div className={`w-2 h-2 rounded-full ${
                          session.completed ? 'bg-green-500' : 'bg-neutral-300'
                        }`} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}