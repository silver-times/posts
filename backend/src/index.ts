import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World !");
});

app.listen(5000, async () => {
  try {
    console.log(`Server running on port 5000`);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
});
