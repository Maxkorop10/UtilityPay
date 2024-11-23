import { Button } from '@/src/components/ui/button';
import { FC } from 'react';
import Link from 'next/link';

const NotFoundPage: FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-gray-800">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Сторінка не знайдена</h2>
        <p className="text-gray-600 mb-6">
          На жаль, ми не змогли знайти сторінку, яку ви шукаєте.
        </p>
        <Link href="/">
          <Button className="bg-blue-600 text-white rounded-lg px-6 py-3 hover:bg-blue-700 transition-colors duration-200">
            Повернутися на головну
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
