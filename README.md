# 🔥 PyroScan: Real-Time Wildfire & Pyrocumulonimbus Detection

> ⚡ Edge AI meets Environmental Intelligence.  
> 🌩️ Predict Pyrocumulonimbus cloud activity and wildfire risk — all in your browser.  
> 🌐 No backend. No servers. Just pure WebGL-accelerated machine learning.  
> 📸 Upload cloud images. Get instant confidence scores and risk assessments.  
> 🔥 Powered by TensorFlow.js + Supabase + React for full-stack real-time analytics.  
> 🛰️ Your personal wildfire prediction lab — accessible from anywhere.  

## 🔗 Live Deployment

You can access the deployed version of the app here:  
👉 [PyroScan](https://pyroscan.vercel.app)

The app runs entirely in-browser, powered by TensorFlow.js, and is optimized for low-latency prediction of cloud types and wildfire risk levels.


Dashboard ![Screenshot (177)](https://github.com/user-attachments/assets/60b4677c-99c8-4b30-9099-4693fd556d60) ![Screenshot (178)](https://github.com/user-attachments/assets/d3917017-a0f1-4faf-8e56-c10338c8c4ed)




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

Cloud Prediction 
![Screenshot (173)](https://github.com/user-attachments/assets/a3e24ed7-af95-44f5-ac5e-37bcbfdde20a)

WildFire Prediction
![Screenshot (175)](https://github.com/user-attachments/assets/951683c4-39ac-4fe1-bdb2-83e1666e746e)

---

## 📄 Research Publication

This project is part of the research thesis:

**"Predicting Wildfires with Machine Learning: Insights from Pyrocumulonimbus Clouds Dynamics"**  
Published on [Zenodo](https://zenodo.org/records/15243631)

🔗 **View Thesis**: [Thesis](https://zenodo.org/records/15243631)

> This repository hosts the complete source code, models, and frontend implementation used in the thesis.

