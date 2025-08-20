#!/bin/bash

# Development setup script
echo "🚀 Starting Pomodoro App Development Environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Start services
echo "📦 Starting Docker services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if services are running
echo "🔍 Checking service status..."
docker-compose ps

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
    echo "📥 Installing dependencies..."
    npm install
fi

# Generate Prisma client and run migrations
echo "🗄️ Setting up database..."
cd packages/database
npm run db:generate
npm run db:push
cd ../..

# Start development servers
echo "🎯 Starting development servers..."
npm run dev