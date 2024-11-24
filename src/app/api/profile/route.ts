import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';
import prisma from '@/src/db';

const SECRET_KEY =
  process.env.JWT_SECRET ||
  'd72757de3d68d23a60c6ecbcb33499e94c5099f163d5caccfda93609ef918ca5';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;

  try {
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(SECRET_KEY)
    );

    const user = await prisma.user.findUnique({
      where: { id: payload.userId as number },
      include: { addresses: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Користувач не знайдений' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      fullname: user.fullname,
      phone: user.phone,
      addresses: user.addresses,
    });
  } catch (error) {
    console.error('Помилка логіну:', error);
    return NextResponse.json({ error: 'Помилка сервера' }, { status: 500 });
  }
}
