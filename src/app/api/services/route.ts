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

    const address = await prisma.address.findFirst({
      where: { userId: payload.userId as number },
    });

    const services = await prisma.service.findMany({
      where: { addressId: address?.id },
      include: { availableService: true },
      orderBy: { id: 'asc' },
    });

    return NextResponse.json({
      services,
    });
  } catch (error) {
    console.error('Помилка отримання даних:', error);
    return NextResponse.json({ error: 'Помилка сервера' }, { status: 500 });
  }
}
