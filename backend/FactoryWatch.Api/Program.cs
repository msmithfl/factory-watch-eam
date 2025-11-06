using FactoryWatch.Api.Endpoints;
using FactoryWatch.Api.Data;

var builder = WebApplication.CreateBuilder(args);

var connString = builder.Configuration.GetConnectionString("FactoryWatch");
builder.Services.AddSqlite<FactoryWatchContext>(connString);

// ADD SWAGGER SERVICES - create OpenAPI specification
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ADD SWAGGER MIDDLEWARE (Development only) - serve Swagger tools
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); // Serves OpenAPI JSON at /swagger/v1/swagger.json
    app.UseSwaggerUI(); // Serves Swagger UI at /swagger
}

app.MapEquipmentEndpoints();

await app.MigrateDbAsync();

app.Run();