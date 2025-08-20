// User types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
  updatedAt: string
  emailVerified?: string
  settings?: UserSettings
  subscription?: Subscription
}

export interface UserSettings {
  workDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  sessionsUntilLongBreak: number
  soundEnabled: boolean
  desktopNotifications: boolean
  emailNotifications: boolean
  theme: 'light' | 'dark' | 'auto'
  language: string
  timezone: string
  publicProfile: boolean
  shareStats: boolean
}

// Subscription types
export interface Subscription {
  id: string
  plan: 'FREE' | 'PRO' | 'PREMIUM'
  status: 'ACTIVE' | 'CANCELED' | 'PAST_DUE' | 'UNPAID' | 'INCOMPLETE'
  currentPeriodStart?: string
  currentPeriodEnd?: string
  cancelAtPeriodEnd: boolean
  stripeSubscriptionId?: string
  stripeCustomerId?: string
}

// Project types
export interface Project {
  id: string
  name: string
  description?: string
  color: string
  archived: boolean
  createdAt: string
  updatedAt: string
  userId: string
  tasks?: Task[]
  _count?: {
    tasks: number
  }
}

// Task types
export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  dueDate?: string
  createdAt: string
  updatedAt: string
  userId: string
  projectId?: string
  project?: Project
  parentId?: string
  parent?: Task
  subtasks?: Task[]
  pomodoroSessions?: PomodoroSession[]
  _count?: {
    pomodoroSessions: number
    subtasks: number
  }
}

// Pomodoro types
export interface PomodoroSession {
  id: string
  type: 'WORK' | 'SHORT_BREAK' | 'LONG_BREAK'
  duration: number
  completed: boolean
  startedAt: string
  endedAt?: string
  userId: string
  taskId?: string
  task?: Task
}

export interface TimerState {
  isActive: boolean
  isPaused: boolean
  timeLeft: number
  type: 'WORK' | 'SHORT_BREAK' | 'LONG_BREAK'
  sessionId?: string
  taskId?: string
  startedAt?: string
}

// Analytics types
export interface UserAnalytics {
  totalPomodoroSessions: number
  totalFocusTime: number
  totalTasksCompleted: number
  currentStreak: number
  longestStreak: number
  weeklyStats?: Record<string, any>
  monthlyStats?: Record<string, any>
  lastUpdated: string
}

export interface DashboardStats {
  todayFocusTime: number
  todayCompletedTasks: number
  todayCompletedSessions: number
  weeklyFocusTime: number
  weeklyCompletedTasks: number
  currentStreak: number
  totalFocusTime: number
  totalCompletedTasks: number
  totalSessions: number
}

export interface ProductivityTrend {
  date: string
  focusTime: number
  completedTasks: number
  completedSessions: number
}

// API types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    message: string
    code?: string
    details?: any
  }
  pagination?: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface TaskFilters {
  completed?: boolean
  priority?: string
  projectId?: string
  dueDate?: string
  search?: string
}

export interface AnalyticsFilters {
  period?: 'day' | 'week' | 'month' | 'year'
  startDate?: string
  endDate?: string
}

// Auth types
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresAt: number
}

// Form types
export interface CreateTaskData {
  title: string
  description?: string
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  dueDate?: string
  projectId?: string
}

export interface UpdateTaskData extends Partial<CreateTaskData> {
  completed?: boolean
}

export interface CreateProjectData {
  name: string
  description?: string
  color?: string
}

export interface UpdateProjectData extends Partial<CreateProjectData> {
  archived?: boolean
}

// Notification types
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  actions?: NotificationAction[]
}

export interface NotificationAction {
  label: string
  action: () => void
  variant?: 'primary' | 'secondary'
}

// Socket.IO event types
export interface SocketEvents {
  'timer-start': (data: { userId: string; sessionId: string; type: string }) => void
  'timer-pause': (data: { userId: string; sessionId: string }) => void
  'timer-complete': (data: { userId: string; sessionId: string; type: string }) => void
  'task-update': (data: { userId: string; task: Task }) => void
  'notification': (data: { userId: string; notification: Notification }) => void
}