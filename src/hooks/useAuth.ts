import { authService } from '@services/auth/auth.service';
import { useQuery } from '@tanstack/react-query';

export const useAuth = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => authService.getCurrent(),
    retry: 1,
  });

  return {
    user: data?.data,
    role: data?.data.userRole,
    loading: isLoading,
    error: isError ? error?.message : null,
  };
};
