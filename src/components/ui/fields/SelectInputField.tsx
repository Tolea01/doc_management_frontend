import { Controller } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import './styles.css';

interface SelectInputFieldProps {
  className?: string;
  control: any;
  name: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  rules?: object;
  label?: string;
  id: string;
  isMulti: boolean;
}

const animatedComponents = makeAnimated();

export default function SelectInputField({
  className = '',
  control,
  name,
  options,
  placeholder,
  rules = {},
  label,
  id,
  isMulti = false,
}: SelectInputFieldProps & { label: any; id: any }) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <fieldset className={`relative ${className}`}>
          <label htmlFor={id} className="input-label z-10">
            {label}
          </label>
          <Select
            {...field}
            inputId={id}
            options={options}
            placeholder={placeholder}
            onChange={(selectedOption) => field.onChange(selectedOption)}
            value={
              isMulti
                ? options.filter((option) =>
                    field.value?.some((val: any) => val.value === option.value),
                  )
                : options.find((option) => option.value === field.value?.value)
            }
            components={animatedComponents}
            closeMenuOnSelect={!isMulti}
            isMulti={isMulti}
            classNamePrefix="custom-select"
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: '0.375rem',
                borderWidth: '2px',
                borderColor: 'rgb(203, 213, 225)',
                boxShadow: 'none',
                '&:hover': {
                  borderColor: 'rgb(148, 163, 184)',
                },
                '&:focus-within': {
                  borderColor: 'rgb(59, 130, 246)',
                },
              }),
              placeholder: (base) => ({
                ...base,
                color: 'rgb(156, 163, 175)',
              }),
              singleValue: (base) => ({
                ...base,
                color: 'rgb(30, 41, 59)',
              }),
              menu: (base) => ({
                ...base,
                boxShadow: '0 1px 2px rgb(0 0 0 / 0.05)',
                zIndex: 20,
              }),
              option: (base, { isFocused, isSelected }) => ({
                ...base,
                backgroundColor: isSelected
                  ? 'rgb(59, 130, 246)'
                  : isFocused
                    ? 'rgb(229, 231, 235)'
                    : 'transparent',
                color: isSelected ? 'white' : 'rgb(30, 41, 59)',
                cursor: 'pointer',
              }),
            }}
          />
        </fieldset>
      )}
    />
  );
}
