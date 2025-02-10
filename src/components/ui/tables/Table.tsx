'use client';

import { UserRole } from '@enums/user-role.enum';
import { FaFileDownload, FaRegEdit } from 'react-icons/fa';
import { HiOutlineDocumentRemove } from 'react-icons/hi';
import { useAuth } from '../../../hooks/useAuth';

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
  const allowEditAccess = role === UserRole.SECRETARY || role === UserRole.DIRECTOR;

  if (!Array.isArray(data) || data.length === 0) {
    return <p className="text-center text-gray-500">Nu există date disponibile.</p>;
  }

  return (
    // <div className="flex items-center justify-center">
      <div className="container w-full overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
          <thead className="bg-teal-400 text-white">
            <tr className="hidden sm:table-row">
              {columns.map((col, index) => (
                <th key={index} className="p-3 text-left">
                  {col.label}
                </th>
              ))}
              {allowEditAccess && <th className="p-3 text-left">Acțiuni</th>}
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="flex flex-col sm:table-row border-b hover:bg-gray-100"
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="p-3 border sm:border-0">
                    {row[col.key] || '-'}
                  </td>
                ))}
                {allowEditAccess && (
                  <td className="p-3 border sm:border-0 flex gap-2">
                    <button
                      className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                      onClick={() => onModify(row.id)}
                    >
                      <FaRegEdit size={17} /> Modifică
                    </button>
                    <button
                      className="text-green-500 hover:text-green-700 flex items-center gap-1"
                      onClick={() => onDownload(row.id)}
                    >
                      <FaFileDownload size={17} /> Descarcă
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 flex items-center gap-1"
                      onClick={() => onDelete(row.id)}
                    >
                      <HiOutlineDocumentRemove size={17} /> Șterge
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    // </div>
  );
}
