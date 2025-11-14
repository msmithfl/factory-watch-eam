using FactoryWatch.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace FactoryWatch.Api.Data;

public class FactoryWatchContext(DbContextOptions<FactoryWatchContext> options)
     : DbContext(options)
{
    public DbSet<Equipment> EquipmentList => Set<Equipment>();
    public DbSet<WorkOrder> WorkOrders => Set<WorkOrder>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Equipment>().HasData(
            new Equipment
            {
                Id = 1,
                Name = "Conveyor Belt A1",
                Location = "Assembly Line 1",
                Status = EquipmentStatus.Operational,
                LastMaintenanceDate = new DateOnly(2024, 10, 15),
                NextMaintenanceDate = new DateOnly(2025, 1, 15),
                Description = "Main conveyor belt for assembly line",
                CreatedAt = new DateTime(2024, 11, 1, 0, 0, 0, DateTimeKind.Utc),
                UpdatedAt = new DateTime(2024, 11, 1, 0, 0, 0, DateTimeKind.Utc)
            },
            new Equipment
            {
                Id = 2,
                Name = "Hydraulic Press B2",
                Location = "Station 5",
                Status = EquipmentStatus.UnderMaintenance,
                LastMaintenanceDate = new DateOnly(2024, 11, 1),
                NextMaintenanceDate = new DateOnly(2025, 2, 1),
                Description = "Heavy-duty hydraulic press",
                CreatedAt = new DateTime(2024, 11, 1, 0, 0, 0, DateTimeKind.Utc),
                UpdatedAt = new DateTime(2024, 11, 1, 0, 0, 0, DateTimeKind.Utc)
            },
            new Equipment
            {
                Id = 3,
                Name = "Robotic Arm C3",
                Location = "Assembly Line 2",
                Status = EquipmentStatus.Operational,
                LastMaintenanceDate = new DateOnly(2024, 9, 20),
                NextMaintenanceDate = new DateOnly(2024, 12, 20),
                Description = "6-axis robotic arm for precision assembly",
                CreatedAt = new DateTime(2024, 11, 1, 0, 0, 0, DateTimeKind.Utc),
                UpdatedAt = new DateTime(2024, 11, 1, 0, 0, 0, DateTimeKind.Utc)
            }
        );

        modelBuilder.Entity<WorkOrder>()
            .HasOne(wo => wo.Equipment)
            .WithMany(e => e.WorkOrders)
            .HasForeignKey(wo => wo.EquipmentId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}