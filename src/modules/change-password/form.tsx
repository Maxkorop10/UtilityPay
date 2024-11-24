'use client';

import { Label } from '@radix-ui/react-label';
import { Button } from '@/src/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import PasswordInput from '@/src/components/PasswordInput/PasswordInput';
import { PasswordFormData, passwordSchema } from './schema/schema';
import { useRouter } from 'next/navigation';

export default function ChangePassword() {
  const [passwordChanged, setPasswordChanged] = useState(false);
  const router = useRouter();
  const [passwordError, setPasswordError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const handlePasswordChange = async (data: PasswordFormData) => {
    const response = await fetch('/api/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: data.currentPassword,
        newPassword: data.newPassword,
      }),
    });
    if (!response.ok) {
      setPasswordError((await response.json()).error);
    } else {
      setPasswordChanged(true);
      reset();
      router.refresh();
    }
  };

  return (
    <div className="w-[500px] p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Зміна пароля</h2>
      {passwordChanged && (
        <p className="text-green-600 mb-4">Пароль успішно змінено!</p>
      )}
      <form
        onSubmit={handleSubmit(handlePasswordChange)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col">
          <Label htmlFor="currentPassword">Поточний пароль</Label>
          <PasswordInput
            id="currentPassword"
            placeholder="Введіть поточний пароль"
            {...register('currentPassword')}
            className="border-gray-300"
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <Label htmlFor="newPassword">Новий пароль</Label>
          <PasswordInput
            id="newPassword"
            placeholder="Введіть новий пароль"
            {...register('newPassword')}
            className="border-gray-300"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <Label htmlFor="confirmPassword">Підтвердження пароля</Label>
          <PasswordInput
            id="confirmPassword"
            placeholder="Повторіть новий пароль"
            {...register('confirmPassword')}
            className="border-gray-300"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="bg-blue-500 text-white hover:bg-blue-600"
          disabled={isSubmitting}
        >
          Змінити пароль
        </Button>
        {passwordError && (
          <p className="text-red-500 text-sm mt-1">{`${passwordError}`}</p>
        )}
      </form>
    </div>
  );
}
