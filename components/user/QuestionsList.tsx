import React, { useEffect, useState } from 'react';
import QuestionsListTab from './QuestionsListTab';
import { getFilteredQuestions } from '@/firebase/questions';
import IQuestion from '@/types/questions';
import Question from './Question';

const QuestionsList = () => {
  const [tab, setTab] = useState<number>(0);
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  useEffect(() => {
    getFilteredQuestions({}).then((res) => setQuestions(res));
  }, []);

  const handleTab = (n: number) => {
    setTab(n);
  };

  return (
    <>
      <QuestionsListTab handleTab={handleTab} tab={tab} />
      <ul>
        {questions.map((q) => (
          <Question key={q.id} {...q} />
        ))}
      </ul>
    </>
  );
};

export default QuestionsList;
