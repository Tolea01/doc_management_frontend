import './style.css';

interface ButtonProps {
  value: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  variant: 'primary' | 'secondary' | 'danger';
  size: 'small' | 'medium' | 'large';
}

export default function Button({
  value,
  onClick,
  type = 'button',
  disabled,
  className,
  variant,
  size,
}: ButtonProps): JSX.Element {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button ${variant} ${size} ${disabled ? 'disavled' : ''} ${className}`}
    >
      {value}
    </button>
  );
}
