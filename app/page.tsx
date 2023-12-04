'use client';

import QuestionsList from '@/components/main/QuestionsList';
import { getFilteredQuestions, getQuestionsCount } from '@/firebase/questions';
import { getUser } from '@/firebase/users';
import { userState } from '@/recoil/user';
import IQuestion from '@/types/questions';
import IUser from '@/types/users';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function Home() {
  const { data: session } = useSession();
  const [user, setUser] = useRecoilState<IUser>(userState);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);
  const approvedQuestions = 0; //0:대기|1:승인|2:미승인

  const loadQuestions = () => {
    getFilteredQuestions({ approved: approvedQuestions }).then((res) => {
      setQuestions(res);
    });
  };

  useEffect(() => {
    if (session && session.user) {
      loadQuestions();
      getQuestionsCount({ approved: approvedQuestions }).then((res) => setNumberOfQuestions(res));
      getUser({ email: session.user.email! }).then((res) => setUser(res as IUser));
    }
  }, [session, user.likeQuestions.length, setUser]);

  return (
    <>
      전체 질문 수 : {numberOfQuestions}
      <QuestionsList questions={questions} loadQuestions={loadQuestions} />
    </>
  );
}
