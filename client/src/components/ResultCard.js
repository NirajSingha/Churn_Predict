import React from "react";

export default function ResultCard({ result }) {
  return (
    <div className="card mt16">
      <h3 className="section-title">Prediction Result</h3>
      {!result ? (
        <div className="help">Fill the form and click Predict</div>
      ) : (
        <>
          <div
            className={`result ${
              result.prediction === "Yes" ? "warn" : "success"
            }`}
          >
            {result.prediction === "Yes"
              ? "⚠️ Customer Will Churn"
              : "✅ Customer Will Stay"}
          </div>
          {typeof result.probability === "number" && (
            <div className="help" style={{ textAlign: "center", marginTop: 6 }}>
              Churn Probability: <b>{(result.probability * 100).toFixed(1)}%</b>
            </div>
          )}
        </>
      )}
    </div>
  );
}
