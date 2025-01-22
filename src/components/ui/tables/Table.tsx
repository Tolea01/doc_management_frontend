'use client';

import { useState } from 'react';
import './style.css';

interface TableProps {
  columns: string[];
  data: { [key: string]: any }[];
}

export default function Table({ columns, data }: TableProps) {
  return (
    <div className="table-container">
      <table className="table">
        <thead className="table-head">
          <tr>
            {columns.map((col, index) => (
              <th key={index} scope="col" className="table-th">
                {col}
              </th>
            ))}
            <th scope="col" className="table-th">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="table-row">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="table-td">
                  {row[col]}
                </td>
              ))}
              <td className="table-td">
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
