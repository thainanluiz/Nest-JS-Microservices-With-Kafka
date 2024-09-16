import {
	Controller,
	Post,
	Body,
	HttpException,
	HttpStatus,
} from "@nestjs/common";
import { LogService } from "./log.service";
import { CreateLogRecordDto } from "./dto/create-log-record.dto";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller({
	version: "1",
	path: "log",
})
export class LogController {
	constructor(private readonly logService: LogService) {}

	// Endpoint to create a new log record
	@ApiTags("log")
	@ApiBody({
		type: CreateLogRecordDto,
		description: "The log record to be created",
		required: true,
	})
	@ApiResponse({
		status: 201,
		description: "The log record has been successfully created",
		example: {
			event: "create_log_record",
			emitter: "microservice_database_log",
			message: "Created a new log record",
		},
	})
	@ApiResponse({
		status: 400,
		description: "Bad request",
		example: {
			error_code: "BAD_REQUEST",
			error_description: "Invalid request body",
		},
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
		example: {
			error_code: "INTERNAL_SERVER_ERROR",
			error_description: "An unexpected error occurred.",
		},
	})
	@Post()
	create(@Body() createLogRecordDto: CreateLogRecordDto): void {
		try {
			// Call the service to create a new log record
			this.logService.create(createLogRecordDto);
		} catch (error) {
			// If we have an HttpException, throw it
			if (error instanceof HttpException) {
				throw error;
			}

			// If not, return a generic server error
			throw new HttpException(
				{
					error_code: "INTERNAL_SERVER_ERROR",
					error_description: "An unexpected error occurred.",
				},
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
