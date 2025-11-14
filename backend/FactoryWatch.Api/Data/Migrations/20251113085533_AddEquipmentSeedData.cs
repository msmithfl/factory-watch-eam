using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FactoryWatch.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddEquipmentSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "EquipmentList",
                columns: new[] { "Id", "CreatedAt", "Description", "LastMaintenanceDate", "Location", "Name", "NextMaintenanceDate", "Status", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Main conveyor belt for assembly line", new DateOnly(2024, 10, 15), "Assembly Line 1", "Conveyor Belt A1", new DateOnly(2025, 1, 15), 0, new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 2, new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Heavy-duty hydraulic press", new DateOnly(2024, 11, 1), "Station 5", "Hydraulic Press B2", new DateOnly(2025, 2, 1), 1, new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 3, new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Utc), "6-axis robotic arm for precision assembly", new DateOnly(2024, 9, 20), "Assembly Line 2", "Robotic Arm C3", new DateOnly(2024, 12, 20), 0, new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Utc) }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "EquipmentList",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "EquipmentList",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "EquipmentList",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
