import LoginForm from '@/src/modules/login-form/login-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Вхід',
};

export default function LoginPage() {
  return (
    <div className="w-full flex justify-center items-start">
      <LoginForm />
    </div>
  );
}
