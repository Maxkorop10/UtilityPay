'use client';

import { Label } from '@radix-ui/react-label';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import { Button } from '@/src/components/ui/button';
import { useForm } from 'react-hook-form';
import {
  orderSchema,
  OrderSchema,
} from '@/src/modules/new-order-form/order-schema/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { translateStatus } from '@/src/lib/helpers';
import { useRouter } from 'next/navigation';

type NewOrderFormProps = {
  ordersData: {
    orders: {
      address: string;
      fullname: string;
      status: string;
      id: number;
      userId: number;
      orderDescription: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
    user: {
      fullname: string;
    };
    address: {
      address: string;
    };
  };
};

const NewOrderForm: FC<NewOrderFormProps> = ({ ordersData }) => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
  } = useForm<OrderSchema>({
    mode: 'all',
    resolver: zodResolver(orderSchema),
    defaultValues: {
      fullname: ordersData.user.fullname,
      address: ordersData.address.address,
    },
  });

  const onSubmit = async (data: OrderSchema) => {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error(errorData);
    } else {
      reset();
      router.refresh();
    }
  };

  return (
    <div className="rounded-[10px] shadow-md h-fit w-[1000px] p-6 bg-white">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label className="font-bold text-2xl">Замовити послугу</Label>

        <div className="justify-between flex mb-6 mt-6">
          <div className="flex flex-col w-[300px]">
            <Input
              {...register('fullname')}
              className="w-full"
              id="fullname_input"
              placeholder="ПІБ"
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
              className="w-full"
              id="address_input"
              placeholder="м. Черкаси, вул. Благовісна, буд. 31, кв. 121"
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
            className="w-full h-[200px]"
            id="order_area"
            placeholder="Опишіть замовлення"
          />
          {errors.order && (
            <p className="text-red-500 text-sm mt-1">{errors.order.message}</p>
          )}
        </div>

        <Button
          className="bg-blue-500 mt-4"
          type="submit"
          disabled={isSubmitting}
        >
          Замовити
        </Button>
      </form>

      <div className="mt-6">
        <h2 className="font-bold text-xl mb-4">Створені заявки</h2>
        {ordersData.orders.length === 0 ? (
          <p className="text-gray-500">Ви ще не створили заявок</p>
        ) : (
          <div className="flex flex-col gap-4">
            {ordersData.orders.map((order) => (
              <div
                className="border rounded-lg shadow-md p-4 bg-white flex"
                key={order.id}
              >
                <div className="w-10/12">
                  <div className="mb-2">
                    <p className="text-lg font-semibold text-gray-800">
                      {order.fullname}
                    </p>
                    <p className="text-sm text-gray-500">{order.address}</p>
                  </div>
                  <p className="text-gray-700 mb-4">{order.orderDescription}</p>
                </div>
                <div className=" w-2/12">
                  <div className="flex flex-col gap-1 items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === 'CREATED'
                          ? 'bg-blue-100 text-blue-600'
                          : order.status === 'UNDER_ADMIN_REVIEW'
                            ? 'bg-yellow-100 text-yellow-600'
                            : order.status === 'UNDER_COMPANY_REVIEW'
                              ? 'bg-orange-100 text-orange-600'
                              : order.status === 'IN_PROGRESS'
                                ? 'bg-purple-100 text-purple-600'
                                : order.status === 'COMPLETED'
                                  ? 'bg-green-100 text-green-600'
                                  : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {translateStatus(order.status)}
                    </span>
                    <p className="text-sm text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString('uk-UA', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewOrderForm;
