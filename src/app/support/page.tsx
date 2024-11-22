import type { Metadata } from 'next';
import SupportPageFun from './SupportPage';

export const metadata: Metadata = {
  title: 'Служба підтримки',
};

export default function SupportPage() {
  return (
    <div className="w-full flex justify-center">
      <SupportPageFun />
    </div>
  );
}
