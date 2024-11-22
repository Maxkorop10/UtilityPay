import { z } from 'zod';

export const internetPaymentSchema = z.object({
  provider: z.string({ required_error: 'Оберіть провайдера' }),
  accountNumber: z
    .string()
    .min(1, "Особовий рахунок обов'язковий")
    .regex(/^\d+$/, 'Особовий рахунок має складатися лише з цифр'),
  amount: z
    .string()
    .min(1, "Сума обов'язкова")
    .regex(
      /^\d+(\.\d{1,2})?$/,
      'Введіть коректну суму (наприклад, 100 або 100.50)'
    ),
});

export type InternetPaymentData = z.infer<typeof internetPaymentSchema>;
