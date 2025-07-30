import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 기본 라우트
app.get("/", (req, res) => {
  res.send("Hello me!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
