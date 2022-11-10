import prisma from "../db";

/**
model Platforms {
  movieId               Int                @id @unique
  movie                 Movie?             @relation(fields: [movieId], references: [id])
  filmaffinityMovie     FilmaffinityMovie? @relation(fields: [filmaffinityMovieId], references: [id])
  filmaffinityMovieId   Int?               @unique
  hboMovie              HBOMovie?          @relation(fields: [hboMovieId], references: [id])
  hboMovieId            Int?               @unique
  disneyMovie           DisneyMovie?       @relation(fields: [disneyMovieId], references: [id])
  disneyMovieId         Int?               @unique
  netflixMovie          NetflixMovie?      @relation(fields: [netflixMovieId], references: [id])
  netflixMovieId        Int?               @unique
  imdbMovie             IMDBMovie?         @relation(fields: [imdbMovieId], references: [id])
  imdbMovieId           Int?               @unique
  rottenTomatoesMovie   RottenTomatoes?    @relation(fields: [rottenTomatoesMovieId], references: [id])
  rottenTomatoesMovieId Int?               @unique
}
 */

// Get all platforms by user id
export const getMoviePlatforms = async (req: any, res: any) => {
  const movie = await prisma.movie.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      platforms: true,
    },
  });

  res.json({ data: movie?.platforms, errors: [] });
};

// Create User Platform for a user
export const createMoviePlatforms = async (req: any, res: any) => {
  const platforms = await prisma.platforms.create({
    data: {
      movieId: req.body.movieId,
    },
  });
  res.json({ data: platforms, errors: [] });
};

// Update User Platform
export const updateMoviePlatforms = async (req: any, res: any) => {
  const updated = await prisma.platforms.update({
    where: {
      movieId: req.params.id,
    },
    data: {
      filmaffinityMovieId: req.body.filmaffinityMovieId,
      hboMovieId: req.body.hboMovieId,
      disneyMovieId: req.body.disneyMovieId,
      netflixMovieId: req.body.netflixMovieId,
      imdbMovieId: req.body.imdbMovieId,
      rottenTomatoesMovieId: req.body.rottenTomatoesMovieId,
    },
  });
  res.json({ data: updated, errors: [] });
};
