'use client';

import Button from '@components/buttons/Button';
import InputField from '@components/fields/InputField';
import SelectInputField from '@components/fields/SelectInputField';
import Table from '@components/tables/Table';
import { useForm } from 'react-hook-form';
import './style.css';
import { useState } from 'react';
import Modal from '@components/modal/Modal';
import { useAuth } from '../../../../../hooks/useAuth';
import Loader from '@components/loaders/Loader';
import { useQuery } from '@tanstack/react-query';
import { entryDocumentService } from '@services/entry-document/entry-document.service';
import Pagination from '@components/pagination/Pagination';
import Badge from '@components/badges/Badge';
import getDocumentBadgeVariant from '../../../../../utils/getDocumentBadgeVariant';
import EntryDocumentForm from '@management/director/dashboard/entry-documents/EntryDocumentForm';
import DatePickerField from '@components/fields/DatePicker';
import getDocumentStatusOptions from '../../../../../utils/getDocumentStatus';
import { format } from 'date-fns';

export default function EntryDocuments() {
  const { control, handleSubmit, reset } = useForm({
    mode: 'onChange',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const { loading } = useAuth();
  const [filters, setFilters] = useState({});
  const { data, error, isLoading } = useQuery({
    queryKey: ['entryDocuments', currentPage, filters],
    queryFn: () => entryDocumentService.getAll(currentPage, itemsPerPage, filters),
  });
  const totalItems: any = data?.data?.total || 0;
  const totalPages: number = Math.ceil(totalItems / itemsPerPage);
  const selectOptions = getDocumentStatusOptions();

  const onSubmit = (data: any) => {
    const formattedData = Object.fromEntries(
      Object.entries(data)
        .filter(([_, value]) => value !== null && value !== '' && value !== undefined)
        .map(([key, value]) => {
          if (value instanceof Date) {
            return [key, format(value, 'yyyy-MM-dd')];
          }
          return [key, value];
        }),
    );

    setFilters(formattedData);
  };

  if (loading || isLoading) {
    return <Loader />;
  }

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Număr', key: 'number' },
    { label: 'Data', key: 'date' },
    { label: 'Executori', key: 'executor' },
    { label: 'Coordonatori', key: 'coordinator' },
    { label: 'Primit de', key: 'received' },
    { label: 'Expeditor', key: 'sender' },
    { label: 'Statut', key: 'status' },
    { label: 'Termen', key: 'execution_time' },
  ];

  const tableData = data?.data.data.map((doc: any) => ({
    id: doc.id,
    number: doc.number,
    date: doc.date,
    executor: doc.executors.map((e: any) => (
      <div key={e.id} className="mb-1">
        {e.name} {e.surname}
      </div>
    )),
    coordinator: doc.coordinators.map((e: any) => (
      <div key={e.id} className="mb-1">
        {e.name} {e.surname}
      </div>
    )),
    received: doc.received.name,
    sender: doc.sender.name,
    status: <Badge variant={getDocumentBadgeVariant(doc.status)} name={doc.status} />,
    execution_time: doc.execution_time,
  }));

  return (
    <section>
      <header className="page-header">
        <h1 className="page-title">Documente de intrare</h1>
      </header>
      <form className="search-document-form" onSubmit={handleSubmit(onSubmit)}>
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
            value="adaugă"
            onClick={() => setIsModalOpen(!isModalOpen)}
          />
          <SelectInputField
            options={selectOptions}
            className="w-full lg:w-1/4"
            control={control}
            name="status"
            id="entry-document-status-select"
            placeholder={'Caută după statut'}
          />
          <DatePickerField
            className="w-full lg:w-1/4"
            control={control}
            name="date"
            id="entry-document-date-select"
            placeholder={'Caută după dată'}
          />
          <DatePickerField
            className="w-full lg:w-1/4"
            control={control}
            name="execution_time"
            id="entry-document-execution-time-select"
            placeholder={'Caută după termen'}
          />
          <Button type="submit" size="small" variant="primary" value="Caută" />
        </div>
      </form>
      <article>
        <Table columns={columns} data={tableData} />
        <div className="pt-5 pb-5">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </article>
      <Modal
        modalHeader={'Adauga document'}
        modalBody={<EntryDocumentForm />}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => setIsModalOpen(false)}
      />
    </section>
  );
}
