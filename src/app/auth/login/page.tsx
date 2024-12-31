import { NO_INDEX_PAGE } from '@constants/seo.constants';
import { Metadata } from 'next';
import Login from './Login'

export const metadada: Metadata = {
  ...NO_INDEX_PAGE,
};

export default function LoginPage() {
  return <Login />;
}
