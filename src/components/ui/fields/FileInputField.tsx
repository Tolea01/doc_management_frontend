import { useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';

interface FileInputFieldProps {
  name: string;
  control: Control;
  label?: string;
  id: string;
  className?: string;
  rules?: object;
  fileName?: string;
}

export default function FileInputField({
  name,
  control,
  label,
  id,
  className,
  rules = {},
  fileName = '',
}: FileInputFieldProps) {
  const [currentFileName, setCurrentFileName] = useState<string>(fileName);

  useEffect(() => {
    setCurrentFileName(fileName);
  }, [fileName]);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange } }) => (
        <fieldset className={`flex flex-col gap-2 ${className}`}>
          <input
            type="file"
            id={id}
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                setCurrentFileName(file.name);
                onChange(file);
              } else {
                setCurrentFileName('');
                onChange(null);
              }
            }}
          />
          <label
            htmlFor={id}
            className="px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-white border hover:border-primary hover:text-primary transition text-sm text-center max-w-[200px]"
          >
            Selectează fișier
          </label>
          <div className="text-sm text-gray-500 max-w-[200px]">
            {currentFileName ? (
              <p className="truncate">📄 {currentFileName}</p>
            ) : (
              'Niciun fișier selectat'
            )}
          </div>
        </fieldset>
      )}
    />
  );
}
