// import { useState } from "react";
// import { getData, capitalizeWords } from "../../utils.js";
// import "./Chart.css";
// import { useFertilizerData } from "../../FertilizerDataContext";
// import {
//   XAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   YAxis,
//   Legend,
// } from "recharts";

// function Chart({
//   title,
//   dataKey,
//   grid,
//   parent,
//   child,
//   subtitle,
//   defaultValue,
// }) {
//   const data = useFertilizerData();
//   let a = getData(data, parent, child);
//   const [view, setView] = useState(defaultValue[parent]);

//   function OnchangeSetView(e) {
//     setView(e.target.value);
//   }

//   return (
//     <div className="chart">
//       <h3 className="chartTitle">{title}</h3>
//       <div className="chartSelect">
//         <h5>
//           {capitalizeWords(parent)} {subtitle}
//         </h5>
//         <select onChange={OnchangeSetView} value={view}>
//           {Object.keys(a).map((e) => (
//             <option key={e} value={e}>
//               {e}
//             </option>
//           ))}
//         </select>
//       </div>
//       <ResponsiveContainer width="100%" aspect={2 / 1}>
//         <BarChart
//           data={a[view]}
//           margin={{
//             top: 5,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey={child} />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="value" fill="#60AC4A" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// export default Chart;

import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#1976d2", "#43a047", "#ff9800", "#e53935", "#8e24aa"];

function Chart({ title, data, dataKey, barColor }) {
  if (!data || data.length === 0) return <div>No data available</div>;
  return (
    <div>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey="product"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill={barColor}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;