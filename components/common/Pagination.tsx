import React from 'react';
import Button from './Button';
import { ButtonIcon } from './Icon';

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
      <div className="relative my-4 flex items-center gap-2">
        {currentPage !== startPage && (
          <ButtonIcon
            btnStyle="lg-ghost"
            iconName="chevronLeft"
            svgStyles="h-5 w-5 stroke-deepGreen"
            buttonStyles="p-0 absolute left-[-50%]"
            handleClick={() => handleChangePage(currentPage - 1)}
            disabled={currentPage <= 1}
          />
        )}
        {range.map((page) => (
          <Button
            btnStyle="sm-ghost"
            key={page}
            styles={`${
              page === currentPage
                ? 'text-deepGreen text-base underline underline-offset-4'
                : 'text-sm'
            } `}
            handleClick={() => handleChangePage(page)}
          >
            {page}
          </Button>
        ))}
        {currentPage !== endPage && (
          <ButtonIcon
            btnStyle="lg-ghost"
            iconName="chevronRight"
            svgStyles="h-5 w-5 stroke-deepGreen"
            buttonStyles="p-0 absolute right-[-50%]"
            handleClick={() => handleChangePage(currentPage + 1)}
            disabled={currentPage >= totalPages}
          />
        )}
      </div>
    </section>
  );
};

export default Pagination;
