import { prisma } from "../config/database";
import { Request, Response } from "express";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";

const generateAccessToken = (user: any) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );
};

const generateRefreshToken = (user: any) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: "7d" }
  );
};

export const signup = async (req: Request, res: Response) => {
  const { email, firstName, lastName, password } = req.body;
  let user;

  if (!email || !firstName || !lastName || !password)
    return res.status(400).json({ error: "Please fill all fields" });

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await hash(password, 12);

    user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
      },
    });

    console.log(user);
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        accessToken,
        refreshToken,
      },
    });

    res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const matchPassword = await compare(password, user.password);
    if (!matchPassword) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const accessToken = generateAccessToken(user);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Failed to authenticate user during Login" });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { token: refreshTokenFromRequest } = req.body;
  try {
    const decoded = jwt.verify(
      refreshTokenFromRequest,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as { id: number; email: string };

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id.toString(),
      },
    });
    if (!user) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid refresh token" });
  }
};
