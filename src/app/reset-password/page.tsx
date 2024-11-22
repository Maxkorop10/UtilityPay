import ResetPasswordForm from '@/src/modules/reset-password-form/form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Відновлення паролю',
};

export default function ResetPasswordPage() {
  return (
    <div className="w-full flex justify-center items-start ">
      <ResetPasswordForm />
    </div>
  );
}
