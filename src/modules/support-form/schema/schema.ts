import { z } from 'zod';

export const supportFormSchema = z.object({
  name: z
    .string()
    .regex(
      new RegExp(/^[А-ЯІЇЄҐа-яіїєґ]{2,}(?:\s[А-ЯІЇЄҐа-яіїєґ]{2,}){1}$/),
      'Поле має містити лише Імя та Прізвище'
    )
    .min(2, "Ім'я має містити щонайменше 2 символи"),
  email: z.string().email('Введіть дійсну електронну адресу'),
  message: z
    .string()
    .min(10, 'Повідомлення має містити щонайменше 10 символів'),
});

export type SupportData = z.infer<typeof supportFormSchema>;
