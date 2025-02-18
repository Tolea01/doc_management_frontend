import DatePickerField from '@components/fields/DatePicker';
import FileInputField from '@components/fields/FileInputField';
import InputField from '@components/fields/InputField';
import SelectInputField from '@components/fields/SelectInputField';
import { personService } from '@services/person/person.service';
import { userService } from '@services/user/user.service';
import { useQuery } from '@tanstack/react-query';
import './style.css';

interface EntryDocumentFormProps {
  control: any;
  fileName?: string
  onSubmitForm: () => any;
}

export default function EntryDocumentForm({
  control,
  onSubmitForm,
  fileName
}: EntryDocumentFormProps) {
  const {
    data: users,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getAll(),
  });

  const {
    data: persons,
    isLoading: personLoading,
    error: personError,
  } = useQuery({
    queryKey: ['persons'],
    queryFn: () => personService.getAll(),
  });

  const userOptions =
    users?.data?.data?.map((user: { id: string; name: string }) => ({
      value: user.id,
      label: user.name,
    })) || [];

  const personOptions =
    persons?.data?.items?.map((person: { id: string; name: string }) => ({
      value: person.id,
      label: person.name,
    })) || [];

  return (
    <section className="input-container">
      <form className="input-form" onSubmit={onSubmitForm}>
        <InputField
          type="text"
          label="Număr intrare"
          className="document-input"
          placeholder="Introduceți numărul de intrare"
          control={control}
          name="entry_number"
          id="entry-document-entrynumber"
          size="medium"
          rules={{ required: true }}
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
          rules={{ required: true }}
        />
        <SelectInputField
          options={personOptions}
          className="w-full"
          control={control}
          name="sender"
          id="entry-document-sender"
          label="Expeditor"
          placeholder="Introduceți expeditorii"
          rules={{ required: true }}
          isMulti={false}
        />
        <SelectInputField
          options={personOptions}
          className="w-full"
          control={control}
          name="received"
          id="entry-document-received"
          label="Primit de"
          placeholder="Introduceți de la cine ați primit"
          rules={{ required: true }}
          isMulti={false}
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
          name="resolution"
          id="entry-document-number"
          size="medium"
          rules={{ required: true }}
        />
        <DatePickerField
          className="w-full"
          placeholder="Introduceți data de intrare"
          control={control}
          name="entry_date"
          id="entry-document-entry-date"
          label="Data de intrare"
          rules={{ required: true }}
        />
        <DatePickerField
          className="w-full"
          placeholder="Introduceți data"
          control={control}
          name="date"
          label="Data"
          id="entry-document-date"
          rules={{ required: true }}
        />
        <SelectInputField
          options={userOptions}
          className="w-full"
          placeholder="Introduceți executorii"
          control={control}
          name="executors"
          label="Executori"
          id="entry-document-executors"
          rules={{ required: true }}
          isMulti={true}
        />
        <SelectInputField
          options={userOptions}
          className="w-full"
          placeholder="Introduceți coordonatorii"
          control={control}
          name="coordinators"
          id="entry-document-coordinators"
          label="Coordonatori"
          rules={{ required: true }}
          isMulti={true}
        />
        <DatePickerField
          className="w-full"
          control={control}
          name="execution_time"
          id="entry-document-execution_time"
          label="Timpul de execuție"
          placeholder="Introduceți termenul limită"
          rules={{ required: true }}
        />
        <FileInputField
          name="documentFile"
          control={control}
          className="w-1/2"
          id="upload-file"
          fileName={fileName}
        />
      </form>
    </section>
  );
}
