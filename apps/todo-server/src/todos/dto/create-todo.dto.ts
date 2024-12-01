import {
	IsBoolean,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateTodoDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@Type(() => Number)
	@IsNumber()
	userId: number;

	@Type(() => Boolean)
	@IsBoolean()
	@IsOptional()
	completed: boolean;
}
