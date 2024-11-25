'use client';

import { HistoryProps } from './types';
import { Label } from '@radix-ui/react-label';
import { FC } from 'react';

const Transaction: FC<HistoryProps> = ({ transactions }) => {
  return (
    <div>
      <div className="flex items-center justify-between border-b mt-2 py-2">
        <div className="flex flex-col text-xl gap-2">
          <div className="flex flex-row">
            <Label className="font-bold text-lg">{transactions.title}</Label>
          </div>
          <Label className="text-bold text-sm text-gray-600">
            Сума: {transactions.totalPrice} грн.
          </Label>
          <Label className="text-bold text-sm text-gray-600">
            Дата: {new Date(transactions.createdAt).toLocaleDateString('uk-UA')}
          </Label>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
