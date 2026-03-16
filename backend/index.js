import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT
const CORS_ORIGIN = process.env.CORS_ORIGIN;

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.get("/generate/level/downloads", async (req, res) => {
  try {
    const randomPage = Math.floor(Math.random() * 55);
    const randomLevel = Math.floor(Math.random() * 10);
    const response = await fetch(
      `https://gdbrowser.com/api/search/*?page=${randomPage}&count=10&starred`,
    );

    const levelData = await response.json();
    const oneLevel = levelData[randomLevel];


    oneLevel.levelpng = `https://levelthumbs.prevter.me/thumbnail/${oneLevel.id}/small`;
    res.json(oneLevel);
  } catch (error) {
    console.error(error);
  }
});

app.listen(3000, () => {
  console.log(`backend is listening to port: ${"http://localhost:3000"}`);
});
