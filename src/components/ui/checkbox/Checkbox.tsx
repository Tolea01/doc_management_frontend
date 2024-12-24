import './style.css';

interface CheckboxProps {
  id?: string;
  label: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export default function Checkbox({
  id,
  label,
  checked,
  onChange,
  disabled,
  className,
  inputProps,
}: CheckboxProps) {
  const generatedId = id || `checkbox-${Math.random().toString(36).slice(2, 11)}`;

  return (
    <label htmlFor={generatedId} className={`${className} checkbox-label`}>
      <div className="checkbox-container">
        &#8203;
        <input
          type="checkbox"
          id={generatedId}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`checkbox-input ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
          {...inputProps}
        />
      </div>
      <div className="checkbox-label-container">
        <span className="checkbox-label-text">{label}</span>
      </div>
    </label>
  );
}
