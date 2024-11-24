import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PaginationComponent = ({
  categoryName,
  searchQuery,
  paginationLinksNumber,
  pageNum,
  isRTL = false
}) => {
  const category = categoryName ? `category/${categoryName}/` : "";
  const search = searchQuery ? `search/${searchQuery}/` : "";
  const url = `/product-list/${category}${search}`;

  // Function to determine which page numbers to show
  const getPageNumbers = () => {
    const pageNumbers = [];
    const totalPages = paginationLinksNumber;
    const current = pageNum;
    const maxVisible = 6;

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than maxVisible
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);

      // Calculate start and end of middle section
      let start = Math.max(2, current - 2);
      let end = Math.min(totalPages - 1, current + 2);

      // Adjust if current is near the beginning
      if (current <= 4) {
        start = 2;
        end = 5;
      }

      // Adjust if current is near the end
      if (current > totalPages - 4) {
        start = totalPages - 4;
        end = totalPages - 1;
      }

      // Add ellipsis if needed
      if (start > 2) {
        pageNumbers.push('...');
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pageNumbers.push('...');
      }

      // Always include last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <nav 
      className={`flex justify-center items-center my-8 ${isRTL ? 'rtl' : 'ltr'}`}
      aria-label="Pagination"
    >
      <ul className="flex items-center gap-1">
        {/* Previous button */}
        <li>
          <Link
            to={`${url}${pageNum - 1}`}
            className={`flex items-center justify-center w-10 h-10 rounded-md
              ${pageNum === 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-200 hover:bg-gray-100'
              } transition-colors duration-200`}
            aria-disabled={pageNum === 1}
            tabIndex={pageNum === 1 ? -1 : 0}
          >
            {isRTL ? <ChevronRight className="w-5 h-5" />:<ChevronLeft className="w-5 h-5" />} 
          </Link>
        </li>

        {/* Page numbers */}
        {getPageNumbers().map((number, index) => (
          <li key={index}>
            {number === '...' ? (
              <span className="w-10 h-10 flex items-center justify-center text-gray-500">
                ⋯
              </span>
            ) : (
              <Link
                to={`${url}${number}`}
                className={`flex items-center justify-center w-10 h-10 rounded-md
                  ${number === pageNum
                    ? 'bg-red-600 text-white'
                    : 'text-gray-200 hover:bg-gray-100'
                  } transition-colors duration-200`}
                aria-current={number === pageNum ? 'page' : undefined}
              >
                {number}
              </Link>
            )}
          </li>
        ))}

        {/* Next button */}
        <li>
          <Link
            to={`${url}${pageNum + 1}`}
            className={`flex items-center justify-center w-10 h-10 rounded-md
              ${pageNum === paginationLinksNumber
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-200 hover:bg-gray-100'
              } transition-colors duration-200`}
            aria-disabled={pageNum === paginationLinksNumber}
            tabIndex={pageNum === paginationLinksNumber ? -1 : 0}
          >
           {isRTL ? <ChevronLeft className="w-5 h-5" />:<ChevronRight className="w-5 h-5" />} 
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationComponent;