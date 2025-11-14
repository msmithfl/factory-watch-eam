namespace FactoryWatch.Api.Dtos.WorkOrders;

public record CreateWorkOrderDto(
    int EquipmentId,
    string Title,
    string? Description,
    string? AssignedTo
);