import { Button } from '@/src/components/ui/button';
import CartUtility from '../cart-utility/cart-utility';
import { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/src/components/ui/dialog';
import UtilPaymentForm from '../utility-payment-form/form';

type CartData = {
  cartData: {
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
  };
};

const CartForm: FC<CartData> = ({ cartData }) => {
  const utilities = cartData.services;

  const totalPrice = utilities.reduce(
    (sum, utility) => sum + utility.totalPrice,
    0
  );

  return (
    <div className="rounded-[10px] shadow-md h-fit w-[100%] p-4 bg-white">
      <p className="font-bold text-2xl">Кошик</p>
      <div className="mt-4">
        {utilities.map((utility, index) => (
          <CartUtility
            id={utility.id}
            key={index}
            utility_name={utility.availableService.name}
            used_value={utility.consumedUnits}
            price={utility.totalPrice}
          />
        ))}
      </div>
      <div className="flex justify-between items-center mt-2 pt-4">
        <p className="font-bold text-lg">Загальна сума: {totalPrice} грн.</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="bg-green-600 text-white rounded-lg px-5 py-2 hover:bg-green-800 transition-colors duration-200"
              disabled={utilities.length === 0}
            >
              Зробити оплату
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-fit max-h-fit justify-center items-start">
            <UtilPaymentForm
              type="cart/pay"
              address={
                cartData.services[0] ? cartData.services[0].address.address : ''
              }
              totalPrice={totalPrice}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
export default CartForm;
