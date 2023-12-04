import IQuestion from '@/types/questions';
import React from 'react';
import Button from './Button';
import formatUnixTime from '@/utils/functions/formatUnixTime';

interface Props {
  children?: React.ReactNode;
}

const Question = (props: IQuestion & Props) => {
  const { category, title, answer, children, dataCreated } = props;
  return (
    <>
      <div className="flex justify-between p-3">
        <section className="flex flex-col gap-1 ">
          <Button btnStyle={`btn-${category}`} styles="btn-categoryBtn">
            {category}
          </Button>
          <h3>{title}</h3>
          <p className="text-xs text-gray">{answer}</p>
        </section>
        <div>
          <span className="text-xs text-gray">{formatUnixTime(dataCreated.seconds)}</span>
          {children}
        </div>
      </div>
      <hr className="border-lightGray" />
    </>
  );
};

export default Question;
