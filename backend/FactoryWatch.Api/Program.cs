using FactoryWatch.Api.Endpoints;
using FactoryWatch.Api.Data;

var builder = WebApplication.CreateBuilder(args);

var connString = builder.Configuration.GetConnectionString("FactoryWatch");
builder.Services.AddSqlite<FactoryWatchContext>(connString);

var app = builder.Build();

app.MapEquipmentEndpoints();

await app.MigrateDbAsync();

app.Run();
