import { Module } from "@nestjs/common";
import { LogModule } from "./log/log.module";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [ConfigModule.forRoot(), LogModule],
})
export class AppModule {}
