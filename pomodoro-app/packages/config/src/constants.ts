// App constants
export const APP_NAME = 'Pomodoro App'
export const APP_DESCRIPTION = 'Focus & Productivity Timer'
export const APP_VERSION = '1.0.0'

// Default Pomodoro settings
export const DEFAULT_WORK_DURATION = 25 // minutes
export const DEFAULT_SHORT_BREAK_DURATION = 5 // minutes
export const DEFAULT_LONG_BREAK_DURATION = 15 // minutes
export const DEFAULT_SESSIONS_UNTIL_LONG_BREAK = 4

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password'
  },
  USER: {
    PROFILE: '/api/users/profile',
    SETTINGS: '/api/users/settings',
    DELETE: '/api/users/account'
  },
  TASKS: {
    BASE: '/api/tasks',
    BY_ID: (id: string) => `/api/tasks/${id}`,
    TOGGLE: (id: string) => `/api/tasks/${id}/toggle`
  },
  POMODORO: {
    BASE: '/api/pomodoro',
    ACTIVE: '/api/pomodoro/active',
    BY_ID: (id: string) => `/api/pomodoro/${id}`,
    COMPLETE: (id: string) => `/api/pomodoro/${id}/complete`,
    PAUSE: (id: string) => `/api/pomodoro/${id}/pause`,
    RESUME: (id: string) => `/api/pomodoro/${id}/resume`
  },
  ANALYTICS: {
    DASHBOARD: '/api/analytics/dashboard',
    POMODORO: '/api/analytics/pomodoro',
    TASKS: '/api/analytics/tasks',
    PRODUCTIVITY: '/api/analytics/productivity',
    WEEKLY: '/api/analytics/reports/weekly',
    MONTHLY: '/api/analytics/reports/monthly'
  }
} as const

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'pomodoro_auth_token',
  REFRESH_TOKEN: 'pomodoro_refresh_token',
  USER_SETTINGS: 'pomodoro_user_settings',
  TIMER_STATE: 'pomodoro_timer_state',
  THEME: 'pomodoro_theme'
} as const

// Theme configuration
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
} as const

// Subscription plans
export const SUBSCRIPTION_PLANS = {
  FREE: {
    id: 'FREE',
    name: 'Free',
    price: 0,
    features: [
      '5 projects',
      'Basic pomodoro timer',
      'Limited analytics',
      'Community support'
    ],
    limits: {
      projects: 5,
      tasksPerProject: 50,
      pomodoroHistory: 30 // days
    }
  },
  PRO: {
    id: 'PRO',
    name: 'Pro',
    price: 29,
    features: [
      'Unlimited projects',
      'Advanced analytics',
      'Custom themes',
      'Priority support',
      'Export data',
      'Calendar integration'
    ],
    limits: {
      projects: -1, // unlimited
      tasksPerProject: -1,
      pomodoroHistory: -1
    }
  },
  PREMIUM: {
    id: 'PREMIUM',
    name: 'Premium',
    price: 49,
    features: [
      'All Pro features',
      'Team collaboration',
      'Advanced reporting',
      'API access',
      'White-label option',
      'Custom integrations'
    ],
    limits: {
      projects: -1,
      tasksPerProject: -1,
      pomodoroHistory: -1,
      teamMembers: 10
    }
  }
} as const

// Error messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  RATE_LIMIT: 'Too many requests. Please wait a moment.',
  SERVER: 'Server error. Please try again later.'
} as const

// Success messages
export const SUCCESS_MESSAGES = {
  TASK_CREATED: 'Task created successfully!',
  TASK_UPDATED: 'Task updated successfully!',
  TASK_DELETED: 'Task deleted successfully!',
  TASK_COMPLETED: 'Task completed! Great job!',
  POMODORO_COMPLETED: 'Pomodoro session completed!',
  SETTINGS_SAVED: 'Settings saved successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!'
} as const

// Time formats
export const TIME_FORMATS = {
  TIMER: 'mm:ss',
  DATE: 'MMM dd, yyyy',
  DATETIME: 'MMM dd, yyyy HH:mm',
  TIME: 'HH:mm'
} as const

// Validation rules
export const VALIDATION_RULES = {
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 128,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  TASK_TITLE: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 200
  },
  PROJECT_NAME: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 100
  }
} as const