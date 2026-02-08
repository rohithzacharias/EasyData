#!/bin/bash

echo "🚀 Installing all dependencies for Data Analysis Agent..."
echo ""

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "📦 Installing pip..."
    sudo apt update
    sudo apt install python3-pip -y
fi

echo "✅ pip is available"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "⚠️  npm is not installed"
    echo "Please install Node.js first:"
    echo "  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -"
    echo "  sudo apt-get install -y nodejs"
    exit 1
fi

echo "✅ npm is available"
echo ""

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip3 install pandas numpy matplotlib seaborn scikit-learn jupyter notebook streamlit requests fastapi uvicorn python-multipart PyPDF2 python-docx openpyxl

if [ $? -eq 0 ]; then
    echo "✅ Python dependencies installed"
else
    echo "❌ Failed to install Python dependencies"
    echo "Try: pip3 install --user pandas numpy matplotlib seaborn scikit-learn jupyter notebook streamlit requests fastapi uvicorn python-multipart PyPDF2 python-docx openpyxl"
    exit 1
fi

echo ""

# Install Node dependencies
echo "📦 Installing Node dependencies..."
cd frontend
npm install

if [ $? -eq 0 ]; then
    echo "✅ Node dependencies installed"
else
    echo "❌ Failed to install Node dependencies"
    exit 1
fi

cd ..

echo ""
echo "🎉 All dependencies installed successfully!"
echo ""
echo "To start the application:"
echo "  ./start.sh"
echo ""
echo "Or manually:"
echo "  Terminal 1: cd api && uvicorn main:app --reload --port 8000"
echo "  Terminal 2: cd frontend && npm run dev"
echo "  Browser: http://localhost:3000"
