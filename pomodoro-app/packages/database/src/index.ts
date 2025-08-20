import { PrismaClient } from '@prisma/client'

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Export Prisma types
export * from '@prisma/client'

// Custom database utilities
export class DatabaseService {
  static async healthCheck(): Promise<boolean> {
    try {
      await prisma.$queryRaw`SELECT 1`
      return true
    } catch (error) {
      console.error('Database health check failed:', error)
      return false
    }
  }

  static async disconnect(): Promise<void> {
    await prisma.$disconnect()
  }

  // User utilities
  static async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: {
        settings: true,
        subscription: true,
      }
    })
  }

  static async createUserWithDefaults(data: {
    email: string
    name: string
    password?: string
  }) {
    return prisma.user.create({
      data: {
        ...data,
        settings: {
          create: {} // Uses default values from schema
        },
        analytics: {
          create: {} // Initialize analytics
        }
      },
      include: {
        settings: true,
        subscription: true,
        analytics: true
      }
    })
  }

  // Task utilities
  static async getUserTasks(userId: string, filters?: {
    completed?: boolean
    projectId?: string
    priority?: string
  }) {
    return prisma.task.findMany({
      where: {
        userId,
        ...filters
      },
      include: {
        project: true,
        subtasks: true,
        _count: {
          select: {
            pomodoroSessions: true
          }
        }
      },
      orderBy: [
        { completed: 'asc' },
        { priority: 'desc' },
        { createdAt: 'desc' }
      ]
    })
  }

  // Pomodoro utilities
  static async createPomodoroSession(data: {
    userId: string
    type: 'WORK' | 'SHORT_BREAK' | 'LONG_BREAK'
    duration: number
    taskId?: string
  }) {
    return prisma.pomodoroSession.create({
      data,
      include: {
        task: true
      }
    })
  }

  static async getUserPomodoroStats(userId: string, period?: {
    startDate: Date
    endDate: Date
  }) {
    const where = {
      userId,
      completed: true,
      ...(period && {
        startedAt: {
          gte: period.startDate,
          lte: period.endDate
        }
      })
    }

    const [sessions, totalFocusTime] = await Promise.all([
      prisma.pomodoroSession.count({ where }),
      prisma.pomodoroSession.aggregate({
        where,
        _sum: { duration: true }
      })
    ])

    return {
      totalSessions: sessions,
      totalFocusTime: totalFocusTime._sum.duration || 0
    }
  }

  // Analytics utilities
  static async updateUserAnalytics(userId: string) {
    const stats = await this.getUserPomodoroStats(userId)
    const completedTasks = await prisma.task.count({
      where: { userId, completed: true }
    })

    return prisma.userAnalytics.upsert({
      where: { userId },
      update: {
        totalPomodoroSessions: stats.totalSessions,
        totalFocusTime: stats.totalFocusTime,
        totalTasksCompleted: completedTasks,
        lastUpdated: new Date()
      },
      create: {
        userId,
        totalPomodoroSessions: stats.totalSessions,
        totalFocusTime: stats.totalFocusTime,
        totalTasksCompleted: completedTasks
      }
    })
  }
}