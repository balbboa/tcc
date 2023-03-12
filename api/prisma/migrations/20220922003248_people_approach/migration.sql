/*
  Warnings:

  - Added the required column `approachId` to the `Peoples` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Peoples" ADD COLUMN     "approachId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Peoples" ADD CONSTRAINT "Peoples_approachId_fkey" FOREIGN KEY ("approachId") REFERENCES "Approachs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
