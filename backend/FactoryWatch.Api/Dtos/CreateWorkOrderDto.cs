namespace FactoryWatch.Api.Dtos;

public record CreateWorkOrderDto(
    int EquipmentId,
    string Title,
    string? Description,
    string? AssignedTo
);