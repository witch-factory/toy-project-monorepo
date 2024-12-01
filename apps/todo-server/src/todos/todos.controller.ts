import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UsePipes,
	ValidationPipe,
	Query,
	ParseIntPipe,
	NotFoundException,
} from "@nestjs/common";
import { TodosService } from "./todos.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";

@Controller("todos")
export class TodosController {
	constructor(private readonly todosService: TodosService) {}

	@Post()
	@UsePipes(new ValidationPipe({ transform: true }))
	create(@Body() createTodoDto: CreateTodoDto) {
		return this.todosService.create(createTodoDto);
	}

	@Get()
	async findAll(@Query("userId", ParseIntPipe) userId: number) {
		const todos = await this.todosService.findAllByUserId(userId);
		return todos;
	}

	@Patch(":todoId")
	async update(
		@Param("todoId", ParseIntPipe) todoId: number,
		@Body(new ValidationPipe({ transform: true })) updateTodoDto: UpdateTodoDto,
	) {
		const updated = await this.todosService.update(todoId, updateTodoDto);
		if (!updated) {
			throw new NotFoundException(`Todo with ID ${todoId} not found`);
		}
		return updated;
	}

	@Delete(":todoId")
	async remove(@Param("todoId", ParseIntPipe) todoId: number) {
		const deleted = await this.todosService.remove(todoId);
		if (!deleted) {
			throw new NotFoundException(`Todo with ID ${todoId} not found`);
		}
		return deleted;
	}
}
