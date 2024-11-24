import NewOrderForm from '@/src/modules/new-order-form/form';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Замовити послугу',
};

export default async function NewOrderPage() {
  const response = await fetch(process.env.URL + '/api/orders', {
    headers: { Cookie: cookies().toString() },
  });

  const ordersData: {
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
  } = await response.json();
  return (
    <div className="w-full flex justify-center">
      <NewOrderForm ordersData={ordersData} />
    </div>
  );
}
