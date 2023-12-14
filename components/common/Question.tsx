import IQuestion from '@/types/questions';
import React from 'react';
import formatUnixTime from '@/utils/functions/formatUnixTime';
import Badge from './Badge';
import { useRouter } from 'next/navigation';

interface Props {
  children?: React.ReactNode;
}

const Question = (props: IQuestion & Props) => {
  const { category, title, answer, children, dataCreated, id } = props;
  const router = useRouter();

  return (
    <>
      <div
        onClick={() => router.push(`/questions/${id}`)}
        className={`flex justify-between border-b-[1px] border-lightGray  px-2 py-3  hover:cursor-pointer hover:bg-opacity-40`}
      >
        <section className="flex w-[calc(100%-100px)] flex-col gap-1  ">
          <div className="flex gap-1">
            {category.map((item, index) => (
              <Badge key={`${item}_${index}`} value={item} />
            ))}
          </div>
          <h3 className="flex gap-2 overflow-hidden ">
            <p className="overflow-hidden text-ellipsis whitespace-nowrap">{title}</p>
          </h3>
          <p className=" max-h-5 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray">
            {answer}
          </p>
        </section>
        <div
          className="flex max-h-[74px] max-w-[100px] flex-1 flex-col items-end justify-between gap-1"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <span className="text-xs text-gray">{formatUnixTime(dataCreated.seconds)}</span>
          {children}
        </div>
      </div>
    </>
  );
};

export default Question;
