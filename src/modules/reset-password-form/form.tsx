'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordFormData, resetPasswordSchema } from './schema/schema';
import { Button } from '@/src/components/ui/button';
import { Label } from '@/src/components/ui/label';
import { Input } from '@/src/components/ui/input';

export default function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    console.log('СМС з паролем відправлено', data);
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 text-center">
        Відновлення паролю
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="mb-4">
          <Label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Номер телефону
          </Label>
          <Input
            type="text"
            id="phoneNumber"
            {...register('phoneNumber')}
            placeholder="+380XXXXXXXXX"
            className={`mt-1 block w-full p-2 py-2 border rounded-md shadow-sm  ${
              errors.phoneNumber ? 'border-red-500 focus:ring-red-500' : ''
            }`}
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full py-2 px-4">
          Відновити пароль
        </Button>
      </form>
    </div>
  );
}
