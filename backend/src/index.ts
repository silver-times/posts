import express from "express";
import cors from "cors";
import userRouter from "../routes/userRouter";
import postRouter from "../routes/postRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", userRouter);
app.use("/posts", postRouter);

app.listen(process.env.PORT, async () => {
  try {
    console.log(`Server running on port ${process.env.PORT}`);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
});
