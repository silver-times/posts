import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { prisma } from "../config/database";

dotenv.config();

type RequestExt = Request & { payload?: { id: string; email: string } };

export const auth = async (
  req: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization;

    if (!token)
      return res.status(401).json({ error: "You are not authenticated!" });

    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      email: string;
    };

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id.toString(),
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    req.payload = {
      id: user.id.toString(),
      email: user.email,
    };

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Authentication failed" });
  }
};
