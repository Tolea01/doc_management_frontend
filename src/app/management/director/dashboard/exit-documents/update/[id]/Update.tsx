'use client';

import { errorCatch } from '@api/api.helper';
import Modal from '@components/modal/Modal';
import { exitDocumentService } from '@services/exit-document/exit-document.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import ExitDocumentForm from '../../ExitDocumentForm';

export default function UpdateExitDocument() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router: AppRouterInstance = useRouter();
  const { control, handleSubmit, reset } = useForm({ mode: 'onChange' });
  const params = useParams();
  const documentId = params.id;

  const { mutate } = useMutation({
    mutationKey: ['updateExitDocument'],
    mutationFn: (data) => exitDocumentService.update(documentId, data),
    onSuccess(): void {
      toast.success('Documentul a fost adaugat cu succes!');
      router.back();
    },
    onError(error: Error): void {
      toast.error(errorCatch(error));
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ['exitDocument'],
    queryFn: () => exitDocumentService.getById(documentId),
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
        received: data.data.received
          ? { value: data.data.received.id, label: data.data.received.name }
          : null,
        comment: data.data.comment || '',
        date: data.data.date || '',
        executors:
          data.data.executors?.map((executor) => ({
            value: executor.id,
            label: executor.name,
          })) || [],
      });
    }
  }, [data, reset]);

  const onSubmit = async (data: any) => {
    let uploadDocumentResponse;

    if (data.documentFile) {
      try {
        const file = data.documentFile;
        const uploadResponse = await exitDocumentService.upload(file);
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
      received: data.received?.value,
      comment: data.comment || '',
      date: format(new Date(data.date), 'yyyy-MM-dd'),
      executors: data.executors.map((executor: any) => executor.value),
      file_path: uploadDocumentResponse?.data.filenames[0],
    };

    mutate(documentData);
  };

  return (
    <Modal
      modalHeader={'Modifică document'}
      modalBody={
        <ExitDocumentForm
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
