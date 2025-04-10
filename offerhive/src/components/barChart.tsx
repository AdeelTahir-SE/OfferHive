"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function BarGraph() {
  const data = [
    { day: "Mon", clicks: 120 },
    { day: "Tue", clicks: 200 },
    { day: "Wed", clicks: 150 },
    { day: "Thu", clicks: 300 },
    { day: "Fri", clicks: 250 },
    { day: "Sat", clicks: 180 },
    { day: "Sun", clicks: 220 },
  ];

  return (
    <div className="w-96 h-54 p-4  rounded-lg ">
      <h2 className="text-xl font-semibold text-center mb-4">
        Clicks by Day (Bar Chart)
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="clicks" fill="#efb100" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
