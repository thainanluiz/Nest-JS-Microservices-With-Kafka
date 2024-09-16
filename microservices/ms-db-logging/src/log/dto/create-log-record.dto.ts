import { IsString, IsNotEmpty } from "class-validator";

export class CreateLogRecordDto {
	@IsString({ message: "Event must be a string" })
	@IsNotEmpty({ message: "Event must not be empty" })
	readonly event: string;

	@IsString({ message: "Emitter must be a string" })
	@IsNotEmpty({ message: "Emitter must not be empty" })
	readonly emitter: string;

	@IsString({ message: "Log message must be a string" })
	@IsNotEmpty({ message: "Log message must not be empty" })
	readonly message: string;

	@IsString({ message: "Timestamp must be a string" })
	@IsNotEmpty({ message: "Timestamp must not be empty" })
	readonly timestamp: Date;
}
