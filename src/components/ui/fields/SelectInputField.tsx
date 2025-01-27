import Select from 'react-select';
import { Controller } from 'react-hook-form';
import './styles.css';

interface SelectInputFieldProps {
  className?: string;
  control: any;
  name: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  rules?: object;
}

export default function SelectInputField({
  className = '',
  control,
  name,
  options,
  placeholder = 'Selectează',
  rules = {},
}: SelectInputFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div className={`relative ${className}`}>
          <Select
            {...field}
            options={options}
            placeholder={placeholder}
            onChange={(selectedOption) => field.onChange(selectedOption)}
            value={options.find((option) => option.value === field.value)}
            classNamePrefix="custom-select"
          />
        </div>
      )}
    />
  );
}
