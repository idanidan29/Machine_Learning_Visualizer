# Machine Learning Visualizer App *(In Development🚧)*

Welcome to the **Machine Learning Visualizer App**, an interactive full-stack platform to explore, understand, and compare machine learning algorithms through live visualizations and pseudocode walkthroughs.

> ⚠️ **Note**: This project is still in active development—expect frequent updates and features!

---

## 🔍 Overview

An interactive web application that lets users visually explore how different machine learning algorithms behave in real-time. Users can switch between algorithms, understand their workings through animations and pseudocode, and learn when and why to use each.

---

## 🛠️ Tech Stack

* **Frontend**: Next.js (React + TypeScript + Tailwind CSS + Framer Motion)
* **Backend**: TBD (Planned Python/Flask or Node.js for algorithm processing if needed)
* **Visualization**: D3.js or React Canvas / Chart libraries
* **Authentication**: JWT-based (placeholder login/register supported)

---

## 🚀 Features

1. **User Authentication** 🔐

   * Registration & login
   * JWT issuance & protected user sessions

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

## ⚙️ Getting Started

### Prerequisites

* **Node.js** (v16+) & **npm** or **yarn**

### Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/your-username/ml-visualizer.git
   cd ml-visualizer
   ```

2. **Frontend setup**

   ```bash
   npm install
   # or yarn install
   ```

### Configuration

Create a `.env.local` file in the root of your frontend with:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## ▶️ Running Locally

1. **Start the frontend**

   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to explore.

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a Pull Request describing your changes and referencing any related issues
