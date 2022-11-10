-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "hasNetflix" BOOLEAN NOT NULL DEFAULT false,
    "hasDisney" BOOLEAN NOT NULL DEFAULT false,
    "hasHBO" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
