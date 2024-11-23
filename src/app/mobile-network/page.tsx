import type { Metadata } from 'next';
import { PhonePaymentForm } from '@/src/modules/phone-payment-form/form';

export const metadata: Metadata = {
  title: 'Оплатити телефон',
};

export default function MobileNetworkPage() {
  return (
    <div className="w-full flex justify-center">
      <PhonePaymentForm />
    </div>
  );
}
