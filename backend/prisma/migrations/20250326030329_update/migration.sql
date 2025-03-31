/*
  Warnings:

  - You are about to drop the column `permissions` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `organization` on the `Researcher` table. All the data in the column will be lost.
  - You are about to drop the column `researchField` on the `Researcher` table. All the data in the column will be lost.
  - You are about to drop the column `faculty` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `teacherCode` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `sQuyenHan` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sTenQuanTriVien` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sChucVu` to the `Researcher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sDonViCongTac` to the `Researcher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sGioiTinh` to the `Researcher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sMaTrinhDoHocVan` to the `Researcher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sQuyenHan` to the `Researcher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sTenNhaNghienCuu` to the `Researcher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sChucVu` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sDonVi` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sGioiTinh` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sKhoa` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sMaTrinhDoHocVan` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sQuyenHan` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sTenGiangVien` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Admin] DROP COLUMN [permissions];
ALTER TABLE [dbo].[Admin] ADD [sQuyenHan] NVARCHAR(1000) NOT NULL,
[sTenQuanTriVien] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Researcher] DROP COLUMN [organization],
[researchField];
ALTER TABLE [dbo].[Researcher] ADD [sChucVu] NVARCHAR(1000) NOT NULL,
[sDonViCongTac] NVARCHAR(1000) NOT NULL,
[sGioiTinh] NVARCHAR(1000) NOT NULL,
[sMaTrinhDoHocVan] NVARCHAR(1000) NOT NULL,
[sQuyenHan] NVARCHAR(1000) NOT NULL,
[sTenNhaNghienCuu] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Teacher] DROP COLUMN [faculty],
[teacherCode];
ALTER TABLE [dbo].[Teacher] ADD [sChucVu] NVARCHAR(1000) NOT NULL,
[sDonVi] NVARCHAR(1000) NOT NULL,
[sGioiTinh] NVARCHAR(1000) NOT NULL,
[sKhoa] NVARCHAR(1000) NOT NULL,
[sMaTrinhDoHocVan] NVARCHAR(1000) NOT NULL,
[sQuyenHan] NVARCHAR(1000) NOT NULL,
[sTenGiangVien] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
