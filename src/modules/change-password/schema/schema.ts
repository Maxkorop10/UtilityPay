import { z } from 'zod';

export const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, 'Поточний пароль має містити щонайменше 8 символів'),
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

export type PasswordFormData = z.infer<typeof passwordSchema>;
