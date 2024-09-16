-- CreateTable
CREATE TABLE "Log" (
    "log_id" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "emitter" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("log_id")
);
