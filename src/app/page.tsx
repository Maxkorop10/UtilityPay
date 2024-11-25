import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Головна сторінка',
};

export default function Home() {
  return (
    <div className="rounded-[10px] shadow-md h-fit w-[100%] p-6 bg-white">
      <p className="font-bold text-2xl mb-4">Головна сторінка</p>

      <div className="mb-6">
        <h2 className="font-bold text-xl mb-2">Останні новини</h2>
        <ul className="space-y-2">
          <li className="p-4 border rounded-md shadow-sm ">
            <p className="font-medium">Зміни у тарифах на воду</p>
            <p className="text-sm text-gray-600">
              З 1 грудня 2024 року відбудеться оновлення тарифів на холодну та
              гарячу воду.
            </p>
          </li>
          <li className="p-4 border rounded-md shadow-sm ">
            <p className="font-medium">Планові роботи в електромережі</p>
            <p className="text-sm text-gray-600">
              У деяких районах міста можливі перебої з електропостачанням 24
              листопада 2024 року.
            </p>
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="font-bold text-xl mb-2">Корисні посилання</h2>
        <ul className="space-y-2">
          <li className="p-4 border rounded-md shadow-sm ">
            <Link
              href="/utility-bills"
              className="text-blue-600 hover:underline"
            >
              Переглянути рахунки
            </Link>
          </li>
          <li className="p-4 border rounded-md shadow-sm ">
            <Link href="/support" className="text-blue-600 hover:underline">
              Служба підтримки
            </Link>
          </li>
          <li className="p-4 border rounded-md shadow-sm ">
            <Link href="/faq" className="text-blue-600 hover:underline">
              Часті запитання
            </Link>
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="font-bold text-xl mb-2">Статистика</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 border rounded-md shadow-sm">
            <p className="text-2xl font-bold">15,000+</p>
            <p className="text-sm text-gray-600">Користувачів</p>
          </div>
          <div className="p-4 bg-green-50 border rounded-md shadow-sm">
            <p className="text-2xl font-bold">25 млн грн</p>
            <p className="text-sm text-gray-600">Оплачено рахунків</p>
          </div>
          <div className="p-4 bg-green-50 border rounded-md shadow-sm">
            <p className="text-2xl font-bold">99.9%</p>
            <p className="text-sm text-gray-600">Задоволені користувачі</p>
          </div>
        </div>
      </div>
    </div>
  );
}
