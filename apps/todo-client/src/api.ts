import axios from "axios";

// Express 서버 API 타입들
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface User {
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

export interface CreateTodoRequest {
  title: string;
}

export interface UpdateTodoRequest {
  title?: string;
  completed?: boolean;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Axios 인스턴스 생성
export const api = axios.create({
  baseURL: "http://localhost:3000",
});

// 토큰 관리
export const tokenManager = {
  getToken: () => localStorage.getItem("token"),
  setToken: (token: string) => localStorage.setItem("token", token),
  removeToken: () => localStorage.removeItem("token"),
};

// Request 인터셉터 - 토큰 자동 추가
api.interceptors.request.use((config) => {
  const token = tokenManager.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response 인터셉터 - 에러 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response?.status === 401) {
    //   tokenManager.removeToken();
    // }
    return Promise.reject(error);
  }
);

// API 서비스 함수들
export const authAPI = {
  register: (data: RegisterRequest) =>
    api.post<ApiResponse<AuthResponse>>("/auth/register", data),
  login: (data: LoginRequest) =>
    api.post<ApiResponse<AuthResponse>>("/auth/login", data),
  getMe: () => api.get<ApiResponse<User>>("/auth/me"),
};

export const todoAPI = {
  getTodos: () => api.get<ApiResponse<Todo[]>>("/todos"),
  createTodo: (data: CreateTodoRequest) =>
    api.post<ApiResponse<Todo>>("/todos", data),
  updateTodo: (id: number, data: UpdateTodoRequest) =>
    api.put<ApiResponse<Todo>>(`/todos/${id}`, data),
  deleteTodo: (id: number) => api.delete<ApiResponse<Todo>>(`/todos/${id}`),
  toggleTodo: (id: number) =>
    api.patch<ApiResponse<Todo>>(`/todos/${id}/toggle`),
};
