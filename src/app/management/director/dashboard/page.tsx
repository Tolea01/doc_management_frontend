import Table from '@components/tables/Table';
import { NO_INDEX_PAGE } from '@constants/seo.constants';
import { Metadata } from 'next';

export const metadada: Metadata = {
  ...NO_INDEX_PAGE,
};

export default function directorPage() {
  return (
    <>
    <h1 className='mb-3 text-lg'>Documente</h1>
      <Table />
    </>
  );
}
