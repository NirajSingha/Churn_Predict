import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import PredictionForm from "./components/PredictionForm";
import FeatureImportanceChart from "./components/FeatureImportanceChart";
import ResultCard from "./components/ResultCard";

export default function App() {
  const [result, setResult] = useState(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="wrapper">
      <Navbar dark={dark} onToggle={() => setDark((d) => !d)} />
      <div className="container">
        <div>
          <PredictionForm onResult={setResult} />
          <ResultCard result={result} />
        </div>
        <div className="card">
          <h3 className="section-title">📈 Model Performance</h3>
          <ul className="metrics">
            <li>
              <b>Model:</b> LogisticRegression
            </li>
            <li>
              <b>Accuracy:</b> 80.28%
            </li>
            <li>
              <b>ROC-AUC:</b> 84.03%
            </li>
          </ul>
          <FeatureImportanceChart />
        </div>
      </div>
      <div className="help" style={{ marginTop: 12 }}>
        © 2025 Network Ninja's - All rights reserved
      </div>
    </div>
  );
}
