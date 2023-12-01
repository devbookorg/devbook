import IQuestion from '@/types/questions';
import React from 'react';
import Button from '../common/Button';
import Icon from '../common/Icon';
import formatUnixTime from '@/utils/functions/formatUnixTime';
import { useModal } from '@/hooks/useModal';
import EditQuestion from './EditQuestion';
import QuestionForm from '../common/Form';

interface Props {}

const QuestionItem = (props: Props & IQuestion) => {
  const { title, answer, dataCreated, category, approved } = props;
  const { openModal } = useModal();
  return (
    <section className="flex flex-col items-end justify-between">
      <div className="flex items-center gap-2">
        {approved === 0 ? (
          <>
            <span className="text-xs text-gray">{formatUnixTime(dataCreated.seconds)}</span>
            <Button btnStyle="btn-state-sm" styles="text-deepGreen border-deepGreen">
              대기
            </Button>
          </>
        ) : (
          <>
            <Button btnStyle="btn-ghost">사유보기</Button>
            <Button btnStyle="btn-ghost">거부</Button>
          </>
        )}
      </div>
      <div className="flex">
        <>
          {approved !== 1 && (
            <Button
              btnStyle="btn-ghost"
              handleClick={() => {
                openModal({
                  // children: <EditQuestion title={title} answer={answer} category={category} />,
                  children: (
                    <div className="w-40 bg-white">
                      <QuestionForm />
                    </div>
                  ),
                });
              }}
            >
              <Icon name="edit" className="h-5 w-5  fill-deepGreen" />
            </Button>
          )}
        </>

        <Button btnStyle="btn-ghost">
          <Icon name="trash" className="h-5 w-5 fill-red" />
        </Button>
      </div>
    </section>
  );
};

export default QuestionItem;
