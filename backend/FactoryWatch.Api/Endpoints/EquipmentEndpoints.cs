using FactoryWatch.Api.Data;
using FactoryWatch.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace FactoryWatch.Api.Endpoints;

public static class EquipmentEndpoints
{
    const string GetEquipmentEndpointName = "GetEquipment";

    public static RouteGroupBuilder MapEquipmentEndpoints(this WebApplication app)
    {
        // Route Group Builder
        var group = app.MapGroup("equipment")
                        .WithParameterValidation();

        // GET /equipment
        group.MapGet("/", async (FactoryWatchContext dbContext) =>
            await dbContext.EquipmentList.ToListAsync());

        // GET /equipment/1
        group.MapGet("/{id}", async (int id, FactoryWatchContext dbContext) =>
        {
            Equipment? equipment = await dbContext.EquipmentList.FindAsync(id);

            return equipment is null ?
                Results.NotFound() : Results.Ok(equipment);
        })  
        .WithName(GetEquipmentEndpointName);

        return group;
    }
}