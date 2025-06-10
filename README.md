# Machine Learning Visualizer App *(In Development🚧)*

Welcome to the **Machine Learning Visualizer App**, an interactive full-stack platform to explore, understand, and compare machine learning algorithms through live visualizations and pseudocode walkthroughs.

> ⚠️ **Note**: This project is still in active development—expect frequent updates and features!

🔗 Live App: https://machine-learning-visualizer.vercel.app/

🔗 Backend API: https://machine-learning-visualizer.onrender.com/

---

## 🔍 Overview

An interactive web application that lets users visually explore how different machine learning algorithms behave in real-time. Users can switch between algorithms, understand their workings through animations and pseudocode, and learn when and why to use each.

---

## 🛠️ Tech Stack

* **Frontend**: Next.js (React + TypeScript + Tailwind CSS + Framer Motion)
* **Backend**: .NET Core Web API
* **Database**: Firebase Realtime Database
* **Containerization**: Docker
* **Deployment**:
  * Frontend: Vercel
  * Backend: Render
* **Visualization**: D3.js or React Canvas / Chart libraries
* **Authentication**: JWT-based (placeholder login/register supported)

---

## 🚀 Features

1. **User Authentication** 🔐

   * JWT issuance & protected user sessions
   * Firebase Authentication integration
   * Email/Password and OAuth providers (Google, GitHub)
   * Protected user sessions

2. **Algorithm Visualizer** 🤖

   * Switch between ML algorithms (e.g., KNN, SVM, Decision Tree, K-Means)
   * Interactive canvas: input data and see decision boundaries or clusters live

3. **Algorithm Docs** 📄

   * Each algorithm has:

     * Overview
     * When to use it
     * How it works
     * Pseudocode
     * Key properties

4. **Learning Mode** 📖

   * Step-through animations explaining how data flows through the algorithm
   * Optionally toggle labels, confidence, or metrics overlays

5. **Custom Dataset Uploads** 📂 *(Planned)*

   * Upload simple CSV files to test algorithms on your own data

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a Pull Request describing your changes and referencing any related issues


