import express from "express";
import { signup, login, refreshToken } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/auth/signup", signup);

userRouter.post("/auth/login", login);

userRouter.post("/auth/refresh-token", refreshToken);

export default userRouter;
