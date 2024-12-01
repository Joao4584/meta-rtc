/*
  Warnings:

  - You are about to drop the column `image_url` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserSocial" ADD COLUMN     "character_id" INTEGER;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "image_url";

-- CreateTable
CREATE TABLE "CharacterGame" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(240) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "CharacterGame_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CharacterGame_code_key" ON "CharacterGame"("code");

-- AddForeignKey
ALTER TABLE "UserSocial" ADD CONSTRAINT "UserSocial_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "CharacterGame"("id") ON DELETE SET NULL ON UPDATE CASCADE;
