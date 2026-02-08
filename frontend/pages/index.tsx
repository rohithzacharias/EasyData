import { useState, useCallback } from 'react'
import Head from 'next/head'
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  LinearProgress,
} from '@mui/material'
import {
  CloudUpload as UploadIcon,
  Analytics as AnalyticsIcon,
  TableChart as TableIcon,
  Download as DownloadIcon,
} from '@mui/icons-material'
import FileUpload from '../components/FileUpload'
import DataTable from '../components/DataTable'
import FilterPanel from '../components/FilterPanel'
import ExportDialog from '../components/ExportDialog'
import StatisticsPanel from '../components/StatisticsPanel'
import { toast } from 'react-hot-toast'

export default function Home() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [data, setData] = useState<any[]>([])
  const [columns, setColumns] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [fileInfo, setFileInfo] = useState<any>(null)
  const [filters, setFilters] = useState<any>({})
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [exportDialogOpen, setExportDialogOpen] = useState(false)
  const [showStatistics, setShowStatistics] = useState(false)

  const handleFileUpload = useCallback(async (file: File) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || '/api'}/upload`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const result = await response.json()
      
      setSessionId(result.session_id)
      setData(result.data)
      setColumns(result.columns)
      setFileInfo({
        filename: result.filename,
        rows: result.shape.rows,
        columns: result.shape.columns,
      })
      
      toast.success('File uploaded successfully!')
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload file')
    } finally {
      setLoading(false)
    }
  }, [])

  const handleSort = useCallback(async (column: string, order: 'asc' | 'desc') => {
    if (!sessionId) return

    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || '/api'}/data/${sessionId}?sort_column=${column}&sort_order=${order}&page_size=1000`
      )
      
      if (!response.ok) throw new Error('Sort failed')
      
      const result = await response.json()
      setData(result.data)
      setSortColumn(column)
      setSortOrder(order)
      toast.success('Data sorted!')
    } catch (error) {
      console.error('Sort error:', error)
      toast.error('Failed to sort data')
    } finally {
      setLoading(false)
    }
  }, [sessionId])

  const handleFilter = useCallback(async (newFilters: any) => {
    if (!sessionId) return

    setLoading(true)
    setFilters(newFilters)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || '/api'}/filter/${sessionId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newFilters),
        }
      )
      
      if (!response.ok) throw new Error('Filter failed')
      
      const result = await response.json()
      setData(result.data)
      toast.success(`Filtered: ${result.filtered_rows} of ${result.total_rows} rows`)
    } catch (error) {
      console.error('Filter error:', error)
      toast.error('Failed to filter data')
    } finally {
      setLoading(false)
    }
  }, [sessionId])

  const handleExport = useCallback(async (format: string, selectedColumns?: string[]) => {
    if (!sessionId) return

    try {
      const params = new URLSearchParams({ format })
      if (sortColumn) {
        params.append('sort_column', sortColumn)
        params.append('sort_order', sortOrder)
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || '/api'}/export/${sessionId}?${params}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filters, columns: selectedColumns }),
        }
      )
      
      if (!response.ok) throw new Error('Export failed')
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `export.${format}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      toast.success('Data exported successfully!')
    } catch (error) {
      console.error('Export error:', error)
      toast.error('Failed to export data')
    }
  }, [sessionId, filters])

  return (
    <>
      <Head>
        <title>Data Analysis Agent - AI-Powered Data Platform</title>
      </Head>

      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4, color: 'white' }}>
            <Typography variant="h1" sx={{ mb: 2, fontWeight: 800 }}>
              🧠 Data Analysis Agent
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.9 }}>
              AI-Powered Data Analysis Platform
            </Typography>
            <Typography sx={{ mt: 1, opacity: 0.8 }}>
              Upload any file format • Sort & Filter • Export Custom Views
            </Typography>
          </Box>

          {/* Main Content */}
          {!sessionId ? (
            <Paper
              elevation={8}
              sx={{
                p: 6,
                textAlign: 'center',
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <FileUpload onUpload={handleFileUpload} loading={loading} />
              
              <Grid container spacing={3} sx={{ mt: 4 }}>
                <Grid item xs={12} md={4}>
                  <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                    <CardContent>
                      <UploadIcon sx={{ fontSize: 48, mb: 2 }} />
                      <Typography variant="h6" gutterBottom>
                        Multi-Format Support
                      </Typography>
                      <Typography variant="body2">
                        Upload CSV, XLSX, XLS, JSON, PDF, DOCX, and TXT files
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
                    <CardContent>
                      <TableIcon sx={{ fontSize: 48, mb: 2 }} />
                      <Typography variant="h6" gutterBottom>
                        Interactive Tables
                      </Typography>
                      <Typography variant="body2">
                        Sort, filter, and arrange data exactly how you want
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
                    <CardContent>
                      <AnalyticsIcon sx={{ fontSize: 48, mb: 2 }} />
                      <Typography variant="h6" gutterBottom>
                        Smart Exports
                      </Typography>
                      <Typography variant="body2">
                        Export custom views with filters to CSV, XLSX, or JSON
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          ) : (
            <Paper
              elevation={8}
              sx={{
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* File Info Bar */}
              <Box
                sx={{
                  p: 2,
                  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: '12px 12px 0 0',
                }}
              >
                <Box>
                  <Typography variant="h6">{fileInfo?.filename}</Typography>
                  <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                    <Chip
                      label={`${fileInfo?.rows.toLocaleString()} rows`}
                      size="small"
                      sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                    />
                    <Chip
                      label={`${fileInfo?.columns} columns`}
                      size="small"
                      sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                    />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<AnalyticsIcon />}
                    onClick={() => setShowStatistics(!showStatistics)}
                    sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}
                  >
                    Statistics
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    onClick={() => setExportDialogOpen(true)}
                    sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}
                  >
                    Export
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setSessionId(null)
                      setData([])
                      setColumns([])
                      setFileInfo(null)
                    }}
                    sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}
                  >
                    New File
                  </Button>
                </Box>
              </Box>

              {loading && <LinearProgress />}

              {/* Statistics Panel */}
              {showStatistics && sessionId && (
                <StatisticsPanel sessionId={sessionId} />
              )}

              {/* Filter Panel */}
              <FilterPanel
                columns={columns}
                onFilter={handleFilter}
                currentFilters={filters}
              />

              {/* Data Table */}
              <Box sx={{ p: 3 }}>
                <DataTable
                  data={data}
                  columns={columns}
                  onSort={handleSort}
                  loading={loading}
                />
              </Box>
            </Paper>
          )}

          {/* Export Dialog */}
          {sessionId && (
            <ExportDialog
              open={exportDialogOpen}
              onClose={() => setExportDialogOpen(false)}
              onExport={handleExport}
              columns={columns}
            />
          )}
        </Container>
      </Box>
    </>
  )
}
