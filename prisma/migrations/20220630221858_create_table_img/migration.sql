-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "ask_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_ask_id_fkey" FOREIGN KEY ("ask_id") REFERENCES "asks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
