import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';

interface FileInputFieldProps {
  name: string;
  control: Control;
  label?: string;
  id: string;
  className?: string;
  rules?: object;
}

export default function FileInputField({
  name,
  control,
  label,
  id,
  className,
  rules = {},
}: FileInputFieldProps) {
  const [fileNames, setFileNames] = useState<string[]>([]);

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
            multiple
            onChange={(event) => {
              const files = event.target.files;
              if (files && files.length > 0) {
                const fileList = Array.from(files);
                setFileNames(fileList.map((file) => file.name));
                onChange(fileList);
              } else {
                setFileNames([]);
                onChange([]);
              }
            }}
          />
          <label
            htmlFor={id}
            className="px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-white hover:border hover:border-primary hover:text-primary transition text-sm text-center"
          >
            Selectează fișiere
          </label>
          <div className="text-sm text-gray-500">
            {fileNames.length > 0
              ? fileNames.map((file, index) => (
                  <p key={index} className="truncate">
                    📄 {file}
                  </p>
                ))
              : 'Nici un fișier selectat'}
          </div>
        </fieldset>
      )}
    />
  );
}
