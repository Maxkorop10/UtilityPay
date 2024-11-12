import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Телебачення',
};

export default function TVPage() {
  return (
    <div className="rounded-[10px] shadow-md h-fit w-[100%] p-4 bg-white">
      <p className="font-bold text-2xl">Телебачення</p>
    </div>
  );
}
