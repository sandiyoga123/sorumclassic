/*
  Warnings:

  - You are about to drop the column `additional` on the `order_details` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order_details" DROP COLUMN "additional",
ADD COLUMN     "additional_info" TEXT;
