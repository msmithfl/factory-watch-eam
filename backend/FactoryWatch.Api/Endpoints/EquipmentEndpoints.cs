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
            var equipment = await dbContext.EquipmentList.FindAsync(id);
            if (equipment is null) return Results.NotFound();

            var response = new EquipmentResponseDto(
                equipment.Id,
                equipment.Name,
                equipment.Location,
                equipment.Status.ToString(),
                equipment.LastMaintenanceDate,
                equipment.NextMaintenanceDate,
                equipment.Description,
                equipment.CreatedAt
            );

            return Results.Ok(response);
        })
        .WithName(GetEquipmentEndpointName)
        .WithSummary("Get equipment by ID")
        .WithDescription("Returns specific equipment by its ID")
        .Produces<Equipment>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status404NotFound);

        // POST /equipment - Accept DTO, return DTO
        group.MapPost("/", async (CreateEquipmentDto createDto, FactoryWatchContext dbContext) =>
        {
            var equipment = new Equipment
            {
                Name = createDto.Name,
                Location = createDto.Location,
                Status = EquipmentStatus.Operational,
                LastMaintenanceDate = DateOnly.FromDateTime(DateTime.Now),
                Description = createDto.Description,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            dbContext.EquipmentList.Add(equipment);
            await dbContext.SaveChangesAsync();

            var response = new EquipmentResponseDto(
                equipment.Id,
                equipment.Name,
                equipment.Location,
                equipment.Status.ToString(),
                equipment.LastMaintenanceDate,
                equipment.NextMaintenanceDate,
                equipment.Description,
                equipment.CreatedAt
            );

            return Results.Created($"/equipment/{equipment.Id}", response);
        })
        .WithSummary("Create new equipment")
        .Accepts<CreateEquipmentDto>("application/json")
        .Produces<EquipmentResponseDto>(StatusCodes.Status201Created);

        return group;
    }
}