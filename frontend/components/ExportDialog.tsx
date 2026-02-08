import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  Box,
  Typography,
  Divider,
} from '@mui/material'
import { Download as DownloadIcon } from '@mui/icons-material'

interface ExportDialogProps {
  open: boolean
  onClose: () => void
  onExport: (format: string, selectedColumns?: string[]) => void
  columns: any[]
}

export default function ExportDialog({ open, onClose, onExport, columns }: ExportDialogProps) {
  const [format, setFormat] = useState('csv')
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    columns.map((col) => col.field)
  )
  const [selectAll, setSelectAll] = useState(true)

  const handleColumnToggle = (field: string) => {
    setSelectedColumns((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    )
    setSelectAll(false)
  }

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedColumns([])
    } else {
      setSelectedColumns(columns.map((col) => col.field))
    }
    setSelectAll(!selectAll)
  }

  const handleExport = () => {
    onExport(format, selectedColumns)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DownloadIcon />
          <Typography variant="h6">Export Data</Typography>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {/* Format Selection */}
        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <FormLabel component="legend" sx={{ fontWeight: 600, mb: 1 }}>
            Export Format
          </FormLabel>
          <RadioGroup value={format} onChange={(e) => setFormat(e.target.value)}>
            <FormControlLabel value="csv" control={<Radio />} label="CSV (.csv)" />
            <FormControlLabel value="xlsx" control={<Radio />} label="Excel (.xlsx)" />
            <FormControlLabel value="json" control={<Radio />} label="JSON (.json)" />
            <FormControlLabel value="pdf" control={<Radio />} label="PDF (.pdf)" />
            <FormControlLabel value="docx" control={<Radio />} label="Word Document (.docx)" />
          </RadioGroup>
        </FormControl>

        <Divider sx={{ my: 2 }} />

        {/* Column Selection */}
        <FormControl component="fieldset">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <FormLabel component="legend" sx={{ fontWeight: 600 }}>
              Select Columns
            </FormLabel>
            <Button size="small" onClick={handleSelectAll}>
              {selectAll ? 'Deselect All' : 'Select All'}
            </Button>
          </Box>
          <FormGroup>
            {columns.map((column) => (
              <FormControlLabel
                key={column.field}
                control={
                  <Checkbox
                    checked={selectedColumns.includes(column.field)}
                    onChange={() => handleColumnToggle(column.field)}
                  />
                }
                label={column.headerName}
              />
            ))}
          </FormGroup>
        </FormControl>

        <Box sx={{ mt: 2, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
          <Typography variant="body2" color="info.dark">
            💡 Tip: Current filters will be applied to the exported data
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleExport}
          disabled={selectedColumns.length === 0}
          startIcon={<DownloadIcon />}
        >
          Export {selectedColumns.length} Columns
        </Button>
      </DialogActions>
    </Dialog>
  )
}
