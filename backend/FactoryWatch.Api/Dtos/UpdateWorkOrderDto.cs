namespace FactoryWatch.Api.Dtos;

public record UpdateWorkOrderDto(
    string? Title,
    string? Description,
    string? AssignedTo
);