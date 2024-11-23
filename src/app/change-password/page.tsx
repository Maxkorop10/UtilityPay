import ChangePassword from '@/src/modules/change-password/form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Заборгованості',
};

export default function DebtPage() {
  return (
    <div className="w-full flex justify-center items-start">
      <ChangePassword />
    </div>
  );
}
