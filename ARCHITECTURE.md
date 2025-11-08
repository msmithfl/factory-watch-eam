# FactoryWatch - System Architecture

## Current Architecture (Development)

```
┌─────────────────────┐    HTTP/REST API     ┌─────────────────────┐
│                     │    (localhost:3000   │                     │
│   React Frontend    │◄──── to ───────────► │   ASP.NET Core API  │
│                     │     localhost:5141)  │                     │
│ - TypeScript        │                      │ - Minimal APIs      │
│ - Vite Build        │                      │ - Entity Framework  │
│ - Material UI       │                      │ - Swagger/OpenAPI   │
│ - CRUD Interface    │                      │ - DTOs & Validation │
└─────────────────────┘                      └─────────────────────┘
                                                        │
                                                        │ EF Core
                                                        ▼
                                              ┌─────────────────────┐
                                              │                     │
                                              │   SQLite Database   │
                                              │                     │
                                              │ - Equipment Table   │
                                              │ - Code-First        │
                                              │ - Migrations        │
                                              │ - Seed Data         │
                                              └─────────────────────┘
```

## Target Azure Architecture

```
                                    ┌─────────────────────────────────────────────────────┐
                                    │                   Azure Cloud                       │
                                    │                                                     │
┌─────────────────────┐             │  ┌─────────────────────┐                            │
│                     │             │  │                     │                            │
│   User's Browser    │─────────────┼─►│   Azure Static      │                            │
│                     │   HTTPS     │  │   Web Apps          │                            │
│ - React App         │             │  │                     │                            │
│ - Material UI       │             │  │ - React Build       │                            │
│ - TypeScript        │             │  │ - CDN Distribution  │                            │
└─────────────────────┘             │  │ - SSL Certificate   │                            │
                                    │  └─────────────────────┘                            │
                                    │            │                                        │
                                    │            │ REST API Calls                         │
                                    │            ▼                                        │
                                    │  ┌─────────────────────┐                            │
                                    │  │                     │                            │
                                    │  │   Azure App Service │                            │
                                    │  │                     │                            │
                                    │  │ - ASP.NET Core API  │                            │
                                    │  │ - Auto-scaling      │                            │
                                    │  │ - Health Monitoring │                            │
                                    │  │ - Application Logs  │                            │
                                    │  └─────────────────────┘                            │
                                    │            │                                        │
                                    │            │ Entity Framework                       │
                                    │            ▼                                        │
                                    │  ┌─────────────────────┐                            │
                                    │  │                     │                            │
                                    │  │   Azure SQL         │                            │
                                    │  │   Database          │                            │
                                    │  │                     │                            │
                                    │  │ - Managed Service   │                            │
                                    │  │ - Automatic Backups │                            │
                                    │  │ - High Availability │                            │
                                    │  │ - Security Features │                            │
                                    │  └─────────────────────┘                            │
                                    │                                                     │
                                    └─────────────────────────────────────────────────────┘
```

## Component Details

### Frontend (React)
- **Technology**: React 18 + TypeScript + Vite
- **UI Framework**: Material UI
- **Features**: 
  - Equipment CRUD operations
  - Responsive design
  - Form validation
  - Error handling
- **Deployment**: Azure Static Web Apps

### Backend API (ASP.NET Core)
- **Technology**: .NET 9.0 + C# 13
- **Architecture**: Minimal APIs
- **Features**:
  - RESTful endpoints
  - Entity Framework Core
  - DTOs for data transfer
  - Swagger documentation
  - CORS configuration
- **Deployment**: Azure App Service

### Database Layer
- **Current**: SQLite (development)
- **Target**: Azure SQL Database
- **ORM**: Entity Framework Core
- **Features**:
  - Code-first migrations
  - Seed data
  - Connection string management

## Data Flow

1. **User Interaction**: User interacts with React frontend
2. **API Request**: Frontend makes HTTP requests to ASP.NET Core API
3. **Business Logic**: API processes request, applies validation
4. **Data Access**: Entity Framework queries/updates database
5. **Response**: Data flows back through the same path

## Security Considerations

- **HTTPS**: All communication encrypted
- **CORS**: Configured for cross-origin requests
- **Authentication**: Ready for Azure AD integration
- **SQL Injection**: Protected by Entity Framework
- **Input Validation**: DTOs with validation attributes

## Scalability Features

- **Auto-scaling**: Azure App Service can scale based on demand
- **CDN**: Static Web Apps includes global CDN
- **Database**: Azure SQL Database supports scaling
- **Caching**: Can add Redis cache if needed

## Monitoring & DevOps

- **Application Insights**: Performance monitoring
- **Azure Monitor**: Infrastructure monitoring
- **Health Checks**: Built into ASP.NET Core
- **Logging**: Structured logging with Serilog (future)
- **CI/CD**: GitHub Actions for deployment

## Future Enhancements

- **Authentication**: Azure AD B2C integration
- **Caching**: Redis cache for performance
- **File Storage**: Azure Blob Storage for documents
- **Notifications**: SignalR for real-time updates
- **API Gateway**: Azure API Management
- **Message Queue**: Azure Service Bus for async processing