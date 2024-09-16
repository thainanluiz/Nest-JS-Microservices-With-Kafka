import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { LogModule } from "./log/log.module";
import { RequestLoggingMiddleware } from "./middlewares/request-logging.middleware";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [ConfigModule.forRoot(), LogModule],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(RequestLoggingMiddleware)
			.forRoutes({ path: "*", method: RequestMethod.ALL });
	}
}
