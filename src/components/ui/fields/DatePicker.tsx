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
}

export default function DatePickerField({
  control,
  name,
  placeholder = 'Selectează o dată',
  rules = {},
  className = '',
}: DatePickerFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div className={`datepicker-wrapper ${className}`}>
          <DatePicker
            {...field}
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            placeholderText={placeholder}
            className="p-2 border border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
            locale={ro}
          />
        </div>
      )}
    />
  );
}
