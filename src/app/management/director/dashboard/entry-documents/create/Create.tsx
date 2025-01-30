'use client';

import { errorCatch } from '@api/api.helper';
import Modal from '@components/modal/Modal';
import { entryDocumentService } from '@services/entry-document/entry-document.service';
import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import EntryDocumentForm from '../EntryDocumentForm';

export default function CreateEntryDocument() {
  const router: AppRouterInstance = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm({ mode: 'onChange' });
  const { mutate } = useMutation({
    mutationKey: ['createEntryDocument'],
    mutationFn: (data) => entryDocumentService.create(data),
    onSuccess(): void {
      reset();
      toast.success('Documentul a fost adaugat cu succes!');
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

  const onSubmit = (data) => {
    // mutate(data);
    const documentData = {
      entry_number: data.entry_number,
      number: data.number,
      sender: data.sender[0]?.value,
      received: data.received[0]?.value,
      comment: data.comment || '',
      resolution: data.resolution || '',
      entry_date: format(new Date(data.entry_date), 'yyyy-MM-dd'),
      date: format(new Date(data.date), 'yyyy-MM-dd'),
      executors: data.executors.map((executor: any) => executor.value),
      coordinators: data.coordinators.map((coordinator: any) => coordinator.value),
      execution_time: format(new Date(data.execution_time), 'yyyy-MM-dd'),
      file_path: data.file_path || '/random-document.pdf',
    };
    console.log(documentData);
    mutate(data);
  };

  return (
    <Modal
      modalHeader={'Adaugă document'}
      modalBody={
        <EntryDocumentForm control={control} onSubmitForm={handleSubmit(onSubmit)} />
      }
      isOpen={isModalOpen}
      onClose={() => router.back()}
      onConfirm={handleSubmit(onSubmit)}
    />
  );
}
