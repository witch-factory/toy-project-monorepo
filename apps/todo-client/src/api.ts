import { components, paths } from "@toy-monorepo/shared";
import axios from "axios";

export const todoAPI = axios.create({
	baseURL: "http://localhost:3000",
});

// OpenAPI에서 타입 추출
export type TodoEntity = components["schemas"]["TodoEntity"];
export type CreateTodoDto = components["schemas"]["CreateTodoDto"];
export type UpdateTodoDto = components["schemas"]["UpdateTodoDto"];
export type FindTodoResponse =
	paths["/todos"]["get"]["responses"][200]["content"]["application/json"];
