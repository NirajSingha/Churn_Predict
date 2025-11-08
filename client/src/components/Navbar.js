import React from "react";

export default function Navbar({ dark, onToggle }) {
  return (
    <div className="header">
      <div className="brand">
        <div className="logo" />
        <div>
          <h1 className="title">Telco Churn Prediction Dashboard</h1>
        </div>
      </div>
      <div className="actions">
        <button className="toggle" onClick={onToggle}>
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </div>
  );
}
