'use client';

import './style.css';
import { useAuth } from '../../../hooks/useAuth';
import { UserRole } from '@enums/user-role.enum';
import { FaRegEdit } from 'react-icons/fa';
import { HiOutlineDocumentRemove } from 'react-icons/hi';

interface TableProps {
  columns: { label: string; key: string }[];
  data: any[];
}

export default function Table({ columns, data }: TableProps) {
  const { role } = useAuth();
  const allowEditAccess: boolean =
    role === UserRole.SECRETARY || role === UserRole.DIRECTOR;

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="error-message">
        <p>Nu există date disponibile sau formatul este incorect.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead className="table-head">
          <tr>
            {columns.map((col, index) => (
              <th key={index} scope="col" className="table-th">
                {col.label}
              </th>
            ))}
            {allowEditAccess && (
              <th scope="col" className="table-th">
                Acțiuni
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="table-row">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="table-td">
                  {row[col.key] || '-'}
                </td>
              ))}
              {allowEditAccess && (
                <td className="table-td md:space-x-5 md:flex justify-center items-center">
                  <button className={'flex text-primary'}>
                    Modifică <FaRegEdit className={'ml-2'} size={17} />
                  </button>
                  <button className={'flex text-red-500 mt-2 md:mt-0'}>
                    Șterge <HiOutlineDocumentRemove className={'ml-2'} size={17} />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
