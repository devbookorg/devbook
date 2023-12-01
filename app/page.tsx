'use client';

import Layout from '@/components/common/layout/Layout';
import Main from '@/components/main/Main';
import QuestionsList from '@/components/main/QuestionsList';
import { getFilteredQuestions, getQuestionsCount } from '@/firebase/questions';
import IQuestion from '@/types/questions';
import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);
  useEffect(() => {
    getFilteredQuestions({}).then((res) => {
      setQuestions(res);
    });
    getQuestionsCount().then((res) => setNumberOfQuestions(res));
  }, []);
  return (
    <>
      <Main />
      전체 질문 수 : {numberOfQuestions}
      <QuestionsList questions={questions} />
    </>
  );
}
