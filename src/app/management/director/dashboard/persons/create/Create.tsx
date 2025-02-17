'use client';

import { errorCatch } from '@api/api.helper';
import Modal from '@components/modal/Modal';
import { personService } from '@services/person/person.service';
import { useMutation } from '@tanstack/react-query';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import PersonForm from '../PersonForm';

export default function CreatePerson() {
  const router: AppRouterInstance = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm({ mode: 'onChange' });
  const { mutate } = useMutation({
    mutationKey: ['createPerson'],
    mutationFn: (data) => personService.create(data),
    onSuccess(): void {
      toast.success('Persoana a fost adaugată cu succes!');
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
      const personData = {
        type: data.type.label,
        name: data.name,
        address: data.address,
        email_address: data.email_address,
      };

      mutate(personData);
    } catch (error) {
      toast.error(errorCatch(error));
    }
  };

  return (
    <Modal
      modalHeader={'Adaugă persoană'}
      modalBody={<PersonForm control={control} onSubmitForm={handleSubmit(onSubmit)} />}
      isOpen={isModalOpen}
      onClose={() => router.back()}
      onConfirm={handleSubmit(onSubmit)}
    />
  );
}
