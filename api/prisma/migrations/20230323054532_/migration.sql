/*
  Warnings:

  - You are about to drop the column `addressId` on the `Approachs` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropForeignKey
ALTER TABLE "Approachs" DROP CONSTRAINT "Approachs_addressId_fkey";

-- AlterTable
ALTER TABLE "Approachs" DROP COLUMN "addressId",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "district" TEXT,
ADD COLUMN     "number" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "street" TEXT;

-- DropTable
DROP TABLE "Address";
