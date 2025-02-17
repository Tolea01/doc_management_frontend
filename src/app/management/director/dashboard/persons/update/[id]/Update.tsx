'use client';

import { errorCatch } from '@api/api.helper';
import Modal from '@components/modal/Modal';
import { personService } from '@services/person/person.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import getPersonTypeOptions from '../../../../../../../utils/getPersonType';
import ExitDocumentForm from '../../PersonForm';

export default function UpdatePerson() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router: AppRouterInstance = useRouter();
  const { control, handleSubmit, reset } = useForm({ mode: 'onChange' });
  const params = useParams();
  const personId = params.id;

  const { mutate } = useMutation({
    mutationKey: ['updatePerson'],
    mutationFn: (data) => personService.update(personId, data),
    onSuccess(): void {
      toast.success('Persoana a fost adaugată cu succes!');
      router.back();
    },
    onError(error: Error): void {
      toast.error(errorCatch(error));
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ['person'],
    queryFn: () => personService.getById(personId),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (data?.data) {
      const personTypeOptions = getPersonTypeOptions();

      reset({
        name: data.data.name || '',
        type: personTypeOptions.find((option) => option.label === data.data.type) || null,
        address: data.data.address || '',
        email_address: data.data.email_address || '',
      });
    }
  }, [data, reset]);

  const onSubmit = async (data: any) => {
    const personData = {
      type: data.type?.label,
      name: data.name,
      address: data.address,
      email_address: data.email_address,
    };

    mutate(personData);
  };

  return (
    <Modal
      modalHeader={'Modifică persoana'}
      modalBody={
        <ExitDocumentForm control={control} onSubmitForm={handleSubmit(onSubmit)} />
      }
      isOpen={isModalOpen}
      onClose={() => router.back()}
      onConfirm={handleSubmit(onSubmit)}
    />
  );
}
