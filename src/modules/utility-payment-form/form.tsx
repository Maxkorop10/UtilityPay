'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { BankPicker } from '@/src/modules/bank-picker/picker';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  paymentSchema,
  PaymentSchema,
} from '@/src/modules/utility-payment-form/util-payment-schema/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  DialogClose,
  DialogDescription,
  DialogTitle,
} from '@radix-ui/react-dialog';
import { PaymentInfoProps } from '@/src/modules/utility-payment-form/types';
import { useRouter } from 'next/navigation';

const UtilPaymentForm: FC<PaymentInfoProps> = ({ totalPrice, address }) => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<PaymentSchema>({
    mode: 'all',
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      summa: totalPrice.toString(),
      address: address,
    },
  });

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const onSubmit = async (data: PaymentSchema) => {
    const response = await fetch('/api/debts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        totalPrice: data.summa,
      }),
    });
    console.log(data);
    if (!response.ok) {
      console.error('Error happend');
    } else {
      router.refresh();
    }
  };

  const handleInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^0-9.]/g, '');
    e.target.value = filteredValue;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-[400px] max-h-fit">
        <CardHeader>
          <DialogTitle className="font-bold text-2xl text-gray-800 text-left">
            Спосіб оплати
          </DialogTitle>
          <DialogDescription>Оберіть спосіб оплати</DialogDescription>
        </CardHeader>

        <CardContent>
          <BankPicker
            selectedIndex={selectedIndex}
            onChange={setSelectedIndex}
          />
        </CardContent>

        <CardContent className="flex flex-col gap-4">
          <div>
            <p>Адреса</p>
            <Input
              className="border-gray-400"
              placeholder="м. Черкаси, вул. Благовісна, буд. 31, кв. 121"
              {...register('address')}
              id="address_input"
              disabled={true}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-2">
                {errors.address.message}
              </p>
            )}
          </div>

          <div>
            <p>Сума</p>
            <Input
              className="border-gray-400"
              placeholder="Введіть суму"
              type="text"
              inputMode="decimal"
              {...register('summa')}
              id="summa_input"
              onInput={handleInputFilter}
              disabled={true}
            />
            {errors.summa && (
              <p className="text-red-500 text-sm mt-2">
                {errors.summa.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              className="w-full"
              disabled={selectedIndex === null}
            >
              Оплатити
            </Button>
          </DialogClose>
        </CardFooter>
      </Card>
    </form>
  );
};

export default UtilPaymentForm;
