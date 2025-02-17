import DatePickerField from '@components/fields/DatePicker';
import FileInputField from '@components/fields/FileInputField';
import InputField from '@components/fields/InputField';
import SelectInputField from '@components/fields/SelectInputField';
import './style.css';
import getPersonTypeOptions from '../../../../../utils/getPersonType'

interface PersonFormProps {
  control: any;
  fileName?: string;
  onSubmitForm: () => any;
}

export default function PersonForm({ control, onSubmitForm, fileName }: PersonFormProps) {
  const personTypeOptions = getPersonTypeOptions();
  return (
    <section className="input-container">
      <form className="input-form" onSubmit={onSubmitForm}>
        <InputField
          type="text"
          label="Nume"
          className="document-input"
          placeholder="Introduceți numele persoanei"
          control={control}
          name="name"
          id="person-name"
          size="medium"
          rules={{ required: true }}
        />
        <SelectInputField
          options={personTypeOptions}
          className="w-full"
          control={control}
          name="type"
          id="person-type"
          label="Tip"
          placeholder="Selectați tipul"
          rules={{ required: true }}
          isMulti={false}
        />
        <InputField
          type="text"
          label="Adresa"
          className="document-input"
          placeholder="Introduceți adresa"
          control={control}
          name="address"
          id="person-address"
          size="medium"
        />
        <InputField
          type="text"
          label="Adresa email"
          className="document-input"
          placeholder="Introduceți adresa de email"
          control={control}
          name="email_address"
          id="person-email_address"
          size="medium"
        />
      </form>
    </section>
  );
}
