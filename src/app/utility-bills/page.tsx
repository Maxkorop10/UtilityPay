import { Label } from '@radix-ui/react-label';
import { Zap, Flame, Droplet, Fence, Trash2 } from 'lucide-react';
import Utility from '@/src/modules/utility-service/utility';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Комунальні послуги',
};

const utilitiesData = [
  {
    Icon: Flame,
    utility_name: 'Газопостачання',
    used_value: '14',
    price: '210',
  },
  {
    Icon: Droplet,
    utility_name: 'Водопостачання',
    used_value: '10',
    price: '150',
  },
  { Icon: Zap, utility_name: 'Світло', used_value: '5', price: '100' },
  { Icon: Fence, utility_name: 'Опалення', used_value: '7', price: '120' },
  { Icon: Trash2, utility_name: 'Вивіз сміття', used_value: '2', price: '60' },
];

export default function UtilityBillsPage() {
  return (
    <div className="rounded-[10px] shadow-md h-fit w-full p-6 bg-white">
      <Label className="font-bold text-2xl">Комунальні послуги</Label>

      {utilitiesData.map((utility, index) => (
        <Utility
          key={index}
          Icon={utility.Icon}
          utility_name={utility.utility_name}
          used_value={utility.used_value}
          price={utility.price}
        />
      ))}
    </div>
  );
}
