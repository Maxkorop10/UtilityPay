import Link from 'next/link';

export function UpperNavBar() {
  return (
    <nav className="flex justify-between items-center h-[95px] px-9 shadow-md bg-white ">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <h3 className="text-black font-bold text-[29px] mr-24">UtilityPay</h3>
        </Link>

        <span className="flex space-x-9 text-blue-500 text-[20px] font-medium">
          <Link href="/transactions">Перекази</Link>
          <Link href="/notifications">Сповіщення</Link>
        </span>
      </div>

      <div className="flex space-x-9 text-blue-500 text-[20px] font-medium">
        <Link href="/cart">Кошик</Link>
        <Link href="/profile">Профіль</Link>
      </div>
    </nav>
  );
}

export default UpperNavBar;
