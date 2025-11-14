# FactoryWatch - Equipment Management System

A full-stack Enterprise Asset Management (EAM) application built to demonstrate modern web development practices. Live deployment showcasing CRUD operations, RESTful API design, and cloud hosting.

**Live Demo:** https://factory-watch-eam.vercel.app

## What It Does

Track and manage equipment assets with real-time status updates and work order management. Built as a portfolio project to demonstrate full-stack capabilities with .NET and React.

**Key Features:**
- Complete CRUD operations for equipment and work order management
- Real-time status tracking (Operational, Under Maintenance, Out of Service, Decommissioned)
- Work order tracking for maintenance and repairs
- Automatic maintenance date updates when work orders are completed
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

### Equipment
```
GET    /equipment       - List all equipment
GET    /equipment/{id}  - Get specific equipment
POST   /equipment       - Create equipment
PUT    /equipment/{id}  - Update equipment
DELETE /equipment/{id}  - Delete equipment
```

### Work Orders
```
GET    /work-orders                    - List all work orders
GET    /work-orders/{id}               - Get specific work order
GET    /work-orders/equipment/{id}     - Get work orders for equipment
POST   /work-orders                    - Create work order
PUT    /work-orders/{id}               - Update work order
POST   /work-orders/{id}/complete      - Complete work order (updates equipment maintenance dates)
DELETE /work-orders/{id}               - Delete work order
```

API docs: https://factory-watch-api.up.railway.app/swagger

## Project Structure

```
backend/FactoryWatch.Api/  # ASP.NET Core API
  ├── Data/                # EF Core context & migrations
  ├── Dtos/                # Data transfer objects
  │   ├── Equipment/       # Equipment DTOs
  │   └── WorkOrders/      # Work order DTOs
  ├── Endpoints/           # Minimal API endpoints
  └── Entities/            # Domain models

frontend/FactoryWatch.Client/  # React app
  ├── src/components/          # Reusable components
  └── src/pages/               # Page components
```

## Key Features

### Equipment Management
- Track equipment status and location
- Monitor maintenance schedules
- View equipment history

### Work Order System
- Create work orders for equipment issues
- Assign work to technicians
- Track open and completed work
- Automatic maintenance date updates on completion
  - Last Maintenance Date → Set to completion date
  - Next Maintenance Date → Set to +90 days

## Deployment

**Staging:** https://factory-watch-staging.vercel.app (auto-deploys from `staging` branch)  
**Production:** https://factory-watch-eam.vercel.app (auto-deploys from `main` branch)

The project uses a staging → production workflow. Feature branches merge to `staging` for testing, then `staging` merges to `main` for production release.

## What's Next

- User authentication & authorization
- Work order filtering and search
- Maintenance scheduling automation
- Equipment history & analytics
- Cost tracking for maintenance

## Author

**Matt Smith**  
[GitHub](https://github.com/msmithfl) • [LinkedIn](https://www.linkedin.com/in/matthew-smith-41ba39156/) • [Portfolio](https://mattsmith.digital/)

---

*Built as a technical portfolio project demonstrating full-stack development with .NET and React.*