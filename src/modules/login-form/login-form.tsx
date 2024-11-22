'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { loginSchema, LoginData } from './schema/schema';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginData) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-1/2 p-6 bg-white rounded-lg shadow-md border border-gray-600"
    >
      <h2 className="text-2xl font-bold text-center">Увійти</h2>
      <p className="text-center text-gray-600 mb-6">
        Внесіть відповідні дані для входу
      </p>

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
          htmlFor="password"
          className="block text-gray-700 font-medium mb-2"
        >
          Пароль
        </Label>
        <Input
          type="password"
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

      <div className="flex justify-between items-center mb-6">
        <Link href="/" className="text-blue-500 hover:underline text-sm">
          Забули пароль?
        </Link>
        <Link
          href="/registration"
          className="text-blue-500 hover:underline text-sm"
        >
          Немає аккаунту?
        </Link>
      </div>

      <Button
        type="submit"
        className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800"
      >
        Увійти
      </Button>
    </form>
  );
}
