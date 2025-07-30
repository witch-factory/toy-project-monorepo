export interface User {
  id: number;
  username: string;
  password?: string; // 응답에서는 제외
  created_at: string;
  updated_at: string;
}

export interface UserResponse {
  id: number;
  username: string;
  created_at: string;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface CreateUserRequest {
  username: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface CreateTodoRequest {
  title: string;
}

export interface UpdateTodoRequest {
  title?: string;
  completed?: boolean;
}

export interface JwtPayload {
  userId: number;
  username: string;
  iat?: number;
  exp?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
