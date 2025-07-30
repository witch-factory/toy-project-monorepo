import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todo";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 기본 라우트
app.get("/", (req, res) => {
  res.json({ message: "Todo List API Server with TypeScript" });
});

// 라우트 설정
app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

// 서버 시작
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`API: http://localhost:${port}`);
});

export default app;
