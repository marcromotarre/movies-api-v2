import prisma from "../db";

export const getFilmaffinityScrapperMovies = async (req: any, res: any) => {
  const get = await prisma.movie.findMany({
    where: {
      platforms: {
        filmaffinityMovieId: null,
      },
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
