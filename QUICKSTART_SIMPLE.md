# 🚀 Quick Start Guide

## First Time Setup

1. **Install Python and Node.js** (if not installed)
   - Python 3.8 or higher
   - Node.js 18 or higher

2. **Run Setup Script**
   ```bash
   bash setup.sh
   ```
   This will:
   - Create Python virtual environment
   - Install Python dependencies
   - Install Node.js dependencies
   - Create environment configuration

## Starting the Application

**Simple Method** - Just run:
```bash
bash start.sh
```

This automatically:
- Starts backend server on http://localhost:8000
- Starts frontend on http://localhost:3000
- Shows status of both servers

**Manual Method** - If you want to start separately:

Terminal 1 (Backend):
```bash
source .venv/bin/activate
cd api
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

## Using the Application

1. Open http://localhost:3000 in your browser
2. Upload any data file (.csv, .xlsx, .pdf, .docx, .json, .txt)
3. View and sort your data interactively
4. Apply filters by data type (numeric or text)
5. Download filtered/sorted data in multiple formats:
   - CSV
   - Excel (.xlsx)
   - JSON
   - PDF
   - Word Document (.docx)

## Common Issues

### Upload fails when reopening
**Solution**: Make sure both servers are running:
```bash
bash start.sh
```

### Filters not working
**Solution**: 
- Make sure you click "Apply Filters" button
- Check that filter values match the data type (numbers for numeric columns)

### Can't download
**Solution**: Check browser console (F12) for errors and ensure backend is running

## Stopping the Application

```bash
pkill -f "uvicorn main:app"
pkill -f "next dev"
```

## Features

✅ Upload multiple file formats  
✅ Interactive sortable tables  
✅ Smart filters (auto-detects data types)  
✅ Export filtered/sorted data  
✅ Multiple export formats (CSV, Excel, PDF, Word, JSON)  
✅ Real-time data statistics  

## Deployment to Vercel

See [DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md) for production deployment.
