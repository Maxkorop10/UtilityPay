import prisma from '@/src/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;

  await prisma.session.deleteMany({
    where: { token },
  });

  const response = NextResponse.json({ message: 'Logout successful' });
  response.cookies.set('auth_token', '', { maxAge: 0, path: '/' });
  return response;
}
