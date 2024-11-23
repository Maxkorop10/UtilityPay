import NewOrderForm from '@/src/modules/new-order-form/form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Замовити послугу',
};

export default function NewOrderPage() {
  return (
    <div className="w-full flex justify-center">
      <NewOrderForm />
    </div>
  );
}
