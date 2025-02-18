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
import EntryDocumentForm from '../../InternalDocumentForm';
import { internalDocumentService } from '@services/internal-document/internal-document.service'
import InternalDocumentForm from '../../InternalDocumentForm'

export default function UpdateInternalDocument() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router: AppRouterInstance = useRouter();
  const { control, handleSubmit, reset } = useForm({ mode: 'onChange' });
  const params = useParams();
  const documentId = params.id;

  const { mutate } = useMutation({
    mutationKey: ['updateInternalDocument'],
    mutationFn: (data) => internalDocumentService.update(documentId, data),
    onSuccess(): void {
      toast.success('Documentul a fost adaugat cu succes!');
      router.back();
    },
    onError(error: Error): void {
      toast.error(errorCatch(error));
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ['internalDocument'],
    queryFn: () => internalDocumentService.getById(documentId),
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
        number: data.data.number || '',
        comment: data.data.comment || '',
        resolution: data.data.resolution || '',
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
        const uploadResponse = await internalDocumentService.upload(file);
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
      number: data.number,
      comment: data.comment || '',
      resolution: data.resolution || '',
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
        <InternalDocumentForm
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
