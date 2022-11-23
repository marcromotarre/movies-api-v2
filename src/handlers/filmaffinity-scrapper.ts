import prisma from "../db";

export const getFilmaffinityScrapperMovies = async (req: any, res: any) => {
  const get = await prisma.movie.findMany({
    where: {
      platforms: {
        filmaffinityMovieId: null,
      },
      filmaffinityParsed: false,
    },
    include: {
      movieCredits: {
        include: {
          cast: true,
          crew: true,
        },
      },
    },
    orderBy: {
      popularity: "desc",
    },
  });
  res.json({ data: get, errors: [] });
};

export const getNotFoundFilmaffinityScrapperMovies = async (
  req: any,
  res: any
) => {
  const get = await prisma.movie.findMany({
    where: {
      platforms: {
        filmaffinityMovieId: null,
      },
      filmaffinityParsed: true,
    },
    select: {
      id: true,
      name: true,
      year: true,
    },
    orderBy: {
      popularity: "desc",
    },
  });
  res.json({ data: get, errors: [] });
};
