# Job Application Management App 🚧 *(In Development)*

Welcome to the **Job Application Management App**, a full‑stack solution to track, filter, and analyze your job applications.

> ⚠️ **Note**: This project is still in active development—expect frequent updates and changes!

---

## 🔍 Overview

A single‑page web application that helps job seekers manage their applications from a central dashboard. You can register, log in, add new applications, filter by status or date, view statistics, and export your data to Excel.

---

## 🛠️ Tech Stack

* **Frontend**: Next.js (React + TypeScript + Tailwind CSS)
* **Backend**: C# ASP.NET Core Web API (.NET 7+)
* **Database**: Firebase Cloud Firestore (NoSQL)
* **Authentication**: JWT‑based via ASP.NET Core
* **Export**: Excel (XLSX) generation using a .NET library

---

## 🚀 Features

1. **User Authentication** 🔐

   * Registration & login
   * JWT issuance & protected API routes
2. **Job Applications** 📄

   * Create, read, update, delete (CRUD) applications
   * Store data in Firestore
3. **Filtering & Search** 🔎

   * Filter by status, date range, company, and more
4. **Dashboard** 📊

   * Real‑time statistics and charts (counts by status, timeline)
5. **Excel Export** 📥

   * Generate and download `.xlsx` report with applied filters

---

## ⚙️ Getting Started

### Prerequisites

* **Node.js** (v16+) & **npm** or **yarn**
* **.NET 7 SDK**
* **Firebase account** with a Firestore database
* **Service account key** JSON file for Firestore access

### Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/your‑username/job‑application‑tracker.git
   cd job‑application‑tracker
   ```

2. **Backend setup**

   ```bash
   cd API
   dotnet restore
   ```

3. **Frontend setup**

   ```bash
   cd ../frontend
   npm install
   # or yarn install
   ```

### Configuration

1. **Firestore credentials**

   * Place your `serviceAccountKey.json` in the `API` folder
   * Set environment variable:

     ```bash
     export GOOGLE_APPLICATION_CREDENTIALS="$(pwd)/API/serviceAccountKey.json"
     ```
2. **appsettings.json** (API)

   ```json
   {
     "Firebase": { "ProjectId": "<YOUR_PROJECT_ID>" },
     "JwtSettings": { ... },
     "ConnectionStrings": { "DefaultConnection": "<not used for Firestore>" }
   }
   ```
3. **Next.js env** (frontend `.env.local`)

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

---

## ▶️ Running Locally

1. **Start the API**

   ```bash
   cd API
   dotnet run
   ```
2. **Start the frontend**

   ```bash
   cd ../frontend
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a Pull Request please describe your changes and link any related issues.

