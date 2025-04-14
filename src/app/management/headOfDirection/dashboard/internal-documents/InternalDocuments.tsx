'use client';

import Badge from '@components/badges/Badge';
import DatePickerField from '@components/fields/DatePicker';
import InputField from '@components/fields/InputField';
import SelectInputField from '@components/fields/SelectInputField';
import Table from '@components/tables/Table';
import { entryDocumentService } from '@services/entry-document/entry-document.service';
import { useQuery } from '@tanstack/react-query';
import { isSameDay, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { useAuth } from '../../../../../hooks/useAuth';
import getDocumentBadgeVariant from '../../../../../utils/getDocumentBadgeVariant';
import getDocumentStatusOptions from '../../../../../utils/getDocumentStatus';
import Loader from '@components/loaders/Loader'
import { internalDocumentService } from '@services/internal-document/internal-document.service'

export default function EntryDocuments() {
  const { control } = useForm();
  const selectOptions = getDocumentStatusOptions();
  const { user } = useAuth();
  const [filteredData, setFilteredData] = useState([]);
  const filters = useWatch({
    control,
    name: ['number', 'status', 'date', 'execution_time'],
  });

  const [number, status, date, execution_time] = filters;

  const { data, isLoading } = useQuery({
    queryKey: ['internalDocuments'],
    queryFn: () => internalDocumentService.getByCoordinator(user?.userId),
  });

  useEffect(() => {
    if (data?.data) {
      let result = data.data;

      if (number) {
        result = result.filter((doc) =>
          doc.number.toLowerCase().includes(number.toLowerCase()),
        );
      }

      if (status?.value) {
        result = result.filter((doc) => doc.status === status.label);
      }

      if (date) {
        result = result.filter((doc) => isSameDay(parseISO(doc.date), date));
      }

      if (execution_time) {
        result = result.filter((doc) =>
          isSameDay(parseISO(doc.execution_time), execution_time),
        );
      }

      setFilteredData(result);
    }
  }, [number, status, date, execution_time, data]);

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Număr', key: 'number' },
    { label: 'Data', key: 'date' },
    { label: 'Executori', key: 'executor' },
    { label: 'Coordonatori', key: 'coordinator' },
    { label: 'Statut', key: 'status' },
    { label: 'Termen', key: 'execution_time' },
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
    coordinator: doc.coordinators.map((e) => (
      <div key={e.id} className="mb-1">
        {e.name} {e.surname}
      </div>
    )),
    status: <Badge variant={getDocumentBadgeVariant(doc.status)} name={doc.status} />,
    execution_time: doc.execution_time,
  }));

  if (isLoading) return <Loader />;

  return (
    <section>
      <header className="page-header">
        <h1 className="page-title">Documente de intrare</h1>
      </header>
      <form className="search-document-form">
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
          <DatePickerField
            className="w-full"
            control={control}
            name="execution_time"
            id="entry-document-execution-time-select"
            placeholder={'Caută după termen'}
          />
        </div>
      </form>
      <article>
        <Table columns={columns} data={tableData} onDownload={onDownload} />
      </article>
    </section>
  );
}
