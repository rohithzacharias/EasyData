import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Box, Typography, Paper, CircularProgress } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

interface FileUploadProps {
  onUpload: (file: File) => void
  loading?: boolean
}

export default function FileUpload({ onUpload, loading }: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onUpload(acceptedFiles[0])
      }
    },
    [onUpload]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/json': ['.json'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
  })

  return (
    <Paper
      {...getRootProps()}
      elevation={0}
      sx={{
        p: 6,
        border: '3px dashed',
        borderColor: isDragActive ? 'primary.main' : 'grey.300',
        bgcolor: isDragActive ? 'action.hover' : 'background.paper',
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: 'primary.main',
          bgcolor: 'action.hover',
        },
      }}
    >
      <input {...getInputProps()} disabled={loading} />
      <Box sx={{ textAlign: 'center' }}>
        {loading ? (
          <>
            <CircularProgress size={60} sx={{ mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Processing your file...
            </Typography>
          </>
        ) : (
          <>
            <CloudUploadIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom fontWeight={600}>
              {isDragActive ? 'Drop your file here' : 'Drag & drop your file here'}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              or click to browse
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['.CSV', '.XLSX', '.JSON', '.PDF', '.DOCX', '.TXT'].map((format) => (
                <Typography
                  key={format}
                  variant="caption"
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    bgcolor: 'primary.main',
                    color: 'white',
                    borderRadius: 1,
                    fontWeight: 600,
                  }}
                >
                  {format}
                </Typography>
              ))}
            </Box>
          </>
        )}
      </Box>
    </Paper>
  )
}
