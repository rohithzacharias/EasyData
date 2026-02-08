import { useState, useMemo } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Box,
  Typography,
  TablePagination,
  TextField,
  InputAdornment,
  Chip,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface DataTableProps {
  data: any[]
  columns: any[]
  onSort?: (column: string, order: 'asc' | 'desc') => void
  loading?: boolean
}

export default function DataTable({ data, columns, onSort, loading }: DataTableProps) {
  const [orderBy, setOrderBy] = useState<string>('')
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(25)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSort = (column: string) => {
    const isAsc = orderBy === column && order === 'asc'
    const newOrder = isAsc ? 'desc' : 'asc'
    setOrder(newOrder)
    setOrderBy(column)
    if (onSort) {
      onSort(column, newOrder)
    }
  }

  const filteredData = useMemo(() => {
    if (!searchTerm) return data

    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [data, searchTerm])

  const paginatedData = useMemo(() => {
    const start = page * rowsPerPage
    return filteredData.slice(start, start + rowsPerPage)
  }, [filteredData, page, rowsPerPage])

  if (columns.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="text.secondary">No data available</Typography>
      </Box>
    )
  }

  return (
    <Box>
      {/* Search Bar */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField
          placeholder="Search in table..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 400 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Chip
          label={`${filteredData.length} rows`}
          color="primary"
          variant="outlined"
        />
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  sx={{
                    fontWeight: 700,
                    bgcolor: 'primary.main',
                    color: 'white',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <TableSortLabel
                    active={orderBy === column.field}
                    direction={orderBy === column.field ? order : 'asc'}
                    onClick={() => handleSort(column.field)}
                    sx={{
                      color: 'white !important',
                      '&:hover': { color: 'white !important' },
                      '& .MuiTableSortLabel-icon': {
                        color: 'white !important',
                      },
                    }}
                  >
                    {column.headerName}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                hover
                sx={{
                  '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
                }}
              >
                {columns.map((column) => (
                  <TableCell key={column.field}>
                    {row[column.field] !== null && row[column.field] !== undefined
                      ? String(row[column.field])
                      : '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10))
          setPage(0)
        }}
        rowsPerPageOptions={[10, 25, 50, 100]}
      />
    </Box>
  )
}
