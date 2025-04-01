'use client';

import { errorCatch } from '@api/api.helper';
import Modal from '@components/modal/Modal';
import { userService } from '@services/user/user.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import EntryDocumentForm from '../../UserForm';
import getUserRoleOptions from '../../../../../../../utils/getUserRole'

export default function UpdateEntryDocument() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router: AppRouterInstance = useRouter();
  const { control, handleSubmit, reset } = useForm({ mode: 'onChange' });
  const params = useParams();
  const userId = params.id;
  const userRoleOptions = getUserRoleOptions()

  const { mutate } = useMutation({
    mutationKey: ['updateUser'],
    mutationFn: (data) => userService.update(userId, data),
    onSuccess(): void {
      toast.success('Utilizatorul a fost adaugat cu succes!');
      router.back();
    },
    onError(error: Error): void {
      toast.error(errorCatch(error));
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => userService.getById(userId),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (data?.data) {
      reset({
        name: data.data.surname || '',
        surname: data.data.surname || '',
        role: userRoleOptions.find((option) => option.value === data.data.role) || null,
        phone_number: data.data.phone_number || '',
        email_address: data.data.email_address,
      });
    }
  }, [data, reset]);

  const onSubmit = async (data: any) => {
    try {
      const userData = {
        name: data.name,
        surname: data.surname,
        password: data.password ? data.password : undefined,
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
      modalHeader={'Modifică utilizator'}
      modalBody={
        <EntryDocumentForm control={control} onSubmitForm={handleSubmit(onSubmit)} />
      }
      isOpen={isModalOpen}
      onClose={() => router.back()}
      onConfirm={handleSubmit(onSubmit)}
    />
  );
}
