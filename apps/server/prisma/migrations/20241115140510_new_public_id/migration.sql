/*
  Warnings:

  - A unique constraint covering the columns `[public_id]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[public_id]` on the table `Friends` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[public_id]` on the table `Logs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[public_id]` on the table `Messages` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[public_id]` on the table `UserNotifications` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[public_id]` on the table `UserSocial` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[public_id]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - The required column `public_id` was added to the `Chat` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `public_id` was added to the `Friends` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `public_id` was added to the `Logs` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `public_id` was added to the `Messages` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `public_id` was added to the `UserNotifications` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `public_id` was added to the `UserSocial` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `public_id` was added to the `Users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "public_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Friends" ADD COLUMN     "public_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Logs" ADD COLUMN     "public_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Messages" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "public_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "UserNotifications" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "public_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "UserSocial" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "public_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "public_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Chat_public_id_key" ON "Chat"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "Friends_public_id_key" ON "Friends"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "Logs_public_id_key" ON "Logs"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "Messages_public_id_key" ON "Messages"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserNotifications_public_id_key" ON "UserNotifications"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserSocial_public_id_key" ON "UserSocial"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_public_id_key" ON "Users"("public_id");
