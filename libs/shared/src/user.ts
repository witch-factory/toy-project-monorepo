export interface User {
	id: number;
	username: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateUserDto {
	username: string;
	password: string;
}

export interface UpdateUserDto {
	username?: string;
	password?: string;
}
