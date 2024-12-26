'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { errorCatch } from '../../api/api.helper';
import Button from '../../components/ui/buttons/Button';
import Checkbox from '../../components/ui/checkbox/Checkbox';
import InputField from '../../components/ui/fields/InputField';
import { DASHBOARD_PAGES } from '../../config/pages-url.config';
import { authService } from '../../services/auth/auth.service';
import { IAuthLoginForm } from '../../types/auth.types';
import './style.css';

export default function Auth() {
  const { handleSubmit, reset, control } = useForm<IAuthLoginForm>({
    mode: 'onChange',
  });

  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ['auth'],
    mutationFn: (data: IAuthLoginForm) => authService.login(data),
    onSuccess() {
      toast.success('Bine ai venit!');
      reset();
      router.push(DASHBOARD_PAGES.HOME);
    },
    onError(error: Error) {
      toast.error(errorCatch(error));
    },
  });

  const onSubmit: SubmitHandler<IAuthLoginForm> = (data: IAuthLoginForm) => {
    mutate(data);
  };

  return (
    <section className="auth-wrapper">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
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
        />
        <InputField
          type="password"
          label="Parola"
          placeholder="Introduceți parola..."
          control={control}
          name="password"
          id="input-auth-password"
        />
        <Checkbox label="Memorează parola" className="mb-3" id="auth-checkbox" />
        <div className="auth-button">
          <Button value="Intră" variant="primary" size="medium" type="submit" />
        </div>
      </form>
    </section>
  );
}
