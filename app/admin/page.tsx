'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Pagination from '@/components/common/Pagination';
import Question from '@/components/common/Question';
import {
  getFilteredQuestions,
  getQuestionsCount,
  updateQuestionApproved,
  updateQuestionMessage,
} from '@/firebase/questions';
import { useModal } from '@/hooks/useModal';
import { usePagination } from '@/hooks/usePagination';
import { userState } from '@/recoil/user';
import IQuestion from '@/types/questions';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function AdminPage() {
  const user = useRecoilValue(userState);
  const rejectionMessage = useRef(null);
  const { openModal, closeModal } = useModal();
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);
  const approvedQuestions = 0; //0:대기|1:승인|2:미승인
  const pagination = usePagination(numberOfQuestions);
  useEffect(() => {
    loadQuestions();
    getQuestionsCount({ approved: approvedQuestions }).then((res) => setNumberOfQuestions(res));
  }, []);

  const loadQuestions = () => {
    getFilteredQuestions({ approved: approvedQuestions }).then((res) => {
      setQuestions(res);
    });
  };

  const approveQuestion = async (questionId: string) => {
    updateQuestionApproved({ questionId, userId: user.id, approved: 1 });
  };
  const rejectQuestion = async (questionId: string, message: string) => {
    updateQuestionApproved({ questionId, userId: user.id, approved: 2 });
    updateQuestionMessage(questionId, { message });
  };

  const loadPageQuestions = (page: number) => {
    getFilteredQuestions({ approved: approvedQuestions, page }).then((res) => {
      setQuestions(res);
    });
    pagination.handleChangePage(page);
  };

  const modalOpen = ({
    children,
    closeBtnNone,
    autoClose,
  }: {
    children: React.ReactNode | string;
    closeBtnNone?: boolean;
    autoClose?: boolean;
  }) => {
    {
      openModal({
        children: <div className=" relative w-screen max-w-[36em] bg-white p-6">{children}</div>,
        center: true,
        closeBtnNone,
      });
    }
    if (autoClose) {
      setTimeout(closeModal, 1000);
    }
  };

  return (
    <>
      {questions.map((question) => {
        return (
          <Question key={question.id} {...question}>
            <div className="flex min-w-fit flex-row">
              <Button
                btnStyle="sm-fill-red"
                handleClick={() => {
                  modalOpen({
                    children: (
                      <div className="flex flex-col gap-8">
                        <h6>거부사유</h6>
                        <input
                          className="input-primary"
                          ref={rejectionMessage}
                          placeholder="거부 사유를 작성해주세요."
                        />
                        <Button
                          btnStyle="lg-fill-deepGreen"
                          handleClick={() => {
                            rejectQuestion(question.id, rejectionMessage.current.value).then(
                              loadQuestions
                            );
                            closeModal();
                          }}
                        >
                          확인
                        </Button>
                      </div>
                    ),
                  });
                }}
              >
                거부
              </Button>
              <Button
                btnStyle="sm-fill-deepGreen"
                handleClick={() => {
                  approveQuestion(question.id).then(loadQuestions);
                  modalOpen({ children: '승인되었습니다.', closeBtnNone: true, autoClose: true });
                }}
              >
                승인
              </Button>
            </div>
          </Question>
        );
      })}
      <Pagination {...pagination} handleChangePage={loadPageQuestions} />
    </>
  );
}
