import type { Metadata } from 'next';
import { DebtInfo } from '@/src/modules/debt-info/debt-info';

export const metadata: Metadata = {
  title: 'Заборгованості',
};

export default function DebtPage() {
  return (
    <div className="rounded-[10px] shadow-md h-fit w-[100%] p-6 bg-white">
      <p className="font-bold text-2xl">Заборгованості</p>
      <DebtInfo />
    </div>
  );
}
