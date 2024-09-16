import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	// Connect to the database when the module initializes
	async onModuleInit() {
		await this.$connect();
	}

	// Close the database connection when the module is destroyed
	async enableShutdownHooks(app: INestApplication) {
		this.$on("beforeExit" as never, async () => {
			await app.close();
		});
	}
}
