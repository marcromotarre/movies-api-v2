import prisma from "../db";
import jwt from "jsonwebtoken";

// Get all platforms by user id
export const getUserParams = async (req: any, res: any) => {
  console.log(req.user.id);
  const get = await prisma.userParams.findUnique({
    where: {
      userId: req.user.id,
    },
  });
  res.json({ data: get, errors: [] });
};

export const updateUserParams = async (req: any, res: any) => {
  const updated = await prisma.userParams.update({
    where: {
      userId: req.user.id,
    },
    data: {
      useFilmaffinity: req.body.useFilmaffinity,
      useIMDB: req.body.useIMDB,
      useRottenTomatoes: req.body.useRottenTomatoes,
      chip: req.body.chip,
      poster: req.body.poster,
      hasNetflix: req.body.hasNetflix,
      hasDisney: req.body.hasDisney,
      hasHBO: req.body.hasHBO,
      hasAmazonPrimeVideo: req.body.hasAmazonPrimeVideo,
      hasDisneyPlus: req.body.hasDisneyPlus,
      hasAppleTV: req.body.hasAppleTV,
      hasFilmin: req.body.hasFilmin,
    },
  });
  res.json({ data: updated, errors: [] });
};
