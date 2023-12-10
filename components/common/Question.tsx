import IQuestion from '@/types/questions';
import React from 'react';
import formatUnixTime from '@/utils/functions/formatUnixTime';
import { useModal } from '@/hooks/useModal';
import Badge from './Badge';

interface Props {
  children?: React.ReactNode;
}

const Question = (props: IQuestion & Props) => {
  const { openModal } = useModal();
  const { category, title, answer, children, dataCreated } = props;

  return (
    <>
      <div
        onClick={() => {
          openModal({
            center: true,
            children: (
              <div className="flex w-60 flex-col gap-4">
                <div className="flex items-center gap-1">
                  {category.map((item) => (
                    <Badge value={item} />
                  ))}
                  <h4 className="max-w-[calc(100%-50px)] overflow-hidden text-ellipsis whitespace-nowrap">
                    {title}
                  </h4>
                </div>
                <div className="max-w-full break-all">{answer}</div>
              </div>
            ),
          });
        }}
        className="flex justify-between border-b-[1px] border-lightGray  p-3 hover:bg-gray hover:bg-opacity-10"
      >
        <section className="flex w-[calc(100%-100px)] flex-col gap-1  ">
          <div className="flex gap-1">
            {category.map((item) => (
              <Badge value={item} />
            ))}
          </div>
          <h3 className="overflow-hidden text-ellipsis whitespace-nowrap">{title}</h3>
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
