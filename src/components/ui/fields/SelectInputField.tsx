import './styles.css';

interface SelectInputFieldProps {
  className?: string;
  selectedValue: string;
  options: string[];
}

export default function SelectInputField({
  className,
  selectedValue,
  options,
}: SelectInputFieldProps) {
  return (
    <select className={`select-input ${className}`}>
      <option selected>{selectedValue}</option>
      {options.map((option, index) => (
        <option key={index}>{option}</option>
      ))}
    </select>
  );
}
