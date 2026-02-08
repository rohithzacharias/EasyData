# 🧠 Data Analysis Agent - Production Web Application

**AI-Powered Data Analysis Platform | Deployed on Vercel**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/data-analysis-agent)

## 🌟 New Features (v2.0)

### 🎨 Modern Web Interface
- Beautiful, responsive UI built with Next.js and Material-UI
- Gradient backgrounds and smooth animations
- Mobile-friendly design

### 📁 Multi-Format Support
- **Spreadsheets**: CSV, XLSX, XLS
- **Documents**: PDF, DOCX, TXT
- **Data**: JSON
- Automatic parsing and data extraction

### 📊 Interactive Data Tables
- **Sortable Columns**: Click any column header to sort
- **Real-time Search**: Filter data across all columns
- **Pagination**: Handle large datasets efficiently
- **Responsive Design**: Works on all screen sizes

### 🔍 Advanced Filtering
- Multiple filter conditions
- Support for: equals, not equals, greater than, less than, contains
- Chain multiple filters together
- Visual filter management

### 📥 Smart Export
- Export to CSV, XLSX, or JSON
- Select specific columns to export
- Applies active filters to exported data
- Download multiple custom views

### 📈 Statistics Dashboard
- Overview metrics (rows, columns)
- Missing value analysis with visualizations
- Categorical column insights
- Top values and frequencies

### ⚡ Performance
- Serverless architecture with FastAPI
- Efficient token usage with schema compression
- Session-based data management
- Lightning-fast data processing

## 🚀 Quick Start

### Local Development

1. **Clone the repository**:
```bash
git clone https://github.com/YOUR_USERNAME/data-analysis-agent.git
cd data-analysis-agent
```

2. **Install Backend Dependencies**:
```bash
pip install -r requirements.txt
pip install -r api/requirements.txt
```

3. **Install Frontend Dependencies**:
```bash
cd frontend
npm install
cd ..
```

4. **Run Backend** (Terminal 1):
```bash
cd api
uvicorn main:app --reload --port 8000
```

5. **Run Frontend** (Terminal 2):
```bash
cd frontend
npm run dev
```

6. **Open Browser**:
   - Navigate to: http://localhost:3000
   - Upload a data file and start analyzing!

### Deploy to Vercel

1. **Fork this repository**

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your forked repository
   - Click "Deploy"

3. **Your app is live!** 🎉
   - Share the URL with anyone
   - No server management needed

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

## 📱 How to Use

### 1. Upload Your Data
- Drag & drop or click to browse
- Supports multiple file formats
- Instant processing and preview

### 2. Explore Your Data
- View data in an interactive table
- Sort by clicking column headers
- Search across all columns
- See statistics and insights

### 3. Filter Data
- Click "Filters" button
- Add multiple filter conditions
- Combine different operators
- See filtered results instantly

### 4. Export Custom Views
- Click "Export" button
- Choose format (CSV, XLSX, JSON)
- Select specific columns
- Download filtered data

## 🎯 Use Cases

### Education
- **Student Records**: Sort by attendance, filter by eligibility
- **Grade Analysis**: Export students by performance level
- **Attendance Tracking**: Filter by date ranges

### Business
- **Sales Data**: Filter by region, sort by revenue
- **Customer Lists**: Export filtered segments
- **Inventory**: Sort by stock levels

### Research
- **Survey Results**: Filter by demographics
- **Experiment Data**: Sort by date, export subsets
- **Statistics**: Analyze missing values

### Personal
- **Budget Tracking**: Sort transactions by amount
- **Contact Lists**: Filter and export groups
- **Any Data File**: Instant analysis and insights

## 🛠️ Technology Stack

### Frontend
- **Next.js 14**: React framework with server-side rendering
- **TypeScript**: Type-safe code
- **Material-UI**: Beautiful, accessible components
- **React Table**: Advanced table functionality
- **Axios**: HTTP client

### Backend
- **FastAPI**: Modern Python web framework
- **Pandas**: Data manipulation and analysis
- **PyPDF2**: PDF text extraction
- **python-docx**: Word document processing
- **openpyxl**: Excel file handling

### Deployment
- **Vercel**: Serverless deployment platform
- **Edge Network**: Global CDN for fast loading
- **Automatic HTTPS**: Secure by default
- **CI/CD**: Auto-deploy on git push

## 📂 Project Structure

```
data-analysis-agent/
├── api/                      # FastAPI backend
│   ├── main.py              # API endpoints
│   └── requirements.txt     # Python dependencies
├── frontend/                # Next.js frontend
│   ├── pages/              # Next.js pages
│   │   ├── index.tsx       # Main application
│   │   ├── _app.tsx        # App wrapper
│   │   └── _document.tsx   # HTML document
│   ├── components/         # React components
│   │   ├── FileUpload.tsx
│   │   ├── DataTable.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── ExportDialog.tsx
│   │   └── StatisticsPanel.tsx
│   ├── styles/            # CSS styles
│   └── package.json       # Node dependencies
├── src/                   # Core Python modules
│   ├── eda_agent.py      # EDA agent
│   ├── schema_compressor.py
│   ├── history_compressor.py
│   └── visualizations.py
├── vercel.json           # Vercel configuration
├── DEPLOYMENT_GUIDE.md   # Deployment instructions
└── README_WEB_APP.md     # This file
```

## 🔒 Security & Privacy

- **No Data Storage**: Files are processed in memory
- **Session-based**: Each upload creates a temporary session
- **HTTPS**: All traffic encrypted
- **No Tracking**: Your data stays private

## 📊 Features Comparison

| Feature | Streamlit Version | Web App Version |
|---------|------------------|-----------------|
| UI Design | Basic | Modern, Professional |
| File Formats | CSV, XLSX | CSV, XLSX, PDF, DOCX, JSON, TXT |
| Sorting | Limited | Full column sorting |
| Filtering | Basic | Advanced multi-filter |
| Export | Simple | Custom column selection |
| Deployment | Manual | One-click Vercel |
| Mobile | Poor | Fully responsive |
| Performance | Good | Excellent (serverless) |
| Sharing | Requires hosting | Public URL instantly |

## 🎨 Customization

### Change Theme Colors

Edit [frontend/pages/_app.tsx](frontend/pages/_app.tsx):

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Change this
    },
    secondary: {
      main: '#9c27b0', // And this
    },
  },
})
```

### Add New File Formats

Edit [api/main.py](api/main.py) `process_file_to_dataframe()` function.

### Customize Table

Edit [frontend/components/DataTable.tsx](frontend/components/DataTable.tsx).

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file

## 🙋 Support

- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/data-analysis-agent/issues)
- **Discussions**: [GitHub Discussions](https://github.com/YOUR_USERNAME/data-analysis-agent/discussions)
- **Email**: your.email@example.com

## 🎉 Live Demo

Try it now: **https://data-analysis-agent.vercel.app**

---

**Built with ❤️ using Next.js, FastAPI, and AI**

**Deployed on Vercel - The platform for developers**

## 📸 Screenshots

### Upload Interface
![Upload](docs/screenshots/upload.png)

### Data Table with Filtering
![Table](docs/screenshots/table.png)

### Export Dialog
![Export](docs/screenshots/export.png)

### Statistics Dashboard
![Statistics](docs/screenshots/statistics.png)

---

### Example: Student Eligibility Analysis

```
1. Upload your class attendance sheet (CSV/XLSX)
2. Sort by "Attendance %" column (descending)
3. Add filter: "Attendance %" >= 75
4. Export as "eligible_students.csv"
5. Change filter: "Attendance %" < 75
6. Export as "not_eligible_students.csv"
```

**Done in under 1 minute! 🚀**
