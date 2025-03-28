import InputField from '@components/fields/InputField';
import SelectInputField from '@components/fields/SelectInputField';
import getUserRoleOptions from '../../../../../utils/getUserRole';
import './style.css';

interface UserFormProps {
  control: any;
  fileName?: string;
  onSubmitForm: () => any;
}

export default function UserForm({ control, onSubmitForm, fileName }: UserFormProps) {
  const userRoleOptions = getUserRoleOptions();
  return (
    <section className="input-container">
      <form className="input-form" onSubmit={onSubmitForm} autoComplete="off">
        <InputField
          type="text"
          label="Nume"
          className="document-input"
          placeholder="Introduceți numele utilizatorului"
          control={control}
          name="name"
          id="person-name"
          size="medium"
          rules={{ required: true }}
          autoComplete="off"
        />
        <InputField
          type="text"
          label="Prenume"
          className="document-input"
          placeholder="Introduceți prenumele utilizatorului"
          control={control}
          name="surname"
          id="user-surname"
          size="medium"
          rules={{ required: true }}
          autoComplete="off"
        />
        <InputField
          type="password"
          label="Parola"
          className="document-input"
          placeholder="Introduceți parola utilizatorului"
          control={control}
          name="password"
          id="user-password"
          size="medium"
          rules={{ required: false }}
          autoComplete="off"
        />
        <SelectInputField
          options={userRoleOptions}
          className="w-full"
          control={control}
          name="role"
          id="person-type"
          label="Rol"
          placeholder="Selectați rolul"
          rules={{ required: true }}
          isMulti={false}
        />
        <InputField
          type="text"
          label="Număr de telefon"
          className="document-input"
          placeholder="Introduceți numărul de telefon"
          control={control}
          name="phone_number"
          id="user-number"
          size="medium"
          rules={{ required: true }}
          autoComplete="off"
        />
        <InputField
          type="text"
          label="Adresa email"
          className="document-input"
          placeholder="Introduceți adresa de email"
          control={control}
          name="email_address"
          id="user-email_address"
          size="medium"
          rules={{ required: true }}
        />
      </form>
    </section>
  );
}
