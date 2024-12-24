import './styles.css';

interface FieldsProps {
  label: string;
  type: string;
  placeholder?: string;
  className?: string;
}

export default function InputField({
  label,
  type,
  placeholder,
  className,
}: FieldsProps): JSX.Element {
  return (
    <fieldset className={`input-fieldset ${className}`}>
      <label className="input-label" htmlFor={label}>
        {label}
      </label>
      <input id={label} className="input-field" type={type} placeholder={placeholder} />
    </fieldset>
  );
}
