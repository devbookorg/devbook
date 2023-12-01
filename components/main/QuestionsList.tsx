import IQuestion from '@/types/questions';
import QuestionItem from './QuestionItem';
import Question from '../common/Question';

interface QuestionsListProps {
  questions: IQuestion[];
}
export default function QuestionsList({ questions }: QuestionsListProps) {
  return (
    <div>
      {questions.map((question) => {
        return (
          <Question key={question.id} {...question}>
            <QuestionItem {...question} />
          </Question>
        );
      })}
    </div>
  );
}
