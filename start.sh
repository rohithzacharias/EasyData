#!/bin/bash

# Startup script for Data Analysis Agent Web Application

echo "🧠 Data Analysis Agent - Starting..."
echo ""

# Check if we're in the right directory
if [ ! -f "vercel.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "🔍 Checking prerequisites..."

if ! command_exists python3; then
    echo "❌ Python 3 is not installed"
    exit 1
fi

if ! command_exists npm; then
    echo "❌ Node.js/npm is not installed"
    exit 1
fi

echo "✅ Prerequisites OK"
echo ""

# Check if dependencies are installed
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
fi

# Start backend
echo "🚀 Starting FastAPI backend on port 8000..."
cd api
python3 -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Start frontend
echo "🚀 Starting Next.js frontend on port 3000..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✨ Application is starting..."
echo ""
echo "📍 Frontend: http://localhost:3000"
echo "📍 Backend API: http://localhost:8000"
echo "📍 API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Cleanup function
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "👋 Goodbye!"
    exit 0
}

# Register cleanup function
trap cleanup SIGINT SIGTERM

# Wait for processes
wait
