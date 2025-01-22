import { NO_INDEX_PAGE } from '@constants/seo.constants';
import { Metadata } from 'next';
import Modal from '@components/modal/Modal';

export const metadada: Metadata = {
  ...NO_INDEX_PAGE,
};

export default function directorPage() {
  return <Modal />;
}
