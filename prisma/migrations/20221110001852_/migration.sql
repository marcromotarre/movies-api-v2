/*
  Warnings:

  - You are about to drop the column `hasDisney` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hasHBO` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hasNetflix` on the `User` table. All the data in the column will be lost.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "hasDisney",
DROP COLUMN "hasHBO",
DROP COLUMN "hasNetflix",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserPlatforms" (
    "userId" TEXT NOT NULL,
    "hasNetflix" BOOLEAN NOT NULL DEFAULT false,
    "hasDisney" BOOLEAN NOT NULL DEFAULT false,
    "hasHBO" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserPlatforms_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "UserRankingEngine" (
    "userId" TEXT NOT NULL,
    "useFilmaffinity" BOOLEAN NOT NULL DEFAULT true,
    "useIMDB" BOOLEAN NOT NULL DEFAULT false,
    "useRottenTomatoes" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserRankingEngine_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPlatforms_userId_key" ON "UserPlatforms"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserRankingEngine_userId_key" ON "UserRankingEngine"("userId");

-- AddForeignKey
ALTER TABLE "UserPlatforms" ADD CONSTRAINT "UserPlatforms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRankingEngine" ADD CONSTRAINT "UserRankingEngine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
