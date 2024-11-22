import { Label } from '@radix-ui/react-label';
import { Button } from '@/src/components/ui/button';

export default function ProfileInfo() {
  return (
    <>
      <div className="flex flex-col mt-4">
        <Label>ПІБ</Label>
        <Label className="text-gray-500">Прізвище Ім&apos;я Побатькові</Label>
      </div>

      <div className="flex flex-col mt-5">
        <Label>Адреса</Label>
        <Label className="text-gray-500">
          м. Черкаси, вул. Благовісна, буд. 31, кв. 121
        </Label>
      </div>

      <div className="flex flex-col mt-5">
        <Label>Номер телефону</Label>
        <Label className="text-gray-500">+380663512563</Label>
      </div>

      <div className="flex flex-col mt-5">
        <Label>Номер особового рахунку</Label>
        <Label className="text-gray-500">4897 5132 4529 5014</Label>
      </div>

      <div className="mt-7 flex gap-7">
        <Button className="bg-blue-500">Оновити дані</Button>
        <Button>Вийти</Button>
      </div>
    </>
  );
}
