import IQuestion from '@/types/questions';
import QuestionItem from './QuestionItem';
import Question from '../common/Question';
import IUser from '@/types/users';
import { useRecoilValue } from 'recoil';
import { userStateQuery } from '@/recoil/user';

interface QuestionsListProps {
  questions: IQuestion[];
}
export default function QuestionsList({ questions }: QuestionsListProps) {
  const user = useRecoilValue(userStateQuery);
  return (
    <div>
      {questions.map((question) => {
        return (
          <Question key={question.id} {...question}>
            <QuestionItem {...question} user={user} />
          </Question>
        );
      })}
    </div>
  );
}
