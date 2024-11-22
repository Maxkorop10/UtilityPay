import { z } from 'zod';

export const orderSchema = z.object({
  fullname: z
    .string()
    .min(1, "ПІБ обов'язкове")
    .regex(
      /^[А-ЯІЇЄҐа-яіїєґ]{2,}(?:\s[А-ЯІЇЄҐа-яіїєґ]{2,}){1}\s[А-ЯІЇЄҐа-яіїєґ]{5,}$/,
      'ПІБ введено невірно'
    ),
  address: z
    .string()
    .min(1, "Адреса обов'язкова")
    .regex(
      /^м\.\s[А-ЯІЇЄҐа-яіїєґ]+,\s*вул\.\s[А-ЯІЇЄҐа-яіїєґ\s]+,\s*буд\.\s\d+(?:,\s*кв\.\s\d+)?$/,
      'Адреса введена невірно'
    ),
  order: z
    .string()
    .min(10, 'Занадто короткий опис')
    .max(1000, 'Занадто довгий опис'),
});

export type OrderSchema = z.infer<typeof orderSchema>;
