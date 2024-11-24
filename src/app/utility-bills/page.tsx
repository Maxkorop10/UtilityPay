import { Label } from '@radix-ui/react-label';
import Utility from '@/src/modules/utility-service/utility';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getIconByService } from '@/src/lib/helpers';

export const metadata: Metadata = {
  title: 'Комунальні послуги',
};

type Response = {
  services: {
    id: number;
    addressId: number;
    availableServiceId: number;
    consumedUnits: number;
    totalPrice: number;
    cartId: number | null;
    availableService: {
      name: string;
    };
  }[];
};

export default async function UtilityBillsPage() {
  const response = await fetch(process.env.URL + '/api/services', {
    headers: { Cookie: cookies().toString() },
  });
  const utilitiesData: Response = await response.json();
  return (
    <div className="rounded-[10px] shadow-md h-fit w-full p-6 bg-white">
      <Label className="font-bold text-2xl">Комунальні послуги</Label>

      {utilitiesData.services.map((utility, index) => (
        <Utility
          key={index}
          Icon={getIconByService(utility.availableService.name)}
          utility_name={utility.availableService.name}
          used_value={utility.consumedUnits}
          price={utility.totalPrice}
        />
      ))}
    </div>
  );
}
