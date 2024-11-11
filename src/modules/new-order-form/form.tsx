import { Label } from '@radix-ui/react-label';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import { Button } from '@/src/components/ui/button';

export default function NewOrderForm() {
  return (
    <form>
      <div className="w-full flex justify-center items-start ">
        <div className="rounded-[10px] shadow-md w-[1000px] h-fit  p-6 bg-white">
          <Label className="font-bold text-2xl">Замовити послугу</Label>

          <div className="justify-between flex mb-6 mt-6">
            <Input
              className="w-[300px]"
              id="fullname_input"
              placeholder="ПІБ"
            />
            <Input
              className="w-[600px]"
              id="address_input"
              placeholder="м. Черкаси, вул. Благовісна, буд. 31, кв. 121"
            />
          </div>

          <Textarea
            className="w-full h-[200px]"
            id="order_area"
            placeholder="Опишіть замовлення"
          />

          <Button className="bg-blue-500 mt-4">Замовити</Button>
        </div>
      </div>
    </form>
  );
}
