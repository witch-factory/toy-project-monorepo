import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { supabase } from "../config/database";
import {
  CreateUserRequest,
  LoginRequest,
  ApiResponse,
  User,
  UserResponse,
} from "../types";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password }: CreateUserRequest = req.body;

    if (!username || !password) {
      res.status(400).json({
        success: false,
        error: "사용자명과 비밀번호는 필수입니다.",
      } as ApiResponse);
      return;
    }

    if (password.length < 6) {
      res.status(400).json({
        success: false,
        error: "비밀번호는 최소 6자 이상이어야 합니다.",
      } as ApiResponse);
      return;
    }

    // 사용자명 중복 확인
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("username", username)
      .single();

    if (existingUser) {
      res.status(409).json({
        success: false,
        error: "이미 존재하는 사용자명입니다.",
      } as ApiResponse);
      return;
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          username: username,
          password: hashedPassword,
        },
      ])
      .select("id, username, created_at");

    if (error) throw error;

    if (!data || data.length === 0) {
      throw new Error("사용자 생성에 실패했습니다.");
    }

    const user = data[0] as UserResponse;

    // JWT 토큰 생성
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      jwtSecret,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      success: true,
      message: "회원가입이 완료되었습니다.",
      data: {
        user: user,
        token: token,
      },
    } as ApiResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      error:
        error instanceof Error ? error.message : "서버 오류가 발생했습니다.",
    } as ApiResponse);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password }: LoginRequest = req.body;

    if (!username || !password) {
      res.status(400).json({
        success: false,
        error: "사용자명과 비밀번호는 필수입니다.",
      } as ApiResponse);
      return;
    }

    // 사용자 조회
    const { data, error } = await supabase
      .from("users")
      .select("id, username, password, created_at")
      .eq("username", username)
      .single();

    if (error || !data) {
      res.status(401).json({
        success: false,
        error: "잘못된 사용자명 또는 비밀번호입니다.",
      } as ApiResponse);
      return;
    }

    const user = data as User;

    // 비밀번호 확인
    if (!user.password) {
      throw new Error("사용자 비밀번호 정보가 없습니다.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        error: "잘못된 사용자명 또는 비밀번호입니다.",
      } as ApiResponse);
      return;
    }

    // JWT 토큰 생성
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      jwtSecret,
      { expiresIn: "24h" }
    );

    // 비밀번호 제외한 사용자 정보
    const userResponse: UserResponse = {
      id: user.id,
      username: user.username,
      created_at: user.created_at,
    };

    res.json({
      success: true,
      message: "로그인이 완료되었습니다.",
      data: {
        user: userResponse,
        token: token,
      },
    } as ApiResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      error:
        error instanceof Error ? error.message : "서버 오류가 발생했습니다.",
    } as ApiResponse);
  }
};

export const getMe = (
  req: Request<{}, {}, { user: UserResponse }>,
  res: Response
): void => {
  res.json({
    success: true,
    data: req.user,
  } as ApiResponse<UserResponse>);
};
