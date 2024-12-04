import {
	IsString,
	IsBoolean,
	IsInt,
	IsNotEmpty,
	IsOptional,
} from "class-validator";
import { Transform, Type } from "class-transformer";

export class CreateTodoDto {
	@IsString()
	@IsNotEmpty({ message: "Title은 비워둘 수 없습니다." })
	title: string;

	@IsOptional()
	@IsBoolean({ message: "Completed는 true 또는 false여야 합니다." })
	@Transform(({ value }) => value === "true" || value === true) // 'true' 문자열도 boolean으로 변환
	completed: boolean;

	@IsInt({ message: "UserId는 정수여야 합니다." })
	@Type(() => Number) // 숫자로 변환
	userId: number;
}
