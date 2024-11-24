import { Label } from '@radix-ui/react-label';
import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/src/components/ui/dialog';
import { UtilPaymentForm } from '@/src/modules/utility-payment-form/form';
import { FC } from 'react';
import { DebtInfoProps } from '@/src/modules/debt-info/types';

const DebtInfo: FC<DebtInfoProps> = ({ debts }) => {
  const totalDebt = debts.reduce((sum, utility) => sum + utility.price, 0);

  return (
    <div className="mt-4">
      {debts.map((utility, index) => (
        <div key={index} className={`flex flex-row mt-2 gap-2`}>
          <Label>{utility.availableService.name}</Label>
          <Label className="text-gray-500">{utility.price} грн.</Label>
        </div>
      ))}

      <div className="flex flex-row mt-4 gap-2 py-1 border-y">
        <Label className="font-bold">Заборгованість:</Label>
        <Label className="font-bold text-red-500">{totalDebt} грн.</Label>
      </div>

      <Dialog>
        <DialogTrigger className="mt-7" asChild>
          <Button className="bg-blue-500">Оплатити</Button>
        </DialogTrigger>
        <DialogContent className="max-w-fit max-h-fit justify-center items-start">
          <UtilPaymentForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DebtInfo;
