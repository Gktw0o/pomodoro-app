'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  Grid3X3,
  List,
  SortAsc,
  MoreHorizontal,
  CheckSquare,
  Square,
  Star,
  Clock,
  Flag
} from 'lucide-react'
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Badge } from '@pomodoro/ui'
import { TaskCard } from '@/components/ui/TaskCard'

// Mock data
const projects = [
  { id: 'all', name: 'All Tasks', color: '#6b7280', taskCount: 25 },
  { id: '1', name: 'Work Projects', color: '#3b82f6', taskCount: 12 },
  { id: '2', name: 'Personal', color: '#10b981', taskCount: 5 },
  { id: '3', name: 'Learning', color: '#8b5cf6', taskCount: 8 }
]

const tasks = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Write and review the Q1 project proposal document for the new client initiative',
    completed: false,
    priority: 'HIGH' as const,
    dueDate: '2024-01-15',
    project: { name: 'Work Projects', color: '#3b82f6' },
    pomodoroCount: 3
  },
  {
    id: '2',
    title: 'Review team feedback',
    description: 'Go through feedback from last week\'s sprint review and prepare action items',
    completed: true,
    priority: 'MEDIUM' as const,
    project: { name: 'Work Projects', color: '#3b82f6' },
    pomodoroCount: 1
  },
  {
    id: '3',
    title: 'Plan weekend trip',
    description: 'Research and book accommodations for weekend getaway to the mountains',
    completed: false,
    priority: 'LOW' as const,
    dueDate: '2024-01-20',
    project: { name: 'Personal', color: '#10b981' },
    pomodoroCount: 0
  },
  {
    id: '4',
    title: 'Read React documentation',
    description: 'Study the new features in React 18 and understand concurrent rendering',
    completed: false,
    priority: 'MEDIUM' as const,
    dueDate: '2024-01-18',
    project: { name: 'Learning', color: '#8b5cf6' },
    pomodoroCount: 2
  },
  {
    id: '5',
    title: 'Update portfolio website',
    description: 'Add recent projects and update the design to match new branding',
    completed: false,
    priority: 'URGENT' as const,
    dueDate: '2024-01-12',
    project: { name: 'Personal', color: '#10b981' },
    pomodoroCount: 4
  }
]

const filterOptions = [
  { id: 'all', label: 'All Tasks', count: 25 },
  { id: 'pending', label: 'Pending', count: 20 },
  { id: 'completed', label: 'Completed', count: 5 },
  { id: 'overdue', label: 'Overdue', count: 2 },
  { id: 'today', label: 'Due Today', count: 3 }
]

const sortOptions = [
  { id: 'dueDate', label: 'Due Date' },
  { id: 'priority', label: 'Priority' },
  { id: 'created', label: 'Created' },
  { id: 'updated', label: 'Updated' },
  { id: 'alphabetical', label: 'Alphabetical' }
]

export default function TasksPage() {
  const [selectedProject, setSelectedProject] = useState('all')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedSort, setSelectedSort] = useState('dueDate')
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'kanban'>('list')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const filteredTasks = tasks.filter(task => {
    // Project filter
    if (selectedProject !== 'all' && task.project?.name !== projects.find(p => p.id === selectedProject)?.name) {
      return false
    }
    
    // Status filter
    if (selectedFilter === 'completed' && !task.completed) return false
    if (selectedFilter === 'pending' && task.completed) return false
    if (selectedFilter === 'overdue' && (!task.dueDate || new Date(task.dueDate) >= new Date() || task.completed)) return false
    if (selectedFilter === 'today' && (!task.dueDate || new Date(task.dueDate).toDateString() !== new Date().toDateString())) return false
    
    // Search filter
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !task.description?.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    
    return true
  })

  const handleTaskToggle = (taskId: string) => {
    console.log('Toggle task:', taskId)
    // Handle task completion toggle
  }

  const handleTaskEdit = (taskId: string) => {
    console.log('Edit task:', taskId)
    // Handle task edit
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900">Tasks</h1>
              <p className="text-neutral-600 mt-1">
                Organize and track your work efficiently
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" leftIcon={<Calendar />}>
                Calendar View
              </Button>
              <Button variant="primary" leftIcon={<Plus />}>
                New Task
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search />}
              />
            </div>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              leftIcon={<Filter />}
            >
              Filters
            </Button>
            
            <div className="flex items-center space-x-2 border border-neutral-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-neutral-400'}`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-neutral-400'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('kanban')}
                className={`p-2 rounded ${viewMode === 'kanban' ? 'bg-primary-100 text-primary-600' : 'text-neutral-400'}`}
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                className="bg-white rounded-lg border border-neutral-200 p-4 mb-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Project Filter */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Project
                    </label>
                    <select
                      value={selectedProject}
                      onChange={(e) => setSelectedProject(e.target.value)}
                      className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {projects.map(project => (
                        <option key={project.id} value={project.id}>
                          {project.name} ({project.taskCount})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Status
                    </label>
                    <select
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {filterOptions.map(option => (
                        <option key={option.id} value={option.id}>
                          {option.label} ({option.count})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort Filter */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Sort By
                    </label>
                    <select
                      value={selectedSort}
                      onChange={(e) => setSelectedSort(e.target.value)}
                      className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {sortOptions.map(option => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {projects.map(project => (
                    <motion.button
                      key={project.id}
                      onClick={() => setSelectedProject(project.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                        selectedProject === project.id 
                          ? 'bg-primary-50 text-primary-700 border border-primary-200' 
                          : 'hover:bg-neutral-50'
                      }`}
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: project.color }}
                      />
                      <span className="flex-1 font-medium">{project.name}</span>
                      <Badge variant="neutral" size="sm">
                        {project.taskCount}
                      </Badge>
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckSquare className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-neutral-600">Completed</span>
                    </div>
                    <span className="font-semibold">5</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Square className="w-4 h-4 text-neutral-400" />
                      <span className="text-sm text-neutral-600">Pending</span>
                    </div>
                    <span className="font-semibold">20</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span className="text-sm text-neutral-600">Overdue</span>
                    </div>
                    <span className="font-semibold text-red-600">2</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Flag className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-neutral-600">High Priority</span>
                    </div>
                    <span className="font-semibold">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tasks List */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-neutral-900">
                  {projects.find(p => p.id === selectedProject)?.name || 'All Tasks'}
                </h2>
                <Badge variant="neutral">
                  {filteredTasks.length} tasks
                </Badge>
              </div>
              
              <Button variant="ghost" leftIcon={<SortAsc />}>
                Sort: {sortOptions.find(s => s.id === selectedSort)?.label}
              </Button>
            </div>

            {/* Tasks Grid/List */}
            <div className={`space-y-4 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4 space-y-0' : ''}`}>
              <AnimatePresence>
                {filteredTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <TaskCard
                      {...task}
                      onToggle={handleTaskToggle}
                      onEdit={handleTaskEdit}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredTasks.length === 0 && (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckSquare className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-lg font-medium text-neutral-900 mb-2">No tasks found</h3>
                <p className="text-neutral-600 mb-4">
                  {searchQuery ? 'Try adjusting your search or filters' : 'Create your first task to get started'}
                </p>
                <Button variant="primary" leftIcon={<Plus />}>
                  Create Task
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}