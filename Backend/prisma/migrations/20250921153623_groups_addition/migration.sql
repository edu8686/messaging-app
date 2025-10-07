/*
  Warnings:

  - You are about to drop the column `user1Id` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `user2Id` on the `Chat` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Chat" DROP CONSTRAINT "Chat_user1Id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Chat" DROP CONSTRAINT "Chat_user2Id_fkey";

-- DropIndex
DROP INDEX "public"."Chat_user1Id_user2Id_key";

-- AlterTable
ALTER TABLE "public"."Chat" DROP COLUMN "user1Id",
DROP COLUMN "user2Id",
ADD COLUMN     "isGroup" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT;

-- CreateTable
CREATE TABLE "public"."_ChatUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ChatUsers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ChatUsers_B_index" ON "public"."_ChatUsers"("B");

-- AddForeignKey
ALTER TABLE "public"."_ChatUsers" ADD CONSTRAINT "_ChatUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ChatUsers" ADD CONSTRAINT "_ChatUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
