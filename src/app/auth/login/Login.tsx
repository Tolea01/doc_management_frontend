'use client';

import { errorCatch } from '@api/api.helper';
import Button from '@components/buttons/Button';
import InputField from '@components/fields/InputField';
import DASHBOARD_PAGES from '@config/pages-url.config';
import { authService } from '@services/auth/auth.service';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { IAuthLoginForm } from '../../../types/auth.types';
import { IUser } from '../../../types/user.type';
import './style.css';

export default function Login() {
  const queryClient: QueryClient = useQueryClient();
  const { handleSubmit, reset, control } = useForm<IAuthLoginForm>({
    mode: 'onChange',
    defaultValues: {
      email_address: '',
      password: '',
    },
  });

  const router: AppRouterInstance = useRouter();

  const { mutate } = useMutation({
    mutationKey: ['auth', 'login'],
    mutationFn: (data: IAuthLoginForm) => authService.login(data),
    onSuccess(data): void {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      const user: Partial<IUser> = data.data.user;
      router.replace(new DASHBOARD_PAGES(user.role).HOME);
      reset();
      toast.success(`Bine ai venit ${user.name}!`);
    },
    onError(error: Error): void {
      toast.error(errorCatch(error));
    },
  });

  const onSubmit: SubmitHandler<IAuthLoginForm> = (data: IAuthLoginForm): void => {
    mutate(data);
  };

  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      handleSubmit(onSubmit);
    }
  };

  return (
    <section className="auth-wrapper">
      <form
        className="auth-form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="on"
        onKeyDown={handleKeyPress}
      >
        <h2 className="auth-title">
          AGENȚIA TERITORIALĂ DE ASISTENȚĂ SOCIALĂ NORD-NORD-VEST
        </h2>
        <h3 className="auth-subtitle">Loghează-te</h3>
        <InputField<IAuthLoginForm>
          type="email"
          label="Email"
          placeholder="Introduceți email-ul..."
          className="auth-input"
          control={control}
          name="email_address"
          id="input-auth-email"
          size="large"
        />
        <InputField<IAuthLoginForm>
          type="password"
          label="Parola"
          placeholder="Introduceți parola..."
          className="auth-input"
          control={control}
          name="password"
          id="input-auth-password"
          size="large"
        />
        <div className="auth-button">
          <Button value="Intră" variant="primary" size="medium" type="submit" />
        </div>
      </form>
    </section>
  );
}
