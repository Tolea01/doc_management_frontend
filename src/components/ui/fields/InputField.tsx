import { useState } from 'react';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import './styles.css';

interface FieldsProps {
  label: string;
  type: string;
  id?: string;
  placeholder?: string;
  className?: string;
}

export default function InputField({
  label,
  type,
  id,
  placeholder,
  className,
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
