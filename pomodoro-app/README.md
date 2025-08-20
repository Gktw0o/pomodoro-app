# 🍅 Pomodoro & Task Planning App

A modern, full-featured Pomodoro timer and task planning application built with Next.js, Node.js, and PostgreSQL.

## 🏗️ Project Structure

```
pomodoro-app/
├── apps/
│   ├── web/          # Next.js frontend application
│   └── api/          # Node.js backend API
├── packages/
│   ├── ui/           # Shared UI components
│   ├── config/       # Shared configuration
│   └── database/     # Prisma database schema
├── docs/             # Documentation
└── scripts/          # Build and deployment scripts
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14+** - React framework with SSR/SSG
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animations
- **Zustand** - State management

### Backend
- **Node.js 20+** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Prisma** - Database ORM
- **Redis** - Caching and sessions

### Database
- **PostgreSQL** - Primary database
- **Redis** - Cache and session storage

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 15+
- Redis 7+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd pomodoro-app
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

4. Set up the database
```bash
npm run db:setup
```

5. Start the development servers
```bash
npm run dev
```

## 📜 Available Scripts

- `npm run dev` - Start development servers
- `npm run build` - Build all applications
- `npm run test` - Run tests
- `npm run lint` - Run linting
- `npm run type-check` - Run TypeScript checks

## 🏛️ Architecture

This is a monorepo managed with Turbo, containing:

- **Web App**: Next.js frontend with TypeScript and Tailwind CSS
- **API**: Express.js backend with TypeScript and Prisma
- **Shared Packages**: Common utilities, UI components, and configurations

## 📊 Features

- ✅ Pomodoro Timer with customizable intervals
- ✅ Task Management with projects and categories
- ✅ Analytics and Progress Tracking
- ✅ User Authentication and Profiles
- ✅ Real-time Notifications
- ✅ Responsive Design
- ✅ Progressive Web App (PWA)

## 🎯 Development Roadmap

See [DEVELOPMENT_PLAN.md](../POMODORO_APP_DEVELOPMENT_PLAN.md) for detailed development stages and timeline.

## 📝 License

This project is licensed under the MIT License.