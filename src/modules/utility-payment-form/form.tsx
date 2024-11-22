import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';

export function UtilPaymentForm() {
  return (
    <form className="">
      <Card className="w-[400px] max-h-fit">
        <CardHeader>
          <CardTitle>Спосіб оплати</CardTitle>
          <CardDescription>Або додайте свій спосіб оплати</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>
            <p>Адреса</p>
            <Input
              className="border-gray-400"
              placeholder="м. Черкаси, вул. Благовісна, буд. 31, кв. 121"
            />
          </div>

          <div>
            <p>Сума</p>
            <Input className="border-gray-400" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Оплатити</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
