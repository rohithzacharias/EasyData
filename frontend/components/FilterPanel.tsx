import { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  IconButton,
  Collapse,
  Chip,
} from '@mui/material'
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material'

interface FilterPanelProps {
  columns: any[]
  onFilter: (filters: any) => void
  currentFilters: any
}

interface Filter {
  id: string
  column: string
  operator: string
  value: string
}

export default function FilterPanel({ columns, onFilter, currentFilters }: FilterPanelProps) {
  const [expanded, setExpanded] = useState(false)
  const [filters, setFilters] = useState<Filter[]>([])

  // Get operators based on column type
  const getOperatorsForColumn = (columnField: string) => {
    const column = columns.find(col => col.field === columnField)
    const columnType = column?.type || ''
    
    // Check if numeric type
    const isNumeric = columnType.includes('int') || columnType.includes('float') || 
                      columnType.includes('number') || columnType.includes('double')
    
    if (isNumeric) {
      return [
        { value: 'eq', label: '=' },
        { value: 'ne', label: '≠' },
        { value: 'gt', label: '>' },
        { value: 'lt', label: '<' },
        { value: 'gte', label: '≥' },
        { value: 'lte', label: '≤' },
      ]
    } else {
      return [
        { value: 'eq', label: 'Equals' },
        { value: 'ne', label: 'Not Equals' },
        { value: 'contains', label: 'Contains' },
      ]
    }
  }

  const addFilter = () => {
    setFilters([
      ...filters,
      {
        id: Math.random().toString(36).substr(2, 9),
        column: columns[0]?.field || '',
        operator: 'eq',
        value: '',
      },
    ])
  }

  const removeFilter = (id: string) => {
    setFilters(filters.filter((f) => f.id !== id))
  }

  const updateFilter = (id: string, field: keyof Filter, value: string) => {
    setFilters(
      filters.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    )
  }

  const applyFilters = () => {
    const filterObject: any = {}
    filters.forEach((filter) => {
      if (filter.column && filter.value) {
        filterObject[filter.column] = {
          operator: filter.operator,
          value: filter.value,
        }
      }
    })
    onFilter(filterObject)
  }

  const clearFilters = () => {
    setFilters([])
    onFilter({})
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        bgcolor: 'grey.50',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            startIcon={<FilterIcon />}
            onClick={() => setExpanded(!expanded)}
            variant={expanded ? 'contained' : 'outlined'}
          >
            Filters
          </Button>
          {Object.keys(currentFilters).length > 0 && (
            <Chip
              label={`${Object.keys(currentFilters).length} active`}
              color="primary"
              size="small"
              onDelete={clearFilters}
            />
          )}
        </Box>
        {expanded && (
          <Button startIcon={<AddIcon />} onClick={addFilter} variant="outlined" size="small">
            Add Filter
          </Button>
        )}
      </Box>

      <Collapse in={expanded}>
        <Box sx={{ mt: 2 }}>
          {filters.map((filter) => (
            <Grid container spacing={2} key={filter.id} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={4}>
                <Select
                  fullWidth
                  size="small"
                  value={filter.column}
                  onChange={(e) => updateFilter(filter.id, 'column', e.target.value)}
                >
                  {columns.map((col) => (
                    <MenuItem key={col.field} value={col.field}>
                      {col.headerName}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Select
                  fullWidth
                  size="small"
                  value={filter.operator}
                  onChange={(e) => updateFilter(filter.id, 'operator', e.target.value)}
                >
                  {getOperatorsForColumn(filter.column).map((op) => (
                    <MenuItem key={op.value} value={op.value}>
                      {op.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Value"
                  value={filter.value}
                  onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={1}>
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => removeFilter(filter.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}

          {filters.length > 0 && (
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button variant="contained" onClick={applyFilters}>
                Apply Filters
              </Button>
              <Button variant="outlined" onClick={clearFilters}>
                Clear All
              </Button>
            </Box>
          )}
        </Box>
      </Collapse>
    </Paper>
  )
}
