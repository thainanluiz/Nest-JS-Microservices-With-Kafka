import {
	HttpException,
	HttpStatus,
	Inject,
	Injectable,
	OnModuleInit,
} from "@nestjs/common";
import { CreateLogRecordDto } from "./dto/create-log-record.dto";
import { ClientKafka } from "@nestjs/microservices";
import { LogRecordEvent } from "./events/log-created.event";

@Injectable()
export class LogService implements OnModuleInit {
	constructor(
		@Inject("MICROSERVICE_DATABASE_LOG")
		private readonly microserviceDatabaseLogClient: ClientKafka,
	) {}

	// This method is called when the module is fully initialized, so we can use it to send a log record to the database log microservice to indicate that the API Gateway has connected to it.
	onModuleInit(): void {
		this.microserviceDatabaseLogClient.emit(
			"createLogRecord",
			new LogRecordEvent(
				"api_gateway_connected",
				"api_gateway",
				"Connected to database log microservice",
			),
		);
	}

	// This method is used to create a log record in the database log microservice.
	create({ event, emitter, message }: CreateLogRecordDto): void {
		try {
			// Send the log record to the database log microservice
			this.microserviceDatabaseLogClient.emit(
				"createLogRecord",
				new LogRecordEvent(event, emitter, message),
			);
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
