'use client';

import Button from '@/components/common/Button';
import Question from '@/components/common/Question';

import QuestionsList from '@/components/main/QuestionsList';
import {
  getFilteredQuestions,
  getQuestionsCount,
  updateQuestionApproved,
} from '@/firebase/questions';
import IQuestion from '@/types/questions';
import { useEffect, useState } from 'react';

export default function AdminPage() {
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

  return (
    <>
      adminPage 1. approved = 0인것만 보이는 메인페이지같은 2. 버튼이 두개 (승인/거부) 3. 왼쪽에
      승인
      {questions.map((question) => {
        return (
          <Question key={question.id} {...question}>
            <div className="flex min-w-fit flex-row">
              <Button
                btnStyle="btn-fill"
                styles="bg-red"
                handleClick={() => {
                  rejectQuestion(question.id);
                }}
              >
                거부
              </Button>
              <Button
                btnStyle="btn-fill"
                handleClick={() => {
                  approveQuestion(question.id);
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
