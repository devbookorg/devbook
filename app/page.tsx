'use client';

import Main from '@/components/main/Main';
import QuestionsList from '@/components/main/QuestionsList';
import { getFilteredQuestions, getQuestionsCount } from '@/firebase/questions';
import { userMailState, userStateQuery } from '@/recoil/user';
import IQuestion from '@/types/questions';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export default function Home() {
  const { data: session } = useSession();
  const setUserMailState = useSetRecoilState(userMailState);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);

  useEffect(() => {
    getFilteredQuestions({}).then((res) => {
      setQuestions(res);
    });
    getQuestionsCount().then((res) => setNumberOfQuestions(res));
  }, []);

  useEffect(() => {
    if (session) {
      setUserMailState(session.user?.email!);
    }
  }, [session, userMailState]);

  return (
    <>
      전체 질문 수 : {numberOfQuestions}
      <QuestionsList questions={questions} />
    </>
  );
}
