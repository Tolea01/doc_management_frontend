'use client';

import { UserRole } from '@enums/user-role.enum';
import { FaRegEdit } from 'react-icons/fa';
import { HiOutlineDocumentRemove } from 'react-icons/hi';
import { useAuth } from '../../../hooks/useAuth';
import './style.css';

interface TableProps {
  columns: { label: string; key: string }[];
  data: any[];
  onModify: () => any;
  onDelete: () => any;
}

export default function Table({ columns, data, onDelete, onModify }: TableProps) {
  const { role } = useAuth();
  const allowEditAccess: boolean =
    role === UserRole.SECRETARY || role === UserRole.DIRECTOR;

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead className="table-head">
          <tr>
            {columns.map((col: { label: string; key: string }, index: number) => (
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
          {data.map((row: any, rowIndex: number) => (
            <tr key={rowIndex} className="table-row">
              {columns.map((col: { label: string; key: string }, colIndex: number) => (
                <td key={colIndex} className="table-td">
                  {row[col.key] || '-'}
                </td>
              ))}
              {allowEditAccess && (
                <td className="table-td">
                  <div className="button-container">
                    <button className="flex gap-x-2 text-primary" onClick={onModify}>
                      Modifică <FaRegEdit size={17} />
                    </button>
                    <button
                      className="flex gap-x-2 text-red-500 mt-2 md:mt-0"
                      onClick={onDelete}
                    >
                      Șterge <HiOutlineDocumentRemove size={17} />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
