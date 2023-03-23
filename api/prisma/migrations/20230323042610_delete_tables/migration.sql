/*
  Warnings:

  - You are about to drop the `Documents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Peoples` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Photos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vehicles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Documents" DROP CONSTRAINT "Documents_peopleId_fkey";

-- DropForeignKey
ALTER TABLE "Documents" DROP CONSTRAINT "Documents_userId_fkey";

-- DropForeignKey
ALTER TABLE "Peoples" DROP CONSTRAINT "Peoples_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Peoples" DROP CONSTRAINT "Peoples_approachId_fkey";

-- DropForeignKey
ALTER TABLE "Peoples" DROP CONSTRAINT "Peoples_organizationsId_fkey";

-- DropForeignKey
ALTER TABLE "Peoples" DROP CONSTRAINT "Peoples_userId_fkey";

-- DropForeignKey
ALTER TABLE "Photos" DROP CONSTRAINT "Photos_approachId_fkey";

-- DropForeignKey
ALTER TABLE "Photos" DROP CONSTRAINT "Photos_peopleId_fkey";

-- DropForeignKey
ALTER TABLE "Photos" DROP CONSTRAINT "Photos_userId_fkey";

-- DropForeignKey
ALTER TABLE "Photos" DROP CONSTRAINT "Photos_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "Vehicles" DROP CONSTRAINT "Vehicles_approachId_fkey";

-- DropForeignKey
ALTER TABLE "Vehicles" DROP CONSTRAINT "Vehicles_userId_fkey";

-- DropTable
DROP TABLE "Documents";

-- DropTable
DROP TABLE "Peoples";

-- DropTable
DROP TABLE "Photos";

-- DropTable
DROP TABLE "Vehicles";
