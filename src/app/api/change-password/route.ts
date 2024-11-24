import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';
import prisma from '@/src/db';

const SECRET_KEY =
  process.env.JWT_SECRET ||
  'd72757de3d68d23a60c6ecbcb33499e94c5099f163d5caccfda93609ef918ca5';

export async function POST(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;

  try {
    const { password, newPassword } = await req.json();
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(SECRET_KEY)
    );

    const user = await prisma.user.findFirst({
      where: { id: payload.userId as number },
    });

    // Перевірити пароль
    if (password !== user?.password) {
      return NextResponse.json({ error: 'Невірний пароль' }, { status: 401 });
    }

    await prisma.user.update({
      where: { id: user?.id },
      data: {
        password: newPassword,
      },
    });

    return NextResponse.json({ error: 'Пароль змінено' }, { status: 200 });
  } catch (error) {
    console.error('Помилка отримання даних:', error);
    return NextResponse.json({ error: 'Пароль невірний' }, { status: 500 });
  }
}
