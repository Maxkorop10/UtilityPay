import { z } from 'zod';

export const paymentSchema = z.object({
  address: z
    .string()
    .min(1, "Адреса обов'язкова")
    .regex(
      /^м\.\s[А-ЯІЇЄҐа-яіїєґ]+,\s*вул\.\s[А-ЯІЇЄҐа-яіїєґ\s]+,\s*буд\.\s\d+(?:,\s*кв\.\s\d+)?$/,
      'Адреса введена невірно'
    ),

  summa: z
    .string()
    .min(1, 'Поле має бути заповненим')
    .regex(/^[0-9]+([.,][0-9]{1,2})?$/, 'Сума має бути не меншою за 10'),
});

export type PaymentSchema = z.infer<typeof paymentSchema>;
