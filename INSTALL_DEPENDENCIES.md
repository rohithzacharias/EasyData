# 📦 Complete Installation Guide

## Prerequisites Installation

### Step 1: Install pip (Python Package Manager)

```bash
sudo apt update
sudo apt install python3-pip -y
```

### Step 2: Install Node.js and npm (if not installed)

```bash
# Check if Node.js is installed
node --version
npm --version

# If not installed, run:
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

---

## Project Dependencies Installation

### Step 3: Install Python Dependencies

Navigate to your project directory first:
```bash
cd "/home/rohith/Desktop/Data Analysis Agent"
```

**Install base requirements:**
```bash
pip3 install -r requirements.txt
```

**Install API (backend) requirements:**
```bash
pip3 install -r api/requirements.txt
```

**OR install all Python packages at once:**
```bash
pip3 install pandas>=2.0.0 numpy>=1.24.0 matplotlib>=3.7.0 seaborn>=0.12.0 \
scikit-learn>=1.3.0 jupyter>=1.0.0 notebook>=7.0.0 streamlit>=1.28.0 \
requests>=2.31.0 fastapi==0.104.1 uvicorn==0.24.0 python-multipart==0.0.6 \
PyPDF2==3.0.1 python-docx==1.1.0 openpyxl==3.1.2
```

### Step 4: Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

---

## Quick Installation Script

### Linux/Mac - All-in-One Command:

```bash
cd "/home/rohith/Desktop/Data Analysis Agent"

# Install Python dependencies
pip3 install pandas numpy matplotlib seaborn scikit-learn jupyter notebook \
streamlit requests fastapi uvicorn python-multipart PyPDF2 python-docx openpyxl

# Install Frontend dependencies
cd frontend && npm install && cd ..

echo "✅ All dependencies installed!"
```

### Windows - All-in-One Command:

```cmd
cd "C:\path\to\Data Analysis Agent"

REM Install Python dependencies
pip install pandas numpy matplotlib seaborn scikit-learn jupyter notebook ^
streamlit requests fastapi uvicorn python-multipart PyPDF2 python-docx openpyxl

REM Install Frontend dependencies
cd frontend
npm install
cd ..

echo All dependencies installed!
```

---

## Verify Installation

### Check Python packages:
```bash
python3 -c "import pandas, fastapi, PyPDF2, docx, openpyxl; print('✅ Python packages OK')"
```

### Check Node packages:
```bash
cd frontend
npm list --depth=0
cd ..
```

---

## Common Issues & Solutions

### Issue 1: pip not found
**Solution:**
```bash
sudo apt install python3-pip
```

### Issue 2: Permission denied
**Solution:**
```bash
pip3 install --user -r requirements.txt
```

### Issue 3: npm not found
**Solution:**
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Issue 4: Python version too old
**Solution:**
```bash
# Check Python version (needs 3.8+)
python3 --version

# Update Python if needed
sudo apt update
sudo apt install python3.10
```

### Issue 5: Virtual environment recommended
**Solution:**
```bash
# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate  # Linux/Mac
# OR
venv\Scripts\activate  # Windows

# Then install packages
pip install -r requirements.txt
pip install -r api/requirements.txt
```

---

## Individual Package Installation (If needed)

### Python Packages:

```bash
# Core data processing
pip3 install pandas numpy

# Visualization
pip3 install matplotlib seaborn

# Machine learning
pip3 install scikit-learn

# Web frameworks
pip3 install fastapi uvicorn streamlit

# File processing
pip3 install PyPDF2 python-docx openpyxl python-multipart

# HTTP requests
pip3 install requests

# Jupyter
pip3 install jupyter notebook
```

### Node Packages:

```bash
cd frontend

# React & Next.js
npm install react react-dom next

# Material-UI
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled

# Data handling
npm install @tanstack/react-table axios

# File upload
npm install react-dropzone

# Notifications
npm install react-hot-toast

# Charts (if needed)
npm install recharts

# Date utilities
npm install date-fns

# TypeScript & Dev tools
npm install --save-dev typescript @types/node @types/react @types/react-dom eslint eslint-config-next
```

---

## After Installation

### Run the application:

**Terminal 1 - Backend:**
```bash
cd api
uvicorn main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Open browser:**
```
http://localhost:3000
```

---

## Package Sizes (Approximate)

- **Python packages**: ~500MB
- **Node packages**: ~350MB
- **Total disk space needed**: ~1GB

---

## Installation Time

- **Python packages**: 2-5 minutes
- **Node packages**: 3-7 minutes
- **Total time**: 5-12 minutes (depending on internet speed)

---

## Offline Installation (If needed)

### Save packages for offline use:
```bash
# Python
pip3 download -r requirements.txt -d python_packages/

# Node
cd frontend
npm pack
```

### Install from saved packages:
```bash
# Python
pip3 install --no-index --find-links=python_packages/ -r requirements.txt

# Node
npm install ./package.tgz
```

---

## Docker Alternative (Advanced)

If you prefer Docker:

```dockerfile
# Create Dockerfile
FROM python:3.10
WORKDIR /app
COPY requirements.txt api/requirements.txt ./
RUN pip install -r requirements.txt
# ... rest of setup
```

---

## Troubleshooting Commands

```bash
# Check what's installed
pip3 list
npm list -g --depth=0

# Update pip
python3 -m pip install --upgrade pip

# Update npm
npm install -g npm@latest

# Clear npm cache
npm cache clean --force

# Clear pip cache
pip3 cache purge
```

---

## Quick Check Script

Save this as `check_dependencies.sh`:

```bash
#!/bin/bash

echo "Checking Python packages..."
python3 -c "
import sys
packages = ['pandas', 'numpy', 'fastapi', 'uvicorn', 'PyPDF2', 'docx', 'openpyxl']
missing = []
for pkg in packages:
    try:
        __import__(pkg)
        print(f'✅ {pkg}')
    except ImportError:
        print(f'❌ {pkg}')
        missing.append(pkg)
        
if missing:
    print(f'\nMissing packages: {missing}')
    print('Run: pip3 install ' + ' '.join(missing))
else:
    print('\n✅ All Python packages installed!')
"

echo ""
echo "Checking Node packages..."
cd frontend
if [ -d "node_modules" ]; then
    echo "✅ Node modules installed"
else
    echo "❌ Node modules not installed"
    echo "Run: cd frontend && npm install"
fi
cd ..
```

Run it:
```bash
chmod +x check_dependencies.sh
./check_dependencies.sh
```

---

## Summary - Copy & Paste This:

```bash
# Navigate to project
cd "/home/rohith/Desktop/Data Analysis Agent"

# Install pip if needed
sudo apt install python3-pip -y

# Install all Python packages
pip3 install pandas numpy matplotlib seaborn scikit-learn jupyter notebook streamlit requests fastapi uvicorn python-multipart PyPDF2 python-docx openpyxl

# Install all Node packages
cd frontend
npm install
cd ..

# Verify
python3 -c "import pandas, fastapi; print('✅ Python OK')"
cd frontend && npm list --depth=0 && cd ..

echo "🎉 Installation complete!"
```

---

**Start your app after installation:**
```bash
./start.sh  # Linux/Mac
# OR
start.bat   # Windows
```

**Your app will be at:** http://localhost:3000
