'use client';

import { errorCatch } from '@api/api.helper';
import Modal from '@components/modal/Modal';
import { authService } from '@services/auth/auth.service';
import { useMutation } from '@tanstack/react-query';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import EntryDocumentForm from '../UserForm';

export default function CreateUser() {
  const router: AppRouterInstance = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm({ mode: 'onChange' });
  const { mutate } = useMutation({
    mutationKey: ['createUser'],
    mutationFn: (data) => authService.register(data),
    onSuccess(): void {
      toast.success('Utilizatorul a fost adaugat cu succes!');
      window.location.reload();
    },
    onError(error: Error): void {
      toast.error(errorCatch(error));
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const userData = {
        name: data.name,
        surname: data.surname,
        password: data.password,
        role: data.role?.value,
        photo: 'photo',
        phone_number: data.phone_number,
        email_address: data.email_address,
      };

      mutate(userData);
    } catch (error) {
      toast.error(errorCatch(error));
    }
  };

  return (
    <Modal
      modalHeader={'Adaugă utilizator'}
      modalBody={
        <EntryDocumentForm control={control} onSubmitForm={handleSubmit(onSubmit)} />
      }
      isOpen={isModalOpen}
      onClose={() => router.back()}
      onConfirm={handleSubmit(onSubmit)}
    />
  );
}
