import { NextResponse } from 'next/server';
import prisma from '../lib/prisma';

export async function POST(req: Request) {
  try {
    const { addressId, availableServiceId, consumedUnits } = await req.json();
    
    const userId = 1;
    let cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    const availableService = await prisma.availableService.findUnique({
      where: { id: availableServiceId },
    });

    if (!availableService) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    const totalPrice = availableService.unitPrice * consumedUnits;

    const service = await prisma.service.create({
      data: {
        addressId,
        availableServiceId,
        consumedUnits,
        totalPrice,
        cartId: cart.id,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error('Failed to add service to cart:', error);
    return NextResponse.json(
      { error: 'Failed to add service to cart' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const userId = 1;

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        services: {
          include: {
            availableService: true,
            address: true,
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json({ services: [] });
    }

    return NextResponse.json(cart);
  } catch (error) {
    console.error('Failed to fetch cart:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}