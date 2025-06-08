import "./ProductList.css"
import React from "react"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { DataGrid } from "@mui/x-data-grid"
import { useFertilizerData } from "../../FertilizerDataContext"

const columns = [
  { field: "id", headerName: "ID", width: 140, sortable: true },
  { field: "_year", headerName: "Year", width: 200, sortable: true, filterable: true },
  { field: "month", headerName: "Month", width: 150, sortable: true, filterable: true },
  { field: "product", headerName: "Product", width: 180, sortable: true, filterable: true },
  { field: "state", headerName: "State", width: 250, sortable: true, filterable: true },
  { field: "requirement_in_mt_", headerName: "Requirement (MT)", width: 250, sortable: true, filterable: true },
  { field: "availability_in_mt_", headerName: "Availability (MT)", width: 190, sortable: true, filterable: true },
]

function ProductList() {
  const data = useFertilizerData()

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 3 },
        background: "#f5f6fa",
        minHeight: "calc(100vh - 60px)", 
        marginTop: "60px",   
        height: "calc(100vh - 60px)",
        boxSizing: "border-box",
        width: "calc(100vw - 220px)",
        overflow: "hidden"
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Product List
      </Typography>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          width: "100%",
          height: "calc(100vh - 140px)", // Adjust this value as needed for your header/margins
          overflow: "hidden",
          boxSizing: "border-box",
          background: "#fff"
        }}
      >
        <DataGrid
          rows={data ? data.map((row, idx) => ({ ...row, id: row.id || idx })) : []}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          disableSelectionOnClick
          autoHeight={false}
          sx={{
            fontSize: 14,
            background: "#fff",
            border: "none",
            '& .MuiDataGrid-root': { border: 'none' },
            '& .MuiDataGrid-columnHeaders': { borderBottom: 'none' },
            '& .MuiDataGrid-cell': { borderBottom: 'none' }
          }}
          sortingOrder={['asc', 'desc']}
          filterMode="client"
          density="comfortable"
        />
      </Paper>
    </Box>
  )
}

export default ProductList
