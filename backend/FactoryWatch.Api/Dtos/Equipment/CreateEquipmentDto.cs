using System.ComponentModel.DataAnnotations;
using FactoryWatch.Api.Entities;

namespace FactoryWatch.Api.Dtos.Equipment;

public record class CreateEquipmentDto(
    [Required][StringLength(50)] string Name,
    [Required][StringLength(50)] string Location,
    EquipmentStatus Status,
    string Description
);