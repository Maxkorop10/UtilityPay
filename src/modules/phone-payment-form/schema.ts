import { z } from 'zod';

export const mobileSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^\+380\d{9}$/, 'Номер має починатися з +380 і містити 12 цифр'),

  summa: z
    .string()
    .min(1, 'Поле має бути заповненим')
    .regex(/^[0-9]+([.,][0-9]{1,2})?$/, 'Сума має бути не меншою за 10')
    .refine(
      (val) => {
        const number = parseFloat(val);
        return !isNaN(number) && number >= 5;
      },
      {
        message: 'Сума має бути не меншою за 10',
      }
    ),
});

export type MobileSchema = z.infer<typeof mobileSchema>;
