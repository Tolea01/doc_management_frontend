import { NO_INDEX_PAGE } from '@constants/seo.constants';
import { Metadata } from 'next';

export const metadada: Metadata = {
  ...NO_INDEX_PAGE,
};

export default function directorPage() {
  return <p>secretary page</p>;
}
