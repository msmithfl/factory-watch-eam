namespace FactoryWatch.Api.Entities;

public class WorkOrder
{
    public int Id { get; set; }
    
    // Which equipment has an issue?
    public int EquipmentId { get; set; }
    public Equipment? Equipment { get; set; }
    
    // What's the issue?
    public required string Title { get; set; }
    public string? Description { get; set; }
    
    // Who's fixing it?
    public string? AssignedTo { get; set; }
    
    // Is it done?
    public bool IsCompleted { get; set; } = false;
    public DateTime? CompletedDate { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}