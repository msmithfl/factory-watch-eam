using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FactoryWatch.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddWorkOrders : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<DateOnly>(
                name: "LastMaintenanceDate",
                table: "EquipmentList",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(DateOnly),
                oldType: "TEXT");

            migrationBuilder.CreateTable(
                name: "WorkOrders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    EquipmentId = table.Column<int>(type: "INTEGER", nullable: false),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    AssignedTo = table.Column<string>(type: "TEXT", nullable: true),
                    IsCompleted = table.Column<bool>(type: "INTEGER", nullable: false),
                    CompletedDate = table.Column<DateTime>(type: "TEXT", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkOrders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkOrders_EquipmentList_EquipmentId",
                        column: x => x.EquipmentId,
                        principalTable: "EquipmentList",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WorkOrders_EquipmentId",
                table: "WorkOrders",
                column: "EquipmentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WorkOrders");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "LastMaintenanceDate",
                table: "EquipmentList",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1),
                oldClrType: typeof(DateOnly),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "EquipmentList",
                columns: new[] { "Id", "CreatedAt", "Description", "LastMaintenanceDate", "Location", "Name", "NextMaintenanceDate", "Status", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Main conveyor belt for assembly line", new DateOnly(2024, 10, 15), "Assembly Line 1", "Conveyor Belt A1", new DateOnly(2024, 12, 15), 0, new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 2, new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Heavy-duty hydraulic press", new DateOnly(2024, 11, 1), "Station 5", "Hydraulic Press B2", new DateOnly(2025, 1, 1), 1, new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 3, new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Utc), "6-axis robotic arm for precision assembly", new DateOnly(2024, 9, 20), "Assembly Line 2", "Robotic Arm C3", new DateOnly(2024, 11, 20), 0, new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Utc) }
                });
        }
    }
}
