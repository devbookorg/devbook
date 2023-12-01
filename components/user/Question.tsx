import IQuestion from '@/types/questions';
import React from 'react';
import Button from '../common/button/Button';
import Icon from '../common/Icon';
import formatUnixTime from '@/utils/functions/formatUnixTime';

interface Props {}

const Question = (props: Props & IQuestion) => {
  const { title, answer, dataCreated, category, message, approved } = props;

  return (
    <>
      <li className="flex justify-between p-3">
        <section className="flex flex-col gap-1 ">
          <Button btnStyle={`btn-${category}`} styles="btn-categoryBtn">
            {category}
          </Button>
          <h3>{title}</h3>
          <p className="text-xs text-gray">{answer}</p>
        </section>
        <section className="flex flex-col items-end justify-between">
          <div className="flex items-center gap-2">
            {approved === 0 ? (
              <>
                <span className="text-xs text-gray">{formatUnixTime(dataCreated.seconds)}</span>
                <Button btnStyle="btn-state" styles="text-deepGreen border-deepGreen">
                  대기
                </Button>
              </>
            ) : (
              <>
                <Button btnStyle="btn-ghost">사유보기</Button>
                <Button>거부</Button>
              </>
            )}
          </div>
          <div className="flex gap-2">
            <Icon name="edit" className="h-5 w-5  fill-deepGreen" />
            <Icon name="trash" className="h-5 w-5 fill-red" />
          </div>
        </section>
      </li>
      <hr className="border-lightGray" />
    </>
  );
};

export default Question;
