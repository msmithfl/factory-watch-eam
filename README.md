# FactoryWatch - Equipment Management System

A full-stack equipment tracking application built to demonstrate modern web development practices. Live deployment showcasing CRUD operations, RESTful API design, and cloud hosting.

**Live Demo:** https://factory-watch-eam.vercel.app

## What It Does

Track and manage equipment assets with real-time status updates. Built as a portfolio project to demonstrate full-stack capabilities with .NET and React.

**Key Features:**
- Complete CRUD operations for equipment management
- Real-time status tracking (Operational, Under Maintenance, Out of Service, Decommissioned)
- RESTful API with Swagger documentation
- Responsive UI that works on mobile and desktop

## Tech Stack

**Backend:** ASP.NET Core 9.0 • Entity Framework Core • SQLite • Railway  
**Frontend:** React 19 • TypeScript • Tailwind CSS • Material-UI • Vercel  
**DevOps:** GitHub • Staging/Production environments • Auto-deploy

## Quick Start

**Prerequisites:** .NET 9.0 SDK, Node.js 18+

```bash
# Clone and setup backend
git clone https://github.com/msmithfl/factory-watch-eam.git
cd backend/FactoryWatch.Api
dotnet run

# In another terminal, setup frontend
cd frontend/FactoryWatch.Client
npm install && npm run dev
```

Backend runs at `http://localhost:5141` (Swagger docs available)  
Frontend runs at `http://localhost:5173`

## API Endpoints

```
GET    /equipment       - List all equipment
GET    /equipment/{id}  - Get specific equipment
POST   /equipment       - Create equipment
PUT    /equipment/{id}  - Update equipment
DELETE /equipment/{id}  - Delete equipment
```

API docs: https://factory-watch-api.up.railway.app/swagger

## Project Structure

```
backend/FactoryWatch.Api/  # ASP.NET Core API
  ├── Data/                # EF Core context & migrations
  ├── Endpoints/           # Minimal API endpoints
  └── Entities/            # Domain models

frontend/FactoryWatch.Client/  # React app
  ├── src/components/          # Reusable components
  └── src/pages/               # Page components
```

## Deployment

**Staging:** https://factory-watch-staging.vercel.app (auto-deploys from `staging` branch)  
**Production:** https://factory-watch-eam.vercel.app (auto-deploys from `main` branch)

The project uses a staging → production workflow. Feature branches merge to `staging` for testing, then `staging` merges to `main` for production release.

## What's Next

- User authentication & authorization
- Work order management system
- Maintenance scheduling
- Equipment history & analytics

## Author

**Matt Smith**  
[GitHub](https://github.com/msmithfl) • [LinkedIn](https://www.linkedin.com/in/matthew-smith-41ba39156/) • [Portfolio](https://mattsmith.digital/)

---

*Built as a technical portfolio project demonstrating full-stack development with .NET and React.*