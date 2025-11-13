namespace FactoryWatch.Api.Dtos.WorkOrders;

public record UpdateWorkOrderDto(
    string? Title,
    string? Description,
    string? AssignedTo
);