import type { Metadata } from 'next';
import SupportForm from '../../modules/support-form/form';

export const metadata: Metadata = {
  title: 'Служба підтримки',
};

export default function SupportPage() {
  return (
    <div className="w-full flex justify-center">
      <SupportForm />
    </div>
  );
}
