-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "about" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "lastName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "location" TEXT NOT NULL DEFAULT '';
