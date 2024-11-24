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
      where: { id: Number(payload.userId) },
    });

    const address = await prisma.address.findFirst({
      where: { userId: user?.id },
    });

    const orders = await prisma.order.findMany({
      where: { userId: user?.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ orders, address, user });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  const { order, fullname, address } = await req.json();

  try {
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(SECRET_KEY)
    );

    await prisma.order.create({
      data: {
        userId: Number(payload.userId),
        address,
        fullname,
        orderDescription: order,
      },
    });

    return NextResponse.json('Order create successfully', { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order.' },
      { status: 500 }
    );
  }
}
