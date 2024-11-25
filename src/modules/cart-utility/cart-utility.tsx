'use client';

import { Label } from '@radix-ui/react-label';
import { FC } from 'react';
import { X } from 'lucide-react';
import { getIconByService, getServiceInfo } from '@/src/lib/helpers';
import { CartUtilityProps } from './types';
import { useRouter } from 'next/navigation';

const CartUtility: FC<CartUtilityProps> = ({
  id,
  utility_name,
  used_value,
  price,
}) => {
  const router = useRouter();
  const deleteService = async () => {
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ serviceId: id }),
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error('Error deleting from cart:', error);
    }
  };
  const Icon = getIconByService(utility_name);
  return (
    <div className="my-4 py-4 bg-white border-b">
      <div className="flex items-center justify-between">
        <div className="flex flex-col text-gray-800 gap-2">
          <div className="flex items-center gap-2">
            <Icon size={22} color={'#1F2937'} />
            <Label className="font-semibold text-[20px] leading-[22px]">
              {utility_name}
            </Label>
          </div>
          <Label className="text-sm text-gray-500">
            Спожита кількість: <span className="font-medium">{used_value}</span>
            {getServiceInfo(utility_name)}
          </Label>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <X
            size={18}
            className="hover:cursor-pointer"
            onClick={deleteService}
          />
          <Label className="font-semibold text-sm text-right">
            Сума: <span className="font-medium">{price} грн.</span>
          </Label>
        </div>
      </div>
    </div>
  );
};

export default CartUtility;
