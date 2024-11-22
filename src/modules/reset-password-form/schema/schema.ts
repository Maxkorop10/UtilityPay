import { z } from 'zod';

export const resetPasswordSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "Номер телефону обов'язковий")
    .regex(/^(\+?380|0)\d{9}$/, 'Введіть коректний номер телефону'),
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
