import IQuestion from '@/types/questions';
import QuestionItem from './QuestionItem';
import Question from '../common/Question';

import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/user';

interface QuestionsListProps {
  questions: IQuestion[];
  loadQuestions: () => void;
  children: React.ReactNode;
}
export default function QuestionsList({ questions, loadQuestions, children }: QuestionsListProps) {
  const user = useRecoilValue(userState);

  return (
    <div>
      {questions.map((question) => {
        return (
          <Question key={question.id} {...question}>
            {children}
            <QuestionItem {...question} user={user} loadQuestions={loadQuestions} />
          </Question>
        );
      })}
    </div>
  );
}
