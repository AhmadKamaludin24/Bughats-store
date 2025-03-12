/*
  Warnings:

  - You are about to drop the column `stock` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `stock`,
    ADD COLUMN `isavailable` BOOLEAN NOT NULL DEFAULT false;
