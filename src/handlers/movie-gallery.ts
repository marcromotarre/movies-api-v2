import prisma from "../db";

export const getMoviesInGallery = async (req: any, res: any) => {
  const elementsPerPage = req.query.num ? req.query.num : 10;
  const page = req.query.page ? req.query.page : 0;

  let ranking_platform_field = "filmaffinityMovie";

  if(req.query.useIMDB === true) {
    ranking_platform_field = "imdbMovie";
  }
  try {
    const count = await prisma.movie.count({
      where: {
        platforms: {
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
          [ranking_platform_field]: {
            rating: { gt: 0 },
          },
        },
      },
      select: {
        name: true,
        image: true,
        platforms: {
          select: {
            [ranking_platform_field]: {
              select: {
                rating: true,
              },
            },
          },
        },
      },
      orderBy: {
        platforms: {
          [ranking_platform_field]: {
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
