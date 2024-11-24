-- CreateTable
CREATE TABLE "Debts" (
    "id" SERIAL NOT NULL,
    "addressId" INTEGER NOT NULL,
    "availableServiceId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Debts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Debts" ADD CONSTRAINT "Debts_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Debts" ADD CONSTRAINT "Debts_availableServiceId_fkey" FOREIGN KEY ("availableServiceId") REFERENCES "AvailableService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
