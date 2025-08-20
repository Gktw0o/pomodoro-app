'use client'

import { motion } from 'framer-motion'
import { Timer, CheckSquare, BarChart3, Settings } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: Timer,
      title: 'Pomodoro Timer',
      description: 'Focus with customizable 25-minute work sessions'
    },
    {
      icon: CheckSquare,
      title: 'Task Management',
      description: 'Organize and track your tasks efficiently'
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Monitor your productivity and progress'
    },
    {
      icon: Settings,
      title: 'Customizable',
      description: 'Personalize your productivity experience'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <Timer className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-neutral-800">PomodoroApp</span>
          </div>
          <div className="space-x-4">
            <button className="px-4 py-2 text-neutral-600 hover:text-primary-500 transition-colors">
              Login
            </button>
            <button className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors btn-animate">
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-neutral-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Focus. Plan. Achieve.
          </motion.h1>
          
          <motion.p 
            className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Boost your productivity with our modern Pomodoro timer and task management system. 
            Stay focused, track progress, and achieve your goals.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button className="px-8 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors btn-animate text-lg font-semibold">
              Start Free Trial
            </button>
            <button className="px-8 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:border-primary-300 hover:text-primary-600 transition-colors btn-animate text-lg">
              Watch Demo
            </button>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-neutral-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-neutral-500">
        <p>&copy; 2024 PomodoroApp. Built with ❤️ for productivity enthusiasts.</p>
      </footer>
    </div>
  )
}