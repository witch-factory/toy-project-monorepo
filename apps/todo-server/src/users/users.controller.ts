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
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post("register")
	@UsePipes(ValidationPipe)
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.createUser(createUserDto);
	}

	@Get()
	findAll() {
		return this.usersService.findAllUsers();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.usersService.findUser({
			id: +id,
		});
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.updateUser({
			where: { id: +id },
			data: updateUserDto,
		});
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.usersService.deleteUser({
			id: +id,
		});
	}
}
