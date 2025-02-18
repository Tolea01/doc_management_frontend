'use client';

import { errorCatch } from '@api/api.helper';
import Modal from '@components/modal/Modal';
import { entryDocumentService } from '@services/entry-document/entry-document.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import EntryDocumentForm from '../../EntryDocumentForm';

export default function UpdateEntryDocument() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router: AppRouterInstance = useRouter();
  const { control, handleSubmit, reset } = useForm({ mode: 'onChange' });
  const params = useParams();
  const documentId = params.id;

  const { mutate } = useMutation({
    mutationKey: ['updateEntryDocument'],
    mutationFn: (data) => entryDocumentService.update(documentId, data),
    onSuccess(): void {
      toast.success('Documentul a fost adaugat cu succes!');
      router.back();
    },
    onError(error: Error): void {
      toast.error(errorCatch(error));
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ['entryDocument'],
    queryFn: () => entryDocumentService.getById(documentId),
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
        entry_number: data.data.entry_number || '',
        number: data.data.number || '',
        sender: data.data.sender
          ? { value: data.data.sender.id, label: data.data.sender.name }
          : null,
        received: data.data.received
          ? { value: data.data.received.id, label: data.data.received.name }
          : null,
        comment: data.data.comment || '',
        resolution: data.data.resolution || '',
        entry_date: data.data.entry_date || '',
        date: data.data.date || '',
        executors:
          data.data.executors?.map((executor) => ({
            value: executor.id,
            label: executor.name,
          })) || [],
        coordinators:
          data.data.coordinators?.map((coordinator) => ({
            value: coordinator.id,
            label: coordinator.name,
          })) || [],
        execution_time: data.data.execution_time || '',
      });
    }
  }, [data, reset]);

  const onSubmit = async (data: any) => {
    let uploadDocumentResponse;

    if (data.documentFile) {
      try {
        const file = data.documentFile;
        const uploadResponse = await entryDocumentService.upload(file);
        uploadDocumentResponse = uploadResponse;

        if (!uploadResponse.data.filenames) {
          toast.error('Eroare la încărcarea fișierului!');
          return;
        }
      } catch (error) {
        toast.error(errorCatch(error));
      }
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
      file_path: uploadDocumentResponse?.data.filenames[0],
    };

    mutate(documentData);
  };

  return (
    <Modal
      modalHeader={'Modifică document'}
      modalBody={
        <EntryDocumentForm
          fileName={data?.data.file_path}
          control={control}
          onSubmitForm={handleSubmit(onSubmit)}
        />
      }
      isOpen={isModalOpen}
      onClose={() => router.back()}
      onConfirm={handleSubmit(onSubmit)}
    />
  );
}
