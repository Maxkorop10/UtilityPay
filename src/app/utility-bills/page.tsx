import { Label } from '@radix-ui/react-label';
import { Zap, Flame, Droplet, Fence, Trash2 } from 'lucide-react';
import Utility from '@/src/modules/utility-service/utility';

export default function UtilityBillsPage() {
  return (
    <div className="rounded-[10px] shadow-md h-fit w-[100%] p-4 bg-white">
      <Label className="font-bold text-2xl">Комунальні послуги</Label>

      <Utility
        Icon={Flame}
        utility_name={'Газопостачання'}
        used_value={'14'}
        price={'210'}
      />

      <Utility
        Icon={Droplet}
        utility_name={'Водопостачання'}
        used_value={'10'}
        price={'150'}
      />

      <Utility
        Icon={Zap}
        utility_name={'Світло'}
        used_value={'5'}
        price={'100'}
      />

      <Utility
        Icon={Fence}
        utility_name={'Опалення'}
        used_value={'7'}
        price={'120'}
      />

      <Utility
        Icon={Trash2}
        utility_name={'Вивіз сміття'}
        used_value={'2'}
        price={'60'}
      />
    </div>
  );
}
