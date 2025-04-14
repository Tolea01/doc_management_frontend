'use client';

import DatePickerField from '@components/fields/DatePicker';
import InputField from '@components/fields/InputField';
import Loader from '@components/loaders/Loader';
import Table from '@components/tables/Table';
import { entryDocumentService } from '@services/entry-document/entry-document.service';
import { exitDocumentService } from '@services/exit-document/exit-document.service';
import { useQuery } from '@tanstack/react-query';
import { isSameDay, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { useAuth } from '../../../../../hooks/useAuth';

export default function ExitDocuments() {
  const { control } = useForm();
  const { user } = useAuth();
  const [filteredData, setFilteredData] = useState([]);
  const filters = useWatch({
    control,
    name: ['number', 'date'],
  });

  const [number, date] = filters;

  const { data, isLoading } = useQuery({
    queryKey: ['exitDocuments'],
    queryFn: () => exitDocumentService.getByExecutor(user?.userId),
  });

  useEffect(() => {
    if (data?.data) {
      let result = data?.data;

      if (number) {
        result = result.filter((doc) =>
          doc.number.toLowerCase().includes(number.toLowerCase()),
        );
      }

      if (date) {
        result = result.filter((doc) => isSameDay(parseISO(doc.date), date));
      }

      setFilteredData(result);
    }
  }, [number, data]);

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Număr', key: 'number' },
    { label: 'Data', key: 'date' },
    { label: 'Executori', key: 'executor' },
    { label: 'Primit de', key: 'received' },
  ];

  const onDownload = async (id) => {
    try {
      const document = await entryDocumentService.getById(id);
      const fileName = document.data?.file_path;
      await entryDocumentService.downloadFile(fileName);
    } catch (error) {
      toast.error('Eroare la descărcarea fișierului');
    }
  };

  const tableData = filteredData.map((doc) => ({
    id: doc.id,
    number: doc.number,
    date: doc.date,
    executor: doc.executors.map((e) => (
      <div key={e.id} className="mb-1">
        {e.name} {e.surname}
      </div>
    )),
    received: doc.received.name,
  }));

  if (isLoading) return <Loader />;

  return (
    <section>
      <header className="page-header">
        <h1 className="page-title">Documente de intrare</h1>
      </header>
      <form className="flex mb-4 gap-x-4">
        <div className="mb-4 lg:mb-0">
          <InputField
            name="number"
            label="Caută document"
            control={control}
            id="entry-document-search"
            type="search"
            className="w-full"
            size="medium"
            placeholder={'Introdu numărul documentului'}
          />
        </div>
        <div className="search-document-selector">
          <DatePickerField
            className="w-full"
            control={control}
            name="date"
            label="Caută după dată"
            id="entry-document-date-select"
            placeholder={'Caută după dată'}
          />
        </div>
      </form>
      <article>
        <Table columns={columns} data={tableData} onDownload={onDownload} />
      </article>
    </section>
  );
}
