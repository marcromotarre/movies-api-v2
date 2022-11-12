/*
  Warnings:

  - You are about to drop the column `title` on the `HBOMovie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HBOMovie" DROP COLUMN "title",
ADD COLUMN     "information" TEXT;
