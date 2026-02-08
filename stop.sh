#!/bin/bash
# STOP ALL SERVERS

echo "🛑 Stopping servers..."

pkill -f "uvicorn main:app"
pkill -f "next dev"

sleep 1

echo "✅ All servers stopped"
