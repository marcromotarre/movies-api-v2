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

  const min_votes = req.query.min_votes ? parseFloat(req.query.min_votes) : 0;
  const min_ranking = req.query.min_ranking ? parseFloat(req.query.min_ranking) : 0;

  console.log(min_ranking)
  try {
    const count = await prisma.movie.count({
      where: {
        platforms: {
          [ranking_platform_field]:
            ranking_platform_field === "rottenTomatoesMovie"
              ? {
                  allAudiencePercentatge: { gt: 0 },
                  tomatometerTopCriticsPrositiveReviewPercentatge: { gt: 0 },
                }
              : {
                  rating: { gt: min_ranking },
                  votes: { gt: min_votes },
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
                  rating: { gte: min_ranking },
                  votes: { gte: min_votes },
                },
        },
      },
      select: {
        id: true,
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
        popularity: "desc",
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
