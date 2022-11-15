/*
  Warnings:

  - You are about to drop the column `movieId` on the `DisneyMovie` table. All the data in the column will be lost.
  - You are about to drop the column `platformsMovieId` on the `DisneyMovie` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `FilmaffinityMovie` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `HBOMovie` table. All the data in the column will be lost.
  - You are about to drop the column `platformsMovieId` on the `HBOMovie` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `IMDBMovie` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `NetflixMovie` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `RottenTomatoes` table. All the data in the column will be lost.
  - You are about to drop the `NotFoundNetflixMovie` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "DisneyMovie" DROP COLUMN "movieId",
DROP COLUMN "platformsMovieId";

-- AlterTable
ALTER TABLE "FilmaffinityMovie" DROP COLUMN "movieId";

-- AlterTable
ALTER TABLE "HBOMovie" DROP COLUMN "movieId",
DROP COLUMN "platformsMovieId";

-- AlterTable
ALTER TABLE "IMDBMovie" DROP COLUMN "movieId";

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "popularity" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "NetflixMovie" DROP COLUMN "movieId";

-- AlterTable
ALTER TABLE "RottenTomatoes" DROP COLUMN "movieId";

-- DropTable
DROP TABLE "NotFoundNetflixMovie";
