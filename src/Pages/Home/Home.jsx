import React, { useMemo, useState } from "react";
import Featured from "../../Components/Featured/Featured";
import { useFertilizerData } from "../../FertilizerDataContext";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Grid, Paper } from "@mui/material";
import { ResponsiveContainer } from "recharts";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import "./Home.css"; 
// import Chart from "../../Components/Chart/Chart";
import Piechart from "../../Components/Piechart/Piechart";

function getTopFertilizers(data, key, top = 5, asc = false) {
  const map = {};
  data.forEach((row) => {
    const prod = row.product;
    const val = Number(row[key]) || 0;
    map[prod] = (map[prod] || 0) + val;
  });
  const arr = Object.entries(map).map(([product, value]) => ({ product, value }));
  arr.sort((a, b) => asc ? a.value - b.value : b.value - a.value);

  // Ensure at least 'top' items, filling with zero-value products if needed
  if (arr.length < top) {
    // Find all unique products
    const allProducts = [...new Set(data.map(row => row.product))];
    // Add missing products with value 0
    allProducts.forEach(prod => {
      if (!arr.find(item => item.product === prod)) {
        arr.push({ product: prod, value: 0 });
      }
    });
    arr.sort((a, b) => asc ? a.value - b.value : b.value - a.value);
  }
  return arr.slice(0, top);
}

function getYearlyData(data, product, key, year) {
  const months = ["April", "May", "June", "July", "August"];
  return months.map((month) => {
    const filtered = data.filter(
      (row) => row.product === product && row.month === month && row._year === year
    );
    const value = filtered.reduce((sum, row) => sum + (Number(row[key]) || 0), 0);
    return { month, value };
  });
}

const columns = [
  { field: "_year", headerName: "Year", width: 120 },
  { field: "month", headerName: "Month", width: 100 },
  { field: "state", headerName: "State", width: 160 },
  { field: "product", headerName: "Product", width: 120 },
  { field: "requirement_in_mt_", headerName: "Requirement (MT)", width: 160 },
  { field: "availability_in_mt_", headerName: "Availability (MT)", width: 160 },
];

function Home() {
  const data = useFertilizerData();
  const [selectedProduct, setSelectedProduct] = useState("UREA");

  // Get all unique years from data
  const years = useMemo(
    () => [...new Set(data.map((d) => d._year))].sort(),
    [data]
  );
  const [selectedYear, setSelectedYear] = useState(years[0] || "");

  const products = useMemo(() => [...new Set(data.map((d) => d.product))], [data]);
  const topRequired = getTopFertilizers(data, "requirement_in_mt_", 5, false);
  const leastAvailable = getTopFertilizers(data, "availability_in_mt_", 5, true);

  // Pass selectedYear to getYearlyData
  const chartDataReq = getYearlyData(data, selectedProduct, "requirement_in_mt_", selectedYear);
  const chartDataAvail = getYearlyData(data, selectedProduct, "availability_in_mt_", selectedYear);

  return (
    <Box
      className="mainContent"
      sx={{
        width: "calc(100vw - 220px)",
        minHeight: "calc(100vh - 60px)",
        background: "#fafafa",
        p: 0,
        m: 0,
        // marginLeft: "220px"
      }}
    >
      <Typography variant="h4" gutterBottom>Fertilizer  Dashboard</Typography>

      <Featured />

      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Yearly Requirement & Availability for a Fertilizer
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="fertilizer-select-label">Select Fertilizer</InputLabel>
            <Select
              labelId="fertilizer-select-label"
              value={selectedProduct}
              label="Select Fertilizer"
              onChange={e => setSelectedProduct(e.target.value)}
            >
              {products.map((prod) => (
                <MenuItem key={prod} value={prod}>{prod}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="year-select-label">Select Year</InputLabel>
            <Select
              labelId="year-select-label"
              value={selectedYear}
              label="Select Year"
              onChange={e => setSelectedYear(e.target.value)}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={["April", "May", "June", "July", "August"].map(month => {
              const req = chartDataReq.find(d => d.month === month)?.value || 0;
              const avail = chartDataAvail.find(d => d.month === month)?.value || 0;
              return { month, Requirement: req, Availability: avail };
            })}
            margin={{ top: 16, right: 16, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Requirement" stroke="#1976d2" strokeWidth={2} dot />
            <Line type="monotone" dataKey="Availability" stroke="#43a047" strokeWidth={2} dot />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
      <Grid container spacing={4}>
      
        <Grid item xs={12} md={6}>
          <Piechart
            title="Top 5 Most Required Fertilizers (Pie Chart)"
            data={topRequired.map(item => ({ product: item.product, value: item.value }))}
            dataKey="value"
          />
        </Grid>
          <Grid item xs={12} md={6}>
          <Piechart
            title="Top 5 Least Available Fertilizers (Pie Chart)"
            data={leastAvailable.map((item, idx) => ({
              ...item,
              value: item.value === 0 ? 0.01 + idx * 0.01 : item.value // unique small value for each zero
            }))}
            dataKey="value"
          />
        </Grid>
      </Grid>

    </Box>
  );
}

export default Home;