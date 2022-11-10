import prisma from "../db";

// Get all platforms by user id
export const getUserRankingEngines = async (req: any, res: any) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      UserRankingEngine: true,
    },
  });

  res.json({ data: user?.UserRankingEngine, errors: [] });
};

// Create User Platform for a user
export const createUserRankingEngines = async (req: any, res: any) => {
  const userPlatform = await prisma.userRankingEngine.create({
    data: {
      userId: req.body.userId,
    },
  });
  res.json({ data: userPlatform, errors: [] });
};

// Update User Platform
export const updateUserRankingEngines = async (req: any, res: any) => {
  const updated = await prisma.userRankingEngine.update({
    where: {
      userId: req.params.id,
    },
    data: {
      useFilmaffinity: req.body.useFilmaffinity,
      useIMDB: req.body.useIMDB,
      useRottenTomatoes: req.body.useRottenTomatoes,
    },
  });
  res.json({ data: updated, errors: [] });
};
