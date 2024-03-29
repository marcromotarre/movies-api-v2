import prisma from "../db";

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
  console.log("platform", req.body.movieId, req.body.filmaffinityMovieId);
  try {
    const postPlatform = await prisma.platforms.upsert({
      where: {
        movieId: req.body.movieId,
      },
      update: {
        netflixMovieId: req.body.netflixMovieId,
        imdbMovieId: req.body.imdbMovieId,
        filmaffinityMovieId: req.body.filmaffinityMovieId,
        rottenTomatoesMovieId: req.body.rottenTomatoesMovieId,
      },
      create: {
        movieId: req.body.movieId,
        netflixMovieId: req.body.netflixMovieId,
        imdbMovieId: req.body.imdbMovieId,
        filmaffinityMovieId: req.body.filmaffinityMovieId,
        rottenTomatoesMovieId: req.body.rottenTomatoesMovieId,
      },
    });
    res.json({ data: postPlatform, errors: [] });
  } catch (e) {
    res.json({ data: [], errors: [e] });
  }
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
