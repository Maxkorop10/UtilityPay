import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/db';

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    const user = await prisma.user.findFirst({
      where: { phone },
    });

    if (user)
      return NextResponse.json({ error: 'Користувач існує' }, { status: 200 });
    else
      return NextResponse.json(
        { error: 'Користувача з таким номером не існує' },
        { status: 500 }
      );
  } catch (error) {
    console.error('Помилка отримання даних:', error);
    return NextResponse.json(
      { error: 'Користувача з таким номером не існує' },
      { status: 500 }
    );
  }
}
