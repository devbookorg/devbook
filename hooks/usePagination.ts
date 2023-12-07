import { useEffect, useState } from 'react';

export const usePagination = (total: number) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startPage, setStartPage] = useState<number>(1);
  const [endPage, setEndPage] = useState<number>(1);
  const pageRange = 5;
  const totalPages = Math.ceil(total / 3);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);

    const half = Math.floor(pageRange / 2);
    if (page <= half) {
      setStartPage(1);
      setEndPage(totalPages > pageRange ? pageRange : totalPages);
    } else if (totalPages - page < half) {
      setStartPage(totalPages - pageRange + 1);
      setEndPage(totalPages);
    } else {
      setStartPage(page - half);
      setEndPage(page + half);
    }
  };

  useEffect(() => {
    setEndPage(totalPages > pageRange ? pageRange : totalPages);
  }, [total, totalPages]);

  return { currentPage, startPage, endPage, totalPages, handleChangePage };
};
