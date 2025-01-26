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

export default function EntryDocuments() {
  const { control, handleSubmit } = useForm({ mode: 'onChange' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading } = useAuth();
  const { data, error, isLoading } = useQuery({
    queryKey: ['entryDocuments'],
    queryFn: () => entryDocumentService.getAll(),
  });
  const selectOptions = ['valoare1', 'valoare2', 'valoare3'];

  if (loading || isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="error-message">
        <p>Nu am putut încărca documentele. Încercați din nou mai târziu.</p>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="empty-data">
        <p>Nu există documente disponibile.</p>
      </div>
    );
  } else {
    console.log(data?.data);
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

  const tableData = data.data.data.map((doc: any) => ({
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
    status: doc.status,
    execution_time: doc.execution_time,
  }));


  return (
    <section>
      <header className="page-header">
        <h1 className="page-title">Documente de intrare</h1>
      </header>
      <form className="search-document-form">
        <div className="mb-4 lg:mb-0">
          <InputField
            name="documentSearchValue"
            label="Caută document"
            control={control}
            id="entry-document-search"
            type="search"
            className="w-full lg:w-[250px]"
            size="small"
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
            selectedValue="alege opțiunea"
            className="w-full lg:w-1/4"
          />
          <SelectInputField
            options={selectOptions}
            selectedValue="alege opțiunea"
            className="w-full lg:w-1/4"
          />
          <SelectInputField
            options={selectOptions}
            selectedValue="alege opțiunea"
            className="w-full lg:w-1/4"
          />
        </div>
      </form>
      <article>
        <Table columns={columns} data={tableData} />
      </article>
      <Modal
        modalHeader={'Adauga document'}
        modalBody={<p>adauga document</p>}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => setIsModalOpen(false)}
      />
    </section>
  );
}
