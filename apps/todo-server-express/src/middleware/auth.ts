// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { supabase } from "../config/database";
import { JwtPayload, ApiResponse, UserResponse } from "../types";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      success: false,
      error: "액세스 토큰이 필요합니다.",
    } as ApiResponse);
    return;
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    // 사용자 정보 조회
    const { data, error } = await supabase
      .from("users")
      .select("id, username, created_at")
      .eq("id", decoded.userId)
      .single();

    if (error || !data) {
      res.status(403).json({
        success: false,
        error: "유효하지 않은 토큰입니다.",
      } as ApiResponse);
      return;
    }

    (req as any).user = data as UserResponse;
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      error: "유효하지 않은 토큰입니다.",
    } as ApiResponse);
  }
};
