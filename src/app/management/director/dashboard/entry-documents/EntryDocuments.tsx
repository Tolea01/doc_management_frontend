'use client';

import Button from '@components/buttons/Button';
import InputField from '@components/fields/InputField';
import SelectInputField from '@components/fields/SelectInputField';
import Table from '@components/tables/Table';
import { useForm } from 'react-hook-form';
import './style.css';

export default function EntryDocuments() {
  const { control, handleSubmit } = useForm({ mode: 'onChange' });
  const selectOptions = ['valoare1', 'valoare2', 'valoare3'];
  const columns = ['Product name', 'Color', 'Category', 'Price'];
  const data = [
    {
      'Product name': 'Apple MacBook Pro 17"',
      Color: 'Silver',
      Category: 'Laptop',
      Price: '$2999',
    },
    {
      'Product name': 'Microsoft Surface Pro',
      Color: 'White',
      Category: 'Laptop PC',
      Price: '$1999',
    },
    {
      'Product name': 'Magic Mouse 2',
      Color: 'Black',
      Category: 'Accessories',
      Price: '$99',
    },
  ];

  return (
    <section>
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
          <Button size="small" variant="primary" value="adaugă" />
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
        <Table columns={columns} data={data} />
      </article>
    </section>
  );
}
