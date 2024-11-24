import { NextResponse } from 'next/server';
import * as jose from 'jose';
import prisma from '@/src/db';

const SECRET_KEY =
  process.env.JWT_SECRET ||
  'd72757de3d68d23a60c6ecbcb33499e94c5099f163d5caccfda93609ef918ca5';

export async function POST(req: Request) {
  try {
    const {
      fullname,
      phone,
      password,
      address,
    }: {
      fullname: string;
      phone: string;
      password: string;
      address: string;
    } = await req.json();

    // Перевірка, чи користувач вже існує
    const existingUser = await prisma.user.findUnique({
      where: { phone },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Користувач з таким номером телефону вже існує' },
        { status: 400 }
      );
    }

    const availableServices = await prisma.availableService.findMany();
    const services: {
      availableServiceId: number;
      consumedUnits: number;
      totalPrice: number;
    }[] = [];
    availableServices.forEach((availableService) => {
      const consumedUnits = Math.floor(Math.random() * 100);
      services.push({
        availableServiceId: availableService.id,
        consumedUnits,
        totalPrice: availableService.unitPrice * consumedUnits,
      });
    });

    // Створення нового користувача
    const newUser = await prisma.user.create({
      data: {
        fullname,
        phone,
        password,
        addresses: {
          create: [
            {
              address: address,
              services: {
                create: services,
              },
            },
          ],
        },
      },
    });

    await prisma.cart.create({
      data: {
        userId: newUser.id,
      },
    });

    // Створити JWT токен
    const token = await new jose.SignJWT({ userId: newUser.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7days')
      .sign(new TextEncoder().encode(SECRET_KEY));

    // Зберегти сесію в базі даних
    await prisma.session.create({
      data: {
        userId: newUser.id,
        token,
      },
    });

    const response = NextResponse.json({ message: 'Registration successful' });
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 10080,
      path: '/',
    });
    return response;
  } catch (error) {
    console.error('Помилка реєстрації:', error);
    return NextResponse.json({ error: 'Помилка сервера' }, { status: 500 });
  }
}
