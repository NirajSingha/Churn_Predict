import React, { useState } from "react";
import axios from "axios";

const initial = {
  gender: "Female",
  SeniorCitizen: 0,
  Partner: "No",
  Dependents: "No",
  tenure: 12,
  PhoneService: "Yes",
  MultipleLines: "No",
  InternetService: "Fiber optic",
  OnlineSecurity: "No",
  OnlineBackup: "No",
  DeviceProtection: "No",
  TechSupport: "No",
  StreamingTV: "Yes",
  StreamingMovies: "No",
  Contract: "Month-to-month",
  PaperlessBilling: "Yes",
  PaymentMethod: "Electronic check",
  MonthlyCharges: 70.35,
  TotalCharges: 850.5,
};

export default function PredictionForm({ onResult }) {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);

  const change = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "SeniorCitizen" ? Number(value) : value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://192.168.0.102:5000/predict",
        form
      );
      onResult(data);
    } catch (err) {
      console.error(err);
      alert("Prediction failed. Check the backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="card">
      <h3 className="section-title">Enter Customer Details</h3>

      <div className="form-grid">
        <div className="form-row">
          <label>Gender</label>
          <select
            name="gender"
            className="select"
            value={form.gender}
            onChange={change}
          >
            <option>Female</option>
            <option>Male</option>
          </select>
        </div>

        <div className="form-row">
          <label>Senior Citizen</label>
          <select
            name="SeniorCitizen"
            className="select"
            value={form.SeniorCitizen}
            onChange={change}
          >
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </div>

        <div className="form-row">
          <label>Partner</label>
          <select
            name="Partner"
            className="select"
            value={form.Partner}
            onChange={change}
          >
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div className="form-row">
          <label>Dependents</label>
          <select
            name="Dependents"
            className="select"
            value={form.Dependents}
            onChange={change}
          >
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div className="form-row">
          <label>Tenure (months)</label>
          <input
            name="tenure"
            className="input"
            type="number"
            value={form.tenure}
            onChange={change}
            min="0"
          />
        </div>

        <div className="form-row">
          <label>Phone Service</label>
          <select
            name="PhoneService"
            className="select"
            value={form.PhoneService}
            onChange={change}
          >
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div className="form-row">
          <label>Multiple Lines</label>
          <select
            name="MultipleLines"
            className="select"
            value={form.MultipleLines}
            onChange={change}
          >
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>

        <div className="form-row">
          <label>Internet Service</label>
          <select
            name="InternetService"
            className="select"
            value={form.InternetService}
            onChange={change}
          >
            <option>DSL</option>
            <option>Fiber optic</option>
            <option>No</option>
          </select>
        </div>

        <div className="form-row">
          <label>Online Security</label>
          <select
            name="OnlineSecurity"
            className="select"
            value={form.OnlineSecurity}
            onChange={change}
          >
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div className="form-row">
          <label>Online Backup</label>
          <select
            name="OnlineBackup"
            className="select"
            value={form.OnlineBackup}
            onChange={change}
          >
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div className="form-row">
          <label>Device Protection</label>
          <select
            name="DeviceProtection"
            className="select"
            value={form.DeviceProtection}
            onChange={change}
          >
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div className="form-row">
          <label>Tech Support</label>
          <select
            name="TechSupport"
            className="select"
            value={form.TechSupport}
            onChange={change}
          >
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div className="form-row">
          <label>Streaming TV</label>
          <select
            name="StreamingTV"
            className="select"
            value={form.StreamingTV}
            onChange={change}
          >
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div className="form-row">
          <label>Streaming Movies</label>
          <select
            name="StreamingMovies"
            className="select"
            value={form.StreamingMovies}
            onChange={change}
          >
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div className="form-row">
          <label>Contract</label>
          <select
            name="Contract"
            className="select"
            value={form.Contract}
            onChange={change}
          >
            <option>Month-to-month</option>
            <option>One year</option>
            <option>Two year</option>
          </select>
        </div>

        <div className="form-row">
          <label>Paperless Billing</label>
          <select
            name="PaperlessBilling"
            className="select"
            value={form.PaperlessBilling}
            onChange={change}
          >
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div className="form-row">
          <label>Payment Method</label>
          <select
            name="PaymentMethod"
            className="select"
            value={form.PaymentMethod}
            onChange={change}
          >
            <option>Electronic check</option>
            <option>Mailed check</option>
            <option>Bank transfer (automatic)</option>
            <option>Credit card (automatic)</option>
          </select>
        </div>

        <div className="form-row">
          <label>Monthly Charges</label>
          <input
            name="MonthlyCharges"
            className="input"
            type="number"
            step="0.01"
            value={form.MonthlyCharges}
            onChange={change}
          />
        </div>

        <div className="form-row">
          <label>Total Charges</label>
          <input
            name="TotalCharges"
            className="input"
            type="number"
            step="0.01"
            value={form.TotalCharges}
            onChange={change}
          />
        </div>

        <div className="form-row full">
          <button className="button block" type="submit" disabled={loading}>
            {loading ? "Predicting..." : "Predict Churn"}
          </button>
        </div>
      </div>
    </form>
  );
}
