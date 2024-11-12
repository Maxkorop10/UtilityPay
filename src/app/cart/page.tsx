import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Кошик',
};

export default function CartPage() {
  return (
    <div className="rounded-[10px] shadow-md h-fit w-[100%] p-4 bg-white">
      <p className="font-bold text-2xl">Кошик</p>
    </div>
  );
}
