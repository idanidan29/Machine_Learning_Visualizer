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

---

## ⚙️ Getting Started

### Prerequisites

* **Node.js** (v16+) & **npm** or **yarn**
* **.NET SDK** (v7.0 or later)
* **Docker** and **Docker Compose**
* **Firebase CLI** (optional, for local development)

### Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/your-username/ml-visualizer.git
   cd ml-visualizer
   ```

2. **Frontend setup**

   ```bash
   cd client
   npm install
   # or yarn install
   ```

3. **Backend setup**

   ```bash
   cd server
   dotnet restore
   ```

4. **Docker setup**

   ```bash
   # Build and start all services
   docker-compose up --build
   ```

### Configuration

1. **Frontend Configuration**

Create a `.env.local` file in the `client` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

2. **Backend Configuration**

Create an `appsettings.json` file in the `server` directory:

```json
{
  "Firebase": {
    "ProjectId": "your_project_id",
    "PrivateKey": "your_private_key",
    "ClientEmail": "your_client_email"
  }
}
```

---

### Manual Development

1. **Start the frontend**

   ```bash
   cd client
   npm run dev
   ```

2. **Start the backend**

   ```bash
   cd server
   dotnet run
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

---

## 🔐 Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication and Realtime Database
3. Add your web application to get the configuration

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a Pull Request describing your changes and referencing any related issues


