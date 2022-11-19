import prisma from "../db";

/*
  id        Int        @id
  createdAt DateTime   @default(now())
  name      String?
  rating    Float?
  votes     Int?
  movieId   Int?
*/

export const createRottenTomatoes = async (req: any, res: any) => {
  console.log(req.body.id, req.body.name, req.body.rating, req.body.votes);
  const upsert = await prisma.rottenTomatoes.upsert({
    where: {
      id: req.body.id,
    },
    update: {
      allAudiencePercentatge: req.body.allAudiencePercentatge,
      tomatometerTopCriticsPrositiveReviewPercentatge:
        req.body.tomatometerTopCriticsPrositiveReviewPercentatge,
    },
    create: {
      id: req.body.id,
      allAudiencePercentatge: req.body.allAudiencePercentatge,
      tomatometerTopCriticsPrositiveReviewPercentatge:
        req.body.tomatometerTopCriticsPrositiveReviewPercentatge,
    },
  });
  res.json({ data: upsert, errors: [] });
};
