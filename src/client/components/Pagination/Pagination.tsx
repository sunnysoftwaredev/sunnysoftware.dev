import type { FunctionComponent } from 'react';
import React, { useCallback } from 'react';
import styles from './Pagination.scss';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (a: number) => number;
};

const Pagination: FunctionComponent<PaginationProps>
= ({ totalPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(totalPages + 1).keys()].slice(1);

  const goToNextPage = useCallback(() => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, setCurrentPage, totalPages]);
  const goToPrevPage = useCallback(() => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage, setCurrentPage]);
  return (
    <div className={styles.container}>
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <a
            className="page-link"
            onClick={goToPrevPage}
            href="#"
          >

            Previous
          </a>
        </li>
        {pageNumbers.map(pgNumber => (
          <li
            key={pgNumber}
            className={`page-item ${currentPage == pgNumber ? 'active' : ''} `}
          >

            <a
              onClick={() => setCurrentPage(pgNumber)}
              className="page-link"
              href="#"
            >

              {pgNumber}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            className="page-link"
            onClick={goToNextPage}
            href="#"
          >

            Next
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
