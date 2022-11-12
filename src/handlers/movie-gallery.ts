import prisma from "../db";

export const getMoviesInGallery = async (req: any, res: any) => {
  try {
    const get = await prisma.movie.findMany({
      where: {
        platforms: {
          imdbMovie: {
            rating: { gt: 0 },
          },
        },
      },
      select: {
        name: true,
        image: true,
        platforms: {
          select: {
            imdbMovie: {
              select: {
                rating: true,
              },
            },
          },
        },
      },
      orderBy: {
        platforms: {
          imdbMovie: {
            rating: "desc",
          },
        },
      },
    });
    res.status(200)
    res.json({ data: get, errors: [] });
  } catch (e) {
    res.json({ data: [], errors: [e] });
  }
};
