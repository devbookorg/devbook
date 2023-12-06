import IQuestion from '@/types/questions';
import React from 'react';
import Button from './Button';
import formatUnixTime from '@/utils/functions/formatUnixTime';
import { useModal } from '@/hooks/useModal';

interface Props {
  children?: React.ReactNode;
}

const Question = (props: IQuestion & Props) => {
  const { openModal } = useModal();
  const { category, title, answer, children, dataCreated } = props;
  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          openModal({
            center: true,
            children: (
              <div className="flex w-60 flex-col gap-6">
                <Button btnStyle={`btn-${category}`} styles="btn-categoryBtn">
                  {category}
                </Button>
                <div>{title}</div>
                <div className="max-w-full break-words">{answer}</div>
              </div>
            ),
          });
        }}
        className="flex  justify-between border-b-[1px] border-lightGray  p-3 hover:bg-gray hover:bg-opacity-10"
      >
        <section className="flex w-[calc(100%-100px)] flex-col gap-1">
          <Button btnStyle={`btn-${category}`} styles="btn-categoryBtn">
            {category}
          </Button>
          <h3>{title}</h3>
          <p className=" max-h-5 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray">
            {answer}
          </p>
        </section>
        <div
          className="flex flex-1 flex-col items-end justify-between gap-1"
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
