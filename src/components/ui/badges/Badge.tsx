import './style.css';

type BadgeVariant = 'danger' | 'info' | 'success' | 'warning' | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  name: string;
}

export default function Badge({ variant = 'default', name }: BadgeProps) {
  return <span className={`badge ${variant}`}>{name}</span>;
}
