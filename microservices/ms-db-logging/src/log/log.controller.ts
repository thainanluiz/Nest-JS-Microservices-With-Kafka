import { Controller, HttpException, HttpStatus } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { LogService } from "./log.service";
import { CreateLogRecordDto } from "./dto/create-log-record.dto";

@Controller()
export class LogController {
	constructor(private readonly logService: LogService) {}

	// Endpoint to create a new log record
	@MessagePattern("createLogRecord")
	create(@Payload() createLogRecordDto: CreateLogRecordDto): void {
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
