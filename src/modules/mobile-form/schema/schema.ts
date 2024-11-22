import { z } from 'zod';

export const mobileSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "Номер телефону обов'язковий")
    .regex(/^(\+?380|0)\d{9}$/, 'Введіть коректний номер телефону'),
  amount: z
    .string()
    .min(1, "Сума обов'язкова")
    .regex(
      /^\d+(\.\d{1,2})?$/,
      'Введіть коректну суму (наприклад, 100 або 100.50)'
    ),
});

export type MobileFormValues = z.infer<typeof mobileSchema>;
