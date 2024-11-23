'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { BankPicker } from '@/src/modules/bank-picker/picker';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  paymentSchema,
  PaymentSchema,
} from '@/src/modules/utility-payment-form/util-payment-schema/schema';
import { zodResolver } from '@hookform/resolvers/zod';

export function UtilPaymentForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<PaymentSchema>({
    mode: 'all',
    resolver: zodResolver(paymentSchema),
  });

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const onSubmit = (data: PaymentSchema) => {
    console.log(data);
    reset();
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
          <CardTitle className="font-bold text-2xl text-gray-800 text-left">
            Спосіб оплати
          </CardTitle>
          <CardDescription>Оберіть спосіб оплати</CardDescription>
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
            />
            {errors.summa && (
              <p className="text-red-500 text-sm mt-2">
                {errors.summa.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={selectedIndex === null}
          >
            Оплатити
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
