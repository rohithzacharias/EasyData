# 🚀 QUICK START GUIDE - Data Analysis Agent Web App

## One-Command Setup & Run

### Linux/Mac:
```bash
./setup_webapp.sh && ./start.sh
```

### Windows:
```bash
setup_webapp.bat
start.bat
```

Then open: **http://localhost:3000** 🎉

---

## What You Built

You now have a **production-ready web application** with:

✅ **Modern UI**: Beautiful gradient design with Material-UI  
✅ **Multi-Format Support**: CSV, XLSX, PDF, DOCX, JSON, TXT  
✅ **Smart Tables**: Sort, filter, search any data  
✅ **Custom Exports**: Download filtered views in any format  
✅ **Statistics**: Instant data quality insights  
✅ **Cloud-Ready**: Deploy to Vercel in 2 minutes  

---

## 3 Ways to Use It

### 1. Local Development (What You're Doing Now)
```bash
# Terminal 1 - Backend
cd api
uvicorn main:app --reload --port 8000

# Terminal 2 - Frontend
cd frontend
npm run dev

# Browser
open http://localhost:3000
```

### 2. Deploy to Vercel (Make It Public)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts, get live URL in 2 minutes!
```

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for details.

### 3. Share with Others
Once deployed to Vercel:
- Share your URL: `https://your-app.vercel.app`
- Anyone can use it
- No installation needed
- Works on mobile too!

---

## Real-World Example: Student Attendance

Let's say you have a class attendance sheet:

**Before (Manual)**:
1. Open Excel
2. Manually sort by attendance%
3. Copy students with >=75% to new sheet
4. Copy students with <75% to another sheet
5. Save both files
⏱️ **Time**: 10-15 minutes

**After (With Your App)**:
1. Upload attendance.xlsx
2. Click "Attendance %" column to sort
3. Filter: "Attendance %" >= 75
4. Export → "eligible_students.csv"
5. Change filter: "Attendance %" < 75
6. Export → "not_eligible_students.csv"
⏱️ **Time**: 30 seconds! 🚀

---

## Architecture Overview

```
┌─────────────────────────────────────────────┐
│           USER'S BROWSER                     │
│  (Next.js Frontend - React + Material-UI)   │
└─────────────┬───────────────────────────────┘
              │ HTTP/REST API
              ▼
┌─────────────────────────────────────────────┐
│         FASTAPI BACKEND                      │
│  (Python - Pandas, PyPDF2, python-docx)     │
│  - File Processing                           │
│  - Data Filtering                            │
│  - Statistics Generation                     │
└─────────────┬───────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│      YOUR EDA AGENT (AI Core)               │
│  - Schema Compression                        │
│  - History Compression                       │
│  - Token Optimization                        │
└─────────────────────────────────────────────┘
```

**Deployed on Vercel**:
- Frontend: Edge Network (Global CDN)
- Backend: Serverless Functions
- No server management needed!

---

## File Structure

```
data-analysis-agent/
├── api/                    # FastAPI Backend
│   ├── main.py            # API endpoints
│   └── requirements.txt   # Python packages
│
├── frontend/              # Next.js Frontend
│   ├── pages/            # Routes
│   │   └── index.tsx     # Main app
│   ├── components/       # React components
│   │   ├── FileUpload.tsx
│   │   ├── DataTable.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── ExportDialog.tsx
│   │   └── StatisticsPanel.tsx
│   └── package.json      # Node packages
│
├── src/                  # Core Python modules
│   ├── eda_agent.py     # Your AI agent
│   ├── schema_compressor.py
│   └── history_compressor.py
│
├── vercel.json          # Vercel deployment config
├── start.sh             # Start everything (Linux/Mac)
├── start.bat            # Start everything (Windows)
└── DEPLOYMENT_GUIDE.md  # How to deploy
```

---

## Key Features You Can Use Right Now

### 1. Upload Any File Type
- Drag & drop or click to browse
- Supports: CSV, XLSX, XLS, JSON, PDF, DOCX, TXT
- Instant preview

### 2. Interactive Data Table
- Click column headers to sort
- Search box for quick filtering
- Pagination for large datasets
- Mobile-friendly

### 3. Advanced Filtering
- Click "Filters" button
- Add multiple conditions
- Operators: =, ≠, >, <, ≥, ≤, contains
- Combine filters (AND logic)

### 4. Smart Export
- Click "Export" button
- Choose format: CSV, XLSX, or JSON
- Select specific columns
- Exports filtered data only

### 5. Statistics Dashboard
- Click "Statistics" button
- See missing values
- View categorical insights
- Understand your data quality

---

## Common Use Cases

### Education
- Student grade analysis
- Attendance tracking
- Course enrollment management
- Exam eligibility filtering

### Business
- Sales reports by region
- Customer segmentation
- Inventory management
- Revenue analysis

### Research
- Survey data analysis
- Experiment results
- Data quality checks
- Statistical summaries

### Personal
- Budget tracking
- Contact list management
- Any CSV/Excel file
- PDF data extraction

---

## Next Steps

### Want to Deploy?
1. Read [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
2. Push code to GitHub
3. Connect to Vercel
4. Get live URL in minutes

### Want to Customize?
1. Change colors in `frontend/pages/_app.tsx`
2. Add file formats in `api/main.py`
3. Modify table in `frontend/components/DataTable.tsx`

### Want More Features?
1. Check [FEATURES.md](FEATURES.md) for roadmap
2. Open a GitHub issue
3. Contribute to the project

---

## Troubleshooting

### Frontend won't start
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Backend won't start
```bash
pip install --upgrade pip
pip install -r requirements.txt
pip install -r api/requirements.txt
```

### Port already in use
```bash
# Kill processes on ports
sudo lsof -ti:3000 | xargs kill -9  # Frontend
sudo lsof -ti:8000 | xargs kill -9  # Backend
```

### Can't upload file
- Check file size (max 5MB on Vercel free tier)
- Check file format is supported
- Look at browser console for errors

---

## Resources

- **Documentation**: Check all `.md` files in project root
- **API Docs**: http://localhost:8000/docs (when running)
- **Next.js Docs**: https://nextjs.org/docs
- **FastAPI Docs**: https://fastapi.tiangolo.com
- **Vercel Docs**: https://vercel.com/docs

---

## Support & Community

- **Issues**: Report bugs on GitHub
- **Questions**: Open a discussion
- **Contributing**: PRs welcome!

---

## License

MIT License - Free to use, modify, and distribute!

---

## Credits

Built with:
- **Next.js** - React framework
- **FastAPI** - Python web framework
- **Material-UI** - React components
- **Pandas** - Data processing
- **Vercel** - Deployment platform

---

**You've just built a professional data analysis platform! 🎉**

**Now go deploy it and share with the world! 🚀**

---

## Quick Commands Reference

```bash
# Setup
./setup_webapp.sh          # Install everything

# Run locally
./start.sh                 # Start both services
# OR manually:
cd api && uvicorn main:app --reload    # Backend
cd frontend && npm run dev              # Frontend

# Deploy
vercel                     # Deploy to Vercel
vercel --prod             # Deploy to production

# Development
npm run dev               # Frontend dev mode
uvicorn main:app --reload # Backend with hot reload

# Testing
curl http://localhost:8000/api/health  # Test backend
open http://localhost:3000              # Test frontend
```

---

**Happy Analyzing! 📊✨**
