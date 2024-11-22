import { z } from 'zod';

export const loginSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, 'Номер телефону має містити мінімум 10 цифр')
    .regex(
      /^\+380\d{9}$/,
      'Номер телефону повинен починатися з +380 і містити 12 цифр'
    ),
  password: z.string().min(8, 'Пароль має містити щонайменше 8 символів'),
});

export type LoginData = z.infer<typeof loginSchema>;
