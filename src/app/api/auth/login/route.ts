import { NextResponse } from 'next/server';
import * as jose from 'jose';
import prisma from '@/src/db';

const SECRET_KEY =
  process.env.JWT_SECRET ||
  'd72757de3d68d23a60c6ecbcb33499e94c5099f163d5caccfda93609ef918ca5';

export async function POST(req: Request) {
  try {
    const { phone, password } = await req.json();

    // Знайти користувача за номером телефону
    const user = await prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Невірний номер телефону або пароль' },
        { status: 401 }
      );
    }

    // Перевірити пароль
    if (password !== user.password) {
      return NextResponse.json(
        { error: 'Невірний номер телефону або пароль' },
        { status: 401 }
      );
    }

    // Створити JWT токен
    const token = await new jose.SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(new TextEncoder().encode(SECRET_KEY));

    // Зберегти сесію в базі даних
    await prisma.session.create({
      data: {
        userId: user.id,
        token,
      },
    });

    const response = NextResponse.json({ message: 'Login successful' });
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Помилка логіну:', error);
    return NextResponse.json({ error: 'Помилка сервера' }, { status: 500 });
  }
}
