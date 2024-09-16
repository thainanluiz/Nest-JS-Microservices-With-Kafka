import { Injectable } from "@nestjs/common";
import { CreateLogRecordDto } from "./dto/create-log-record.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class LogService {
	constructor(private prisma: PrismaService) {}

	// Create a new log record
	async create({
		event,
		emitter,
		message,
		timestamp,
	}: CreateLogRecordDto): Promise<void> {
		// Define the data object
		const data: Prisma.logCreateInput = {
			event,
			emitter,
			message,
			timestamp,
		};

		// Insert the data object into the database
		await this.prisma.log.create({ data });
	}
}
