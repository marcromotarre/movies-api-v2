import { ServerResponse } from "http";
import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";
import { createUserPlatforms } from "./user-platforms";
import { createUserRankingEngines } from "./user-ranking-engines";

export const createNewUser = async (req: any, res: any) => {
  try {
    console.log("WE ARE IN CREATE USER")
    console.log("email", req.body.email)
    console.log("password", req.body.password)
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        password: await hashPassword(req.body.password),
      },
    });
    console.log("USER HAS BEEN CREATED")

    const token = createJWT(user);
    console.log("TOKEN", token)

    res.status(200);
    res.json(token);
  } catch (e) {
    console.log("OH NO WE GOT AN ERROR")
    res.status(500);
    res.json({ error: e });
  }
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
