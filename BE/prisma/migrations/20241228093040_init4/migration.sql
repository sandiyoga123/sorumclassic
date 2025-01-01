/*
  Warnings:

  - The values [menunggu,diproses,diantar,sampai] on the enum `STATUS` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "STATUS_new" AS ENUM ('Pembayaran', 'Dikemas', 'Dikirim', 'Review', 'Riwayat');
ALTER TABLE "orders" ALTER COLUMN "status" TYPE "STATUS_new" USING ("status"::text::"STATUS_new");
ALTER TYPE "STATUS" RENAME TO "STATUS_old";
ALTER TYPE "STATUS_new" RENAME TO "STATUS";
DROP TYPE "STATUS_old";
COMMIT;

-- AlterTable
ALTER TABLE "items" ALTER COLUMN "quantity" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "payment_proof" DROP NOT NULL,
ALTER COLUMN "receipt" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'Pembayaran';
