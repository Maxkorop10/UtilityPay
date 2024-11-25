import Link from 'next/link';
import { CircleUserRound } from 'lucide-react';
import { cookies } from 'next/headers';

export function UpperNavBar() {
  const token = cookies().get('auth_token')?.value;

  return (
    <nav className="flex justify-between items-center h-[95px] px-9 shadow-md bg-white ">
      <div className="flex items-center">
        <Link href="/">
          <h3 className="text-black font-bold text-[29px]">UtilityPay</h3>
        </Link>
      </div>

      <div className="flex space-x-9 text-blue-500 text-[20px] font-medium items-center">
        {token ? (
          <>
            <Link href="/transaction-history">Історія переказів</Link>
            <Link href="/cart">Кошик</Link>

            <Link href="/profile">
              <CircleUserRound size={35} />
            </Link>
          </>
        ) : (
          <>
            <Link href="/login">Вхід</Link>
            <Link href="/registration">Реєстрація</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default UpperNavBar;
