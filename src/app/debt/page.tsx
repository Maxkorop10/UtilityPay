import type { Metadata } from 'next';
import DebtInfo from '@/src/modules/debt-info/debt-info';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Заборгованості',
};

type Response = {
  debts: {
    id: number;
    addressId: number;
    availableServiceId: number;
    price: number;
    availableService: {
      name: string;
    };
  }[];
};

export default async function DebtPage() {
  const response = await fetch(process.env.URL + '/api/debts', {
    headers: { Cookie: cookies().toString() },
  });
  const debtsData: Response = await response.json();

  return (
    <div className="rounded-[10px] shadow-md h-fit w-[100%] p-6 bg-white">
      <p className="font-bold text-2xl">Заборгованості</p>
      <DebtInfo debts={debtsData.debts} />
    </div>
  );
}
