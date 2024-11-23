import { z } from 'zod';

export const registrationSchema = z
  .object({
    fullName: z
      .string()
      .regex(
        /^[А-ЯІЇЄҐа-яіїєґ]{2,}(?:\s[А-ЯІЇЄҐа-яіїєґ]{2,}){1}\s[А-ЯІЇЄҐа-яіїєґ]{5,}$/,
        'Неправильний формат даних'
      ),
    phoneNumber: z
      .string()
      .regex(
        /^\+380\d{9}$/,
        'Номер телефону повинен починатися з +380 і містити 12 цифр'
      ),
    address: z
      .string()
      .regex(
        /^м\.\s[А-ЯІЇЄҐа-яіїєґ]+,\s*вул\.\s[А-ЯІЇЄҐа-яіїєґ\s]+,\s*буд\.\s\d+(?:,\s*кв\.\s\d+)?$/,
        'Адреса введена невірно'
      ),
    password: z
      .string()
      .min(8, 'Новий пароль має містити щонайменше 8 символів')
      .regex(/[A-Z]/, 'Новий пароль має містити хоча б одну велику літеру')
      .regex(/\d/, 'Новий пароль має містити хоча б одну цифру'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Паролі не збігаються',
  });

export type RegistrationData = z.infer<typeof registrationSchema>;
