/*
  Warnings:

  - Made the column `title` on table `NetflixMovie` required. This step will fail if there are existing NULL values in that column.
  - Made the column `releaseYear` on table `NetflixMovie` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "NetflixMovie" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "releaseYear" SET NOT NULL;
