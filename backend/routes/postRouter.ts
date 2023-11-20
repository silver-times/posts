import express from "express";
import { auth } from "../middlewares/auth";
import {
  getAllPosts,
  getSinglePost,
  getPostOfSpecificUser,
  createPost,
} from "../controllers/postController";

const postRouter = express.Router();

postRouter.use(auth);

postRouter.get("/", getAllPosts);

postRouter.post("/", createPost);

postRouter.post("/user/{userId}", getPostOfSpecificUser);

postRouter.post("/{postId}", getSinglePost);

export default postRouter;
