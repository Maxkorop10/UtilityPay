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

export async function POST(req: NextRequest) {
  const {
    fullName,
    phone,
    address,
  }: { fullName: string; phone: string; address: string } = await req.json();
  const token = req.cookies.get('auth_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(SECRET_KEY)
    );
    const userId = payload.userId as number;

    // Перевірка, чи існує користувач з таким номером телефону
    const existingUser = await prisma.user.findUnique({
      where: { phone },
    });

    if (existingUser && existingUser.id !== userId) {
      return NextResponse.json(
        { error: 'Phone number already exists' },
        { status: 400 }
      );
    }

    const userAddress = await prisma.address.findFirst({
      where: { userId },
    });

    // Оновлення профілю
    await prisma.user.update({
      where: { id: userId },
      data: {
        fullname: fullName,
        phone,
        addresses: {
          update: {
            where: { id: userAddress?.id },
            data: { address },
          },
        },
      },
    });

    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Помилка оновлення профілю:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
