import { Module } from "@nestjs/common";
import { TodosModule } from "./todos/todos.module";
import { UsersModule } from "./users/users.module";
import { PrismaService } from "./prisma.service";

@Module({
	imports: [TodosModule, UsersModule],
	providers: [PrismaService],
})
export class AppModule {}
