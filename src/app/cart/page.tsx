import type { Metadata } from 'next';
import { Zap, Flame, Droplet } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/src/components/ui/dialog';
import { UtilPaymentForm } from '@/src/modules/utility-payment-form/form';

export const metadata: Metadata = {
  title: 'Кошик',
};

export default function CartPage() {
  const utilities = [
    {
      Icon: Zap,
      utility_name: 'Електроенергія',
      used_value: '200 кВт',
      price: 400,
    },
    {
      Icon: Droplet,
      utility_name: 'Вода',
      used_value: '15 м³',
      price: 150,
    },
    {
      Icon: Flame,
      utility_name: 'Газ',
      used_value: '20 м³',
      price: 300,
    },
  ];

  const totalPrice = utilities.reduce((sum, utility) => sum + utility.price, 0);

  return (
    <div className="rounded-[10px] shadow-md h-fit w-[100%] p-6 bg-white">
      <p className="font-bold text-2xl">Кошик</p>
      <div className="mt-4">
        {utilities.map((utility, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b py-4"
          >
            <div className="flex items-center gap-4">
              <utility.Icon className="w-6 h-6 text-black" />
              <div>
                <p className="font-bold text-lg">{utility.utility_name}</p>
                <p className="text-sm text-gray-600">
                  Спожито: {utility.used_value}
                </p>
              </div>
            </div>
            <p className="text-sm font-bold text-gray-800">
              {utility.price} грн.
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-2 pt-4">
        <p className="font-bold text-lg">Загальна сума: {totalPrice} грн.</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-600 text-white rounded-lg px-5 py-2 hover:bg-green-800 transition-colors duration-200">
              Зробити оплату
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-fit max-h-fit justify-center items-start">
            <UtilPaymentForm />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
