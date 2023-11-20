import { prisma } from "../config/database";
import { Request, Response } from "express";

type RequestExt = Request & { payload?: number };

export const getAllPosts = async (req: RequestExt, res: Response) => {
  try {
    const userId = req.payload;
    const workouts = await prisma.post.findMany({
      where: {},
    });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSinglePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "ID must be a valid number" });
    }

    const workout = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPostOfSpecificUser = async (req: RequestExt, res: Response) => {
  try {
    const userId = req.payload;

    const workouts = await prisma.post.findMany({
      where: {},
    });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createPost = async (req: RequestExt, res: Response) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Please fill all fields" });
    }

    const userId = req.payload;

    const workout = await prisma.post.create({
      data: {
        title,
        content,
      },
    });
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
