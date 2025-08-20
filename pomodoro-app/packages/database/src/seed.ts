import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@pomodoroapp.com' },
    update: {},
    create: {
      email: 'admin@pomodoroapp.com',
      name: 'Admin User',
      password: adminPassword,
      emailVerified: new Date(),
      settings: {
        create: {
          theme: 'dark',
          workDuration: 25,
          shortBreakDuration: 5,
          longBreakDuration: 15,
          sessionsUntilLongBreak: 4
        }
      },
      subscription: {
        create: {
          plan: 'PREMIUM',
          status: 'ACTIVE'
        }
      },
      analytics: {
        create: {
          totalPomodoroSessions: 0,
          totalFocusTime: 0,
          totalTasksCompleted: 0
        }
      }
    }
  })

  // Create demo user
  const demoPassword = await bcrypt.hash('demo123', 10)
  
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@pomodoroapp.com' },
    update: {},
    create: {
      email: 'demo@pomodoroapp.com',
      name: 'Demo User',
      password: demoPassword,
      emailVerified: new Date(),
      settings: {
        create: {}
      },
      analytics: {
        create: {}
      }
    }
  })

  // Create sample projects for demo user
  const workProject = await prisma.project.create({
    data: {
      name: 'Work Projects',
      description: 'Professional tasks and projects',
      color: '#3b82f6',
      userId: demoUser.id
    }
  })

  const personalProject = await prisma.project.create({
    data: {
      name: 'Personal',
      description: 'Personal tasks and goals',
      color: '#10b981',
      userId: demoUser.id
    }
  })

  const learningProject = await prisma.project.create({
    data: {
      name: 'Learning',
      description: 'Study and skill development',
      color: '#8b5cf6',
      userId: demoUser.id
    }
  })

  // Create sample tasks
  const tasks = [
    {
      title: 'Complete project proposal',
      description: 'Write and review the Q1 project proposal document',
      priority: 'HIGH' as const,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
      projectId: workProject.id,
      userId: demoUser.id
    },
    {
      title: 'Review team feedback',
      description: 'Go through feedback from last week\'s sprint review',
      priority: 'MEDIUM' as const,
      projectId: workProject.id,
      userId: demoUser.id
    },
    {
      title: 'Plan weekend trip',
      description: 'Research and book accommodations for weekend getaway',
      priority: 'LOW' as const,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
      projectId: personalProject.id,
      userId: demoUser.id
    },
    {
      title: 'Read React documentation',
      description: 'Study the new features in React 18',
      priority: 'MEDIUM' as const,
      projectId: learningProject.id,
      userId: demoUser.id
    },
    {
      title: 'Practice TypeScript',
      description: 'Complete advanced TypeScript exercises',
      priority: 'MEDIUM' as const,
      projectId: learningProject.id,
      userId: demoUser.id
    }
  ]

  for (const taskData of tasks) {
    await prisma.task.create({ data: taskData })
  }

  // Create sample pomodoro sessions
  const sessions = [
    {
      type: 'WORK' as const,
      duration: 25,
      completed: true,
      startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      endedAt: new Date(Date.now() - 95 * 60 * 1000), // 95 minutes ago
      userId: demoUser.id
    },
    {
      type: 'SHORT_BREAK' as const,
      duration: 5,
      completed: true,
      startedAt: new Date(Date.now() - 90 * 60 * 1000), // 90 minutes ago
      endedAt: new Date(Date.now() - 85 * 60 * 1000), // 85 minutes ago
      userId: demoUser.id
    },
    {
      type: 'WORK' as const,
      duration: 25,
      completed: true,
      startedAt: new Date(Date.now() - 80 * 60 * 1000), // 80 minutes ago
      endedAt: new Date(Date.now() - 55 * 60 * 1000), // 55 minutes ago
      userId: demoUser.id
    }
  ]

  for (const sessionData of sessions) {
    await prisma.pomodoroSession.create({ data: sessionData })
  }

  // Update analytics for demo user
  const totalSessions = await prisma.pomodoroSession.count({
    where: { userId: demoUser.id, completed: true }
  })
  
  const totalFocusTime = await prisma.pomodoroSession.aggregate({
    where: { userId: demoUser.id, completed: true, type: 'WORK' },
    _sum: { duration: true }
  })

  await prisma.userAnalytics.update({
    where: { userId: demoUser.id },
    data: {
      totalPomodoroSessions: totalSessions,
      totalFocusTime: totalFocusTime._sum.duration || 0,
      currentStreak: 1,
      longestStreak: 3
    }
  })

  // Create some system metrics
  const metrics = [
    { name: 'active_users', value: 2 },
    { name: 'total_sessions_today', value: 3 },
    { name: 'total_focus_time_today', value: 50 }
  ]

  for (const metric of metrics) {
    await prisma.systemMetric.create({ data: metric })
  }

  console.log('✅ Database seeded successfully!')
  console.log(`👤 Admin user: admin@pomodoroapp.com (password: admin123)`)
  console.log(`👤 Demo user: demo@pomodoroapp.com (password: demo123)`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e)
    await prisma.$disconnect()
    process.exit(1)
  })