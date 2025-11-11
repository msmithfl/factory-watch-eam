using FactoryWatch.Api.Endpoints;
using FactoryWatch.Api.Data;

var builder = WebApplication.CreateBuilder(args);

var connString = builder.Configuration.GetConnectionString("FactoryWatch");
builder.Services.AddSqlite<FactoryWatchContext>(connString);

// ADD SWAGGER SERVICES - create OpenAPI specification
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 🎯 ADD CORS SUPPORT
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins(
            "http://localhost:5173",
            "https://localhost:5173",
            "https://factory-watch-eam.vercel.app/"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// 🎯 USE CORS
app.UseCors("AllowReactApp");

// ADD SWAGGER MIDDLEWARE (Development only) - serve Swagger tools
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); // Serves OpenAPI JSON at /swagger/v1/swagger.json
    app.UseSwaggerUI(); // Serves Swagger UI at /swagger
}

app.MapEquipmentEndpoints();

await app.MigrateDbAsync();

app.Run();