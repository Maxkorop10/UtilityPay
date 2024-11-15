import RegistrationForm from '@/src/modules/signup-form/signup-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Реєстрація',
};

export default function SignupPage() {
  return (
    <div className="w-full flex justify-center items-start ">
      <RegistrationForm />
    </div>
  );
}
