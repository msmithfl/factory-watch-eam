using System.ComponentModel.DataAnnotations;
using FactoryWatch.Api.Entities;

namespace FactoryWatch.Api.Dtos.Equipment;

public record class UpdateEquipmentDto(
    [Required][StringLength(50)] string Name,
    [Required][StringLength(50)] string Location,
    EquipmentStatus Status,
    DateOnly? NextMaintenanceDate,
    string? Description
);