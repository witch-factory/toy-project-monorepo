import { Router } from "express";
import {
  getTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
} from "../controller/todoController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// 모든 라우트에 인증 미들웨어 적용
router.use(authenticateToken);

router.get("/", getTodos);
router.post("/", createTodo);
router.get("/:id", getTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id/toggle", toggleTodo);

export default router;
