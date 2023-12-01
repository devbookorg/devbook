import React, { useEffect, useState } from 'react';
import QuestionsListTab from './QuestionsListTab';
import { getFilteredQuestions } from '@/firebase/questions';
import IQuestion from '@/types/questions';
import Question from './Question';

const QuestionsList = ({ user }: IUser) => {
  console.log(user.id, 'user:');
  const [tab, setTab] = useState<number>(0);

  const [questions, setQuestions] = useState<IQuestion[]>([]);

  useEffect(() => {
    // getFilteredQuestions({ userId: user.id }).then((res) => console.log('필터링된 데이터 ', res));
  }, []);

  const handleTab = (n: number) => {
    setTab(n);
  };

  return (
    <>
      <QuestionsListTab handleTab={handleTab} tab={tab} />
      <ul>
        {questions.map((q, idx) => (
          <Question key={idx} {...q} />
        ))}
      </ul>
    </>
  );
};

export default QuestionsList;
