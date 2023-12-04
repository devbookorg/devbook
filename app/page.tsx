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
  const approvedQuestions = 1; //0:대기|1:승인|2:미승인

  const loadQuestions = () => {
    getFilteredQuestions({ approved: approvedQuestions }).then((res) => {
      setQuestions(res);
    });
  };

  useEffect(() => {
    if (session && session.user) {
      loadQuestions();
      getQuestionsCount({ approved: approvedQuestions }).then((res) => setNumberOfQuestions(res));
      getUser({ email: session.user.email! }).then((res) => {
        if (!res) return;
        if (
          res?.id === 'ed4756b0-d373-43c1-9ca8-a1c57e1c756f' ||
          res?.id === '58f6e3b6-b61d-477f-b728-73816391ee0c'
        ) {
          setUser({ ...res, admin: true });
        } else {
          setUser({ ...res, admin: false });
        }
      });
    }
  }, [session, user.likeQuestions.length, setUser]);

  return (
    <>
      전체 질문 수 : {numberOfQuestions}
      <QuestionsList questions={questions} loadQuestions={loadQuestions} />
    </>
  );
}
