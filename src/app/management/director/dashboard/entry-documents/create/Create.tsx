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
      toast.success('Documentul a fost adaugat cu succes!');
      window.location.reload()
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
    if (!data.documentFile) {
      toast.error('Trebuie să selectezi un fișier PDF!');
      return;
    }

    try {
      const file = data.documentFile;
      const uploadResponse = await entryDocumentService.upload(file);

      if (!uploadResponse.data.filenames) {
        toast.error('Eroare la încărcarea fișierului!');
        return;
      }

      const documentData = {
        entry_number: data.entry_number,
        number: data.number,
        sender: data.sender?.value,
        received: data.received?.value,
        comment: data.comment || '',
        resolution: data.resolution || '',
        entry_date: format(new Date(data.entry_date), 'yyyy-MM-dd'),
        date: format(new Date(data.date), 'yyyy-MM-dd'),
        executors: data.executors.map((executor: any) => executor.value),
        coordinators: data.coordinators.map((coordinator: any) => coordinator.value),
        execution_time: format(new Date(data.execution_time), 'yyyy-MM-dd'),
        file_path: uploadResponse.data.filenames[0],
      };

      mutate(documentData);
    } catch (error) {
      toast.error(errorCatch(error));
    }
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
