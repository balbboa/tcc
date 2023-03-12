/*
  Warnings:

  - The primary key for the `GroupsOnUsers` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "GroupsOnUsers" DROP CONSTRAINT "GroupsOnUsers_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "GroupsOnUsers_pkey" PRIMARY KEY ("id");
