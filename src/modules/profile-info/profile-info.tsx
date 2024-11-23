'use client';

import { Label } from '@radix-ui/react-label';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileInfoData, profileSchema } from './schema/schema';
import Link from 'next/link';

export default function ProfileInfo() {
  const initialProfileInfo = {
    phone: '+380663512563',
    fullName: "Прізвище Ім'я Побатькові",
    address: 'м. Черкаси, вул. Благовісна, буд. 31, кв. 121',
  };

  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileInfoData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: initialProfileInfo.fullName,
      address: initialProfileInfo.address,
    },
  });

  const handleSave = (data: ProfileInfoData) => {
    console.log('Збережені дані профілю:', data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit(handleSave)} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <Label>Номер телефону</Label>
          <Label className="text-gray-500">{initialProfileInfo.phone}</Label>
        </div>

        <div className="flex flex-col">
          <Label>ПІБ</Label>
          {isEditing ? (
            <>
              <Input {...register('fullName')} className="border-gray-300" />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </>
          ) : (
            <Label className="text-gray-500">
              {initialProfileInfo.fullName}
            </Label>
          )}
        </div>

        <div className="flex flex-col">
          <Label>Адреса</Label>
          {isEditing ? (
            <>
              <Input {...register('address')} className="border-gray-300" />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </>
          ) : (
            <Label className="text-gray-500">
              {initialProfileInfo.address}
            </Label>
          )}
        </div>

        <div className="flex gap-4">
          {isEditing && (
            <>
              <Button
                type="submit"
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Зберегти
              </Button>
              <Button
                type="button"
                onClick={handleCancel}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Відхилити
              </Button>
            </>
          )}
        </div>
      </form>
      {!isEditing && (
        <div className="flex gap-4">
          <Button
            type="button"
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Оновити дані
          </Button>
          <Button
            type="submit"
            className="bg-blue-500 text-white hover:bg-blue-600 w-fit"
          >
            <Link href={'/change-password'}>Змінити пароль</Link>
          </Button>
          <Button type="button">Вийти</Button>
        </div>
      )}
    </div>
  );
}
