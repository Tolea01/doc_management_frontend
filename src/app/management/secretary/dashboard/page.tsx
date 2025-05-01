import { NO_INDEX_PAGE } from '@constants/seo.constants';
import { Metadata } from 'next';
import Chat from '../../../../components/chat/Chat';

export const metadada: Metadata = {
  ...NO_INDEX_PAGE,
};

export default function directorPage() {
  return <p> secretary home page</p>
}
