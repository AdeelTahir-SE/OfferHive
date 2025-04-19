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
import { GraphProps } from "@/lib/types";

// ✅ Typed and fixed LineGraph component
export default function LineGraph({ data }: { data: GraphProps }) {
  if (!data || data.length === 0) {
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
        Clicks Over the Week
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="clicks"
            stroke="#efb100"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
