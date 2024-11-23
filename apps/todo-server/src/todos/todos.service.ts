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

	findAll() {
		return this.prisma.todo.findMany({
			include: {
				user: true,
			},
		});
	}

	findOne(id: number) {
		return this.prisma.todo.findUnique({
			where: { id },
			include: {
				user: true,
			},
		});
	}

	update(id: number, updateTodoDto: UpdateTodoDto) {
		return this.prisma.todo.update({
			where: { id },
			data: updateTodoDto,
		});
	}

	remove(id: number) {
		return this.prisma.todo.delete({
			where: { id },
		});
	}
}
