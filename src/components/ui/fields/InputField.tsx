import { useState } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import './styles.css';

interface FieldsProps<T extends FieldValues> {
  name: keyof T;
  control?: Control<T>;
  defaultValue?: string;
  label: string;
  type: string;
  id: string;
  placeholder?: string;
  className?: string;
  inputProps?: React.InputHTMLAttributes<HTMLElement>;
  disabled?: boolean;
  size: 'small' | 'medium' | 'large' | 'extra-large';
}

export default function InputField<T extends FieldValues>({
  name,
  defaultValue = '',
  control,
  label,
  type,
  id,
  placeholder,
  className,
  inputProps,
  disabled,
  size,
}: FieldsProps<T>): JSX.Element {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputType = type === 'password' && isPasswordVisible ? 'text' : type;

  return (
    <Controller
      control={control as Control}
      name={name as string}
      defaultValue={defaultValue}
      rules={{ required: true }}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <fieldset className={`input-fieldset ${className}`}>
          <label className="input-label" htmlFor={id}>
            {label}
          </label>
          <input
            id={id}
            className={`input-field ${size}`}
            type={inputType}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            ref={ref}
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
      )}
    />
  );
}
