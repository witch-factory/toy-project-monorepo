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
import {
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiQuery,
	ApiResponse,
	ApiTags,
} from "@nestjs/swagger";
import { Todo } from "@prisma/client";
import { TodoEntity } from "./entities/todo.entity";

@ApiTags("todos")
@Controller("todos")
export class TodosController {
	constructor(private readonly todosService: TodosService) {}

	@Post()
	@ApiOperation({ summary: "새로운 todo 생성" }) // 엔드포인트 요약
	@ApiBody({ type: CreateTodoDto })
	@ApiResponse({
		status: 201,
		description: "Todo created successfully",
		type: TodoEntity,
	})
	@UsePipes(new ValidationPipe({ transform: true }))
	create(@Body() createTodoDto: CreateTodoDto) {
		return this.todosService.create(createTodoDto);
	}

	@Get()
	@ApiOperation({ summary: "주어진 사용자의 todo 조회" })
	@ApiQuery({ name: "userId", type: "number" })
	@ApiResponse({
		status: 200,
		description: "Todo list retrieved successfully",
		type: [TodoEntity],
	})
	async findAll(
		@Query("userId", ParseIntPipe) userId: number,
	): Promise<Todo[]> {
		const todos = await this.todosService.findAllByUserId(userId);
		return todos;
	}

	@Patch(":todoId")
	@ApiOperation({ summary: "todo 수정" })
	@ApiParam({ name: "todoId", type: "number" })
	@ApiBody({ type: UpdateTodoDto })
	@ApiResponse({
		status: 200,
		description: "Todo updated successfully",
		type: TodoEntity,
	})
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
	@ApiOperation({ summary: "todo 삭제" })
	@ApiParam({ name: "todoId", type: "number" })
	@ApiResponse({
		status: 200,
		description: "Todo deleted successfully",
		type: TodoEntity,
	})
	async remove(@Param("todoId", ParseIntPipe) todoId: number) {
		const deleted = await this.todosService.remove(todoId);
		if (!deleted) {
			throw new NotFoundException(`Todo with ID ${todoId} not found`);
		}
		return deleted;
	}
}
