import IQuestion from '@/types/questions';
import React from 'react';
import Button from '../common/Button';
import Icon from '../common/Icon';
import { useModal } from '@/hooks/useModal';
import EditQuestion from './EditQuestion';
import QuestionForm from '../common/Form';
import Likes from '../common/Likes';
import { deleteQuestion } from '@/firebase/questions';
import ConfirmModal from '../common/ConfirmModal';

interface Props {
  user: string;
}

const QuestionItem = (props: Props & IQuestion) => {
  const { id, user, userId, title, answer, dataCreated, category, approved } = props;
  const { openModal, closeModal } = useModal();
  console.log(id, '??');

  let questionState = <></>;
  if (approved === 0) {
    questionState = (
      <Button btnStyle="btn-state-sm" styles="text-deepGreen border-deepGreen">
        대기
      </Button>
    );
  } else if (approved === 1) {
    questionState = (
      <>
        <span className="text-xs">사유보기</span>
        <Button btnStyle="btn-state-sm" styles="text-white bg-red">
          거부
        </Button>
      </>
    );
  } else {
    questionState = (
      <Button btnStyle="btn-state-sm" styles="bg-deepGreen text-white">
        승인
      </Button>
    );
  }

  return (
    <section className="flex flex-col items-end justify-between">
      <div className="flex items-center gap-2">{user === userId && questionState}</div>
      <div className="flex">
        {approved !== 2 && userId === user ? (
          <>
            <Button
              btnStyle="btn-ghost"
              handleClick={(e) => {
                e.stopPropagation();
                openModal({
                  children: (
                    <div className=" relative w-screen max-w-[36em] bg-white p-6">
                      <section className=" text-center">
                        <h1 className="my-4">질문 수정하기</h1>
                      </section>
                      <QuestionForm
                        question={{ questionId: id, category, title, answer }}
                        handleClick={closeModal}
                      />
                    </div>
                  ),
                });
              }}
            >
              <Icon name="edit" className="h-5 w-5  fill-deepGreen " />
            </Button>
            <Button
              btnStyle="btn-ghost"
              handleClick={(e) => {
                e.stopPropagation();
                openModal({
                  center: true,
                  children: (
                    <ConfirmModal
                      content="삭제하시겠습니까?"
                      onSuccess={() => deleteQuestion(id)}
                    />
                  ),
                });
              }}
            >
              <Icon name="trash" className="h-5 w-5 fill-red" />
            </Button>
          </>
        ) : (
          <Likes handleClick={() => {}} condition={true} />
        )}
      </div>
    </section>
  );
};

export default QuestionItem;
