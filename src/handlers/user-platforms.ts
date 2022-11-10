import prisma from "../db";

// Get all platforms by user id
export const getUserPlatforms = async (req: any, res: any) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      UserPlatforms: true,
    },
  });

  res.json({ data: user?.UserPlatforms, errors: [] });
};

// Create User Platform for a user
export const createUserPlatforms = async (req: any, res: any) => {
  const userPlatform = await prisma.userPlatforms.create({
    data: {
      userId: req.body.userId,
    },
  });
  res.json({ data: userPlatform, errors: [] });
};

// Update User Platform
export const updateUserPlatforms = async (req: any, res: any) => {
  const updated = await prisma.userPlatforms.update({
    where: {
      userId: req.params.id,
    },
    data: {
      hasNetflix: req.body.hasNetflix,
      hasHBO: req.body.hasHBO,
      hasDisney: req.body.hasDisney,
    },
  });
  res.json({ data: updated, errors: [] });
};
