# FactoryWatch - Equipment Maintenance System

A modern web-based Enterprise Asset Management (EAM) solution for tracking equipment maintenance, work orders, and asset lifecycle management. Built with ASP.NET Core and React to demonstrate full-stack development capabilities for asset-intensive operations.

## ✨ Features

### Core Functionality
- **Equipment Dashboard** - Real-time overview of all machinery with status indicators
- **Work Order Management** - Create, assign, track, and complete maintenance tasks
- **Maintenance History** - Comprehensive logging of all maintenance activities
- **Analytics & Reporting** - Visual insights into equipment uptime and maintenance patterns
- **Search & Filter** - Quick access to equipment by status, type, or location

### Technical Highlights
- RESTful API architecture with ASP.NET Core
- Responsive React UI with modern component design
- Entity Framework Core with SQL Server for data persistence
- Redux for predictable state management
- Comprehensive unit and integration testing
- Form validation on both client and server
- Role-based view toggling (Manager/Technician)

## 🛠️ Tech Stack

### Backend
- **Framework**: ASP.NET Core 9.0 Web API
- **Language**: C# 13
- **ORM**: Entity Framework Core 9.0
- **Database**: SQL Server Express 2022
- **Testing**: xUnit, Moq, FluentAssertions
- **API Documentation**: Swagger/OpenAPI

### Frontend
- **Framework**: React 19
- **Language**: JavaScript (ES6+) / TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **UI Components**: Material-UI (MUI) v7
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Testing**: Jest, React Testing Library
- **Build Tool**: Vite

### DevOps & Tools
- **Version Control**: Git
- **API Testing**: Postman/Swagger
- **Code Quality**: ESLint, Prettier
- **CI/CD**: GitHub Actions (optional)

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- [.NET 9.0 SDK](https://dotnet.microsoft.com/download) or later
- [Node.js](https://nodejs.org/) (v18.x or later) and npm
- [SQL Server Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) or SQL Server LocalDB
- [Git](https://git-scm.com/)
- A code editor ([Visual Studio Code](https://code.visualstudio.com/) recommended)

### Optional Tools
- [Visual Studio 2022](https://visualstudio.microsoft.com/) (Community Edition or higher)
- [SQL Server Management Studio (SSMS)](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms)
- [Postman](https://www.postman.com/) for API testing

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/factorywatch.git
cd factorywatch
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend/FactoryWatch.API
```

Update the connection string in `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=FactoryWatchDb;Trusted_Connection=True;MultipleActiveResultSets=true"
  }
}
```

Install dependencies and apply database migrations:

```bash
# Restore NuGet packages
dotnet restore

# Apply database migrations
dotnet ef database update

# Run the API
dotnet run
```

The API will be available at `https://localhost:5001` (or `http://localhost:5000`)

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend/factorywatch-ui
```

Install dependencies:

```bash
npm install
```

Update the API base URL in `src/config/api.js`:

```javascript
export const API_BASE_URL = 'https://localhost:5001/api';
```

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Seed Sample Data (Optional)

To populate the database with sample equipment and work orders:

```bash
cd backend/FactoryWatch.API
dotnet run --seed
```

## 📁 Project Structure

```
factorywatch/
├── backend/
│   ├── FactoryWatch.API/           # Web API project
│   │   ├── Controllers/            # API endpoints
│   │   ├── Models/                 # Domain models
│   │   ├── Data/                   # DbContext and migrations
│   │   ├── Services/               # Business logic
│   │   ├── DTOs/                   # Data transfer objects
│   │   └── Program.cs              # App entry point
│   ├── FactoryWatch.Tests/         # Unit tests
│   └── FactoryWatch.sln            # Solution file
│
├── frontend/
│   ├── factorywatch-ui/
│   │   ├── src/
│   │   │   ├── components/         # React components
│   │   │   ├── pages/              # Page components
│   │   │   ├── redux/              # Redux store and slices
│   │   │   ├── services/           # API service layer
│   │   │   ├── utils/              # Helper functions
│   │   │   └── App.jsx             # Root component
│   │   ├── public/                 # Static assets
│   │   └── package.json
│   └── tests/                      # Frontend tests
│
├── docs/                           # Documentation
│   ├── api/                        # API documentation
│   ├── screenshots/                # Application screenshots
│   └── architecture.md             # Architecture overview
│
├── .gitignore
├── README.md
└── LICENSE
```

## 📚 API Documentation

### Base URL
```
https://localhost:5001/api
```

### Endpoints

#### Equipment

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/equipment` | Get all equipment |
| GET | `/equipment/{id}` | Get equipment by ID |
| POST | `/equipment` | Create new equipment |
| PUT | `/equipment/{id}` | Update equipment |
| DELETE | `/equipment/{id}` | Delete equipment |
| GET | `/equipment/{id}/history` | Get maintenance history |

#### Work Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/workorders` | Get all work orders |
| GET | `/workorders/{id}` | Get work order by ID |
| POST | `/workorders` | Create new work order |
| PUT | `/workorders/{id}` | Update work order |
| DELETE | `/workorders/{id}` | Delete work order |
| PATCH | `/workorders/{id}/status` | Update work order status |

### Sample Request

**Create Equipment:**
```bash
POST /api/equipment
Content-Type: application/json

{
  "name": "Hydraulic Press #3",
  "type": "Press",
  "location": "Assembly Line A",
  "status": "Operational",
  "installDate": "2023-01-15",
  "nextMaintenanceDate": "2025-12-01"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Hydraulic Press #3",
  "type": "Press",
  "location": "Assembly Line A",
  "status": "Operational",
  "installDate": "2023-01-15T00:00:00",
  "lastMaintenanceDate": null,
  "nextMaintenanceDate": "2025-12-01T00:00:00",
  "createdAt": "2025-11-04T10:30:00"
}
```

For complete API documentation, run the application and visit `https://localhost:5001/swagger`

## 🧪 Testing

### Backend Tests

Run all backend tests:

```bash
cd backend/FactoryWatch.Tests
dotnet test
```

Run tests with coverage:

```bash
dotnet test /p:CollectCoverage=true /p:CoverageReporter=html
```

### Frontend Tests

Run all frontend tests:

```bash
cd frontend/factorywatch-ui
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

### Test Coverage Goals
- Backend: 80%+ code coverage
- Frontend: 70%+ code coverage
- All critical business logic fully tested

## 🚢 Deployment

### Backend Deployment (Azure App Service)

1. Publish the application:
```bash
cd backend/FactoryWatch.API
dotnet publish -c Release -o ./publish
```

2. Deploy to Azure:
```bash
az webapp deploy --resource-group <resource-group> --name <app-name> --src-path ./publish
```

### Frontend Deployment (Vercel/Netlify)

1. Build the application:
```bash
cd frontend/factorywatch-ui
npm run build
```

2. Deploy to Vercel:
```bash
vercel --prod
```

Or deploy to Netlify:
```bash
netlify deploy --prod --dir=dist
```

### Environment Variables

**Backend (.env or Azure App Settings):**
```
ConnectionStrings__DefaultConnection=<your-connection-string>
ASPNETCORE_ENVIRONMENT=Production
```

**Frontend (.env.production):**
```
VITE_API_BASE_URL=https://your-api.azurewebsites.net/api
```

## 🗺️ Roadmap

### Phase 1 (Current)
- [x] Equipment CRUD operations
- [x] Work order management
- [x] Basic dashboard with status indicators
- [x] Maintenance history tracking

### Phase 2 (Planned)
- [ ] User authentication and authorization
- [ ] Real-time notifications for overdue maintenance
- [ ] Advanced analytics dashboard
- [ ] Mobile-responsive design improvements
- [ ] Export reports to PDF/Excel

### Phase 3 (Future)
- [ ] Multi-tenant support
- [ ] Integration with IoT sensors
- [ ] Predictive maintenance algorithms
- [ ] Mobile app (React Native)
- [ ] Advanced reporting with Power BI

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

For questions or feedback, please open an issue or contact me at your.email@example.com

---

**Note**: This is a portfolio/demonstration project showcasing full-stack development skills with .NET Core and React. It is not intended for production use without further security hardening and feature development.