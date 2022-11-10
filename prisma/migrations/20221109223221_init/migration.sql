-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "year" INTEGER,
    "releaseDate" TEXT,
    "budget" INTEGER,
    "homepage" TEXT,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Platforms" (
    "movieId" INTEGER NOT NULL,
    "filmaffinityMovieId" INTEGER,
    "hboMovieId" INTEGER,
    "disneyMovieId" INTEGER,
    "netflixMovieId" INTEGER,
    "imdbMovieId" INTEGER,
    "rottenTomatoesMovieId" INTEGER,

    CONSTRAINT "Platforms_pkey" PRIMARY KEY ("movieId")
);

-- CreateTable
CREATE TABLE "MovieCredits" (
    "movieId" INTEGER NOT NULL,

    CONSTRAINT "MovieCredits_pkey" PRIMARY KEY ("movieId")
);

-- CreateTable
CREATE TABLE "CastCredit" (
    "credit_id" TEXT NOT NULL,
    "cast_id" INTEGER,
    "adult" BOOLEAN,
    "gender" INTEGER,
    "person_id" INTEGER,
    "known_for_department" TEXT,
    "name" TEXT,
    "original_name" TEXT,
    "popularity" DOUBLE PRECISION,
    "profile_path" TEXT,
    "character" TEXT,
    "department" TEXT,
    "job" TEXT,
    "order" INTEGER,
    "movieCreditsId" INTEGER,
    "personId" INTEGER,

    CONSTRAINT "CastCredit_pkey" PRIMARY KEY ("credit_id")
);

-- CreateTable
CREATE TABLE "CrewCredit" (
    "credit_id" TEXT NOT NULL,
    "adult" BOOLEAN,
    "gender" INTEGER,
    "known_for_department" TEXT,
    "name" TEXT,
    "original_name" TEXT,
    "popularity" DOUBLE PRECISION,
    "profile_path" TEXT,
    "cast_id" INTEGER,
    "character" TEXT,
    "order" INTEGER,
    "movieCreditsId" INTEGER,
    "personId" INTEGER,

    CONSTRAINT "CrewCredit_pkey" PRIMARY KEY ("credit_id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" INTEGER NOT NULL,
    "biography" TEXT,
    "birthday" TEXT,
    "deathday" TEXT,
    "gender" INTEGER,
    "homepage" TEXT,
    "imdb_id" TEXT,
    "known_for_department" TEXT,
    "name" TEXT,
    "place_of_birth" TEXT,
    "popularity" INTEGER,
    "profile_path" TEXT,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "movieId" INTEGER,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenresOnMovies" (
    "genreId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GenresOnMovies_pkey" PRIMARY KEY ("genreId","movieId")
);

-- CreateTable
CREATE TABLE "FilmaffinityMovie" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "rating" DOUBLE PRECISION,
    "votes" INTEGER,
    "movieId" INTEGER,

    CONSTRAINT "FilmaffinityMovie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IMDBMovie" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "rating" DOUBLE PRECISION,
    "votes" INTEGER,
    "movieId" INTEGER,

    CONSTRAINT "IMDBMovie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RottenTomatoes" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "tomatometerAllCriticsPrositiveReviewPercentatge" INTEGER,
    "tomatometerAllCriticsNumReviews" INTEGER,
    "tomatometerTopCriticsPrositiveReviewPercentatge" INTEGER,
    "tomatometerTopCriticsNumReviews" INTEGER,
    "verifiedAudiencePercentatge" INTEGER,
    "verifiedAudienceNumRatings" INTEGER,
    "allAudiencePercentatge" INTEGER,
    "allAudienceNumRatings" INTEGER,
    "movieId" INTEGER,

    CONSTRAINT "RottenTomatoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NetflixMovie" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT,
    "releaseYear" INTEGER,
    "requestId" TEXT,
    "type" TEXT,
    "isOriginal" BOOLEAN,
    "availabilityDate" TEXT,
    "availabilityStartTime" INTEGER,
    "isPlayable" BOOLEAN,
    "searchIndex" INTEGER,
    "orderQuery" TEXT,
    "movieId" INTEGER,

    CONSTRAINT "NetflixMovie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HBOMovie" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT,
    "releaseYear" INTEGER,
    "movieId" INTEGER,
    "platformsMovieId" INTEGER,

    CONSTRAINT "HBOMovie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisneyMovie" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT,
    "releaseYear" INTEGER,
    "movieId" INTEGER,
    "platformsMovieId" INTEGER,

    CONSTRAINT "DisneyMovie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotFoundNetflixMovie" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT,
    "releaseYear" INTEGER,
    "requestId" TEXT,
    "type" TEXT,
    "isOriginal" BOOLEAN,
    "availabilityDate" TEXT,
    "availabilityStartTime" INTEGER,
    "isPlayable" BOOLEAN,
    "searchIndex" INTEGER,
    "orderQuery" TEXT,

    CONSTRAINT "NotFoundNetflixMovie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Platforms_movieId_key" ON "Platforms"("movieId");

-- CreateIndex
CREATE UNIQUE INDEX "Platforms_filmaffinityMovieId_key" ON "Platforms"("filmaffinityMovieId");

-- CreateIndex
CREATE UNIQUE INDEX "Platforms_hboMovieId_key" ON "Platforms"("hboMovieId");

-- CreateIndex
CREATE UNIQUE INDEX "Platforms_disneyMovieId_key" ON "Platforms"("disneyMovieId");

-- CreateIndex
CREATE UNIQUE INDEX "Platforms_netflixMovieId_key" ON "Platforms"("netflixMovieId");

-- CreateIndex
CREATE UNIQUE INDEX "Platforms_imdbMovieId_key" ON "Platforms"("imdbMovieId");

-- CreateIndex
CREATE UNIQUE INDEX "Platforms_rottenTomatoesMovieId_key" ON "Platforms"("rottenTomatoesMovieId");

-- CreateIndex
CREATE UNIQUE INDEX "MovieCredits_movieId_key" ON "MovieCredits"("movieId");

-- AddForeignKey
ALTER TABLE "Platforms" ADD CONSTRAINT "Platforms_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Platforms" ADD CONSTRAINT "Platforms_filmaffinityMovieId_fkey" FOREIGN KEY ("filmaffinityMovieId") REFERENCES "FilmaffinityMovie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Platforms" ADD CONSTRAINT "Platforms_hboMovieId_fkey" FOREIGN KEY ("hboMovieId") REFERENCES "HBOMovie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Platforms" ADD CONSTRAINT "Platforms_disneyMovieId_fkey" FOREIGN KEY ("disneyMovieId") REFERENCES "DisneyMovie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Platforms" ADD CONSTRAINT "Platforms_netflixMovieId_fkey" FOREIGN KEY ("netflixMovieId") REFERENCES "NetflixMovie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Platforms" ADD CONSTRAINT "Platforms_imdbMovieId_fkey" FOREIGN KEY ("imdbMovieId") REFERENCES "IMDBMovie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Platforms" ADD CONSTRAINT "Platforms_rottenTomatoesMovieId_fkey" FOREIGN KEY ("rottenTomatoesMovieId") REFERENCES "RottenTomatoes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieCredits" ADD CONSTRAINT "MovieCredits_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CastCredit" ADD CONSTRAINT "CastCredit_movieCreditsId_fkey" FOREIGN KEY ("movieCreditsId") REFERENCES "MovieCredits"("movieId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CastCredit" ADD CONSTRAINT "CastCredit_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrewCredit" ADD CONSTRAINT "CrewCredit_movieCreditsId_fkey" FOREIGN KEY ("movieCreditsId") REFERENCES "MovieCredits"("movieId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrewCredit" ADD CONSTRAINT "CrewCredit_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenresOnMovies" ADD CONSTRAINT "GenresOnMovies_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenresOnMovies" ADD CONSTRAINT "GenresOnMovies_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
