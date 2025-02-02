'use client';

import Button from '@components/buttons/Button';
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
                    <Button
                      size="small"
                      variant="secondary"
                      value={
                        <>
                          Modifică <FaRegEdit size={15} />
                        </>
                      }
                      onClick={() => onModify(row.id)}
                    />
                    <Button
                      size="small"
                      variant="primary"
                      value={
                        <>
                          Descarcă <FaFileDownload size={15} />
                        </>
                      }
                      onClick={() => onDownload(row.id)}
                    />
                    <Button
                      size="small"
                      variant="danger"
                      value={
                        <>
                          Șterge <HiOutlineDocumentRemove size={15} />
                        </>
                      }
                      onClick={() => onDelete(row.id)}
                    />
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
