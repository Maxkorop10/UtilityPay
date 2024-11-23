import RegistrationForm from '@/src/modules/registration-form/form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Реєстрація',
};

export default function RegistrationPage() {
  return (
    <div className="w-full flex justify-center items-start ">
      <RegistrationForm />
    </div>
  );
}
