import IQuestion from '@/types/questions';
import React from 'react';
import Button from '../common/Button';
import { ButtonIcon } from '../common/Icon';
import { useModal } from '@/hooks/useModal';
import QuestionForm from '../common/QuestionForm';
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

  return (
    <section className="flex flex-col items-end justify-between">
      <div className="flex ">
        {approved === 2 && (
          <Button
            btnStyle="sm-line-deepGreen"
            styles="text-xs whitespace-nowrap p-1"
            handleClick={() => {
              openModal({
                center: true,
                children: <div className="p-6">사유 : {message}</div>,
              });
            }}
          >
            사유
          </Button>
        )}
        {approved !== 1 && userId === user && (
          <>
            <ButtonIcon
              iconName="edit"
              svgStyles="h-5 w-5  fill-deepGreen"
              handleClick={() => {
                openModal({
                  children: (
                    <div className=" relative max-h-[80vh] w-screen max-w-[36em] overflow-y-scroll bg-white p-6">
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
            />
          </>
        )}
        <ButtonIcon
          iconName="trash"
          svgStyles="h-5 w-5 fill-red"
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
        />
      </div>
    </section>
  );
};

export default QuestionItem;
