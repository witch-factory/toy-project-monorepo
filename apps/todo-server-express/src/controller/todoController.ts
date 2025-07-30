import { Request, Response } from "express";
import { supabase } from "../config/database";
import {
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
  ApiResponse,
} from "../types";

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = req;

    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data: data as Todo[],
    } as ApiResponse<Todo[]>);
  } catch (error) {
    res.status(500).json({
      success: false,
      error:
        error instanceof Error ? error.message : "서버 오류가 발생했습니다.",
    } as ApiResponse);
  }
};

export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user } = req;
    const { title }: CreateTodoRequest = req.body;

    if (!title) {
      res.status(400).json({
        success: false,
        error: "제목은 필수입니다.",
      } as ApiResponse);
      return;
    }

    const { data, error } = await supabase
      .from("todos")
      .insert([
        {
          title: title,
          completed: false,
          user_id: user.id,
        },
      ])
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      throw new Error("할 일 생성에 실패했습니다.");
    }

    res.status(201).json({
      success: true,
      data: data[0] as Todo,
    } as ApiResponse<Todo>);
  } catch (error) {
    res.status(500).json({
      success: false,
      error:
        error instanceof Error ? error.message : "서버 오류가 발생했습니다.",
    } as ApiResponse);
  }
};

export const getTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = req;
    const { id } = req.params;

    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        res.status(404).json({
          success: false,
          error: "할 일을 찾을 수 없습니다.",
        } as ApiResponse);
        return;
      }
      throw error;
    }

    res.json({
      success: true,
      data: data as Todo,
    } as ApiResponse<Todo>);
  } catch (error) {
    res.status(500).json({
      success: false,
      error:
        error instanceof Error ? error.message : "서버 오류가 발생했습니다.",
    } as ApiResponse);
  }
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user } = req;
    const { id } = req.params;
    const { title, completed }: UpdateTodoRequest = req.body;

    const updateData: Partial<Pick<Todo, "title" | "completed">> = {};
    if (title !== undefined) updateData.title = title;
    if (completed !== undefined) updateData.completed = completed;

    const { data, error } = await supabase
      .from("todos")
      .update(updateData)
      .eq("id", id)
      .eq("user_id", user.id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      res.status(404).json({
        success: false,
        error: "할 일을 찾을 수 없습니다.",
      } as ApiResponse);
      return;
    }

    res.json({
      success: true,
      data: data[0] as Todo,
    } as ApiResponse<Todo>);
  } catch (error) {
    res.status(500).json({
      success: false,
      error:
        error instanceof Error ? error.message : "서버 오류가 발생했습니다.",
    } as ApiResponse);
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user } = req;
    const { id } = req.params;

    const { data, error } = await supabase
      .from("todos")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      res.status(404).json({
        success: false,
        error: "할 일을 찾을 수 없습니다.",
      } as ApiResponse);
      return;
    }

    res.json({
      success: true,
      message: "할 일이 삭제되었습니다.",
      data: data[0] as Todo,
    } as ApiResponse<Todo>);
  } catch (error) {
    res.status(500).json({
      success: false,
      error:
        error instanceof Error ? error.message : "서버 오류가 발생했습니다.",
    } as ApiResponse);
  }
};

export const toggleTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user } = req;
    const { id } = req.params;

    // 현재 상태 조회
    const { data: currentTodo, error: fetchError } = await supabase
      .from("todos")
      .select("completed")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        res.status(404).json({
          success: false,
          error: "할 일을 찾을 수 없습니다.",
        } as ApiResponse);
        return;
      }
      throw fetchError;
    }

    // 상태 토글
    const { data, error } = await supabase
      .from("todos")
      .update({ completed: !currentTodo.completed })
      .eq("id", id)
      .eq("user_id", user.id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      throw new Error("할 일 업데이트에 실패했습니다.");
    }

    res.json({
      success: true,
      data: data[0] as Todo,
    } as ApiResponse<Todo>);
  } catch (error) {
    res.status(500).json({
      success: false,
      error:
        error instanceof Error ? error.message : "서버 오류가 발생했습니다.",
    } as ApiResponse);
  }
};
