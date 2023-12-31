import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useCreateQuery = () => {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return { createQueryString };
};
