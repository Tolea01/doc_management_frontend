import DASHBOARD_PAGES from '@config/pages-url.config';
import { protectedRoutes } from '@config/routes.config';
import { EnumTokens } from '@enums/tokens.enum';
import { UserRole } from '@enums/user-role.enum';
import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest, response: NextResponse) {
  const { url, cookies, nextUrl } = request;

  const refreshToken: string | undefined = cookies.get(EnumTokens.REFRESH_TOKEN)?.value;

  const isAdminPage: boolean = url.includes('/management/admin');
  const isAuthPage: boolean = url.includes('/auth');

  const removeLocalStorageItem = (item: string): void => localStorage.removeItem(item);

  if (!refreshToken && isAuthPage) {
    removeLocalStorageItem('user');
    return NextResponse.next();
  }

  if (!refreshToken && isAdminPage) {
    return NextResponse.redirect(new URL('/404', url));
  }

  try {
    const decodedToken: any = await jwtVerify(
      refreshToken as string,
      new TextEncoder().encode(process.env.JWT_SECRET),
    );

    const userRole: UserRole = decodedToken.payload.props.role;
    const allowedRoles: string[] | [] = protectedRoutes[nextUrl.pathname] || [];

    if (allowedRoles.length && !allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL('/403', url));
    }

    if (isAuthPage && refreshToken && userRole) {
      return NextResponse.redirect(new URL(new DASHBOARD_PAGES(userRole).HOME, url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/auth/login', url));
  }
}

export const config = {
  matcher: ['/management/:path*', '/auth/:path*'],
};
