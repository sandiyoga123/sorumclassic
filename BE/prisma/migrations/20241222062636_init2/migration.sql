/*
  Warnings:

  - You are about to drop the column `quantity` on the `units` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "units" DROP COLUMN "quantity",
ALTER COLUMN "deleted" SET DEFAULT false;
