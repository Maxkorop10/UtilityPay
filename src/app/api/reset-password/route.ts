import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/db';

export async function POST(req: NextRequest) {
  try {
    const { phone, newPassword, otp } = await req.json();

    if (otp !== '1111')
      return NextResponse.json({ error: 'Access denied!' }, { status: 500 });

    const user = await prisma.user.findFirst({
      where: { phone },
    });

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
