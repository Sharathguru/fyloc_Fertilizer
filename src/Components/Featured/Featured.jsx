import React, { useState, useMemo } from "react";
import { useFertilizerData } from "../../FertilizerDataContext";
import {
  Paper,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Featured.css";

function Featured() {
  const rawData = useFertilizerData() || [];

  // Get unique years, months, states
  const years = useMemo(() => [...new Set(rawData.map(d => d._year))], [rawData]);
  const months = useMemo(() => [...new Set(rawData.map(d => d.month))], [rawData]);
  const states = useMemo(() => [...new Set(rawData.map(d => d.state))], [rawData]);

  // State for dropdowns (default to first available)
  const [selectedYear, setSelectedYear] = useState(years[0] || "");
  const [selectedMonth, setSelectedMonth] = useState(months[0] || "");
  const [selectedState, setSelectedState] = useState(states[0] || "");

  // Chart data for selected year/month/state
  const stateMonthYearData = useMemo(() => {
    return rawData
      .filter(
        d =>
          d._year === selectedYear &&
          d.month === selectedMonth &&
          d.state === selectedState
      )
      .map(d => ({
        product: d.product,
        requirement: Number(d.requirement_in_mt_) || 0,
        availability: Number(d.availability_in_mt_) || 0,
      }));
  }, [rawData, selectedYear, selectedMonth, selectedState]);

  return (
    <div className="featured" style={{ padding: 24 }}>
      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Fertilizer Requirement & Availability
        </Typography>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={4}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="year-select-label">Year</InputLabel>
              <Select
                labelId="year-select-label"
                value={selectedYear}
                label="Year"
                onChange={e => setSelectedYear(e.target.value)}
              >
                {years.map((y) => (
                  <MenuItem key={y} value={y}>{y}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="month-select-label">Month</InputLabel>
              <Select
                labelId="month-select-label"
                value={selectedMonth}
                label="Month"
                onChange={e => setSelectedMonth(e.target.value)}
              >
                {months.map((m) => (
                  <MenuItem key={m} value={m}>{m}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="state-select-label">State</InputLabel>
              <Select
                labelId="state-select-label"
                value={selectedState}
                label="State"
                onChange={e => setSelectedState(e.target.value)}
              >
                {states.map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Showing data for <b>{selectedYear || "Year"}</b>, <b>{selectedMonth || "Month"}</b>, <b>{selectedState || "State"}</b>
        </Typography>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={stateMonthYearData}>
            <XAxis dataKey="product" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="requirement" name="Requirement" fill="#1976d2" />
            <Bar dataKey="availability" name="Availability" fill="#43a047" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </div>
  );
}

export default Featured;
