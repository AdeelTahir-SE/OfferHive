"use client";

import { GraphProps } from "@/lib/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ✅ Fixed function: destructured props + return type
export default function BarGraph({ data }: { data:GraphProps }) {
  if (!data || data.length === 0) {
    console.log(data, "linegraph");
    data = [
      {
        date: new Date().toLocaleDateString("en-CA"),
        clicks: 0,
      },
    ];
  }

  return (
    <div className="w-96 h-54 p-4 rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4">
        Clicks by Day (Bar Chart)
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="clicks" fill="#efb100" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
