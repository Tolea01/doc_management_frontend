'use client';

import { useForm } from 'react-hook-form';
import Checkbox from '../../components/ui/checkbox/Checkbox';
import InputField from '../../components/ui/fields/InputField';
import { IAuthLoginForm } from '../../types/auth.types';
import './styles.css';

export default function Auth() {
  const { register, handleSubmit, reset } = useForm<IAuthLoginForm>({ mode: 'onChange' });

  // const router = useRouter();

  // const { mutate } = useMutation({
  //   mutationKey: ['auth'],
  //   mutationFn: (data: IAuthLoginForm) => authService.login(data),
  //   onSuccess() {
  //     toast.success('Bine ai venit!');
  //     reset();
  //     router.push(DASHBOARD_PAGES.HOME);
  //   },
  // });

  // const onSubmit: SubmitHandler<IAuthLoginForm> = (data: IAuthLoginForm) => {
  //   mutate(data);
  // };

  return (
    <section className="auth-wrapper">
      <form className="auth-form">
        <h2 className="auth-title">
          AGENȚIA TERITORIALĂ DE ASISTENȚĂ SOCIALĂ NORD-NORD-VEST
        </h2>
        <h3 className="auth-subtitle">Loghează-te</h3>
        <InputField
          type="text"
          label="Email"
          placeholder="Introduceți email-ul..."
          className="auth-input"
        />
        <InputField
          type="password"
          label="Parola"
          placeholder="Introduceți parola..."
          // className="auth-input"
        />
        <div className="auth-checkbox-container">
          <Checkbox label="Memorează parola" />
        </div>
      </form>
    </section>
  );
}
