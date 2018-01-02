using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace RS.Data.Migrations
{
    public partial class mig_01012018_01 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CreatedBy",
                table: "Skills",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "Skills",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "DeletedBy",
                table: "Skills",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedDate",
                table: "Skills",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Skills",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Skills",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "ModifiedBy",
                table: "Skills",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedDate",
                table: "Skills",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CreatedBy",
                table: "Qualifications",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "Qualifications",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "DeletedBy",
                table: "Qualifications",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedDate",
                table: "Qualifications",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Qualifications",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Qualifications",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "ModifiedBy",
                table: "Qualifications",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedDate",
                table: "Qualifications",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Skills");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "Skills");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "Skills");

            migrationBuilder.DropColumn(
                name: "DeletedDate",
                table: "Skills");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Skills");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Skills");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "Skills");

            migrationBuilder.DropColumn(
                name: "ModifiedDate",
                table: "Skills");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Qualifications");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "Qualifications");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "Qualifications");

            migrationBuilder.DropColumn(
                name: "DeletedDate",
                table: "Qualifications");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Qualifications");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Qualifications");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "Qualifications");

            migrationBuilder.DropColumn(
                name: "ModifiedDate",
                table: "Qualifications");
        }
    }
}
