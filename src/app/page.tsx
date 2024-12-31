import { redirect } from 'next/navigation';

export default function Public() {
  redirect('/auth/login');
}
