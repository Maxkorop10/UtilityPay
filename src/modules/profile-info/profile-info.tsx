import { Label } from '@radix-ui/react-label';
import { Button } from '@/src/components/ui/button';

export default function ProfileInfo() {
  const profileInfo = [
    { Label: 'ПІБ', info: "Прізвище Ім'я Побатькові" },
    { Label: 'Адреса', info: 'м. Черкаси, вул. Благовісна, буд. 31, кв. 121' },
    { Label: 'Номер телефону', info: '+380663512563' },
    { Label: 'Номер особового рахунку', info: '4897 5132 4529 5014' },
  ];

  return (
    <div className="mt-4">
      {profileInfo.map((profile, index) => (
        <div key={index} className={`flex flex-col mt-3`}>
          <Label>{profile.Label}</Label>
          <Label className="text-gray-500">{profile.info}</Label>
        </div>
      ))}

      <div className="mt-7 flex gap-7">
        <Button className="bg-blue-500">Оновити дані</Button>
        <Button>Вийти</Button>
      </div>
    </div>
  );
}
