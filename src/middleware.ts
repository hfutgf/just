/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { verifyToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith('/admin')) {
    const authToken = request.cookies.get('auth_token')?.value;

    if (path === '/admin/login') {
      if (authToken) {
        try {
          const isValid = await verifyToken(authToken);
          if (isValid) {
            return NextResponse.redirect(new URL('/admin', request.url));
          }
        } catch (error) {
          return NextResponse.next();
        }
      }
      return NextResponse.next();
    }

    if (!authToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const isValid = await verifyToken(authToken);

      if (!isValid) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
