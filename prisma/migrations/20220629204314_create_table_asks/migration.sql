-- CreateTable
CREATE TABLE "Asks" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Asks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Asks" ADD CONSTRAINT "Asks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
