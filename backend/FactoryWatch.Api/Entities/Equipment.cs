namespace FactoryWatch.Api.Entities;

public class Equipment
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Location { get; set; }
    public EquipmentStatus Status { get; set; }
    public DateOnly LastMaintenanceDate { get; set; }
    public DateOnly? NextMaintenanceDate { get; set; }
    public string? Description { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public enum EquipmentStatus
{
    Operational,
    UnderMaintenance,
    OutOfService,
    Decommissioned
}