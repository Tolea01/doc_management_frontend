'use client';

import Modal from '@components/modal/Modal';
import { entryDocumentService } from '@services/entry-document/entry-document.service';
import { useQuery } from '@tanstack/react-query';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import EntryDocumentForm from '../../EntryDocumentForm';

export default function UpdateEntryDocument() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router: AppRouterInstance = useRouter();
  const { control, handleSubmit, reset } = useForm({ mode: 'onChange' });
  const params = useParams();
  const documentId = params.id;

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

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Modal
      modalHeader={'Modifică document'}
      modalBody={
        <EntryDocumentForm control={control} onSubmitForm={handleSubmit(onSubmit)} />
      }
      isOpen={isModalOpen}
      onClose={() => router.back()}
      onConfirm={handleSubmit(onSubmit)}
    />
  );
}
