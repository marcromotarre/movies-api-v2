import prisma from "../db";

export const getMoviesInGallery = async (req: any, res: any) => {
  const elementsPerPage = req.body.num ? req.body.num : 10;
  const page = req.body.page ? req.body.page : 0;
  try {
    const count = await prisma.movie.count({
      where: {
        platforms: {
          imdbMovie: {
            rating: { gt: 0 },
          },
          filmaffinityMovie: {
            rating: { gt: 0 },
          },
        },
      },
    });

    const get = await prisma.movie.findMany({
      skip: page * elementsPerPage,
      take: elementsPerPage,
      where: {
        platforms: {
          imdbMovie: {
            rating: { gt: 0 },
          },
          filmaffinityMovie: {
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
            filmaffinityMovie: {
              select: {
                rating: true,
              },
            },
          },
        },
      },
      orderBy: {
        platforms: {
          filmaffinityMovie: {
            rating: "desc",
          },
        },
      },
    });

    res.status(200);
    res.json({
      count,
      page,
      numElements: elementsPerPage,
      data: get,
      errors: [],
    });
  } catch (e) {
    res.json({ data: [], errors: [e] });
  }
};
