/*
  Warnings:

  - Added the required column `emailVerify` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "emailVerify" TEXT NOT NULL,
ALTER COLUMN "ativo" SET DEFAULT false;
