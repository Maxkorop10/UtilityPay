import NewOrderForm from '@/src/modules/new-order-form/form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Замовити послугу',
};

export default function NewOrderPage() {
  return (
    <div className="rounded-[10px] shadow-md w-[1000px] h-fit  p-6 bg-white">
      <NewOrderForm />
    </div>
  );
}
