import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
	ParseIntPipe,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { TodosService } from "./todos.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiQuery,
	ApiResponse,
	ApiTags,
} from "@nestjs/swagger";
import { TodoEntity } from "./entities/todo.entity";

@ApiTags("todos")
@Controller("todos")
export class TodosController {
	constructor(private readonly todosService: TodosService) {}

	@Post()
	@UsePipes(new ValidationPipe({ transform: true }))
	@ApiOperation({ summary: "새로운 Todo 생성" }) // 메서드 설명
	@ApiBody({ type: CreateTodoDto, description: "Data for the new Todo" }) // 요청 본문 설명
	@ApiCreatedResponse({
		description: "Todo 생성 성공",
		type: TodoEntity,
	}) // 성공 응답
	@ApiBadRequestResponse({ description: "Validation error" }) // 실패 응답
	createTodo(@Body() createTodoDto: CreateTodoDto) {
		console.log(createTodoDto);
		return this.todosService.createTodo(createTodoDto);
	}

	@Get()
	@ApiOperation({ summary: "주어진 사용자의 todo 조회" })
	@ApiQuery({
		name: "userId",
		type: Number,
		description: "Todo를 조회할 사용자 ID",
	})
	@ApiOkResponse({
		description: "Todo 조회 성공",
		type: [TodoEntity],
	})
	findTodo(@Query("userId", ParseIntPipe) userId: number) {
		return this.todosService.findTodosByUser(userId);
	}

	@Patch(":todoId")
	@UsePipes(new ValidationPipe({ transform: true }))
	@ApiOperation({ summary: "todo 수정" })
	@ApiParam({ name: "todoId", type: Number, description: "수정할 Todo의 ID" })
	@ApiBody({ type: UpdateTodoDto, description: "수정할 Todo의 정보" })
	@ApiOkResponse({
		description: "Todo 수정 성공",
		type: TodoEntity,
	})
	@ApiNotFoundResponse({ description: "Todo not found" })
	updateTodo(
		@Param("todoId", ParseIntPipe) todoId: number,
		@Body() updateTodoDto: UpdateTodoDto,
	) {
		return this.todosService.updateTodo(todoId, updateTodoDto);
	}

	@Delete(":todoId")
	@ApiOperation({ summary: "todo 삭제" })
	@ApiParam({ name: "todoId", type: Number, description: "삭제할 Todo ID" })
	@ApiOkResponse({
		description: "Todo 삭제 성공",
		type: TodoEntity,
	})
	@ApiNotFoundResponse({ description: "Todo not found" })
	removeTodo(@Param("todoId", ParseIntPipe) todoId: number) {
		return this.todosService.removeTodo(todoId);
	}
}
