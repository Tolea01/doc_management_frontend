import React from 'react';
import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';
import { ro } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

interface DatePickerFieldProps {
  control: any;
  name: string;
  placeholder?: string;
  rules?: object;
  className?: string;
  label?: string;
  id: string;
}

export default function DatePickerField({
  control,
  name,
  placeholder,
  rules = {},
  className = '',
  label,
  id,
}: DatePickerFieldProps & { label: string; id: string }) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <fieldset className={`${className} relative`}>
          <label htmlFor={id} className="input-label z-50">
            {label}
          </label>
          <DatePicker
            {...field}
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            placeholderText={placeholder}
            className={`input-field`}
            id={id}
            locale={ro}
            dateFormat={'yyyy-MM-dd'}
            minDate={new Date('2025-01-01')}
          />
        </fieldset>
      )}
    />
  );
}
