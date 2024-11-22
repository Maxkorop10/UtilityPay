import Link from 'next/link';
import { CircleUserRound } from 'lucide-react';

export function UpperNavBar() {
  return (
    <nav className="flex justify-between items-center h-[95px] px-9 shadow-md bg-white ">
      <div className="flex items-center">
        <Link href="/">
          <h3 className="text-black font-bold text-[29px]">UtilityPay</h3>
        </Link>
      </div>

      <div className="flex space-x-9 text-blue-500 text-[20px] font-medium items-center">
        <Link href="/login">Вхід</Link>
        <Link href="/signup">Реєстрація</Link>
        <Link href="/transactions">Перекази</Link>
        <Link href="/notifications">Сповіщення</Link>
        <Link href="/cart">Кошик</Link>

        <Link href="/profile">
          <CircleUserRound size={35} />
        </Link>
      </div>
    </nav>
  );
}

export default UpperNavBar;
