/*
  Warnings:

  - A unique constraint covering the columns `[user1Id,user2Id]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Chat" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Chat_user1Id_user2Id_key" ON "public"."Chat"("user1Id", "user2Id");
