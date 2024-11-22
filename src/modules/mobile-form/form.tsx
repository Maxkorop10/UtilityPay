'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { MobileFormValues, mobileSchema } from './schema/schema';

export default function MobileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MobileFormValues>({
    resolver: zodResolver(mobileSchema),
  });

  const onSubmit = (data: MobileFormValues) => {
    console.log('Дані для оплати:', { ...data });
  };

  return (
    <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
      <h1 className="font-bold text-2xl text-gray-800 text-left">
        Оплатити телефон
      </h1>
      <p className="text-sm text-gray-500 text-left">
        Оберіть свій спосіб оплати
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <div>
          <Label htmlFor="phoneNumber" className="text-gray-700">
            Номер телефону
          </Label>
          <Input
            id="phoneNumber"
            type="text"
            placeholder="+380XXXXXXXXX"
            {...register('phoneNumber')}
            className={errors.phoneNumber ? 'border-red-500' : ''}
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="amount" className="text-gray-700">
            Сума
          </Label>
          <Input
            id="amount"
            type="text"
            placeholder="100.00"
            {...register('amount')}
            className={errors.amount ? 'border-red-500' : ''}
          />
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full bg-black hover:bg-gray-800">
          Оплатити
        </Button>
      </form>
    </div>
  );
}
