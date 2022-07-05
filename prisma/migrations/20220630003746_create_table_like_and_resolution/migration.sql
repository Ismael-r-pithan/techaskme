-- CreateTable
CREATE TABLE "like" (
    "id" TEXT NOT NULL,
    "enjoy" BOOLEAN,
    "user_id" TEXT NOT NULL,
    "ask_id" TEXT,
    "resolution_id" TEXT,

    CONSTRAINT "like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resolution" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "ask_id" TEXT NOT NULL,
    "superlike" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resolution_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_ask_id_fkey" FOREIGN KEY ("ask_id") REFERENCES "asks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_resolution_id_fkey" FOREIGN KEY ("resolution_id") REFERENCES "resolution"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resolution" ADD CONSTRAINT "resolution_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resolution" ADD CONSTRAINT "resolution_ask_id_fkey" FOREIGN KEY ("ask_id") REFERENCES "asks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
