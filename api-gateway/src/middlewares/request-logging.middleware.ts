import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
	// Middleware to console log all incoming requests
	use(req: Request, res: Response, next: NextFunction) {
		console.log(
			`\x1b[35m${new Date().toLocaleString()}, ${req.method}, ${req.originalUrl} \x1b[0m`,
		);

		// Call the next middleware or controller
		next();
	}
}
