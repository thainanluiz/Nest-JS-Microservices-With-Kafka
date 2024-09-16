import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLogRecordDto {
	@ApiProperty({
		name: "event",
		description: "Event ID",
		required: true,
		type: "string",
		example: "create_log_record",
		format: "string",
	})
	@IsString({ message: "Event must be a string" })
	@IsNotEmpty({ message: "Event must not be empty" })
	readonly event: string;

	@ApiProperty({
		name: "emitter",
		description: "Emitter ID",
		required: true,
		type: "string",
		example: "microservice_database_log",
		format: "string",
	})
	@IsString({ message: "Emitter must be a string" })
	@IsNotEmpty({ message: "Emitter must not be empty" })
	readonly emitter: string;

	@ApiProperty({
		name: "message",
		description: "Log message",
		required: true,
		type: "string",
		example: "Created a new log record",
		format: "string",
	})
	@IsString({ message: "Log message must be a string" })
	@IsNotEmpty({ message: "Log message must not be empty" })
	readonly message: string;
}
