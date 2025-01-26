'use client';

import './style.css'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex space-x-1">
      <button className="btn ml-2" onClick={handlePrevious} disabled={currentPage === 1}>
        Înapoi
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`btn ml-2 ${currentPage === index + 1 ? 'btn-primary' : ''}`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button className="btn ml-2" onClick={handleNext} disabled={currentPage === totalPages}>
        Înainte
      </button>
    </div>
  );
}
