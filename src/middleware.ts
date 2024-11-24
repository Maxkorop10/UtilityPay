import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

const SECRET_KEY =
  process.env.JWT_SECRET ||
  'd72757de3d68d23a60c6ecbcb33499e94c5099f163d5caccfda93609ef918ca5';

// const publicRoutes = ['/', '/login', '/registration', '/_next', '/api'];
const privateRoutes = [
  '/cart',
  '/change-password',
  '/debt',
  '/internet',
  '/mobile-network',
  '/new-order',
  '/notifications',
  '/profile',
  '/support',
  '/transaction-history',
  '/utility-bills',
];
export async function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;

  if (!token && privateRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (
    token &&
    (req.nextUrl.pathname === '/login' ||
      req.nextUrl.pathname === '/registration')
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  } else if (token) {
    try {
      await jose.jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
      return NextResponse.next();
    } catch (error) {
      console.error('Невірний токен:', error);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
}

export const config = {
  matcher: ['/:path*'],
};
