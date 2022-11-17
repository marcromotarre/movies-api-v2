/*
  Warnings:

  - You are about to drop the column `availabilityDate` on the `NetflixMovie` table. All the data in the column will be lost.
  - You are about to drop the column `availabilityStartTime` on the `NetflixMovie` table. All the data in the column will be lost.
  - You are about to drop the column `isOriginal` on the `NetflixMovie` table. All the data in the column will be lost.
  - You are about to drop the column `isPlayable` on the `NetflixMovie` table. All the data in the column will be lost.
  - You are about to drop the column `orderQuery` on the `NetflixMovie` table. All the data in the column will be lost.
  - You are about to drop the column `requestId` on the `NetflixMovie` table. All the data in the column will be lost.
  - You are about to drop the column `searchIndex` on the `NetflixMovie` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `NetflixMovie` table. All the data in the column will be lost.
  - Added the required column `extraData` to the `DisneyMovie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extraData` to the `HBOMovie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extraData` to the `NetflixMovie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DisneyMovie" ADD COLUMN     "extraData" TEXT NOT NULL,
ADD COLUMN     "parsed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "HBOMovie" ADD COLUMN     "extraData" TEXT NOT NULL,
ADD COLUMN     "parsed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "IMDBMovie" ADD COLUMN     "parsed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "filmaffinityParsed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "rottenTomatoesParsed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "wallpapers" TEXT[];

-- AlterTable
ALTER TABLE "NetflixMovie" DROP COLUMN "availabilityDate",
DROP COLUMN "availabilityStartTime",
DROP COLUMN "isOriginal",
DROP COLUMN "isPlayable",
DROP COLUMN "orderQuery",
DROP COLUMN "requestId",
DROP COLUMN "searchIndex",
DROP COLUMN "type",
ADD COLUMN     "extraData" TEXT NOT NULL,
ADD COLUMN     "parsed" BOOLEAN NOT NULL DEFAULT false;
