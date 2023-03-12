-- DropForeignKey
ALTER TABLE "Approachs" DROP CONSTRAINT "Approachs_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Documents" DROP CONSTRAINT "Documents_peopleId_fkey";

-- DropForeignKey
ALTER TABLE "Peoples" DROP CONSTRAINT "Peoples_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Peoples" DROP CONSTRAINT "Peoples_approachId_fkey";

-- DropForeignKey
ALTER TABLE "Peoples" DROP CONSTRAINT "Peoples_filiationsId_fkey";

-- DropForeignKey
ALTER TABLE "Photos" DROP CONSTRAINT "Photos_approachId_fkey";

-- DropForeignKey
ALTER TABLE "Photos" DROP CONSTRAINT "Photos_peopleId_fkey";

-- DropForeignKey
ALTER TABLE "Photos" DROP CONSTRAINT "Photos_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "Vehicles" DROP CONSTRAINT "Vehicles_approachId_fkey";

-- AlterTable
ALTER TABLE "Approachs" ALTER COLUMN "addressId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Documents" ALTER COLUMN "peopleId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Peoples" ALTER COLUMN "filiationsId" DROP NOT NULL,
ALTER COLUMN "addressId" DROP NOT NULL,
ALTER COLUMN "approachId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Photos" ALTER COLUMN "vehicleId" DROP NOT NULL,
ALTER COLUMN "approachId" DROP NOT NULL,
ALTER COLUMN "peopleId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Vehicles" ALTER COLUMN "approachId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "Peoples"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photos" ADD CONSTRAINT "Photos_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photos" ADD CONSTRAINT "Photos_approachId_fkey" FOREIGN KEY ("approachId") REFERENCES "Approachs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photos" ADD CONSTRAINT "Photos_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "Peoples"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Peoples" ADD CONSTRAINT "Peoples_filiationsId_fkey" FOREIGN KEY ("filiationsId") REFERENCES "Filiations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Peoples" ADD CONSTRAINT "Peoples_approachId_fkey" FOREIGN KEY ("approachId") REFERENCES "Approachs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Peoples" ADD CONSTRAINT "Peoples_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicles" ADD CONSTRAINT "Vehicles_approachId_fkey" FOREIGN KEY ("approachId") REFERENCES "Approachs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Approachs" ADD CONSTRAINT "Approachs_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
