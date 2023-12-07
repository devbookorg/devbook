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
        btnStyle="btn-sm"
        handleClick={() => handleChangePage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <Icon name="chevronLeft" className="h-5 w-5 stroke-deepGreen" />
      </Button>
      {range.map((page) => (
        <Button
          btnStyle="btn-sm"
          key={page}
          styles={page === currentPage ? 'text-deepGreen' : ''}
          handleClick={() => handleChangePage(page)}
        >
          {page}
        </Button>
      ))}
      <Button
        btnStyle="btn-sm"
        handleClick={() => handleChangePage(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <Icon name="chevronRight" className="h-5 w-5 stroke-deepGreen" />
      </Button>
    </section>
  );
};

export default Pagination;
