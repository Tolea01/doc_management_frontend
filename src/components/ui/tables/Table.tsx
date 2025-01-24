'use client';

import './style.css';
import { useAuth } from '../../../hooks/useAuth';
import { UserRole } from '@enums/user-role.enum';
import { FaRegEdit } from 'react-icons/fa';
import { HiOutlineDocumentRemove } from 'react-icons/hi';

interface TableProps {
  columns: string[];
  data: any;
}

export default function Table({ columns, data }: TableProps) {
  const { role } = useAuth();
  const allowEditAccess: boolean =
    role === UserRole.SECRETARY || role === UserRole.DIRECTOR;

  console.log(data[0]);

  if (!Array.isArray(data)) {
    return (
      <div className="error-message">
        <p>Datele nu sunt disponibile sau au un format incorect.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead className="table-head">
          <tr>
            {columns.map((col: string, index: number) => (
              <th key={index} scope="col" className="table-th">
                {col}
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
              {/*<td className="table-td">{data[row]}</td>*/}
              {columns.map((col: string, colIndex: number) => (
                <td key={colIndex} className="table-td">
                  {<p>dsasd</p>}
                </td>
              ))}
              {allowEditAccess && (
                <td className="table-td md:space-x-5 md:flex justify-center">
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
