export const publicRoutes: string[] = ['/auth/login', 'auth/register'];

export const protectedRoutes: Record<string, string[]> = {
  '/management/admin/dashboard': ['admin'],
  '/management/director/dashboard': ['director'],
};
