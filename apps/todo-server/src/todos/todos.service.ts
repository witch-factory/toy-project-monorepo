import { Injectable } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class TodosService {
	constructor(private prisma: PrismaService) {}

	create(createTodoDto: CreateTodoDto) {
		return this.prisma.todo.create({
			data: createTodoDto,
		});
	}

	findAllByUserId(userId: number) {
		return this.prisma.todo.findMany({
			where: {
				userId,
			},
			orderBy: {
				createdAt: "desc",
			},
		});
	}

	findAll() {
		return this.prisma.todo.findMany({
			include: {
				user: true,
			},
		});
	}

	findOne(todoId: number) {
		return this.prisma.todo.findUnique({
			where: { id: todoId },
			include: {
				user: true,
			},
		});
	}

	update(todoId: number, updateTodoDto: UpdateTodoDto) {
		return this.prisma.todo.update({
			where: { id: todoId },
			data: updateTodoDto,
		});
	}

	remove(todoId: number) {
		return this.prisma.todo.delete({
			where: { id: todoId },
		});
	}
}
