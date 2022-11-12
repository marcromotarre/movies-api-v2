/*
  Warnings:

  - The primary key for the `IMDBMovie` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Platforms" DROP CONSTRAINT "Platforms_imdbMovieId_fkey";

-- AlterTable
ALTER TABLE "IMDBMovie" DROP CONSTRAINT "IMDBMovie_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "IMDBMovie_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Platforms" ALTER COLUMN "imdbMovieId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Platforms" ADD CONSTRAINT "Platforms_imdbMovieId_fkey" FOREIGN KEY ("imdbMovieId") REFERENCES "IMDBMovie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
