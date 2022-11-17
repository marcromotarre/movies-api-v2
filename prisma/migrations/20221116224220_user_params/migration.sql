/*
  Warnings:

  - You are about to drop the `UserPlatforms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRankingEngine` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserPlatforms" DROP CONSTRAINT "UserPlatforms_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserRankingEngine" DROP CONSTRAINT "UserRankingEngine_userId_fkey";

-- DropTable
DROP TABLE "UserPlatforms";

-- DropTable
DROP TABLE "UserRankingEngine";

-- CreateTable
CREATE TABLE "UserParams" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "hasNetflix" BOOLEAN NOT NULL DEFAULT false,
    "hasDisney" BOOLEAN NOT NULL DEFAULT false,
    "hasHBO" BOOLEAN NOT NULL DEFAULT false,
    "hasAmazonPrimeVideo" BOOLEAN NOT NULL DEFAULT false,
    "hasDisneyPlus" BOOLEAN NOT NULL DEFAULT false,
    "hasAppleTV" BOOLEAN NOT NULL DEFAULT false,
    "hasFilmin" BOOLEAN NOT NULL DEFAULT false,
    "useFilmaffinity" BOOLEAN NOT NULL DEFAULT true,
    "filmaffinityMinimumRatingValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "filmaffinityMinimumVotesValue" INTEGER NOT NULL DEFAULT 0,
    "useIMDB" BOOLEAN NOT NULL DEFAULT false,
    "imdbMinimumRatingValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "imdbMinimumVotesValue" INTEGER NOT NULL DEFAULT 0,
    "useRottenTomatoes" BOOLEAN NOT NULL DEFAULT false,
    "poster" TEXT NOT NULL DEFAULT 'RECTANGULAR_WITH_WHITE_BORDER',
    "chip" TEXT NOT NULL DEFAULT 'NO_CHIP',

    CONSTRAINT "UserParams_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserParams_userId_key" ON "UserParams"("userId");

-- AddForeignKey
ALTER TABLE "UserParams" ADD CONSTRAINT "UserParams_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
