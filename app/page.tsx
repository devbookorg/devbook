'use client';

import QuestionsList from '@/components/main/QuestionsList';
import { getFilteredQuestions, getQuestionsCount } from '@/firebase/questions';
import { userMailState, userStateQuery } from '@/recoil/user';
import IQuestion from '@/types/questions';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export default function Home() {
  const { data: session } = useSession();
  // const setUserMailState = useSetRecoilState(userMailState);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);
  const approvedQuestions = 0; //0:대기|1:승인|2:미승인

  const user = useRecoilValue(userStateQuery);

  console.log(user, '메인페이지에서');

  const loadQuestions = () => {
    getFilteredQuestions({ approved: approvedQuestions }).then((res) => {
      setQuestions(res);
    });
  };
  useEffect(() => {
    loadQuestions();
    getQuestionsCount({ approved: approvedQuestions }).then((res) => setNumberOfQuestions(res));
  }, []);

  useEffect(() => {
    if (session) {
      // setUserMailState(session.user?.email!);
    }
  }, [session, userMailState]);

  return (
    <>
      전체 질문 수 : {numberOfQuestions}
      {/* <QuestionsList questions={questions} loadQuestions={loadQuestions} /> */}
    </>
  );
}
