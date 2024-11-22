'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import { Button } from '@/src/components/ui/button';

const supportFormSchema = z.object({
  name: z
    .string()
    .regex(
      new RegExp(/^[А-ЯІЇЄҐа-яіїєґ]{2,}(?:\s[А-ЯІЇЄҐа-яіїєґ]{2,}){1}$/),
      'Ім`я повинно складатися з українських літер'
    )
    .min(2, "Ім'я має містити щонайменше 2 символи"),
  email: z.string().email('Введіть дійсну електронну адресу'),
  message: z
    .string()
    .min(10, 'Повідомлення має містити щонайменше 10 символів'),
});

type SupportFormData = z.infer<typeof supportFormSchema>;
export default function SupportPageClient() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SupportFormData>({
    resolver: zodResolver(supportFormSchema),
  });

  const onSubmit = (data: SupportFormData) => {
    console.log(data);
    alert('Ваш запит успішно відправлено!');
    reset();
  };

  return (
    <div className="rounded-[10px] shadow-md h-fit w-[1000px] p-6 bg-white">
      <p className="font-bold text-2xl mb-4">Служба підтримки</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label
            className="block text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Персональні дані
          </Label>
          <Input
            type="text"
            id="name"
            placeholder="Введіть свої ім`я"
            {...register('name')}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label
            className="block text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Електронна пошта
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="пошта@mail.ru"
            {...register('email')}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Label
            className="block text-sm font-medium text-gray-700"
            htmlFor="message"
          >
            Повідомлення
          </Label>
          <Textarea
            id="message"
            placeholder="Опишіть проблему з якою зіткнулися"
            {...register('message')}
            className="mt-1 p-2 w-full h-40 border rounded-md"
            rows={6}
          />
          {errors.message && (
            <p className="text-red-600 text-sm">{errors.message.message}</p>
          )}
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-400 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {isSubmitting ? 'Відправлення...' : 'Відправити'}
        </Button>
      </form>
    </div>
  );
}
