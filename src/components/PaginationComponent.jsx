import React from 'react';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';
import '../assets/styles/paginationstyles.css';
import { Container } from 'react-bootstrap';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null; // No pagination if only one page
  }

  // Determine the range of page numbers to display
  const maxPagesToShow = 3;  // Maximum pages in the pagination window
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = startPage + maxPagesToShow - 1;

  // Ensure end page does not exceed the total pages and adjust start page if needed
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  // Generate the array of pages to be displayed
  const pages = Array.from({ length: (endPage - startPage + 1) }, (_, i) => startPage + i);

  return (
    <Container fluid className="pagination-container">
      <FaLongArrowAltLeft
        className="pagination-arrow"
        onClick={() => {
          if (currentPage > 1) {
            onPageChange(currentPage - 2);  // Move back one page
          }
        }}
        style={{ cursor: currentPage > 1 ? 'pointer' : 'default', opacity: currentPage > 1 ? 1 : 0.5 }}
      />
      {pages.map((number) => (
        <div
          key={number}
          className={`pagination-number ${currentPage === number ? 'active' : ''}`}
          onClick={() => onPageChange(number - 1)}  // Send zero-based index to the parent component
          style={{ cursor: 'pointer' }}
        >
          {number}
        </div>
      ))}
      <FaLongArrowAltRight
        className="pagination-arrow"
        onClick={() => {
          if (currentPage < totalPages) {
            onPageChange(currentPage);  // Move forward one page
          }
        }}
        style={{ cursor: currentPage < totalPages ? 'pointer' : 'default', opacity: currentPage < totalPages ? 1 : 0.5 }}
      />
    </Container>
  );
};

export default PaginationComponent;
