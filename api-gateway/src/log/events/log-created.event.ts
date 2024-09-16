export class LogRecordEvent {
	constructor(
		public readonly event: string,
		public readonly emitter: string,
		public readonly message: string,
		public readonly timestamp: Date = new Date(),
	) {}

	// Default toString method when the object is emitted to the microservice
	toString(): string {
		return JSON.stringify({
			event: this.event,
			emitter: this.emitter,
			message: this.message,
			timestamp: this.timestamp,
		});
	}
}
