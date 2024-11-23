import InternetForm from '@/src/modules/internet-form/form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Оплата інтернету',
};

export default function InternetPage() {
  return (
    <div className="w-full flex justify-center items-start">
      <InternetForm />
    </div>
  );
}
