import React, { useState } from 'react';
import QuestionsListTab from './QuestionsListTab';
import IQuestion from '@/types/questions';
import Question from '../common/Question';
import QuestionItem from './QuestionItem';

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
        {questions.map((q) => (
          <Question key={q.id} {...q}>
            <QuestionItem {...q} />
          </Question>
        ))}
      </ul>
    </>
  );
};

export default QuestionsList;
