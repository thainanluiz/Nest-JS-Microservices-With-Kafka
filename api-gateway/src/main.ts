import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
	BadRequestException,
	ValidationPipe,
	VersioningType,
} from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Set a global prefix for all routes
	app.setGlobalPrefix("api");

	// Enable versioning with URI
	app.enableVersioning({
		type: VersioningType.URI,
	});

	// Apply global validation pipe with custom exception handling
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			exceptionFactory(errors) {
				return new BadRequestException({
					error_code: "BAD_REQUEST",
					error_description: "Invalid request body",
					errors: errors.map((error) => ({
						field: error.property,
						constraints: error.constraints,
					})),
				});
			},
		}),
	);

	// Swagger documentation
	const config = new DocumentBuilder()
		.setTitle("AgendarME API Gateway")
		.setDescription("The AgendarME API Gateway")
		.setVersion("1.0")
		.build();

	// Create the Swagger document
	const document = SwaggerModule.createDocument(app, config);

	// Serve the Swagger document
	SwaggerModule.setup("docs", app, document, {
		jsonDocumentUrl: "/docs-json",
	});

	// Start the application on port 3000
	await app.listen(3000);
}
bootstrap();
