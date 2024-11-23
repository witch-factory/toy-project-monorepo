import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async create(createUserDto: CreateUserDto) {
		const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
		return this.prisma.user.create({
			data: {
				...createUserDto,
				password: hashedPassword,
			},
		});
	}

	findAll() {
		return this.prisma.user.findMany({
			include: {
				todos: true,
			},
		});
	}

	findOne(id: number) {
		return this.prisma.user.findUnique({
			where: { id },
			include: {
				todos: true,
			},
		});
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		if (updateUserDto.password) {
			updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
		}
		return this.prisma.user.update({
			where: { id },
			data: updateUserDto,
		});
	}

	remove(id: number) {
		return this.prisma.user.delete({
			where: { id },
		});
	}
}
