import type { Metadata } from 'next';
import { UtilPaymentForm } from '@/src/modules/utility-payment-form/form';

export const metadata: Metadata = {
  title: 'Головна сторінка',
};

export default function Home() {
  return (
    <div className="rounded-[10px] shadow-md h-fit w-[100%] p-4 bg-white">
      <p className="font-bold text-2xl">Головна сторінка</p>
      <UtilPaymentForm />
    </div>
  );
}
