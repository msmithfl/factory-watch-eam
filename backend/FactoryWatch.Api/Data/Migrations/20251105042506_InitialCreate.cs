using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FactoryWatch.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EquipmentList",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Location = table.Column<string>(type: "TEXT", nullable: false),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    LastMaintenanceDate = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    NextMaintenanceDate = table.Column<DateOnly>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EquipmentList", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "EquipmentList",
                columns: new[] { "Id", "CreatedAt", "Description", "LastMaintenanceDate", "Location", "Name", "NextMaintenanceDate", "Status", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 11, 5, 4, 25, 6, 379, DateTimeKind.Utc).AddTicks(4118), "Main conveyor belt for assembly line", new DateOnly(2024, 10, 15), "Assembly Line 1", "Conveyor Belt A1", new DateOnly(2024, 12, 15), 0, new DateTime(2025, 11, 5, 4, 25, 6, 379, DateTimeKind.Utc).AddTicks(4174) },
                    { 2, new DateTime(2025, 11, 5, 4, 25, 6, 379, DateTimeKind.Utc).AddTicks(4232), "Heavy-duty hydraulic press", new DateOnly(2024, 11, 1), "Station 5", "Hydraulic Press B2", new DateOnly(2025, 1, 1), 1, new DateTime(2025, 11, 5, 4, 25, 6, 379, DateTimeKind.Utc).AddTicks(4232) },
                    { 3, new DateTime(2025, 11, 5, 4, 25, 6, 379, DateTimeKind.Utc).AddTicks(4234), "6-axis robotic arm for precision assembly", new DateOnly(2024, 9, 20), "Assembly Line 2", "Robotic Arm C3", new DateOnly(2024, 11, 20), 0, new DateTime(2025, 11, 5, 4, 25, 6, 379, DateTimeKind.Utc).AddTicks(4234) }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EquipmentList");
        }
    }
}
