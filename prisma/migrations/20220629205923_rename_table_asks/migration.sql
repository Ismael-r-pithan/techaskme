/*
  Warnings:

  - You are about to drop the `Asks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Asks" DROP CONSTRAINT "Asks_user_id_fkey";

-- DropTable
DROP TABLE "Asks";

-- CreateTable
CREATE TABLE "asks" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "asks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "asks" ADD CONSTRAINT "asks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
