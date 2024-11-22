'use client';

import { Label } from '@radix-ui/react-label';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import { Button } from '@/src/components/ui/button';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  orderSchema,
  OrderSchema,
} from '@/src/modules/new-order-form/order-schema/schema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function NewOrderForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<OrderSchema>({
    mode: 'all',
    resolver: zodResolver(orderSchema),
  });

  const [fullname, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [order, setOrder] = useState('');

  const onSubmit = (data: OrderSchema) => {
    console.log('ПІБ:', data.fullname);
    console.log('Адреса:', data.address);
    console.log('Замовлення:', data.order);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label className="font-bold text-2xl">Замовити послугу</Label>

      <div className="justify-between flex mb-6 mt-6">
        <div className="flex flex-col w-[300px]">
          <Input
            {...register('fullname')}
            value={fullname}
            className="w-full"
            id="fullname_input"
            placeholder="ПІБ"
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullname && (
            <p className="text-red-500 text-sm mt-2">
              {errors.fullname.message}
            </p>
          )}
        </div>

        <div className="flex flex-col w-[600px]">
          <Input
            {...register('address')}
            value={address}
            className="w-full"
            id="address_input"
            placeholder="м. Черкаси, вул. Благовісна, буд. 31, кв. 121"
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-2">
              {errors.address.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col w-full">
        <Textarea
          {...register('order')}
          value={order}
          className="w-full h-[200px]"
          id="order_area"
          placeholder="Опишіть замовлення"
          onChange={(e) => setOrder(e.target.value)}
        />
        {errors.order && (
          <p className="text-red-500 text-sm mt-1">{errors.order.message}</p>
        )}
      </div>

      <Button className="bg-blue-500 mt-4" type="submit">
        Замовити
      </Button>
    </form>
  );
}
