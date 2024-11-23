import type { Metadata } from 'next';
import { Label } from '@radix-ui/react-label';
import Transaction from '@/src/modules/transaction-history-service/history';

export const metadata: Metadata = {
  title: 'Історія перекази',
};

const TransactionHistoryData = [
  {
    serviceName: 'Оплата комунальних',
    price: '250 грн',
    date: '2024-11-20',
  },
  {
    serviceName: 'Мобільний зв’язок',
    price: '100 грн',
    date: '2024-11-18',
  },
  {
    serviceName: 'Інтернет',
    price: '200 грн',
    date: '2024-11-15',
  },
];

export default function TransactionHistoryPage() {
  return (
    <div className="rounded-[10px] shadow-md h-fit w-[100%] p-6 bg-white">
      <Label className="font-bold text-2xl mb-4">Історія переказів</Label>
      <ul className="space-y-4">
        {TransactionHistoryData.map((transaction, index) => (
          <Transaction
            key={index}
            serviceName={transaction.serviceName}
            price={transaction.price}
            date={transaction.date}
          />
        ))}
      </ul>
    </div>
  );
}
