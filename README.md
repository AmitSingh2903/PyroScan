# PyroScan
# 🔥 PyroScan – Real-Time Wildfire & Pyrocumulonimbus Detection

> ⚡ Edge AI meets Environmental Intelligence.  
> 🌩️ Predict Pyrocumulonimbus cloud activity and wildfire risk — all in your browser.

PyroScan UI (![Screenshot (177)](https://github.com/user-attachments/assets/60b4677c-99c8-4b30-9099-4693fd556d60)  ![Screenshot (178)](https://github.com/user-attachments/assets/007e100d-c95f-409b-ac82-b0bea61f5f0e)



---

## 🚀 About the Project

**PyroScan** is a full-stack, browser-based machine learning platform for detecting **Pyrocumulonimbus (PyroCb)** cloud formations and predicting **wildfire risks** using real-time environmental data.

Unlike traditional tools that rely on cloud servers, PyroScan runs entirely in-browser using **TensorFlow.js + WebGL**, enabling **GPU-accelerated inference** on the edge with zero backend compute load. The system integrates satellite-style image classification, environmental risk modeling, and interactive geospatial analytics — all in a fast, mobile-friendly interface.

---

## 🎯 Key Features

- 🌩️ **Cloud Detection**: Classifies uploaded cloud images (PyroCb or Normal) using a custom CNN.
- 🔥 **Wildfire Risk Prediction**: Ensemble model (NN + XGBoost + RF) based on 5 key environmental features.
- 🌐 **Real-Time Inference**: All ML models run directly in the browser via TensorFlow.js.
- 🧭 **Interactive Dashboard**: View predictions, heatmaps, and severity stats on an intuitive UI.
- 🛰️ **Geospatial Mapping**: Map recent detections using Leaflet.js.
- 📊 **Confidence & Risk Scoring**: Detailed prediction metadata with model confidence and severity.
- 🧾 **Supabase-Integrated**: Logs predictions, locations, and historical trends to a scalable PostgreSQL backend.

---

## 🧠 Tech Stack

| Layer          | Tech Used                       |
|----------------|---------------------------------|
| **Frontend**   | React.js, TypeScript, Chart.js, Leaflet.js |
| **ML Models**  | TensorFlow.js (CNN), Ensemble (XGBoost, RF) |
| **Backend**    | Supabase (PostgreSQL), RLS Policies |
| **Deployment** | Vercel / Netlify / GitHub Pages |

---

## 📸 Demo Screens

| Cloud Prediction | Risk Dashboard | Interactive Map |
|------------------|----------------|------------------|
| ![cloud](assets/cloud-demo.png) | ![dashboard](assets/dashboard.png) | ![map](assets/map.png) |

---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/pyroscan.git
cd pyroscan
