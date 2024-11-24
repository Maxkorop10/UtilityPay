-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_cartId_fkey";

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "cartId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;
