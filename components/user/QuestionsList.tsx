import React, { useState } from 'react';
import QuestionsListTab from './QuestionsListTab';
import IQuestion from '@/types/questions';
import Question from './Question';

interface Props {
  questions: IQuestion[];
}

const QuestionsList = (props: Props) => {
  const { questions } = props;
  const [tab, setTab] = useState<number>(0);

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
