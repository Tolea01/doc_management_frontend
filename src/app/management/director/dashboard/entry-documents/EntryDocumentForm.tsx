import './style.css';
import InputField from '@components/fields/InputField';
import { useForm } from 'react-hook-form';
import SelectInputField from '@components/fields/SelectInputField';
import DatePickerField from '@components/fields/DatePicker';

export default function EntryDocumentForm() {
  const { control } = useForm({ mode: 'onChange' });
  const selectOptions = [
    { value: 'option1', label: 'Opțiunea 1' },
    { value: 'option2', label: 'Opțiunea 2' },
    { value: 'option3', label: 'Opțiunea 3' },
  ];
  return (
    <section className="input-container">
      <form className="input-form">
        <InputField
          type="text"
          label="Număr intrare"
          className="document-input"
          placeholder="Introduceți numărul de intrare"
          control={control}
          name="entry_number"
          id="entry-document-entrynumber"
          size="medium"
        />
        <InputField
          type="text"
          label="Număr"
          className="document-input"
          placeholder="Introduceți numărul documentului"
          control={control}
          name="number"
          id="entry-document-number"
          size="medium"
        />
        <InputField
          type="text"
          label="Expeditor"
          className="document-input"
          placeholder="Introduceți numărul documentului"
          control={control}
          name="password"
          id="entry-document-number"
          size="medium"
        />
        <SelectInputField
          options={selectOptions}
          className="w-full"
          control={control}
          name="option1"
        />
        <SelectInputField
          options={selectOptions}
          className="w-full"
          control={control}
          name="option1"
        />
        <InputField
          type="text"
          label="Comentariu"
          className="document-input"
          placeholder="Introduceți comentariu"
          control={control}
          name="comment"
          id="entry-document-number"
          size="medium"
        />
        <InputField
          type="text"
          label="Rezoluția"
          className="document-input"
          placeholder="Introduceți rezoluția"
          control={control}
          name="password"
          id="entry-document-number"
          size="medium"
        />
        <DatePickerField className="w-full" control={control} name="date1" />
        <DatePickerField className="w-full" control={control} name="date2" />
        <SelectInputField
          options={selectOptions}
          className="w-full"
          control={control}
          name="option1"
        />
        <SelectInputField
          options={selectOptions}
          className="w-full"
          control={control}
          name="option1"
        />
        <DatePickerField className="w-full" control={control} name="date2" />
      </form>
    </section>
  );
}
