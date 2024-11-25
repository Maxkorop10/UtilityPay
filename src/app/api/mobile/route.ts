import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';
import prisma from '@/src/db';

const SECRET_KEY =
  process.env.JWT_SECRET ||
  'd72757de3d68d23a60c6ecbcb33499e94c5099f163d5caccfda93609ef918ca5';

export async function POST(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;

  const { totalPrice } = await req.json();

  try {
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(SECRET_KEY)
    );

    await prisma.transactions.create({
      data: {
        title: 'Оплата Мобільного оператора',
        totalPrice: +totalPrice,
        userId: payload.userId as number,
      },
    });
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('Помилка отримання даних:', error);
    return NextResponse.json({ error: 'Помилка сервера' }, { status: 500 });
  }
}
