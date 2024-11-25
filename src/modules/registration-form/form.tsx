'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@/src/components/ui/label';
import { Input } from '@/src/components/ui/input';
import Link from 'next/link';
import { Separator } from '@/src/components/ui/separator';
import { Button } from '@/src/components/ui/button';
import { registrationSchema, RegistrationData } from './schema/schema';
import PasswordInput from '@/src/components/PasswordInput/PasswordInput';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegistrationForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationData) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullname: data.fullName,
        phone: data.phoneNumber,
        address: data.address,
        password: data.password,
      }),
    });

    if (!response.ok) {
      setRegistrationError((await response.json()).error);
    } else {
      router.push('/');
      router.refresh();
    }
  };

  const [registrationError, setRegistrationError] = useState('');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[500px] p-6 bg-white rounded-lg shadow-md border border-gray-600"
    >
      <h2 className="text-2xl font-bold text-center">Зареєструватися</h2>
      <p className="text-center text-gray-600 mb-6">
        Внесіть відповідні дані для реєстрації
      </p>

      <div className="mb-4">
        <Label
          htmlFor="fullName"
          className="block text-gray-700 font-medium mb-2"
        >
          ПІБ
        </Label>
        <Input
          type="text"
          id="fullName"
          {...register('fullName')}
          className={`w-full p-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          placeholder="Прізвище Ім'я Побатькові"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">
            {`${errors.fullName.message}`}
          </p>
        )}
      </div>

      <div className="mb-4">
        <Label
          htmlFor="phoneNumber"
          className="block text-gray-700 font-medium mb-2"
        >
          Номер телефону
        </Label>
        <Input
          type="text"
          id="phoneNumber"
          {...register('phoneNumber')}
          className={`w-full p-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          placeholder="+380XXXXXXXXX"
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm mt-1">
            {`${errors.phoneNumber.message}`}
          </p>
        )}
      </div>

      <div className="mb-4">
        <Label
          htmlFor="address"
          className="block text-gray-700 font-medium mb-2"
        >
          Адреса
        </Label>
        <Input
          type="text"
          id="address"
          {...register('address')}
          className={`w-full p-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          placeholder="м. Черкаси, вул. Благовісна, буд. 23, кв. 35"
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">
            {`${errors.address.message}`}
          </p>
        )}
      </div>

      <Separator className="w-full my-6 bg-gray-600" />

      <div className="mb-4">
        <Label
          htmlFor="password"
          className="block text-gray-700 font-medium mb-2"
        >
          Пароль
        </Label>
        <PasswordInput
          id="password"
          {...register('password')}
          className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          placeholder="Введіть ваш пароль"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {`${errors.password.message}`}
          </p>
        )}
      </div>

      <div className="mb-6">
        <Label
          htmlFor="confirmPassword"
          className="block text-gray-700 font-medium mb-2"
        >
          Повторіть пароль
        </Label>
        <PasswordInput
          id="confirmPassword"
          {...register('confirmPassword')}
          className={`w-full p-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          placeholder="Повторіть ваш пароль"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {`${errors.confirmPassword.message}`}
          </p>
        )}
      </div>

      <div className="flex justify-between items-center mb-6">
        <Link href="/login" className="text-blue-500 hover:underline text-sm">
          Вже є акаунт?
        </Link>
      </div>

      <Button
        type="submit"
        className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800"
        disabled={isSubmitting}
      >
        Зареєструватися
      </Button>

      {registrationError && (
        <p className="text-red-500 text-sm mt-1">{`${registrationError}`}</p>
      )}
    </form>
  );
}
