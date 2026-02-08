#!/bin/bash
# RUN THIS COMMAND TO START THE APP:
# bash run.sh

echo "🚀 Starting Data Analysis App..."

cd "$(dirname "$0")"

# Stop any existing servers
pkill -f "uvicorn main:app" 2>/dev/null
pkill -f "next dev" 2>/dev/null
sleep 2

# Start backend
echo "📊 Starting backend..."
source .venv/bin/activate
cd api
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000 > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
cd ..

sleep 3

# Check backend
if curl -s http://localhost:8000/api/health > /dev/null 2>&1; then
    echo "✅ Backend running on http://localhost:8000"
else
    echo "❌ Backend failed! Check: tail -f /tmp/backend.log"
    exit 1
fi

# Start frontend  
echo "🌐 Starting frontend..."
cd frontend
PORT=3000 npm run dev > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

sleep 5

echo ""
echo "✅ READY! Open browser to: http://localhost:3000"
echo ""
echo "📝 To view logs:"
echo "   Backend: tail -f /tmp/backend.log"
echo "   Frontend: tail -f /tmp/frontend.log"
echo ""
echo "🛑 To stop: bash stop.sh"
echo ""
