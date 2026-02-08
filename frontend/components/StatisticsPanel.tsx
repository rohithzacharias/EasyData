import { useState, useEffect } from 'react'
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Divider,
} from '@mui/material'
import {
  TrendingUp as TrendingUpIcon,
  TableChart as TableIcon,
  Warning as WarningIcon,
} from '@mui/icons-material'

interface StatisticsPanelProps {
  sessionId: string
}

export default function StatisticsPanel({ sessionId }: StatisticsPanelProps) {
  const [statistics, setStatistics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || '/api'}/statistics/${sessionId}`
        )
        if (!response.ok) throw new Error('Failed to fetch statistics')
        const data = await response.json()
        setStatistics(data)
      } catch (error) {
        console.error('Statistics error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStatistics()
  }, [sessionId])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!statistics) return null

  return (
    <Box sx={{ p: 3, bgcolor: 'grey.50' }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <TrendingUpIcon /> Data Statistics
      </Typography>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        {/* Overview */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <TableIcon color="primary" />
                <Typography variant="h6">Overview</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Total Rows
              </Typography>
              <Typography variant="h4" gutterBottom>
                {statistics.total_rows?.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Total Columns
              </Typography>
              <Typography variant="h4">
                {statistics.total_columns}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Missing Values */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <WarningIcon color="warning" />
                <Typography variant="h6">Missing Values</Typography>
              </Box>
              <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
                {Object.entries(statistics.missing_values || {}).map(([col, count]: any) => (
                  count > 0 && (
                    <Box key={col} sx={{ mb: 1 }}>
                      <Typography variant="body2">{col}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            flex: 1,
                            height: 8,
                            bgcolor: 'grey.200',
                            borderRadius: 1,
                            overflow: 'hidden',
                          }}
                        >
                          <Box
                            sx={{
                              width: `${(count / statistics.total_rows) * 100}%`,
                              height: '100%',
                              bgcolor: 'warning.main',
                            }}
                          />
                        </Box>
                        <Typography variant="caption">{count}</Typography>
                      </Box>
                    </Box>
                  )
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Categorical Info */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Categorical Columns
              </Typography>
              <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
                {Object.entries(statistics.categorical_statistics || {}).map(([col, stats]: any) => (
                  <Box key={col} sx={{ mb: 2 }}>
                    <Typography variant="body2" fontWeight={600}>
                      {col}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {stats.unique_values} unique values
                    </Typography>
                    <Typography variant="caption" display="block">
                      Top: {stats.top_value} ({stats.top_frequency}x)
                    </Typography>
                    <Divider sx={{ mt: 1 }} />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
