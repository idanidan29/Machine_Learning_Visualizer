# 🚴‍♂️ FitSync

**FitSync** – Social fitness tracker (in progress)  
Built with ASP.NET Core, React, and PostgreSQL. Log workouts, follow friends, join challenges, view leaderboards and stats.

---

## 🚀 Tech Stack

- **Backend**: ASP.NET Core, EF Core, SignalR, JWT 🔒  
- **Database**: PostgreSQL (Railway) 🐘  
- **Frontend**: React (Vite), Axios, React Router, Recharts, Google Maps API 🌐  

---

## ⚡ Quick Start

1. **📥 Clone repo**  
   ```bash
   git clone https://github.com/your-username/fitness-social-app.git
   cd fitness-social-app

2. **🔧 Backend**
   ```bash
   cd FitSync.API
   dotnet restore
   dotnet user-secrets init
   dotnet user-secrets set "ConnectionStrings:PostgreSqlConnection" "<your-railway-url>"
   dotnet ef database update
   dotnet run
   
- API runs at http://localhost:5000
- Swagger UI: http://localhost:5000/swagger
3. **💻 Frontend**
  ```bash
  cd ../fitsync-client
  npm create vite@latest . --template react
  npm install axios react-router-dom recharts
  npm run dev

- App runs at http://localhost:5173


### 🚧 In Progress  
- **Authentication** (JWT sign-up / login / protected endpoints)  
- **Workout CRUD** (create, read, update, delete workouts)  
- **Activity Feed** (display friends’ workouts, likes, comments)  
- **Leaderboards** (aggregate metrics, friends-only & global rankings)  

---

### ⏭️ Upcoming  
1. **Real-Time Updates**  
   - Integrate SignalR hubs for live feed and leaderboard updates  
2. **File Uploads**  
   - Enable photo and GPX route file uploads (blob storage integration)  
3. **Maps Integration**  
   - Display workout routes on Google Maps; heatmaps & route previews  
4. **Deployment**  
   - Backend → Render.com (Docker)  
   - Frontend → Vercel (React)  
   - Environment configuration (Railway Postgres, secrets)  
