import DatePickerField from '@components/fields/DatePicker';
import FileInputField from '@components/fields/FileInputField';
import InputField from '@components/fields/InputField';
import SelectInputField from '@components/fields/SelectInputField';
import { userService } from '@services/user/user.service';
import { useQuery } from '@tanstack/react-query';
import './style.css';

interface InternalDocumentFormProps {
  control: any;
  fileName?: string;
  onSubmitForm: () => any;
}

export default function InternalDocumentForm({
  control,
  onSubmitForm,
  fileName,
}: InternalDocumentFormProps) {
  const {
    data: users,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getAll(),
  });

  const userOptions =
    users?.data?.data?.map((user: { id: string; name: string }) => ({
      value: user.id,
      label: user.name,
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
          name="number"
          id="internal-document-number"
          size="medium"
          rules={{ required: true }}
        />
        <InputField
          type="text"
          label="Comentariu"
          className="document-input"
          placeholder="Introduceți comentariu"
          control={control}
          name="comment"
          id="internal-document-comment"
          size="medium"
        />
        <InputField
          type="text"
          label="Rezoluția"
          className="document-input"
          placeholder="Introduceți rezoluția"
          control={control}
          name="resolution"
          id="internal-document-resolution"
          size="medium"
          rules={{ required: true }}
        />
        <DatePickerField
          className="w-full"
          placeholder="Introduceți data"
          control={control}
          name="date"
          label="Data"
          id="internal-document-date"
          rules={{ required: true }}
        />
        <SelectInputField
          options={userOptions}
          className="w-full"
          placeholder="Introduceți executorii"
          control={control}
          name="executors"
          label="Executori"
          id="internal-document-executors"
          rules={{ required: true }}
          isMulti={true}
        />
        <SelectInputField
          options={userOptions}
          className="w-full"
          placeholder="Introduceți coordonatorii"
          control={control}
          name="coordinators"
          id="internal-document-coordinators"
          label="Coordonatori"
          rules={{ required: true }}
          isMulti={true}
        />
        <DatePickerField
          className="w-full"
          control={control}
          name="execution_time"
          id="internal-document-execution_time"
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
