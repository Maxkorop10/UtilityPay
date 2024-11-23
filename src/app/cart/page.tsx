import { Metadata } from 'next';
import { Button } from '@/src/components/ui/button';
import prisma from '@/src/lib/prisma';

export const metadata: Metadata = {
  title: 'Кошик',
};

async function getCartItems() {
  const userId = 1;

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      services: {
        include: {
          availableService: true,
        },
      },
    },
  });

  return cart?.services || [];
}

export default async function CartPage() {
  const cartItems = await getCartItems();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="rounded-[10px] shadow-md h-fit w-[100%] p-6 bg-white">
      <p className="font-bold text-2xl">Кошик</p>
      <div className="mt-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b py-4"
          >
            <div>
              <p className="font-bold text-lg">{item.availableService.name}</p>
              <p className="text-sm text-gray-600">
                Спожито: {item.consumedUnits} 
                {item.availableService.name === 'Електроенергія' ? ' кВт' : ' м³'}
              </p>
            </div>
            <p className="text-sm font-bold text-gray-800">
              {item.totalPrice} грн.
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-2 pt-4">
        <p className="font-bold text-lg">Загальна сума: {totalPrice} грн.</p>
        <Button className="bg-green-500 text-white rounded px-6 py-2 hover:bg-green-600 transition-colors">
          Оплатити все
        </Button>
      </div>
    </div>
  );
}