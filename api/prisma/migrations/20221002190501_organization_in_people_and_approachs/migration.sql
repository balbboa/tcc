/*
  Warnings:

  - Added the required column `organizationsId` to the `Approachs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationsId` to the `Peoples` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Approachs" ADD COLUMN     "organizationsId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Peoples" ADD COLUMN     "organizationsId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Peoples" ADD CONSTRAINT "Peoples_organizationsId_fkey" FOREIGN KEY ("organizationsId") REFERENCES "Organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Approachs" ADD CONSTRAINT "Approachs_organizationsId_fkey" FOREIGN KEY ("organizationsId") REFERENCES "Organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
