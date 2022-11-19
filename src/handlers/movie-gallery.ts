import prisma from "../db";

export const getMoviesInGallery = async (req: any, res: any) => {
  let ranking_platform_field = "";
  if (req.query.ranking_platform == "FILMAFFINITY") {
    ranking_platform_field = "filmaffinityMovie";
  }
  if (req.query.ranking_platform == "IMDB") {
    ranking_platform_field = "imdbMovie";
  }

  if (req.query.ranking_platform == "ROTTEN_TOMATOES") {
    ranking_platform_field = "rottenTomatoesMovie";
  }

  const elementsPerPage = req.query.num ? req.query.num : 10;
  const page = req.query.page ? req.query.page : 0;

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
          [ranking_platform_field]:
            ranking_platform_field === "rottenTomatoesMovie"
              ? {
                  allAudiencePercentatge: { gt: 0 },
                  tomatometerTopCriticsPrositiveReviewPercentatge: { gt: 0 },
                }
              : {
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
              select:
                ranking_platform_field === "rottenTomatoesMovie"
                  ? {
                      allAudiencePercentatge: true,
                      tomatometerTopCriticsPrositiveReviewPercentatge: true,
                    }
                  : {
                      rating: true,
                    },
            },
          },
        },
      },
      orderBy: {
        platforms: {
          [ranking_platform_field]:
            ranking_platform_field === "rottenTomatoesMovie"
              ? {
                  allAudiencePercentatge: "desc",
                }
              : {
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
