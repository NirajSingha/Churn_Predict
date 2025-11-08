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
} from "recharts";

const Charts = () => {
  const [metrics, setMetrics] = useState({});
  const [importance, setImportance] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.0.102:5000/metrics")
      .then((res) => setMetrics(res.data));
    axios
      .get("http://192.168.0.102:5000/feature_importance")
      .then((res) => setImportance(res.data));
  }, []);

  return (
    <div className="mt-4">
      <h5>📈 Model Performance</h5>
      <ul>
        <li>
          <b>Model:</b> {metrics.model}
        </li>
        <li>
          <b>Accuracy:</b> {(metrics.accuracy * 100).toFixed(2)}%
        </li>
        <li>
          <b>ROC-AUC:</b> {(metrics.roc_auc * 100).toFixed(2)}%
        </li>
      </ul>

      <h5 className="mt-3">🔥 Feature Importance</h5>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={importance}
          layout="vertical"
          margin={{ left: 50, right: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="feature" type="category" width={200} />
          <Tooltip />
          <Bar dataKey="importance_mean" fill="#007bff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
