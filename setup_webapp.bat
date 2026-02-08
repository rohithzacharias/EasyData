@echo off
REM Quick Setup Script for Data Analysis Agent Web App (Windows)

echo 🚀 Setting up Data Analysis Agent Web App...
echo.

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm is not installed. Please install Node.js first.
    echo Visit: https://nodejs.org/
    exit /b 1
)

REM Check if python is installed
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Python is not installed.
    exit /b 1
)

echo ✅ Prerequisites check passed
echo.

REM Install Python dependencies
echo 📦 Installing Python dependencies...
pip install -r requirements.txt
pip install -r api/requirements.txt
echo ✅ Python dependencies installed
echo.

REM Install Node dependencies
echo 📦 Installing Node dependencies...
cd frontend
call npm install
cd ..
echo ✅ Node dependencies installed
echo.

echo 🎉 Setup complete!
echo.
echo To run the application:
echo.
echo 1. Start the backend (in one terminal):
echo    cd api ^&^& uvicorn main:app --reload --port 8000
echo.
echo 2. Start the frontend (in another terminal):
echo    cd frontend ^&^& npm run dev
echo.
echo 3. Open http://localhost:3000 in your browser
echo.
echo To deploy to Vercel:
echo    See DEPLOYMENT_GUIDE.md
echo.
pause
