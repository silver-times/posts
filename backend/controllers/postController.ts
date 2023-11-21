import { prisma } from "../config/database";
import { Request, Response } from "express";

type RequestExt = Request & { payload?: { id: string; email: string } };

export const createPost = async (req: RequestExt, res: Response) => {
  try {
    const { title, content, authorId } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Please fill all fields" });
    }

    if (!authorId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const createdPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    res.status(201).json(createdPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSinglePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId;

    if (!postId) {
      return res.status(400).json({ error: "Post ID is required" });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPostOfSpecificUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const userPosts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
    });

    res.status(200).json(userPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
