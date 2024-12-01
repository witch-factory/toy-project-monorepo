import { Todo } from "@prisma/client";

export class TodoEntity implements Todo {
	id: number;
	title: string;
	userId: number;
	completed: boolean;
	createdAt: Date;
	updatedAt: Date;
}
