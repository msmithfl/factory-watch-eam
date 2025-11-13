using System.ComponentModel.DataAnnotations;

namespace FactoryWatch.Api.Dtos;

public record class EquipmentResponseDto(
    int Id,
    string Name,
    string Location,
    string Status,
    DateOnly? LastMaintenanceDate,
    DateOnly? NextMaintenanceDate,
    string? Description,
    DateTime CreatedAt
);
