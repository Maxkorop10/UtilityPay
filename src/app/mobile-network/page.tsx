import MobileForm from '@/src/modules/mobile-form/form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Оплатити телефон',
};

export default function MobileNetworkPage() {
  return (
    <div className="w-full flex justify-center items-start ">
      <MobileForm />
    </div>
  );
}
