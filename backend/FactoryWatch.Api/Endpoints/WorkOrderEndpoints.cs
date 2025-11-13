using FactoryWatch.Api.Data;
using FactoryWatch.Api.Dtos;
using FactoryWatch.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace FactoryWatch.Api.Endpoints;

public static class WorkOrderEndpoints
{
    public static RouteGroupBuilder MapWorkOrderEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/work-orders")
            .WithTags("Work Orders");

        // GET /work-orders - Get all work orders
        group.MapGet("/", async (FactoryWatchContext db) =>
        {
            var workOrders = await db.WorkOrders
                .Include(wo => wo.Equipment)
                .Select(wo => new WorkOrderResponseDto(
                    wo.Id,
                    wo.EquipmentId,
                    wo.Equipment!.Name,
                    wo.Title,
                    wo.Description,
                    wo.AssignedTo,
                    wo.IsCompleted,
                    wo.CompletedDate,
                    wo.CreatedAt
                ))
                .ToListAsync();

            return Results.Ok(workOrders);
        });

        // GET /work-orders/{id} - Get single work order
        group.MapGet("/{id}", async (int id, FactoryWatchContext db) =>
        {
            var workOrder = await db.WorkOrders
                .Include(wo => wo.Equipment)
                .Where(wo => wo.Id == id)
                .Select(wo => new WorkOrderResponseDto(
                    wo.Id,
                    wo.EquipmentId,
                    wo.Equipment!.Name,
                    wo.Title,
                    wo.Description,
                    wo.AssignedTo,
                    wo.IsCompleted,
                    wo.CompletedDate,
                    wo.CreatedAt
                ))
                .FirstOrDefaultAsync();

            return workOrder is not null ? Results.Ok(workOrder) : Results.NotFound();
        });

        // GET /work-orders/equipment/{equipmentId} - Get work orders for specific equipment
        group.MapGet("/equipment/{equipmentId}", async (int equipmentId, FactoryWatchContext db) =>
        {
            var workOrders = await db.WorkOrders
                .Include(wo => wo.Equipment)
                .Where(wo => wo.EquipmentId == equipmentId)
                .Select(wo => new WorkOrderResponseDto(
                    wo.Id,
                    wo.EquipmentId,
                    wo.Equipment!.Name,
                    wo.Title,
                    wo.Description,
                    wo.AssignedTo,
                    wo.IsCompleted,
                    wo.CompletedDate,
                    wo.CreatedAt
                ))
                .ToListAsync();

            return Results.Ok(workOrders);
        });

        // POST /work-orders - Create new work order
        group.MapPost("/", async (CreateWorkOrderDto dto, FactoryWatchContext db) =>
        {
            // Verify equipment exists
            var equipment = await db.EquipmentList.FindAsync(dto.EquipmentId);
            if (equipment is null)
            {
                return Results.NotFound($"Equipment with ID {dto.EquipmentId} not found");
            }

            var workOrder = new WorkOrder
            {
                EquipmentId = dto.EquipmentId,
                Title = dto.Title,
                Description = dto.Description,
                AssignedTo = dto.AssignedTo,
                IsCompleted = false,
                CreatedAt = DateTime.UtcNow
            };

            db.WorkOrders.Add(workOrder);
            await db.SaveChangesAsync();

            // Load equipment for response
            await db.Entry(workOrder).Reference(wo => wo.Equipment).LoadAsync();

            var result = new WorkOrderResponseDto(
                workOrder.Id,
                workOrder.EquipmentId,
                workOrder.Equipment!.Name,
                workOrder.Title,
                workOrder.Description,
                workOrder.AssignedTo,
                workOrder.IsCompleted,
                workOrder.CompletedDate,
                workOrder.CreatedAt
            );

            return Results.Created($"/work-orders/{workOrder.Id}", result);
        });

        // PUT /work-orders/{id} - Update work order
        group.MapPut("/{id}", async (int id, UpdateWorkOrderDto dto, FactoryWatchContext db) =>
        {
            var workOrder = await db.WorkOrders.FindAsync(id);
            if (workOrder is null)
            {
                return Results.NotFound();
            }

            if (dto.Title is not null) workOrder.Title = dto.Title;
            if (dto.Description is not null) workOrder.Description = dto.Description;
            if (dto.AssignedTo is not null) workOrder.AssignedTo = dto.AssignedTo;

            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        // POST /work-orders/{id}/complete - Mark work order as complete
        // This updates the equipment maintenance dates
        group.MapPost("/{id}/complete", async (int id, FactoryWatchContext db) =>
        {
            var workOrder = await db.WorkOrders
                .Include(wo => wo.Equipment)
                .FirstOrDefaultAsync(wo => wo.Id == id);

            if (workOrder is null)
            {
                return Results.NotFound();
            }

            if (workOrder.IsCompleted)
            {
                return Results.BadRequest("Work order is already completed");
            }

            // Mark work order as complete
            workOrder.IsCompleted = true;
            workOrder.CompletedDate = DateTime.UtcNow;

            // Update equipment maintenance dates
            var today = DateOnly.FromDateTime(DateTime.UtcNow);
            workOrder.Equipment!.LastMaintenanceDate = today;
            workOrder.Equipment.NextMaintenanceDate = today.AddDays(90);
            workOrder.Equipment.UpdatedAt = DateTime.UtcNow;

            await db.SaveChangesAsync();

            return Results.Ok(new { message = "Work order completed successfully" });
        });

        // DELETE /work-orders/{id} - Delete work order
        group.MapDelete("/{id}", async (int id, FactoryWatchContext db) =>
        {
            var workOrder = await db.WorkOrders.FindAsync(id);
            if (workOrder is null)
            {
                return Results.NotFound();
            }

            db.WorkOrders.Remove(workOrder);
            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        return group;
    }
}