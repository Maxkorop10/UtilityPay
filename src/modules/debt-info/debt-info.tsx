import { Label } from '@radix-ui/react-label';
import { Button } from '@/src/components/ui/button';

export function DebtInfo() {
  const debtInfo = [
    { Label: 'Газопостачання', debt: '0 грн.' },
    { Label: 'Водопостачання', debt: '50 грн.' },
    { Label: 'Світло', debt: '15 грн.' },
    { Label: 'Опалення', debt: '5 грн.' },
    { Label: 'Вивіз сміття', debt: '0 грн.' },
  ];

  const parseDebt = (debt: string) =>
    parseFloat(debt.replace(/[^\d.-]/g, '')) || 0;
  const totalDebt = debtInfo.reduce(
    (sum, utility) => sum + parseDebt(utility.debt),
    0
  );

  return (
    <div className="mt-4">
      {debtInfo.map((utility, index) => (
        <div key={index} className={`flex flex-row mt-2 gap-2`}>
          <Label>{utility.Label}</Label>
          <Label className="text-gray-500">{utility.debt}</Label>
        </div>
      ))}

      <div className="flex flex-row mt-4 gap-2 py-1 border-y">
        <Label className="font-bold">Заборгованість:</Label>
        <Label className="font-bold text-red-500">{totalDebt} грн.</Label>
      </div>

      <div className="mt-7 flex gap-5">
        <Button className="bg-blue-500">Оплатити</Button>
      </div>
    </div>
  );
}
