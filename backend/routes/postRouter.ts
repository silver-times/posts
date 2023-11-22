import express, { Router } from "express";
import { auth } from "../middlewares/auth";
import {
  getAllPosts,
  getSinglePost,
  getPostOfSpecificUser,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController";

const postRouter: Router = express.Router();

postRouter.use(auth);

postRouter.get("/", getAllPosts);

postRouter.post("/", createPost);

postRouter.get("/user/:userId", getPostOfSpecificUser);

postRouter.get("/:postId", getSinglePost);

postRouter.put("/:postId", updatePost);

postRouter.delete("/:postId", deletePost);

export default postRouter;
