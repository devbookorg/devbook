import React from 'react';
import Button from './Button';
import Icon from './Icon';

interface Props {
  currentPage: number;
  startPage: number;
  endPage: number;
  totalPages: number;
  handleChangePage: (page: number) => void;
}

const Pagination = (props: Props) => {
  const { currentPage, startPage, endPage, totalPages, handleChangePage } = props;
  const range = [];
  for (let i = startPage; i <= endPage; i++) {
    range.push(i);
  }
  return (
    <section className="flex items-center  justify-center">
      <Button
        btnStyle="lg-ghost"
        handleClick={() => handleChangePage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <Icon name="chevronLeft" className="h-5 w-5 stroke-deepGreen" />
      </Button>
      {range.map((page) => (
        <Button
          btnStyle="sm-ghost"
          key={page}
          styles={page === currentPage ? 'text-deepGreen text-base' : ''}
          handleClick={() => handleChangePage(page)}
        >
          {page}
        </Button>
      ))}
      <Button
        btnStyle="lg-ghost"
        handleClick={() => handleChangePage(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <Icon name="chevronRight" className="h-5 w-5 stroke-deepGreen" />
      </Button>
    </section>
  );
};

export default Pagination;
