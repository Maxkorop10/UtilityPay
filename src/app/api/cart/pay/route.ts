import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';
import prisma from '@/src/db';

const SECRET_KEY =
  process.env.JWT_SECRET ||
  'd72757de3d68d23a60c6ecbcb33499e94c5099f163d5caccfda93609ef918ca5';

export async function POST(req: NextRequest) {
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
    });

    const services = await prisma.service.findMany({
      where: { cartId: cart?.id },
      include: {
        availableService: true,
      },
    });

    await prisma.service.updateMany({
      where: { cartId: cart?.id },
      data: {
        cartId: null,
        totalPrice: 0,
        consumedUnits: 0,
      },
    });

    services.map(async (service) => {
      await prisma.transactions.create({
        data: {
          title: 'Оплата ' + service.availableService.name,
          totalPrice: service.totalPrice,
          userId: payload.userId as number,
        },
      });
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('Помилка оплати кошика', error);
    return NextResponse.json({ error: 'Помилка сервера' }, { status: 500 });
  }
}
