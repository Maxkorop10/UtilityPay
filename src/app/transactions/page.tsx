import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Перекази',
};

export default function TransactionsPage() {
  return (
    <div className="rounded-[10px] shadow-md h-fit w-[100%] p-4 bg-white">
      <p className="font-bold text-2xl">Перекази</p>
    </div>
  );
}
