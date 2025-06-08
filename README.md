# Machine Learning Visualizer App *(In Development🚧)*

Welcome to the **Machine Learning Visualizer App**, an interactive full-stack platform to explore, understand, and compare machine learning algorithms through live visualizations and pseudocode walkthroughs.

> ⚠️ **Note**: This project is still in active development—expect frequent updates and features!

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

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Prerequisites**
   * Vercel account
   * GitHub repository connected to Vercel

2. **Deployment Steps**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login to Vercel
   vercel login

   # Deploy
   cd client
   vercel
   ```

### Backend Deployment (Render)

1. **Prerequisites**
   * Render account
   * Docker installed locally

2. **Deployment Steps**
   * Create a new Web Service on Render
   * Connect your GitHub repository
   * Configure the following:
     * Build Command: `docker build -t ml-visualizer-backend .`
     * Start Command: `docker run -p 5000:5000 ml-visualizer-backend`
     * Environment Variables:
       ```env
       ASPNETCORE_ENVIRONMENT=Production
       Firebase__ProjectId=your_project_id
       Firebase__PrivateKey=your_private_key
       Firebase__ClientEmail=your_client_email
       ```

3. **Automatic Deployments**
   * Render automatically deploys when changes are pushed to the main branch
   * Preview deployments are created for pull requests

### Continuous Deployment

The project uses the following deployment workflow:

1. **Development**
   * Local development using Docker Compose
   * Firebase Emulator for local testing

2. **Staging**
   * Automatic deployment to Vercel Preview
   * Backend deployment to Render Preview

3. **Production**
   * Manual deployment to Vercel Production
   * Automatic deployment to Render Production


## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a Pull Request describing your changes and referencing any related issues


