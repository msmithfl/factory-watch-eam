using FactoryWatch.Api.Endpoints;
using FactoryWatch.Api.Data;

var builder = WebApplication.CreateBuilder(args);

var connString = builder.Configuration.GetConnectionString("FactoryWatch");
builder.Services.AddSqlite<FactoryWatchContext>(connString);

// ADD SWAGGER SERVICES - create OpenAPI specification
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 🎯 DYNAMIC CORS - reads from appsettings.{Environment}.json
var corsOrigins = builder.Configuration.GetSection("CorsOrigins").Get<string[]>()
    ?? new[] { "http://localhost:5173" }; // Fallback for local dev
    
Console.WriteLine($"CORS Origins: {string.Join(", ", corsOrigins)}"); // ← Add this for debugging

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins(corsOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// 🎯 USE CORS
app.UseCors("AllowReactApp");

app.UseSwagger(); // Serves OpenAPI JSON at /swagger/v1/swagger.json
app.UseSwaggerUI(); // Serves Swagger UI at /swagger

app.MapEquipmentEndpoints();

await app.MigrateDbAsync();

app.Run();