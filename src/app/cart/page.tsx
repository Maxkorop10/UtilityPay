import type { Metadata } from 'next';
import CartForm from '@/src/modules/cart-form/cart';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Кошик',
};

export default async function CartPage() {
  const response = await fetch(process.env.URL + '/api/cart', {
    headers: { Cookie: cookies().toString() },
  });
  const cartData: {
    id: number;
    userId: number;
    services: {
      id: number;
      addressId: number;
      availableServiceId: number;
      consumedUnits: number;
      totalPrice: number;
      cartId: number;
      availableService: {
        name: string;
      };
      address: {
        address: string;
      };
    }[];
  } = await response.json();
  return (
    <div className="w-full flex justify-center">
      <CartForm cartData={cartData} />
    </div>
  );
}
