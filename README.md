# FactoryWatch - Equipment Management System

A modern full-stack web application for tracking and managing equipment assets. Built with ASP.NET Core and React to demonstrate comprehensive full-stack development skills including CRUD operations, API design, and cloud deployment.

## 🚀 Live Demo
- **Application:** https://factory-watch-eam.vercel.app/
- **API Documentation:** https://factory-watch-api.up.railway.app/swagger

> Note: Backend may take 30 seconds to wake from sleep on first request

## ✨ Features

### Current Functionality
- **Equipment Management** - Full CRUD operations for equipment tracking
- **Equipment Dashboard** - View all equipment with status indicators (Operational, Under Maintenance, Out of Service, Decommissioned)
- **Inline Editing** - Edit equipment details directly in the interface
- **Real-time Updates** - Add, update, and delete equipment with immediate UI feedback
- **Responsive Design** - Works on desktop and mobile devices

### Technical Highlights
- RESTful API architecture with ASP.NET Core Minimal APIs
- React UI with TypeScript for type safety
- Entity Framework Core with SQLite database
- Environment-based API configuration (localhost/production)
- CORS configuration for cross-origin requests
- Swagger/OpenAPI documentation
- Cloud deployment (Railway + Vercel)

## 🛠️ Tech Stack

### Backend
- **Framework**: ASP.NET Core 9.0 Minimal APIs
- **Language**: C# 13
- **ORM**: Entity Framework Core 9.0
- **Database**: SQLite
- **API Documentation**: Swagger/OpenAPI
- **Deployment**: Railway

### Frontend
- **Framework**: React 19
- **Language**: TypeScript
- **State Management**: React Hooks (useState, useEffect)
- **Routing**: React Router v7
- **UI Components**: Custom components with inline styling
- **HTTP Client**: Fetch API
- **Build Tool**: Vite
- **Deployment**: Vercel

### DevOps & Tools
- **Version Control**: Git/GitHub
- **API Testing**: HTTP files, Swagger UI
- **Code Quality**: ESLint
- **Deployment**: Railway (backend), Vercel (frontend)

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- [.NET 9.0 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (v18.x or later) and npm
- [Git](https://git-scm.com/)
- A code editor ([Visual Studio Code](https://code.visualstudio.com/) recommended)

### Optional Tools
- [Postman](https://www.postman.com/) for API testing (or use the included .http files)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/msmithfl/factory-watch-eam.git
cd factory-watch-eam
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend/FactoryWatch.Api
```

The SQLite database connection is already configured in `appsettings.json`. Install dependencies and run:

```bash
# Restore NuGet packages
dotnet restore

# Run the API (migrations and seeding happen automatically)
dotnet run
```

The API will be available at `http://localhost:5141`

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend/FactoryWatch.Client
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

The frontend automatically detects the environment and uses:
- `http://localhost:5141` in development
- `https://supportive-happiness-production-d453.up.railway.app` in production

### 4. Sample Data

The application automatically seeds the database with sample equipment data on first run.

## 📁 Project Structure

```
FactoryWatch/
├── backend/
│   └── FactoryWatch.Api/           # Web API project
│       ├── Data/                   # DbContext and migrations
│       ├── Dtos/                   # Data transfer objects
│       ├── Endpoints/              # Minimal API endpoints
│       ├── Entities/               # Domain models
│       ├── Dockerfile              # Docker configuration
│       ├── equipment.http          # API test file
│       └── Program.cs              # App entry point
│
├── frontend/
│   └── FactoryWatch.Client/
│       ├── src/
│       │   ├── components/         # React components
│       │   ├── pages/              # Page components
│       │   ├── App.tsx             # Root component
│       │   └── main.tsx            # Entry point
│       ├── public/                 # Static assets
│       ├── vercel.json             # Vercel configuration
│       └── package.json
│
├── ARCHITECTURE.md                 # Architecture documentation
├── README.md
└── .gitignore
```

## 📚 API Documentation

### Base URLs
- **Local Development**: `http://localhost:5141`
- **Production**: `https://supportive-happiness-production-d453.up.railway.app`

### Endpoints

#### Equipment

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/equipment` | Get all equipment |
| GET | `/equipment/{id}` | Get equipment by ID |
| POST | `/equipment` | Create new equipment |
| PUT | `/equipment/{id}` | Update equipment |
| DELETE | `/equipment/{id}` | Delete equipment |

### Sample Request

**Create Equipment:**
```bash
POST /equipment
Content-Type: application/json

{
  "name": "Hydraulic Press #3",
  "location": "Assembly Line A",
  "status": 0,
  "description": "Main hydraulic press for metal forming"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Hydraulic Press #3",
  "location": "Assembly Line A",
  "status": "Operational",
  "lastMaintenanceDate": "2025-11-05T10:30:00",
  "nextMaintenanceDate": null,
  "description": "Main hydraulic press for metal forming",
  "createdAt": "2025-11-05T10:30:00"
}
```

**Status Values:**
- 0 = Operational
- 1 = Under Maintenance
- 2 = Out of Service  
- 3 = Decommissioned

For complete API documentation, visit the Swagger UI at `/swagger` endpoint.

## 🧪 Testing

### API Testing

Test the API using the included HTTP file:

```bash
# Open backend/FactoryWatch.Api/equipment.http in VS Code
# Use the REST Client extension to run requests
```

Or test via Swagger UI:
- Local: `http://localhost:5141/swagger`
- Production: `https://supportive-happiness-production-d453.up.railway.app/swagger`

## 🚢 Deployment

This application is deployed using:

### Backend - Railway
- **URL**: https://supportive-happiness-production-d453.up.railway.app
- **Deployment**: Automatic from GitHub commits
- **Database**: SQLite (included in deployment)

### Frontend - Vercel  
- **URL**: https://factory-watch-eam.vercel.app
- **Deployment**: Automatic from GitHub commits
- **Configuration**: Includes `vercel.json` for SPA routing

### Local Development
The frontend automatically detects the environment:
- Uses `localhost:5141` when running locally
- Uses Railway URL when deployed to production

## 🗺️ Roadmap

### Phase 1 (Completed)
- [x] Equipment CRUD operations
- [x] Equipment status management
- [x] Basic responsive UI
- [x] Cloud deployment (Railway + Vercel)
- [x] Environment-based configuration

### Phase 2 (Planned)
- [ ] Work order management
- [ ] User authentication and authorization
- [ ] Equipment maintenance history
- [ ] Advanced dashboard with charts
- [ ] Search and filtering capabilities

### Phase 3 (Future)
- [ ] Real-time notifications
- [ ] Export functionality
- [ ] Multi-tenant support
- [ ] Mobile app
- [ ] Advanced analytics

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Matt Smith**
- GitHub: [@msmithfl](https://github.com/msmithfl)
- LinkedIn: [Matthew Smith](https://www.linkedin.com/in/matthew-smith-41ba39156/)
- Portfolio: [mattsmith.digital](https://mattsmith.digital/)

## 🙏 Acknowledgments

- Inspired by enterprise asset management solutions in manufacturing
- Built as a technical demonstration for full-stack development capabilities
- Special thanks to the .NET and React communities

## 📞 Contact

For questions or feedback, please open an issue or reach out via LinkedIn.

---

**Note**: This is a portfolio/demonstration project showcasing full-stack development skills with ASP.NET Core and React. It demonstrates CRUD operations, API design, database integration, and cloud deployment capabilities.