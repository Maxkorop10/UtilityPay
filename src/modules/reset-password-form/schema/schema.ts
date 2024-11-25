import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    phoneNumber: z
      .string()
      .min(1, "Номер телефону обов'язковий")
      .regex(/^(\+?380|0)\d{9}$/, 'Введіть коректний номер телефону'),
    newPassword: z
      .string()
      .min(8, 'Новий пароль має містити щонайменше 8 символів')
      .regex(/[A-Z]/, 'Новий пароль має містити хоча б одну велику літеру')
      .regex(/\d/, 'Новий пароль має містити хоча б одну цифру'),
    confirmPassword: z
      .string()
      .min(1, 'Підтвердження пароля не може бути порожнім'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Паролі не збігаються',
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
