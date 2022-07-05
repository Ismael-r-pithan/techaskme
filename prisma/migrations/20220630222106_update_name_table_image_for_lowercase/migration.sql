/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_ask_id_fkey";

-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "ask_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_ask_id_fkey" FOREIGN KEY ("ask_id") REFERENCES "asks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
