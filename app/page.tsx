'use client';

import Question from '@/components/common/Question';
import MainQuestion from '@/components/main/QuestionItem';
import { getFilteredQuestions, getQuestionsCount } from '@/firebase/questions';
import IQuestion from '@/types/questions';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Home() {
  const { data: session } = useSession();
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);
  const approvedQuestions = 0; //0:대기|1:승인|2:미승인

  const loadQuestions = () => {
    getFilteredQuestions({ approved: approvedQuestions }).then((res) => {
      setQuestions(res);
    });
  };

  useEffect(() => {
    if (session) {
      loadQuestions();
      getQuestionsCount({ approved: approvedQuestions }).then((res) => setNumberOfQuestions(res));
    }
  }, [session]);

  return (
    <>
      전체 질문 수 : {numberOfQuestions}
      {questions.map((question) => (
        <Question key={question.id} {...question}>
          <MainQuestion {...question} loadQuestions={loadQuestions} />
        </Question>
      ))}
    </>
  );
}
