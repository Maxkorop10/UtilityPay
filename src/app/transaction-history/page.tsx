import type { Metadata } from 'next';
import { Label } from '@radix-ui/react-label';
import Transaction from '@/src/modules/transaction-history-service/history';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Історія переказів',
};

type TransactionType = {
  title: string;
  totalPrice: number;
  createdAt: string;
};

type Response = {
  transactions: TransactionType[];
};

export default async function TransactionHistoryPage() {
  const response = await fetch(`${process.env.URL}/api/transactions`, {
    headers: { Cookie: cookies().toString() },
  });

  if (!response.ok) {
    return (
      <div>
        <p>Не вдалося завантажити історію переказів</p>
      </div>
    );
  }

  const transactionsData: Response = await response.json();

  return (
    <div className="rounded-[10px] shadow-md h-fit w-[100%] p-6 bg-white">
      <Label className="font-bold text-2xl">Історія переказів</Label>
      <ul>
        {transactionsData.transactions.map((transaction, index) => (
          <Transaction
            key={index}
            transactions={{
              title: transaction.title,
              totalPrice: transaction.totalPrice,
              createdAt: transaction.createdAt,
            }}
          />
        ))}
      </ul>
    </div>
  );
}
