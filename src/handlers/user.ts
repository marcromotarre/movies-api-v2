import { ServerResponse } from "http";
import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req: any, res: any) => {
  console.log(req.body.email, req.body.password);
  try {
    // create user UserParams

    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        password: await hashPassword(req.body.password),
      },
    });
    await prisma.userParams.create({
      data: {
        userId: user.id,
      },
    });

    const token = createJWT(user);

    res.status(200);
    res.json({ data: token, error: [] });
  } catch (e) {
    res.status(500);
    res.json({ error: e });
  }
};

export const signin = async (req: any, res: any) => {
  console.log("sign in");
  try {
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
    console.log(user);

    const token = createJWT(user);
    res.status(200);
    console.log("get Ready");

    res.json({ data: token, error: [] });
  } catch (e) {
    res.json({ error: e });
  }
};
