import IQuestion from '@/types/questions';
import React from 'react';
import Button from '../common/Button';
import Icon from '../common/Icon';
import { useModal } from '@/hooks/useModal';
import QuestionForm from '../common/Form';
import Likes from '../common/Likes';
import { deleteQuestion } from '@/firebase/questions';
import ConfirmModal from '../common/ConfirmModal';

interface Props {
  user: string;
  loadWroteQuestions: () => void;
}

const QuestionItem = (props: Props & IQuestion) => {
  const { id, user, userId, title, answer, message, category, approved, loadWroteQuestions } =
    props;
  const { openModal, closeModal } = useModal();

  let questionState = <></>;
  if (approved === 0) {
    questionState = <Button btnStyle="sm-line-deepGreen">대기</Button>;
  } else if (approved === 1) {
    questionState = <Button btnStyle="sm-fill-deepGreen">승인</Button>;
  } else {
    questionState = (
      <>
        <Button
          btnStyle="sm-line-deepGreen"
          styles="text-xs whitespace-nowrap"
          handleClick={() => {
            openModal({
              center: true,
              children: <div className="p-6">사유 : {message}</div>,
            });
          }}
        >
          사유보기
        </Button>
        <Button btnStyle="sm-fill-red">거부</Button>
      </>
    );
  }

  return (
    <section className="flex flex-col items-end justify-between">
      <div className="flex items-center gap-2">{user === userId && questionState}</div>
      <div className="flex">
        {approved !== 1 && userId === user ? (
          <>
            <Button
              btnStyle="sm-ghost"
              handleClick={() => {
                openModal({
                  children: (
                    <div className=" relative w-screen max-w-[36em] bg-white p-6">
                      <section className=" text-center">
                        <h1 className="my-4">질문 수정하기</h1>
                      </section>
                      <QuestionForm
                        question={{ questionId: id, category, title, answer }}
                        handleClick={() => {
                          closeModal();
                          loadWroteQuestions();
                        }}
                      />
                    </div>
                  ),
                });
              }}
            >
              <Icon name="edit" className="h-5 w-5  fill-deepGreen " />
            </Button>
            <Button
              btnStyle="sm-ghost"
              handleClick={() => {
                openModal({
                  center: true,
                  children: (
                    <ConfirmModal
                      content="삭제하시겠습니까?"
                      onSuccess={() => {
                        deleteQuestion(id).then(loadWroteQuestions);
                      }}
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
