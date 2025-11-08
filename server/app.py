from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import json
import pandas as pd
from pathlib import Path

# --------------------------------------------------------------------
# Flask App Setup
# --------------------------------------------------------------------
app = Flask(__name__)
CORS(app)

# --------------------------------------------------------------------
# Artifact Paths
# --------------------------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent
ARTIFACT_DIR = BASE_DIR / "artifacts"

MODEL_PATH = ARTIFACT_DIR / "best_model.pkl"
LABEL_ENCODER_PATH = ARTIFACT_DIR / "label_encoder.pkl"
METRICS_PATH = ARTIFACT_DIR / "metrics.json"
FEATURE_IMPORTANCE_PATH = ARTIFACT_DIR / "feature_importance.json"

# --------------------------------------------------------------------
# Load Artifacts Safely
# --------------------------------------------------------------------
def safe_load_pickle(path):
    try:
        return joblib.load(path)
    except Exception as e:
        print(f"⚠️ Could not load {path.name}: {e}")
        return None

def safe_load_json(path):
    try:
        if path.exists():
            with open(path, "r") as f:
                return json.load(f)
    except Exception as e:
        print(f"⚠️ Could not load JSON {path.name}: {e}")
    return None

model = safe_load_pickle(MODEL_PATH)
label_encoder = safe_load_pickle(LABEL_ENCODER_PATH)
metrics = safe_load_json(METRICS_PATH)
feature_importance_data = safe_load_json(FEATURE_IMPORTANCE_PATH)

# --------------------------------------------------------------------
# Home Route
# --------------------------------------------------------------------
@app.route("/")
def home():
    return jsonify({
        "message": "✅ Telco Churn Prediction API is running",
        "available_endpoints": ["/predict", "/metrics", "/feature_importance"]
    })

# --------------------------------------------------------------------
# Predict Route (Restored Original Behavior)
# --------------------------------------------------------------------
@app.route("/predict", methods=["POST"])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500

    try:
        # Get JSON input from frontend
        data = request.get_json()
        df = pd.DataFrame([data])

        # 🔹 Encode categorical fields manually to match training
        encode_map = {
            "Yes": 1, "No": 0,
            "Female": 1, "Male": 0,
            "Month-to-month": 0, "One year": 1, "Two year": 2,
            "Electronic check": 0, "Mailed check": 1,
            "Bank transfer (automatic)": 2, "Credit card (automatic)": 3,
            "DSL": 0, "Fiber optic": 1, "No internet service": 2
        }

        for col in df.columns:
            df[col] = df[col].map(encode_map).fillna(df[col])

        # 🔹 Convert numeric fields
        numeric_cols = ["tenure", "MonthlyCharges", "TotalCharges"]
        for col in numeric_cols:
            df[col] = pd.to_numeric(df[col], errors="coerce").fillna(0)

        print("✅ Encoded input preview:")
        print(df.head())

        # 🔹 Predict churn probability
        probs = model.predict_proba(df)[0]
        churn_prob = probs[1]

        print(f"⚙️ Churn probability: {churn_prob:.3f}")

        # 🔹 Decide churn or not churn
        label = "Yes" if churn_prob >= 0.35 else "No"

        # 🔹 Interpret result for presentation
        interpretation = (
            "⚠️ High churn risk! Customer likely to leave."
            if churn_prob >= 0.6
            else "✅ Customer likely to stay."
        )

        return jsonify({
            "prediction": label,
            "probability": float(round(churn_prob, 3)),
            "interpretation": interpretation
        })

    except Exception as e:
        print("❌ Prediction error:", e)
        return jsonify({"error": str(e)}), 500

# --------------------------------------------------------------------
# Metrics Route
# --------------------------------------------------------------------
@app.route("/metrics", methods=["GET"])
def get_metrics():
    if metrics:
        return jsonify(metrics)
    return jsonify({"error": "metrics.json not found"}), 404

# --------------------------------------------------------------------
# Feature Importance Route
# --------------------------------------------------------------------
@app.route("/feature_importance", methods=["GET"])
def feature_importance():
    if feature_importance_data:
        return jsonify(feature_importance_data)
    return jsonify({"error": "feature_importance.json not found"}), 404

# --------------------------------------------------------------------
# Run Server
# --------------------------------------------------------------------
if __name__ == "__main__":
    print("🚀 Flask server running on http://127.0.0.1:5000")
    app.run(host="0.0.0.0", port=5000, debug=True)
