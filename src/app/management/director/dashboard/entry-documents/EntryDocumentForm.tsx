import './style.css';
import InputField from '@components/fields/InputField';
import { useForm } from 'react-hook-form';

export default function EntryDocumentForm() {
  const { control } = useForm({ mode: 'onChange' });
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
      </form>
    </section>
  );
}
