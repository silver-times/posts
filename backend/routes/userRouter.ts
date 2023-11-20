import express from "express";
import { signup, login, refreshToken } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/signup", signup);

userRouter.post("/login", login);

userRouter.post("/refresh-token", refreshToken);

export default userRouter;
