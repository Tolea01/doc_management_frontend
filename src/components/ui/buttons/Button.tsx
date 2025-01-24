import './style.css';
import React from 'react';

interface ButtonProps {
  value: string | React.ReactNode;
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
