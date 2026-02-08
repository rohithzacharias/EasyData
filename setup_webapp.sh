# Quick Setup Script for Data Analysis Agent Web App

echo "🚀 Setting up Data Analysis Agent Web App..."
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check if python3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed."
    exit 1
fi

echo "✅ Prerequisites check passed"
echo ""

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip3 install -r requirements.txt
pip3 install -r api/requirements.txt
echo "✅ Python dependencies installed"
echo ""

# Install Node dependencies
echo "📦 Installing Node dependencies..."
cd frontend
npm install
cd ..
echo "✅ Node dependencies installed"
echo ""

echo "🎉 Setup complete!"
echo ""
echo "To run the application:"
echo ""
echo "1. Start the backend (in one terminal):"
echo "   cd api && uvicorn main:app --reload --port 8000"
echo ""
echo "2. Start the frontend (in another terminal):"
echo "   cd frontend && npm run dev"
echo ""
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "To deploy to Vercel:"
echo "   See DEPLOYMENT_GUIDE.md"
echo ""
