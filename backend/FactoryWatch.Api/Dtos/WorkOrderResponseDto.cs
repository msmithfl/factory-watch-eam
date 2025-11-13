namespace FactoryWatch.Api.Dtos;

public record WorkOrderResponseDto(
    int Id,
    int EquipmentId,
    string EquipmentName,
    string Title,
    string? Description,
    string? AssignedTo,
    bool IsCompleted,
    DateTime? CompletedDate,
    DateTime CreatedAt
);