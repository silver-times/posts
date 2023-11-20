import express from "express";
import { auth } from "../middlewares/auth";
import {
  getAllPosts,
  getSinglePost,
  createPost,
} from "../controllers/postController";

const postRouter = express.Router();

postRouter.use(auth);

postRouter.get("/posts", getAllPosts);

postRouter.post("/posts", createPost);

// postRouter.post("/posts/user/{userId}");

postRouter.post("/posts/{postId}", getSinglePost);

export default postRouter;
