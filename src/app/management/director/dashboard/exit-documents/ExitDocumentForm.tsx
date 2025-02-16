import DatePickerField from '@components/fields/DatePicker';
import FileInputField from '@components/fields/FileInputField';
import InputField from '@components/fields/InputField';
import SelectInputField from '@components/fields/SelectInputField';
import { personService } from '@services/person/person.service';
import { userService } from '@services/user/user.service';
import { useQuery } from '@tanstack/react-query';
import './style.css';

interface ExitDocumentFormProps {
  control: any;
  fileName?: string;
  onSubmitForm: () => any;
}

export default function ExitDocumentForm({
  control,
  onSubmitForm,
  fileName,
}: ExitDocumentFormProps) {
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
          label="Număr"
          className="document-input"
          placeholder="Introduceți numărul documentului"
          control={control}
          name="number"
          id="exit-document-number"
          size="medium"
          rules={{ required: true }}
        />
        <SelectInputField
          options={personOptions}
          className="w-full"
          control={control}
          name="received"
          id="exit-document-received"
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
          id="exit-document-number"
          size="medium"
        />
        <DatePickerField
          className="w-full"
          placeholder="Introduceți data de ieșire"
          control={control}
          name="date"
          id="exit-document-date"
          label="Data de ieșire"
          rules={{ required: true }}
        />
        <SelectInputField
          options={userOptions}
          className="w-full"
          placeholder="Introduceți executorii"
          control={control}
          name="executors"
          label="Executori"
          id="exit-document-executors"
          rules={{ required: true }}
          isMulti={true}
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
