export interface Todo {
	id: number;
	title: string;
	completed: boolean;
	userId: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateTodoDto {
	title: string;
	userId: number;
}

export interface UpdateTodoDto {
	title?: string;
	completed?: boolean;
}
