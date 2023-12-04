import React, { useState } from 'react';
import QuestionsListTab from './QuestionsListTab';
import IQuestion from '@/types/questions';
import Question from '../common/Question';
import QuestionItem from './QuestionItem';

interface Props {
  userQuestions: IQuestion[];
  likesQuestions: IQuestion[];
}

const QuestionsList = (props: Props) => {
  const { userQuestions, likesQuestions } = props;
  const [tab, setTab] = useState<number>(0);

  const handleTab = (n: number) => {
    setTab(n);
  };

  return (
    <>
      <QuestionsListTab handleTab={handleTab} tab={tab} />
      <ul>
        {[...(tab === 0 ? userQuestions : likesQuestions)].map((q) => (
          <Question key={q.id} {...q}>
            <QuestionItem {...q} tab={tab} />
          </Question>
        ))}
      </ul>
    </>
  );
};

export default QuestionsList;
