import { HistoryProps } from './types';
import { Label } from '@radix-ui/react-label';
import { FC } from 'react';

const Transaction: FC<HistoryProps> = ({ serviceName, price, date }) => {
  return (
    <div>
      <div className="flex items-center justify-between border-b py-4">
        <div className="flex flex-col text-3xl gap-2">
          <div className="flex flex-row gap-3">
            <Label className="font-bold text-lg">
              {serviceName}
            </Label>
          </div>
          {/* <Label className="font-bold text-lg">Add id here</Label> */}
          <Label className="text-bold text-lg text-gray-600">
            Сума: {price}
          </Label>
          <Label className="text-bold text-lg text-gray-600">
            Дата: {date} 
          </Label>
        </div>
      </div>
    </div>
  );
};

export default Transaction;