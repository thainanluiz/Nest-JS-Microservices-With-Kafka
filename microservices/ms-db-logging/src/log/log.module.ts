import { Module } from "@nestjs/common";
import { LogService } from "./log.service";
import { LogController } from "./log.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
	controllers: [LogController],
	providers: [LogService, PrismaService],
})
export class LogModule {}
