/*
  Warnings:

  - You are about to drop the `Debts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Debts" DROP CONSTRAINT "Debts_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Debts" DROP CONSTRAINT "Debts_availableServiceId_fkey";

-- DropTable
DROP TABLE "Debts";

-- CreateTable
CREATE TABLE "Debt" (
    "id" SERIAL NOT NULL,
    "addressId" INTEGER NOT NULL,
    "availableServiceId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Debt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Debt" ADD CONSTRAINT "Debt_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Debt" ADD CONSTRAINT "Debt_availableServiceId_fkey" FOREIGN KEY ("availableServiceId") REFERENCES "AvailableService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
