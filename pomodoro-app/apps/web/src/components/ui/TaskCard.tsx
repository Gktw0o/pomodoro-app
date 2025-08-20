'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Flag, 
  MoreHorizontal,
  Timer,
  Calendar
} from 'lucide-react'
import { cn } from '@pomodoro/ui'

interface TaskCardProps {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  dueDate?: string
  project?: {
    name: string
    color: string
  }
  pomodoroCount?: number
  onToggle?: (id: string) => void
  onEdit?: (id: string) => void
  className?: string
}

const priorityColors = {
  LOW: 'text-green-600 bg-green-100',
  MEDIUM: 'text-blue-600 bg-blue-100',
  HIGH: 'text-orange-600 bg-orange-100',
  URGENT: 'text-red-600 bg-red-100'
}

const priorityLabels = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  URGENT: 'Urgent'
}

export const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  completed,
  priority,
  dueDate,
  project,
  pomodoroCount = 0,
  onToggle,
  onEdit,
  className
}) => {
  const formatDueDate = (date: string) => {
    const dueDateTime = new Date(date)
    const now = new Date()
    const diffTime = dueDateTime.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Tomorrow'
    if (diffDays === -1) return 'Yesterday'
    if (diffDays < 0) return `${Math.abs(diffDays)} days ago`
    if (diffDays <= 7) return `In ${diffDays} days`
    
    return dueDateTime.toLocaleDateString()
  }

  const isOverdue = dueDate && new Date(dueDate) < new Date() && !completed

  return (
    <motion.div
      className={cn(
        'bg-white rounded-lg border border-neutral-200 p-4 hover:shadow-md transition-all duration-200',
        completed && 'opacity-75',
        isOverdue && 'border-red-200 bg-red-50/50',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      layout
    >
      <div className="flex items-start space-x-3">
        {/* Checkbox */}
        <motion.button
          onClick={() => onToggle?.(id)}
          className="mt-0.5 flex-shrink-0"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {completed ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5 text-neutral-400 hover:text-primary-500" />
          )}
        </motion.button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={cn(
                'text-sm font-medium text-neutral-900 truncate',
                completed && 'line-through text-neutral-500'
              )}>
                {title}
              </h3>
              
              {description && (
                <p className={cn(
                  'text-sm text-neutral-600 mt-1 line-clamp-2',
                  completed && 'text-neutral-400'
                )}>
                  {description}
                </p>
              )}
            </div>

            {/* More menu */}
            <motion.button
              onClick={() => onEdit?.(id)}
              className="p-1 text-neutral-400 hover:text-neutral-600 transition-colors opacity-0 group-hover:opacity-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MoreHorizontal className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Meta information */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-3">
              {/* Priority */}
              <div className={cn(
                'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                priorityColors[priority]
              )}>
                <Flag className="w-3 h-3 mr-1" />
                {priorityLabels[priority]}
              </div>

              {/* Project */}
              {project && (
                <div className="flex items-center space-x-1">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: project.color }}
                  />
                  <span className="text-xs text-neutral-500">{project.name}</span>
                </div>
              )}

              {/* Pomodoro count */}
              {pomodoroCount > 0 && (
                <div className="flex items-center space-x-1 text-xs text-neutral-500">
                  <Timer className="w-3 h-3" />
                  <span>{pomodoroCount}</span>
                </div>
              )}
            </div>

            {/* Due date */}
            {dueDate && (
              <div className={cn(
                'flex items-center space-x-1 text-xs',
                isOverdue ? 'text-red-600' : 'text-neutral-500'
              )}>
                <Calendar className="w-3 h-3" />
                <span>{formatDueDate(dueDate)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress indicator for subtasks */}
      {/* This would be implemented if we had subtask data */}
    </motion.div>
  )
}