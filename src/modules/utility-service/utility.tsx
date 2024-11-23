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
    <div className="my-4 py-4 bg-white rounded-lg border-b">
      <div className="flex items-center justify-between">
        <div className="flex flex-col text-gray-800 gap-2">
          <div className="flex items-center gap-2">
            <Icon size={22} color={'#1F2937'} />
            <Label className="font-semibold text-[20px] leading-[22px]">
              {utility_name}
            </Label>
          </div>
          <Label className="text-sm text-gray-500">
            Спожита кількість: <span className="font-medium">{used_value}</span>
          </Label>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-semibold text-sm text-right">
            Сума: <span className="font-medium">{price} грн.</span>
          </Label>
          <Button className="bg-blue-600 text-white rounded-lg px-5 py-2 hover:bg-blue-700 transition-colors duration-200">
            Додати в кошик
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Utility;
