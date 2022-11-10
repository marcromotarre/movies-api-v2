import { ServerResponse } from "http";
import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";
import { createUserPlatforms } from "./user-platforms";
import { createUserRankingEngines } from "./user-ranking-engines";

export const createNewUser = async (req: any, res: any) => {
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      password: await hashPassword(req.body.password),
    },
  });

  const token = createJWT(user);

  /*createUserPlatforms(
    {
      ...req,
      body: { ...req.body, userId: user.id },
    },
    res
  );*/

  /*createUserRankingEngines(
    {
      ...req,
      body: { ...req.body, userId: user.id },
    },
    res
  );*/

  res.json(token);
};

export const signin = async (req: any, res: any) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    res.status(401);
    res.json({ message: "this user does not exist" });
    return;
  }

  const isValid = await comparePasswords(req.body.password, user?.password);

  if (!isValid) {
    res.status(401);
    res.json({ message: "incorrect password" });
    return;
  }

  const token = createJWT(user);
  res.json(token);
};
