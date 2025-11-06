using System.ComponentModel.DataAnnotations;

namespace FactoryWatch.Api.Dtos;

public record class CreateEquipmentDto(
    [Required][StringLength(50)] string Name,
    [Required][StringLength(50)] string Location,
    string Status
);