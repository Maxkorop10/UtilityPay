import { Label } from '@radix-ui/react-label';
import { Button } from '@/src/components/ui/button';
import { UtilityProps } from '@/src/modules/utility-service/types';
import { FC } from 'react';

const Utility: FC<UtilityProps> = ({
  Icon,
  utility_name,
  used_value,
  price,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between border-b py-4">
        <div className="flex flex-col text-3xl gap-2">
          <div className="flex flex-row gap-3">
            <Icon color={'black'} />
            <Label className="font-bold text-lg">{utility_name}</Label>
          </div>
          <Label className="text-sm text-gray-600">
            Спожита кількість: {used_value}
          </Label>
          <Label className="text-sm text-gray-600">Сума: {price} грн.</Label>
        </div>
        <Button className="bg-blue-500 text-white rounded px-4 py-2">
          Сплатити
        </Button>
      </div>
    </div>
  );
};

export default Utility;
