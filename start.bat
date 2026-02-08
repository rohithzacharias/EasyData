@echo off
REM Startup script for Data Analysis Agent Web Application (Windows)

echo 🧠 Data Analysis Agent - Starting...
echo.

REM Check if we're in the right directory
if not exist "vercel.json" (
    echo ❌ Error: Please run this script from the project root directory
    exit /b 1
)

REM Check prerequisites
echo 🔍 Checking prerequisites...

where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Python is not installed
    exit /b 1
)

where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js/npm is not installed
    exit /b 1
)

echo ✅ Prerequisites OK
echo.

REM Check if dependencies are installed
if not exist "frontend\node_modules" (
    echo 📦 Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

REM Start backend in new window
echo 🚀 Starting FastAPI backend on port 8000...
start "Backend API" cmd /k "cd api && python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload"

REM Wait a bit for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend in new window
echo 🚀 Starting Next.js frontend on port 3000...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ✨ Application is starting...
echo.
echo 📍 Frontend: http://localhost:3000
echo 📍 Backend API: http://localhost:8000
echo 📍 API Docs: http://localhost:8000/docs
echo.
echo Close the terminal windows to stop the services
echo.

REM Keep this window open
pause
