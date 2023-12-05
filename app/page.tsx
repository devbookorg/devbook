'use client';

import LikeQuestionPart from '@/components/common/LikeQuestionPart';
import Question from '@/components/common/Question';
import { getFilteredQuestions, getQuestionsCount } from '@/firebase/questions';
import IQuestion from '@/types/questions';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);
  const approvedQuestions = 1; //0:대기|1:승인|2:미승인

  const loadQuestions = () => {
    getFilteredQuestions({ approved: approvedQuestions }).then((res) => {
      setQuestions(res);
    });
  };

  useEffect(() => {
    loadQuestions();
    getQuestionsCount({ approved: approvedQuestions }).then((res) => setNumberOfQuestions(res));
  }, []);

  return (
    <>
      전체 질문 수 : {numberOfQuestions}
      {questions.map((question) => (
        <Question key={question.id} {...question}>
          <LikeQuestionPart {...question} loadQuestions={loadQuestions} />
        </Question>
      ))}
    </>
  );
}
