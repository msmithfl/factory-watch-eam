using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FactoryWatch.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class FixSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "EquipmentList",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "EquipmentList",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "EquipmentList",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Utc) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "EquipmentList",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 11, 5, 4, 25, 6, 379, DateTimeKind.Utc).AddTicks(4118), new DateTime(2025, 11, 5, 4, 25, 6, 379, DateTimeKind.Utc).AddTicks(4174) });

            migrationBuilder.UpdateData(
                table: "EquipmentList",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 11, 5, 4, 25, 6, 379, DateTimeKind.Utc).AddTicks(4232), new DateTime(2025, 11, 5, 4, 25, 6, 379, DateTimeKind.Utc).AddTicks(4232) });

            migrationBuilder.UpdateData(
                table: "EquipmentList",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 11, 5, 4, 25, 6, 379, DateTimeKind.Utc).AddTicks(4234), new DateTime(2025, 11, 5, 4, 25, 6, 379, DateTimeKind.Utc).AddTicks(4234) });
        }
    }
}
