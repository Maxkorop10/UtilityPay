'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordFormData, resetPasswordSchema } from './schema/schema';
import { Button } from '@/src/components/ui/button';
import { Label } from '@/src/components/ui/label';
import { Input } from '@/src/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/src/components/ui/input-otp'; // shadcn OTP компонент
import PasswordInput from '@/src/components/PasswordInput/PasswordInput';
import { useRouter } from 'next/navigation';

export default function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'otp' | 'newPassword'>('phone'); // Стан кроків
  const [otp, setOtp] = useState('');
  const [userError, setUserError] = useState('');
  const [otpError, setOtpError] = useState('');
  const correctOtp = '1111';

  const onSubmitPhone = async () => {
    const isValid = await trigger('phoneNumber');
    if (isValid) {
      const response = await fetch('/api/reset-password/user-exist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: getValues('phoneNumber'),
        }),
      });
      if (!response.ok) {
        setUserError((await response.json()).error);
      } else {
        setStep('otp');
      }
    }
  };

  const verifyOtp = () => {
    if (otp === correctOtp) {
      setStep('newPassword');
    } else {
      setOtpError('Неправильний код OTP!');
    }
  };

  const onSubmitNewPassword = async (data: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    const response = await fetch('/api/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: getValues('phoneNumber'),
        newPassword: data.newPassword,
        otp,
      }),
    });
    if (!response.ok) {
      setUserError((await response.json()).error);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 text-center">
        Відновлення паролю
      </h1>

      {step === 'phone' && (
        <form className="mt-4">
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
              className={`mt-1 block w-full p-2 py-2 border rounded-md shadow-sm ${
                errors.phoneNumber ? 'border-red-500 focus:ring-red-500' : ''
              }`}
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phoneNumber.message}
              </p>
            )}
            {userError && (
              <p className="mt-1 text-sm text-red-600">{userError}</p>
            )}
          </div>
          <Button
            type="button"
            className="w-full py-2 px-4"
            onClick={onSubmitPhone}
          >
            Відновити пароль
          </Button>
        </form>
      )}

      {step === 'otp' && (
        <div className="mt-4">
          <Label
            htmlFor="otp"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Введіть код OTP з отриманого СМС
          </Label>
          <InputOTP value={otp} onChange={setOtp} maxLength={4}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          {otpError && <p className="mt-1 text-sm text-red-600">{otpError}</p>}
          <Button onClick={verifyOtp} className="w-full py-2 px-4 mt-4">
            Перевірити OTP
          </Button>
        </div>
      )}

      {step === 'newPassword' && (
        <form onSubmit={handleSubmit(onSubmitNewPassword)} className="mt-4">
          <div className="mb-4">
            <Label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Новий пароль
            </Label>
            <PasswordInput
              id="newPassword"
              {...register('newPassword')}
              placeholder="Введіть новий пароль"
              className="mt-1 block w-full p-2 py-2 border rounded-md shadow-sm"
            />
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.newPassword.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <Label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Підтвердіть пароль
            </Label>
            <PasswordInput
              id="confirmPassword"
              {...register('confirmPassword')}
              placeholder="Підтвердіть новий пароль"
              className="mt-1 block w-full p-2 py-2 border rounded-md shadow-sm"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full py-2 px-4">
            Зберегти пароль
          </Button>
        </form>
      )}
    </div>
  );
}
