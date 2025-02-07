'use client';

import { UserRole } from '@enums/user-role.enum';
import { FaFileDownload, FaRegEdit } from 'react-icons/fa';
import { HiOutlineDocumentRemove } from 'react-icons/hi';
import { useAuth } from '../../../hooks/useAuth';
import './style.css';

interface TableProps {
  columns: { label: string; key: string }[];
  data: any[];
  onModify: (id: string) => any;
  onDelete: (id: string) => any;
  onDownload: (id: string) => any;
}

export default function Table({
  columns,
  data,
  onDelete,
  onModify,
  onDownload,
}: TableProps) {
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
                    <button
                      className="flex gap-x-2 text-primary hover:text-blue-800"
                      onClick={() => onModify(row.id)}
                    >
                      Modifică <FaRegEdit size={17} />
                    </button>
                    <button
                      className="flex gap-x-2 text-green-500 hover:text-green-700"
                      onClick={() => onDownload(row.id)}
                    >
                      Descarcă <FaFileDownload size={17} />
                    </button>
                    <button
                      className="flex gap-x-2 text-red-500 mt-2 md:mt-0 hover:text-red-700"
                      onClick={() => onDelete(row.id)}
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
