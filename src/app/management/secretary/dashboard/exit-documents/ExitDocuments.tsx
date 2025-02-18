'use client';

import Button from '@components/buttons/Button';
import DatePickerField from '@components/fields/DatePicker';
import InputField from '@components/fields/InputField';
import SelectInputField from '@components/fields/SelectInputField';
import Pagination from '@components/pagination/Pagination';
import Table from '@components/tables/Table';
import { entryDocumentService } from '@services/entry-document/entry-document.service';
import { exitDocumentService } from '@services/exit-document/exit-document.service';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdNoteAdd } from 'react-icons/md';
import { toast } from 'sonner';
import getDocumentStatusOptions from '../../../../../utils/getDocumentStatus';

export default function ExitDocuments() {
  const { control, watch } = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const selectOptions = getDocumentStatusOptions();
  const searchFilters = watch();
  const router: AppRouterInstance = useRouter();

  const filters = useMemo(() => {
    return Object.fromEntries(
      Object.entries(searchFilters || {})
        .filter(([_, value]) => value !== null && value !== '' && value !== undefined)
        .map(([key, value]) => {
          if (key === 'status' && value?.label) {
            return [key, value.label];
          }
          if (value instanceof Date) {
            return [key, format(value, 'yyyy-MM-dd')];
          }
          return [key, value];
        }),
    );
  }, [searchFilters]);

  const { data, isLoading } = useQuery({
    queryKey: ['exitDocuments', currentPage, filters],
    queryFn: () => exitDocumentService.getAll(currentPage, itemsPerPage, filters),
  });

  const totalItems: any = data?.data?.total || 0;
  const totalPages: number = Math.ceil(totalItems / itemsPerPage);

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Număr', key: 'number' },
    { label: 'Data', key: 'date' },
    { label: 'Executori', key: 'executor' },
    { label: 'Primit de', key: 'received' },
  ];

  const onDownload = async (id: any) => {
    try {
      const document = await exitDocumentService.getById(id);
      const fileName = document.data?.file_path;
      await exitDocumentService.downloadFile(fileName);
    } catch (error) {
      toast.error('Eroare la descărcarea fișierului');
    }
  };

  const onDelete = async (id: any) => {
    try {
      await exitDocumentService.delete(id);
      window.location.reload();
    } catch (error) {
      toast.error('Eroare la ștergerea fișierului fișierului');
    }
  };

  const tableData = data?.data.data.map((doc: any) => ({
    id: doc.id,
    number: doc.number,
    date: doc.date,
    executor: doc.executors.map((e: any) => (
      <div key={e.id} className="mb-1">
        {e.name} {e.surname}
      </div>
    )),
    received: doc.received.name,
  }));

  return (
    <section>
      <header className="page-header">
        <h1 className="page-title">Documente de ieșire</h1>
      </header>
      <form className="search-document-form">
        <div className="mb-4 lg:mb-0">
          <InputField
            name="number"
            label="Caută document"
            control={control}
            id="entry-document-search"
            type="search"
            className="w-full lg:w-[250px]"
            size="medium"
            placeholder={'Introdu numărul documentului'}
          />
        </div>
        <div className="search-document-selector">
          <Button
            size="small"
            variant="primary"
            value={
              <>
                adaugă <MdNoteAdd size={15} />
              </>
            }
            onClick={() => router.push('exit-documents/create')}
          />
          <SelectInputField
            options={selectOptions}
            className="w-full"
            control={control}
            name="status"
            id="entry-document-status-select"
            placeholder={'Caută după statut'}
          />
          <DatePickerField
            className="w-full"
            control={control}
            name="date"
            id="entry-document-date-select"
            placeholder={'Caută după dată'}
          />
        </div>
      </form>
      <article>
        <Table
          columns={columns}
          data={tableData}
          onModify={(id) => router.push(`exit-documents/update/${id}`)}
          onDownload={(id) => onDownload(id)}
          onDelete={(id) => onDelete(id)}
        />
        <div className="pt-5 pb-5">
          {Array.isArray(tableData) && tableData.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </div>
      </article>
    </section>
  );
}
