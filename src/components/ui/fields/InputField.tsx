import { useState } from 'react';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import './styles.css';

interface FieldsProps {
  label: string;
  type: string;
  id?: string;
  placeholder?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLElement>) => void;
  inputProps?: React.InputHTMLAttributes<HTMLElement>;
  disabled?: boolean;
}

export default function InputField({
  label,
  type,
  id,
  placeholder,
  className,
  onChange,
  inputProps,
  disabled,
}: FieldsProps): JSX.Element {
  const generatedId = id || `checkbox-${Math.random().toString(36).slice(2, 11)}`;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputType = type === 'password' && isPasswordVisible ? 'text' : type;

  return (
    <fieldset className={`input-fieldset ${className}`}>
      <label className="input-label" htmlFor={generatedId}>
        {label}
      </label>
      <input
        id={generatedId}
        className="input-field"
        type={inputType}
        placeholder={placeholder}
        disabled={disabled}
        {...inputProps}
      />
      {type === 'password' && (
        <button
          type="button"
          className="password-toogle"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          {isPasswordVisible ? <GoEyeClosed /> : <GoEye />}
        </button>
      )}
    </fieldset>
  );
}
