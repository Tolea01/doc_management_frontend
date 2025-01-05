import { UserRole } from '@enums/user-role.enum'

export const publicRoutes: string[] = ['/auth/login', 'auth/register'];

export const protectedRoutes: Record<string, UserRole[]> = {
  '/management/admin/dashboard': [UserRole.ADMIN],
  '/management/director/dashboard': [UserRole.DIRECTOR],
};
