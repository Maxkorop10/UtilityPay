'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { BankPicker } from '@/src/modules/bank-picker/picker';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { useState } from 'react';
import {
  mobileSchema,
  MobileSchema,
} from '@/src/modules/phone-payment-form/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function PhonePaymentForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<MobileSchema>({
    mode: 'all',
    resolver: zodResolver(mobileSchema),
  });

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const onSubmit = (data: MobileSchema) => {
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
      <Card className="w-[400px] max-h-fit shadow-md border border-gray-600">
        <CardHeader>
          <CardTitle>Оплатити телефон</CardTitle>
          <CardDescription>Або оберіть спосіб оплати</CardDescription>
        </CardHeader>

        <BankPicker selectedIndex={selectedIndex} onChange={setSelectedIndex} />

        <CardContent className="flex flex-row gap-4">
          <div>
            <p>Номер телефону</p>
            <Input
              className="border-gray-400"
              placeholder="+380XXXXXXXXX"
              {...register('phoneNumber')}
              id="phoneNumber_input"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-2">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div>
            <p>Сума</p>
            <Input
              className="border-gray-400"
              placeholder="Введіть суму"
              type="text"
              inputMode="numeric"
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
