import { Label } from '@radix-ui/react-label';

export default function NotificationPage() {
  return (
    <div className="rounded-[10px] shadow-md h-fit w-[100%] p-4 bg-white">
      <Label className="font-bold text-2xl">Сповіщення</Label>

      <div className="flex items-center justify-between border-b py-2 mt-2">
        <div className="flex flex-col text-3xl gap-1">
          <Label className="font-bold text-lg">Водопостачання</Label>
          <Label className="text-sm text-gray-600">
            Транзакція здійснена успішно!
          </Label>
        </div>
        <Label>15:31</Label>
      </div>
    </div>
  );
}
