'use client';

import Button from '@components/buttons/Button';
import InputField from '@components/fields/InputField';
import SelectInputField from '@components/fields/SelectInputField';
import Pagination from '@components/pagination/Pagination';
import Table from '@components/tables/Table';
import { personService } from '@services/person/person.service';
import { useQuery } from '@tanstack/react-query';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdNoteAdd } from 'react-icons/md';
import { toast } from 'sonner';
import getPersonTypeOptions from '../../../../../utils/getPersonType';

export default function Person() {
  const { control, watch } = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const selectOptions = getPersonTypeOptions();
  const searchFilters = watch();
  const router: AppRouterInstance = useRouter();

  const filters = useMemo(() => {
    return Object.fromEntries(
      Object.entries(searchFilters || {})
        .filter(([_, value]) => value !== null && value !== '' && value !== undefined)
        .map(([key, value]) => {
          if (key === 'type' && value?.label) {
            return [key, value.label];
          }
          return [key, value];
        }),
    );
  }, [searchFilters]);

  const { data, isLoading } = useQuery({
    queryKey: ['persons', currentPage, filters],
    queryFn: () => personService.getAll(currentPage, itemsPerPage, filters),
  });

  const totalItems: any = data?.data.meta.totalItems || 0;
  const totalPages: number = Math.ceil(totalItems / itemsPerPage);

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Tip', key: 'type' },
    { label: 'Nume', key: 'name' },
    { label: 'Adresa', key: 'address' },
    { label: 'Adresa email', key: 'email_address' },
  ];

  const onDelete = async (id: any) => {
    try {
      await personService.delete(id);
      window.location.reload();
    } catch (error) {
      toast.error('Eroare la ștergerea fișierului fișierului');
    }
  };

  console.log(data)

  const tableData = data?.data.items.map((person: any) => ({
    id: person.id,
    type: person.type,
    name: person.name,
    address: person.address,
    email_address: person.email_address,
  }));

  return (
    <section>
      <header className="page-header">
        <h1 className="page-title">Persoane</h1>
      </header>
      <form className="search-document-form">
        <div className="mb-4 lg:mb-0">
          <InputField
            name="name"
            label="Caută persoana"
            control={control}
            id="person-search"
            type="search"
            className="w-full lg:w-[250px]"
            size="medium"
            placeholder={'Introdu numele persoanei'}
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
            onClick={() => router.push('persons/create')}
          />
          <SelectInputField
            options={selectOptions}
            className="w-full"
            control={control}
            name="type"
            id="person-type-select"
            placeholder={'Caută după tip'}
          />
        </div>
      </form>
      <article>
        <Table
          columns={columns}
          data={tableData}
          onModify={(id) => router.push(`persons/update/${id}`)}
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
