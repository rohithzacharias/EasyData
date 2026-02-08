# EasyData 📊
A Full-Stack Data Analysis Web Application

## 🚀 Overview
**EasyData** is a full-stack data analysis web application that allows users to upload, analyze, filter, sort, and export data through an intuitive interface. It supports multiple file formats and provides smart filtering, statistical insights, and professional export options.

---

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** (React 18)
- **TypeScript**
- **Material UI (MUI)**
- React Hooks
- React Dropzone
- React Hot Toast

### Backend
- **FastAPI**
- **Python 3.12**
- Pandas & NumPy
- PyPDF2
- python-docx
- openpyxl
- ReportLab (PDF export)

---

## ✨ Features

### 📁 Multi-Format File Support
- CSV (`.csv`)
- Excel (`.xlsx`, `.xls`)
- JSON (`.json`)
- PDF (`.pdf`) – table extraction
- Word (`.docx`)
- Text (`.txt`) – delimiter auto-detection

### 📊 Interactive Data Table
- Column-based sorting
- Pagination (25 / 50 / 100 rows)
- Text-based search
- Responsive layout

### 🔍 Smart Filtering System
- Automatic column type detection
- Numeric filters: `=`, `≠`, `>`, `<`, `≥`, `≤`
- Text filters: Equals, Not Equals, Contains
- Multiple filters at once
- Filters persist during export

### 📈 Data Statistics
- Mean
- Median
- Standard deviation
- Unique values & frequency counts
- Missing value detection
- Data quality insights

### 📤 Export Options
- CSV
- Excel
- JSON
- PDF
- Word

Exports include:
- Applied filters
- Sorting state
- Selected columns

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/upload` | Upload and parse files |
| GET | `/api/data/{session_id}` | Fetch paginated data |
| POST | `/api/filter/{session_id}` | Apply filters |
| POST | `/api/export/{session_id}` | Export filtered data |
| GET | `/api/statistics/{session_id}` | Get data insights |
| GET | `/api/health` | Health check |

---

## 🧠 Architecture
