/*
  Warnings:

  - The primary key for the `HBOMovie` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Platforms" DROP CONSTRAINT "Platforms_hboMovieId_fkey";

-- AlterTable
ALTER TABLE "HBOMovie" DROP CONSTRAINT "HBOMovie_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "HBOMovie_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Platforms" ALTER COLUMN "hboMovieId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Platforms" ADD CONSTRAINT "Platforms_hboMovieId_fkey" FOREIGN KEY ("hboMovieId") REFERENCES "HBOMovie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
