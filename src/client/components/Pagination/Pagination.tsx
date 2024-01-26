import type { FunctionComponent } from 'react';
import React, { useCallback } from 'react';
import classNames from 'classnames';
import ChevronLeftIcon from '../../static/svgs/ChevronLeftIcon';
import ChevronRightIcon from '../../static/svgs/ChevronRightIcon';
import styles from './Pagination.scss';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  changePage: (a: number) => void;
};

const Pagination: FunctionComponent<PaginationProps>
= ({ totalPages, currentPage, changePage }) => {
  const pageNumbersArray = [...Array(totalPages + 1).keys()].slice(1);

  const goToNextPage = useCallback(() => {
    if (currentPage !== totalPages) {
      changePage(currentPage + 1);
    }
  }, [currentPage, changePage, totalPages]);

  const goToPrevPage = useCallback(() => {
    if (currentPage !== 1) {
      changePage(currentPage - 1);
    }
  }, [currentPage, changePage]);

  const setPage = (pageNumber: number):
  () => void => (): void => {
    changePage(pageNumber);
  };
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.pageLink}>
          <a
            onClick={goToPrevPage}
            href="#"
          >
            <ChevronLeftIcon />
          </a>
        </li>
        {pageNumbersArray.map(pgNumber => (
          <li
            key={pgNumber}
            className={classNames({
              [styles.currentPageLink]: currentPage === pgNumber,
              [styles.pageLink]: !(currentPage === pgNumber),
            })}
          >
            <a
              onClick={setPage(pgNumber)}
              href="#"
            >
              {pgNumber}
            </a>
          </li>
        ))}
        <li className={styles.pageLink}>
          <a
            onClick={goToNextPage}
            href="#"
          >
            <ChevronRightIcon />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
