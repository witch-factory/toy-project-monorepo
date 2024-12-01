import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { PrismaService } from "src/prisma.service";
import { Prisma, User } from "@prisma/client";

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async findAllUsers() {
		return this.prisma.user.findMany({
			include: {
				todos: true,
			},
		});
	}

	async findUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
		return this.prisma.user.findUnique({
			where: userWhereUniqueInput,
			include: {
				todos: true,
			},
		});
	}

	async createUser(data: Prisma.UserCreateInput): Promise<User> {
		return this.prisma.user.create({
			data,
		});
	}

	async updateUser(params: {
		where: Prisma.UserWhereUniqueInput;
		data: Prisma.UserUpdateInput;
	}): Promise<User> {
		const { where, data } = params;
		return this.prisma.user.update({
			where,
			data,
		});
	}

	async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
		return this.prisma.user.delete({
			where,
		});
	}
}
