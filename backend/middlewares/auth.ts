import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { prisma } from "../config/database";

type RequestExt = Request & { payload?: number };

dotenv.config();

export const auth = async (
  req: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    res.status(401).json({ error: "You are not authenticated." });
  }
};
