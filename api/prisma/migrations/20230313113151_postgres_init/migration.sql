/*
  Warnings:

  - You are about to drop the column `filiationsId` on the `Peoples` table. All the data in the column will be lost.
  - You are about to drop the `Filiations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Filiations" DROP CONSTRAINT "Filiations_userId_fkey";

-- DropForeignKey
ALTER TABLE "Peoples" DROP CONSTRAINT "Peoples_filiationsId_fkey";

-- AlterTable
ALTER TABLE "Peoples" DROP COLUMN "filiationsId";

-- DropTable
DROP TABLE "Filiations";
