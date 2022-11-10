import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePasswords = (password: any, hash: any) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: any) => {
  return bcrypt.hash(password, 5);
};

export const createJWT = (user: User) => {
  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET as string
  );
  return token;
};

export const protect = (req: any, res: any, next: any) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    console.log("NOT BEARER");
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    console.log("NOT TOKEN");
    res.status(401);
    res.json({ message: "not valid token" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = user;
    next();
  } catch (e) {
    console.log("OH NO");
    console.error(e);
    res.status(401);
    res.json({ message: "not valid token" });
    return;
  }
};
