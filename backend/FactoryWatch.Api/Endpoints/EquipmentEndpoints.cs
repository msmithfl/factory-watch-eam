using FactoryWatch.Api.Data;
using FactoryWatch.Api.Dtos;
using FactoryWatch.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace FactoryWatch.Api.Endpoints;

public static class EquipmentEndpoints
{
    const string GetEquipmentEndpointName = "GetEquipment";

    public static RouteGroupBuilder MapEquipmentEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("equipment")
                        .WithParameterValidation()
                        .WithTags("Equipment"); // Group in Swagger UI

        // GET /equipment - Return DTOs, not entities
        group.MapGet("/", async (FactoryWatchContext dbContext) =>
        {
            var equipment = await dbContext.EquipmentList.ToListAsync();
            var response = equipment.Select(e => new EquipmentResponseDto(
                e.Id,
                e.Name,
                e.Location,
                e.Status.ToString(),
                e.LastMaintenanceDate,
                e.NextMaintenanceDate,
                e.Description,
                e.CreatedAt
            )).ToList();
            
            return Results.Ok(response);
        })
            .WithName("GetAllEquipment")
            .WithSummary("Get all equipment")
            .WithDescription("Returns a list of all factory equipment")
            .Produces<List<Equipment>>(StatusCodes.Status200OK);

        // GET /equipment/{id}
        group.MapGet("/{id}", async (int id, FactoryWatchContext dbContext) =>
        {
            Equipment? equipment = await dbContext.EquipmentList.FindAsync(id);
            return equipment is null ? Results.NotFound() : Results.Ok(equipment);
        })
        .WithName(GetEquipmentEndpointName)
        .WithSummary("Get equipment by ID")
        .WithDescription("Returns specific equipment by its ID")
        .Produces<Equipment>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status404NotFound);

        return group;
    }
}