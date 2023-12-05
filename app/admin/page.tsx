'use client';

import Button from '@/components/common/Button';
import Question from '@/components/common/Question';
import {
  getFilteredQuestions,
  getQuestionsCount,
  updateQuestionApproved,
} from '@/firebase/questions';
import { useModal } from '@/hooks/useModal';
import IQuestion from '@/types/questions';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const { openModal, closeModal } = useModal();
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);
  const approvedQuestions = 0; //0:대기|1:승인|2:미승인

  useEffect(() => {
    loadQuestions();
    getQuestionsCount({ approved: approvedQuestions }).then((res) => setNumberOfQuestions(res));
  }, []);

  const loadQuestions = () => {
    getFilteredQuestions({ approved: approvedQuestions }).then((res) => {
      setQuestions(res);
    });
  };

  const approveQuestion = (questionsId: string) => {
    updateQuestionApproved(questionsId, { approved: 1 });
  };
  const rejectQuestion = (questionsId: string) => {
    updateQuestionApproved(questionsId, { approved: 2 });
  };

  console.log(questions);

  const modalOpen = () => {
    {
      openModal({
        children: <div className=" relative w-screen max-w-[36em] bg-white p-6">모달열기</div>,
        center: true,
      });
    }
    setTimeout(closeModal, 1000);
  };

  return (
    <>
      <button onClick={modalOpen}>체크</button>
      {questions.map((question) => {
        return (
          <Question key={question.id} {...question}>
            <div className="flex min-w-fit flex-row">
              <Button
                btnStyle="btn-fill"
                styles="bg-red"
                handleClick={() => {
                  rejectQuestion(question.id);
                  modalOpen();
                }}
              >
                거부
              </Button>
              <Button
                btnStyle="btn-fill"
                handleClick={() => {
                  approveQuestion(question.id);
                  modalOpen();
                }}
              >
                승인
              </Button>
            </div>
          </Question>
        );
      })}
    </>
  );
}
