import { z } from 'zod';

export const profileSchema = z.object({
  phone: z
    .string()
    .regex(
      /^\+380\d{9}$/,
      'Номер телефону повинен починатися з +380 і містити 12 цифр'
    ),
  fullName: z
    .string()
    .regex(
      /^[А-ЯІЇЄҐа-яіїєґ']{2,}(?:\s[А-ЯІЇЄҐа-яіїєґ']{2,}){1}\s[А-ЯІЇЄҐа-яіїєґ']{5,}$/,
      'Неправильний формат даних'
    ),
  address: z
    .string()
    .regex(
      /^м\.\s[А-ЯІЇЄҐа-яіїєґ]+,\s*вул\.\s[А-ЯІЇЄҐа-яіїєґ\s]+,\s*буд\.\s\d+(?:,\s*кв\.\s\d+)?$/,
      'Адреса введена невірно'
    ),
});

export type ProfileInfoData = z.infer<typeof profileSchema>;
