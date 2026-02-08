#!/bin/bash
# Check if the application is running properly

echo "🔍 Checking Data Analysis Agent Status..."
echo ""

# Check backend
echo "1️⃣ Backend (Port 8000):"
if curl -s http://localhost:8000/api/health > /dev/null 2>&1; then
    echo "   ✅ Running"
    curl -s http://localhost:8000/api/health | jq .
else
    echo "   ❌ Not running"
    echo "   Run: bash run.sh"
fi

echo ""

# Check frontend
echo "2️⃣ Frontend (Port 3000):"
if curl -s http://localhost:3000 -I | grep -q "200 OK"; then
    echo "   ✅ Running"
    echo "   🌐 Open: http://localhost:3000"
else
    echo "   ❌ Not running"
    echo "   Run: bash run.sh"
fi

echo ""

# Check processes
echo "3️⃣ Running Processes:"
BACKEND_PID=$(pgrep -f "uvicorn main:app")
FRONTEND_PID=$(pgrep -f "next dev")

if [ -n "$BACKEND_PID" ]; then
    echo "   Backend PID: $BACKEND_PID"
else
    echo "   ⚠️  No backend process"
fi

if [ -n "$FRONTEND_PID" ]; then
    echo "   Frontend PID: $FRONTEND_PID"
else
    echo "   ⚠️  No frontend process"
fi

echo ""

# Check logs
echo "4️⃣ Recent Logs:"
if [ -f /tmp/backend.log ]; then
    echo "   Backend (last 3 lines):"
    tail -n 3 /tmp/backend.log | sed 's/^/   /'
fi

if [ -f /tmp/frontend.log ]; then
    echo ""
    echo "   Frontend (last 3 lines):"
    tail -n 3 /tmp/frontend.log | sed 's/^/   /'
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -n "$BACKEND_PID" ] && [ -n "$FRONTEND_PID" ]; then
    echo "✅ Everything is running!"
    echo "🌐 Go to: http://localhost:3000"
else
    echo "⚠️  Some services are not running"
    echo "💡 Run: bash run.sh"
fi
