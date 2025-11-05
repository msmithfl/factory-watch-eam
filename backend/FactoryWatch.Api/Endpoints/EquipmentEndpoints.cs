using FactoryWatch.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace FactoryWatch.Api.Endpoints;

public static class EquipmentEndpoints
{
    //const string GetEquipmentEndpointName = "GetEquipment";

    public static RouteGroupBuilder MapEquipmentEndpoints(this WebApplication app)
    {
        // Route Group Builder
        var group = app.MapGroup("equipment")
                        .WithParameterValidation();

        // GET /equipment
        group.MapGet("/", async (FactoryWatchContext dbContext) =>
            await dbContext.EquipmentList.ToListAsync());

        return group;
    }
}