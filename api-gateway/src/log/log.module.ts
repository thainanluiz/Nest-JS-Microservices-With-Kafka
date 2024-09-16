import { Module } from "@nestjs/common";
import { LogService } from "./log.service";
import { LogController } from "./log.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
	imports: [
		ClientsModule.register([
			{
				name: "MICROSERVICE_DATABASE_LOG",
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: "microservice-database-log",
						brokers: ["localhost:9092"],
					},
					consumer: {
						groupId: "log-consumer",
					},
				},
			},
		]),
	],
	controllers: [LogController],
	providers: [LogService],
})
export class LogModule {}
