"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function LineGraph() {
  const data = [
    { day: "Mon", clicks: 120 },
    { day: "Tue", clicks: 200 },
    { day: "Wed", clicks: 150 },
    { day: "Thu", clicks: 300 },
    { day: "Fri", clicks: 250 },
    { day: "Sat", clicks: 180 },
    { day: "Sun", clicks: 1020 },
  ];

  return (
    <div className="w-96 h-54 p-4 rounded-lg ">
        <h2 className="text-xl font-semibold text-center mb-4">
        Clicks Over the Week
      </h2>
      
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="clicks" stroke="#efb100" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
