/*
  Warnings:

  - Added the required column `description` to the `resolution` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "resolution" ADD COLUMN     "description" TEXT NOT NULL;
