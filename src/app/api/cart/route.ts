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

    const cart = await prisma.cart.findUnique({
      where: {
        userId: payload.userId as number,
      },
      include: {
        services: {
          include: {
            availableService: true,
            address: true,
          },
        },
      },
    });

    return NextResponse.json(cart);
  } catch (error) {
    console.error('Помилка отримання даних:', error);
    return NextResponse.json({ error: 'Помилка сервера' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  const { serviceId } = await req.json();

  try {
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(SECRET_KEY)
    );
    const cart = await prisma.cart.findUnique({
      where: {
        userId: payload.userId as number,
      },
    });

    await prisma.service.update({
      where: { id: serviceId },
      data: {
        cartId: cart?.id,
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('Помилка додавання послуги:', error);
    return NextResponse.json({ error: 'Помилка сервера' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;

  try {
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await jose.jwtVerify(token, new TextEncoder().encode(SECRET_KEY));

    const { serviceId } = await req.json();

    await prisma.service.update({
      where: { id: serviceId },
      data: {
        cartId: null,
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('Помилка видалення послуги:', error);
    return NextResponse.json({ error: 'Помилка сервера' }, { status: 500 });
  }
}
