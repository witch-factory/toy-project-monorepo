import { Injectable } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class TodosService {
	constructor(private prisma: PrismaService) {}

	createTodo(createTodoDto: CreateTodoDto) {
		return this.prisma.todo.create({ data: createTodoDto });
	}

	findTodosByUser(userId: number) {
		return this.prisma.todo.findMany({
			where: {
				userId,
			},
		});
	}

	findTodo(todoId: number) {
		return this.prisma.todo.findUnique({
			where: {
				id: todoId,
			},
		});
	}

	updateTodo(todoId: number, updateData: UpdateTodoDto) {
		return this.prisma.todo.update({
			where: {
				id: todoId,
			},
			data: updateData,
		});
	}

	removeTodo(todoId: number) {
		return this.prisma.todo.delete({
			where: {
				id: todoId,
			},
		});
	}
}
