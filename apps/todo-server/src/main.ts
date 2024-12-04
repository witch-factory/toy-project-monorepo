import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { writeFileSync } from "node:fs";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: "http://localhost:5173",
	});

	// Swagger 설정
	const config = new DocumentBuilder()
		.setTitle("Todo API")
		.setDescription("Todo CRUD API documentation")
		.setVersion("1.0")
		.build();

	const documentFactory = () => SwaggerModule.createDocument(app, config);

	writeFileSync("./openapi.json", JSON.stringify(documentFactory(), null, 2));
	SwaggerModule.setup("api-docs", app, documentFactory);

	await app.listen(3000);
}
bootstrap();
