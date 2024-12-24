/*
  Warnings:

  - Added the required column `brand` to the `units` table without a default value. This is not possible if the table is not empty.
  - Added the required column `document` to the `units` table without a default value. This is not possible if the table is not empty.
  - Added the required column `look` to the `units` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `units` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `units` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "units" ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "document" TEXT NOT NULL,
ADD COLUMN     "look" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "year" TEXT NOT NULL;
