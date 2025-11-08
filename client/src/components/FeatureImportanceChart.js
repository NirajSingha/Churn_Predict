import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

export default function FeatureImportanceChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.0.102:5000/feature_importance")
      .then((res) => {
        if (Array.isArray(res.data)) {
          const sorted = [...res.data].sort(
            (a, b) => b.importance_mean - a.importance_mean
          );
          setData(sorted);
        }
      })
      .catch(console.error);
  }, []);

  if (!data.length)
    return (
      <div
        style={{
          textAlign: "center",
          fontSize: "1rem",
          color: "#6b7280",
          padding: "1rem",
        }}
      >
        Feature importance data not available
      </div>
    );

  return (
    <div
      className="chart-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
        borderRadius: "20px",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
        padding: "1.5rem",
        margin: "1.5rem auto",
        width: "100%",
        maxWidth: "850px",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <h3
        className="section-title"
        style={{
          textAlign: "center",
          fontSize: "1.3rem",
          fontWeight: "700",
          marginBottom: "1rem",
          color: "#1e293b",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        🔥 Top Factors Driving Customer Churn
      </h3>

      <div
        style={{
          width: "100%",
          height: "460px",
          display: "flex",
          justifyContent: "center",
          background: "white",
          borderRadius: "15px",
          boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.05)",
          padding: "1rem",
        }}
      >
        <ResponsiveContainer width="95%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, left: -40, right: 30, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis type="number" />
            <YAxis
              dataKey="feature"
              type="category"
              width={200}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                background: "#f9fafb",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
              }}
              formatter={(v) => (typeof v === "number" ? v.toFixed(3) : v)}
            />
            <Legend
              wrapperStyle={{ bottom: 0 }}
              payload={[
                { value: "Top 3 features", type: "square", color: "#ef4444" },
                { value: "Other features", type: "square", color: "#3b82f6" },
              ]}
            />
            <Bar
              dataKey="importance_mean"
              label={{ position: "right", fontSize: 12 }}
              radius={[4, 4, 4, 4]}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={i < 3 ? "#ef4444" : "#3b82f6"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
