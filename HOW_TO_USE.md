# 🎯 HOW TO USE - Data Analysis Agent

## ⚡ Quick Start (Every Time You Open)

### 1. Open Terminal in This Folder
```bash
cd "/home/rohith/Desktop/Data Analysis Agent"
```

### 2. Run This Single Command
```bash
bash run.sh
```

### 3. Open Browser
Go to: **http://localhost:3000**

That's it! ✅

---

## 🛑 To Stop the App
```bash
bash stop.sh
```

---

## ✨ What's Fixed

### ✅ Upload Problem SOLVED
- **Before**: Files failed to upload when reopening
- **After**: Just run `bash run.sh` - both servers start automatically
- The script checks if servers are running before starting

### ✅ Filter Problems SOLVED
- **Smart Type Detection**: Filters now detect if column is numeric or text
  - **Numeric columns** get: =, ≠, >, <, ≥, ≤
  - **Text columns** get: Equals, Not Equals, Contains
- **Better Value Conversion**: Numbers are converted properly for comparison
- **Sorting Works**: Click any column header to sort

### ✅ Download Sorted/Filtered Data
- **Applies Current State**: Export includes your current sorting and filters
- **Multiple Formats Available**:
  - CSV (.csv)
  - Excel (.xlsx)
  - JSON (.json)
  - **PDF (.pdf)** - NEW!
  - **Word (.docx)** - NEW!

---

## 📖 Features Guide

### 1. Upload Files
- Drag & drop or click to browse
- Supported formats: .csv, .xlsx, .json, .pdf, .docx, .txt

### 2. Sort Data
- Click any column header to sort
- Click again to reverse order
- Export will include your sorting

### 3. Filter Data
**Example: Filter by attendance percentage**
1. Click "Filters" button
2. Click "Add Filter"
3. Select column: "attendance"
4. Select operator: ">" (greater than)
5. Enter value: "90"
6. Click "Apply Filters"

**Numeric Filters** (age, score, attendance, etc.):
- `=` : Exactly equals
- `≠` : Not equals
- `>` : Greater than
- `<` : Less than
- `≥` : Greater or equal
- `≤` : Less or equal

**Text Filters** (name, city, etc.):
- Equals
- Not Equals
- Contains

### 4. Download Data
1. Click "Export" button
2. Choose format:
   - CSV - for Excel/data tools
   - Excel - formatted spreadsheet
   - JSON - for programming
   - PDF - for reports/printing
   - Word - for documents
3. Select columns (optional)
4. Click "Export"

**Your sorted data and filters are included in the download!**

---

## 🔧 Troubleshooting

### Upload Still Fails?
```bash
# Check if servers are running
curl http://localhost:8000/api/health
curl http://localhost:3000

# If not running, restart:
bash stop.sh
bash run.sh
```

### Filters Not Working?
- Make sure you click **"Apply Filters"** button
- For numbers, type just the number (no quotes)
- For text, type the exact text to match

### Can't Download?
- Press F12 in browser
- Check Console tab for errors
- Make sure backend is running: `curl http://localhost:8000/api/health`

### Port Already in Use?
```bash
# Stop everything first
bash stop.sh
# Wait 2 seconds, then:
bash run.sh
```

---

## 📝 Example Usage

### Example 1: Students with High Attendance
1. Upload student data CSV
2. Add filter: attendance > 90
3. Click "Apply Filters"
4. Sort by score (click header)
5. Export as PDF for report

### Example 2: Sales Above Target
1. Upload sales data
2. Add filter: sales >= 10000
3. Add filter: region = "North"
4. Apply filters
5. Export as Excel for analysis

---

## 🚀 Next Steps

### For Development
- Backend API docs: http://localhost:8000/docs
- Frontend: Uses React + Material-UI
- Backend: Uses FastAPI + Pandas

### For Deployment
See [DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md)

---

## 💡 Tips

1. **Always run `bash run.sh` when you open the project**
2. **Click "Apply Filters" after adding filters**
3. **Sorting and filtering persist when you export**
4. **Press F12 to see detailed errors in browser**
5. **Check logs**: `tail -f /tmp/backend.log` or `tail -f /tmp/frontend.log`

---

## Need Help?

Check logs:
```bash
# Backend errors
tail -f /tmp/backend.log

# Frontend errors  
tail -f /tmp/frontend.log
```

Test backend:
```bash
curl -X POST http://localhost:8000/api/upload -F "file=@yourfile.csv"
```
